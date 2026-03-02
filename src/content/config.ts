import { defineCollection, z } from "astro:content";

// Author information schema for articles
const authorSchema = z.object({
	name: z.string(),
	email: z.string().email().optional(),
	url: z.string().url().optional(),
	image: z.string().optional(),
	sameAs: z.array(z.string().url()).optional(),
});

const pages = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		draft: z.boolean().default(false),
	}),
});

const capabilities = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string().optional(),
		order: z.number().default(0),
	}),
});

const work = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			company: z.string(),
			role: z.string(),
			startDate: z.date(),
			endDate: z.date().optional(),
			featured: z.boolean().default(false),
			tags: z.array(z.string()).default([]),
			image: image().optional(),
			category: z.string().optional(),
			impact: z.string().optional(),
			stack: z.array(z.string()).default([]),
			roleCategory: z.string().optional(),
			parentProject: z.string().optional(),
			techBrand: z.enum(["astro", "datocms", "react", "generic"]).optional(),
			heroFeature: z.string().optional(),
			author: authorSchema.optional(),
			wordCount: z.number().optional(),
			readingTime: z.number().optional(),
		}),
});

const notes = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		author: authorSchema.optional(),
		wordCount: z.number().optional(),
		readingTime: z.number().optional(),
	}),
});

export const collections = {
	pages,
	capabilities,
	work,
	notes,
};

export type Author = z.infer<typeof authorSchema>;
