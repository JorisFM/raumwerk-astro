import { defineCollection, z } from 'astro:content';

// Projekte = eigenständige Inhaltssammlung (wie ein WordPress Custom Post Type).
// Jede .md-Datei in src/content/projekte/ ist ein Projekt; CloudCannon kann
// darüber neue Projekte anlegen. Astro generiert daraus Übersicht + Detailseite.
const projekte = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    location: z.string(),
    year: z.string(),
    order: z.number().default(0),
    size: z.enum(['large', 'small', 'medium', 'full']).default('medium'),
    image: z.string(),
    image_alt: z.string().default(''),
    facts: z
      .array(z.object({ label: z.string(), val: z.string() }))
      .default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projekte };
