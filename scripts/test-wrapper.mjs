#!/usr/bin/env node

import { spawn } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const LOCK_FILE = resolve(projectRoot, ".test-lock");
const args = process.argv.slice(2);
const forceFlag = args.includes("--force") || args.includes("-f");
const testArgs = args.filter((a) => a !== "--force" && a !== "-f");

async function isProcessRunning(pid) {
	try {
		const { promisify } = await import("util");
		const { exec } = await import("child_process");
		const execAsync = promisify(exec);

		await execAsync(`kill -0 ${pid} 2>/dev/null`);
		return true;
	} catch {
		return false;
	}
}

async function checkLockFile() {
	const fs = await import("fs/promises");

	try {
		const lockContent = await fs.readFile(LOCK_FILE, "utf-8");
		const lines = lockContent.trim().split("\n");
		const pid = parseInt(lines[0], 10);
		const timestamp = lines[1] ? parseInt(lines[1], 10) : 0;

		if (!pid || Number.isNaN(pid)) {
			console.warn(
				"⚠️  WARNING: Lock file exists but contains invalid PID. Removing stale lock.",
			);
			await releaseLock();
			return { hasLock: false, isStale: true };
		}

		const isRunning = await isProcessRunning(pid);

		if (!isRunning) {
			const age = Date.now() - timestamp;
			const ageSeconds = Math.floor(age / 1000);
			console.warn(
				`⚠️  WARNING: Removing stale lock from process ${pid} (died ${ageSeconds}s ago).`,
			);
			await releaseLock();
			return { hasLock: false, isStale: true, oldPid: pid };
		}

		return { hasLock: true, pid, timestamp };
	} catch (err) {
		if (err.code === "ENOENT") {
			return { hasLock: false };
		}
		console.error("Error reading lock file:", err.message);
		return { hasLock: false, error: err };
	}
}

async function acquireLock() {
	const fs = await import("fs/promises");

	try {
		const lockContent = `${process.pid}\n${Date.now()}\n${testArgs.join(" ")}`;
		await fs.writeFile(LOCK_FILE, lockContent, { flag: "wx" });
		return { success: true };
	} catch (err) {
		if (err.code === "EEXIST") {
			return { success: false, reason: "already_locked" };
		}
		return { success: false, reason: "error", error: err };
	}
}

async function releaseLock() {
	const fs = await import("fs/promises");
	try {
		await fs.unlink(LOCK_FILE);
	} catch {}
}

async function checkExistingTests() {
	try {
		const { promisify } = await import("util");
		const { exec } = await import("child_process");
		const execAsync = promisify(exec);

		const { stdout } = await execAsync(
			`ps aux | grep -E "(vitest|playwright)" | grep -v grep | grep "${projectRoot}" || true`,
		);

		const processes = stdout
			.trim()
			.split("\n")
			.filter((line) => line.length > 0);
		return processes.filter((p) => p.includes(projectRoot));
	} catch {
		return [];
	}
}

async function main() {
	const lockStatus = await checkLockFile();

	if (lockStatus.hasLock && !forceFlag) {
		const age = Date.now() - lockStatus.timestamp;
		const ageMinutes = Math.floor(age / 60000);

		console.error(
			`❌ ERROR: Tests are already running (PID ${lockStatus.pid}).`,
		);
		if (ageMinutes > 0) {
			console.error(`   Lock acquired ${ageMinutes} minute(s) ago.`);
		}
		console.error("   Use --force or -f to override and run tests anyway.");
		console.error("   Example: pnpm test -- --force");
		process.exit(1);
	}

	if (lockStatus.hasLock && forceFlag) {
		console.warn(
			`⚠️  WARNING: Overriding existing lock (PID ${lockStatus.pid})\n`,
		);
		await releaseLock();
	}

	const existingTests = await checkExistingTests();

	if (existingTests.length > 0 && !lockStatus.isStale) {
		console.warn("⚠️  WARNING: Test processes detected for this project:");
		existingTests.forEach((proc) => {
			const parts = proc.trim().split(/\s+/);
			const pid = parts[1];
			const cmd = parts.slice(10).join(" ");
			console.warn(
				`   PID ${pid}: ${cmd.substring(0, 80)}${cmd.length > 80 ? "..." : ""}`,
			);
		});
		console.warn("");

		if (!forceFlag) {
			console.error("❌ ERROR: Tests are already running.");
			console.error("   Use --force or -f to override and run tests anyway.");
			console.error("   Example: pnpm test -- --force");
			process.exit(1);
		}

		console.warn(
			"⚠️  Proceeding with --force flag (concurrent tests may cause issues)\n",
		);
	}

	const acquireResult = await acquireLock();

	if (!acquireResult.success && !forceFlag) {
		if (acquireResult.reason === "already_locked") {
			console.error("❌ ERROR: Another test process acquired the lock.");
			console.error("   Use --force or -f to override.");
			process.exit(1);
		}
		console.error(
			"❌ ERROR: Failed to acquire lock:",
			acquireResult.error?.message,
		);
		process.exit(1);
	}

	const isPlaywright =
		testArgs.some((arg) => arg.includes(".spec.ts")) &&
		!testArgs.includes("src/tests/");

	const command = isPlaywright ? "playwright" : "vitest";
	const cmdArgs = isPlaywright ? ["test", ...testArgs] : [...testArgs];

	console.log(`🧪 Running ${command} tests...\n`);

	const child = spawn("npx", [command, ...cmdArgs], {
		stdio: "inherit",
		cwd: projectRoot,
		shell: true,
	});

	let cleanupDone = false;

	async function cleanup(exitCode = 0) {
		if (cleanupDone) return;
		cleanupDone = true;
		await releaseLock();
		process.exit(exitCode);
	}

	child.on("exit", async (code) => {
		await cleanup(code ?? 0);
	});

	child.on("error", async (err) => {
		console.error("Failed to start test process:", err);
		await cleanup(1);
	});

	process.on("SIGINT", async () => {
		child.kill("SIGINT");
		await cleanup(130);
	});

	process.on("SIGTERM", async () => {
		child.kill("SIGTERM");
		await cleanup(143);
	});

	process.on("uncaughtException", async (err) => {
		console.error("Uncaught exception:", err);
		child.kill("SIGTERM");
		await cleanup(1);
	});
}

main().catch(async (err) => {
	console.error("Unexpected error:", err);
	await releaseLock();
	process.exit(1);
});
