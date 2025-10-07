#!/usr/bin/env node

/**
 * Documentation Validation Script
 *
 * Validates documentation against conventions in:
 * .github/instructions/documentation.instructions.md
 *
 * This script provides pass/fail validation for CI/CD.
 * For discovery and analysis, use: pnpm docs:analyze (runs analyze-docs.sh)
 *
 * Usage: node scripts/validate-docs.mjs [--fix]
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "docs");

const errors = [];
const warnings = [];

/**
 * Check file naming conventions
 */
function validateFileName(filePath) {
	const fileName = basename(filePath);
	const relativePath = relative(DOCS_DIR, filePath);
	const dirName = dirname(relativePath);

	// Skip README.md files
	if (fileName === "README.md") return;

	// Check if file is in docs/ root (not in a subfolder)
	if (dirName === ".") {
		// Only certain files allowed in root
		const allowedInRoot = [
			"site-first-roadmap.md",
			"component-backlog.md",
			"page-index.md",
		];
		if (!allowedInRoot.includes(fileName)) {
			errors.push({
				file: relativePath,
				rule: "docs-root",
				message: `Files should not be created in docs/ root. Move to appropriate subfolder (astro/, design-system/, project/, etc.)`,
			});
		}
	}

	// Check lowercase with hyphens
	if (!/^[a-z0-9-]+\.md$/.test(fileName)) {
		errors.push({
			file: relativePath,
			rule: "file-naming",
			message: `File name should be lowercase with hyphens: ${fileName}`,
		});
	}

	// Check for generic names
	const genericNames = [
		"notes.md",
		"temp.md",
		"fixes.md",
		"stuff.md",
		"changes.md",
	];
	if (genericNames.includes(fileName)) {
		errors.push({
			file: relativePath,
			rule: "generic-name",
			message: `Avoid generic file names: ${fileName}`,
		});
	}

	// Warn about "cleanup", "system", "quick-reference" in docs/
	if (
		fileName.includes("cleanup") ||
		fileName.includes("system") ||
		fileName.includes("quick-reference")
	) {
		warnings.push({
			file: relativePath,
			rule: "potential-duplicate",
			message: `File name suggests potential duplication of .github/ instructions/modes/prompts`,
		});
	}
}

/**
 * Check for broken internal links
 */
async function validateLinks(filePath, content) {
	const relativePath = relative(DOCS_DIR, filePath);
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
	let match;

	while ((match = linkRegex.exec(content)) !== null) {
		const [, , linkPath] = match;

		// Skip external links
		if (linkPath.startsWith("http://") || linkPath.startsWith("https://")) {
			continue;
		}

		// Skip anchors
		if (linkPath.startsWith("#")) {
			continue;
		}

		// Resolve relative path
		const fileDir = dirname(filePath);
		const targetPath = join(fileDir, linkPath.split("#")[0]);

		try {
			await stat(targetPath);
		} catch {
			errors.push({
				file: relativePath,
				rule: "broken-link",
				message: `Broken link to: ${linkPath}`,
			});
		}
	}
}

/**
 * Check folder file count
 */
async function checkFolderFileCount(folderPath) {
	const entries = await readdir(folderPath, { withFileTypes: true });
	const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".md"));
	const relativePath = relative(DOCS_DIR, folderPath);

	if (mdFiles.length > 15) {
		warnings.push({
			file: relativePath,
			rule: "folder-size",
			message: `Folder has ${mdFiles.length} files (max 15 recommended). Consider subcategories.`,
		});
	}

	// Check for README.md
	const hasReadme = mdFiles.some((f) => f.name === "README.md");
	if (!hasReadme && mdFiles.length > 0) {
		warnings.push({
			file: relativePath,
			rule: "missing-readme",
			message: `Folder missing README.md to explain its purpose`,
		});
	}
}

/**
 * Recursively scan docs directory
 */
async function scanDirectory(dirPath) {
	const entries = await readdir(dirPath, { withFileTypes: true });

	// Check folder file count
	await checkFolderFileCount(dirPath);

	for (const entry of entries) {
		const fullPath = join(dirPath, entry.name);

		if (entry.isDirectory()) {
			// Skip certain directories
			if (entry.name === "node_modules" || entry.name === ".git") {
				continue;
			}
			await scanDirectory(fullPath);
		} else if (entry.isFile() && entry.name.endsWith(".md")) {
			validateFileName(fullPath);

			const content = await readFile(fullPath, "utf-8");
			await validateLinks(fullPath, content);
		}
	}
}

/**
 * Print results
 */
function printResults() {
	console.log("\n📚 Documentation Validation Results\n");

	if (errors.length === 0 && warnings.length === 0) {
		console.log("✅ All checks passed!\n");
		return 0;
	}

	if (errors.length > 0) {
		console.log(`❌ ${errors.length} Error(s):\n`);
		for (const error of errors) {
			console.log(`  ${error.file}`);
			console.log(`  └─ [${error.rule}] ${error.message}\n`);
		}
	}

	if (warnings.length > 0) {
		console.log(`⚠️  ${warnings.length} Warning(s):\n`);
		for (const warning of warnings) {
			console.log(`  ${warning.file}`);
			console.log(`  └─ [${warning.rule}] ${warning.message}\n`);
		}
	}

	console.log(
		"📖 See .github/instructions/documentation.instructions.md for conventions\n",
	);

	return errors.length > 0 ? 1 : 0;
}

/**
 * Main
 */
async function main() {
	console.log("🔍 Validating documentation...\n");

	try {
		await scanDirectory(DOCS_DIR);
		const exitCode = printResults();
		process.exit(exitCode);
	} catch (error) {
		console.error("❌ Validation failed:", error.message);
		process.exit(1);
	}
}

main();
