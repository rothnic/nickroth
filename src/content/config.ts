import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

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

const phases = defineCollection({
  type: 'content',
  schema: z.object({
    era: z.string(),
    title: z.string(),
    oneliner: z.string().max(160),
    focus: z.array(z.string()).max(3).optional(),
    skills: z.array(z.string()).optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    artifacts: z.array(z.object({ 
      label: z.string(), 
      href: z.string(), 
      type: z.enum(['link','image','video']).optional() 
    })).optional(),
    bridge: z.string().optional(),
    current: z.boolean().optional(),
    featured: z.boolean().optional(),
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    era: z.string().optional(),
    phase: z.string().optional(),         // primary phase slug
    phases: z.array(z.string()).optional(), // additional phase slugs
    tags: z.array(z.string()).optional(),
    tech: z.array(z.string()).optional(),
    impact: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
    cover: z.string().optional(),
    weight: z.number().default(0),
    featured: z.boolean().optional()
  })
});

export const collections = {
  pages,
  capabilities,
  work,
  notes,
  phases,
  projects,
};