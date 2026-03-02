import type { Author } from "../content/config";

/**
 * Default site author information
 * Used when content doesn't specify an author
 */
export const siteAuthor: Author = {
	name: "Nick Roth",
	email: "nick@nickroth.com",
	url: "https://www.nickroth.com",
	image: "https://www.nickroth.com/images/nick-headshot.png",
	sameAs: [
		"https://github.com/rothnic",
		"https://linkedin.com/in/nickroth",
		"https://twitter.com/rothnic",
	],
};

/**
 * Site-wide metadata
 */
export const siteMetadata = {
	title: "Nick Roth - Product Manager & AI Engineer",
	description:
		"Personal site and portfolio of Nick Roth, a Product Manager and AI Engineer specializing in building intelligent systems and user experiences.",
	url: "https://www.nickroth.com",
	locale: "en-US",
	type: "website",
	favicon: "/favicon.svg",
	ogImage: "https://www.nickroth.com/assets/images/nick-headshot.webp",
	twitterHandle: "@rothnic",
};

/**
 * Default Open Graph and Twitter card metadata
 */
export const defaultOgMetadata = {
	image: siteMetadata.ogImage,
	imageAlt: "Nick Roth - Product Manager & AI Engineer",
	type: "website",
	locale: "en_US",
	siteName: siteMetadata.title,
};

/**
 * Default Twitter card metadata
 */
export const defaultTwitterMetadata = {
	card: "summary_large_image",
	site: siteMetadata.twitterHandle,
	creator: siteMetadata.twitterHandle,
	image: siteMetadata.ogImage,
	imageAlt: "Nick Roth - Product Manager & AI Engineer",
};
