import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    
  },
});
