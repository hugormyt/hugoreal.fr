import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une note = un fichier Markdown dans src/content/notes/
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // draft: true => visible en local (npm run dev), jamais publié
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
