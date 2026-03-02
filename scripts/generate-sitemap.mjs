import { getCollection } from "astro:content";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const siteUrl = "https://www.nickroth.com";

/**
 * Generate sitemap.xml before build
 * Run with: node scripts/generate-sitemap.mjs
 */
async function generateSitemap() {
	console.log("Generating sitemap.xml...");

	// Get all content collections
	const workEntries = await getCollection("work");

	// Static pages with their priorities and change frequencies
	const staticPages = [
		{ path: "", priority: "1.0", changefreq: "weekly" },
		{ path: "about", priority: "0.8", changefreq: "monthly" },
		{ path: "approach", priority: "0.8", changefreq: "monthly" },
		{ path: "background", priority: "0.8", changefreq: "monthly" },
		{ path: "contact", priority: "0.6", changefreq: "monthly" },
		{ path: "work", priority: "0.9", changefreq: "weekly" },
		{ path: "showcase", priority: "0.7", changefreq: "weekly" },
		{ path: "project", priority: "0.7", changefreq: "weekly" },
	];

	// Generate URLs for static pages
	const staticUrls = staticPages.map((page) => {
		const url = page.path ? `${siteUrl}/${page.path}/` : `${siteUrl}/`;
		return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
	});

	const workUrls = workEntries.map((entry) => {
		const url = `${siteUrl}/work/${entry.slug}/`;
		const lastmod =
			entry.data.startDate?.toISOString() || new Date().toISOString();
		return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
	});

	// Combine all URLs
	const allUrls = [...staticUrls, ...workUrls];

	// Generate XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join("\n")}
</urlset>`;

	// Write to public folder
	const outputPath = fileURLToPath(
		new URL("../public/sitemap.xml", import.meta.url),
	);
	writeFileSync(outputPath, sitemap);
	console.log(`✅ Sitemap generated at ${outputPath}`);
}

generateSitemap().catch((error) => {
	console.error("Failed to generate sitemap:", error);
	process.exit(1);
});
