import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const siteUrl = "https://www.nickroth.com";

/**
 * Generate dynamic sitemap.xml
 * Includes all static pages, work articles, capabilities, and notes
 */
export const GET: APIRoute = async () => {
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
		return `
  <url>
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
		return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
	});

	// Combine all URLs (notes and capability fragment URLs excluded - no routes exist)
	const allUrls = [...staticUrls, ...workUrls];

	// Generate XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join("")}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
			// Cache for 1 hour in production
			"Cache-Control": "public, max-age=3600",
		},
	});
};
