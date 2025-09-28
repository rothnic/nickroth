import { defineCollection, z } from 'astro:content';

const capabilities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    company: z.string(),
    role: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    category: z.string().optional(),
    impact: z.string().optional(),
    stack: z.array(z.string()).default([]),
    roleCategory: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  capabilities,
  work,
  notes,
};