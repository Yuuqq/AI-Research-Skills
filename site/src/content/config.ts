import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
    schema: docsSchema({
      extend: z.object({
        skillName: z.string().optional(),
        skillVersion: z.string().optional(),
        skillAuthor: z.string().optional(),
        skillLicense: z.string().optional(),
        skillTags: z.array(z.string()).optional(),
        skillDeps: z.array(z.string()).optional(),
      }),
    }),
  }),
};
