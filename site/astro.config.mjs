import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { sidebar } from './src/sidebar';

export default defineConfig({
  site: 'https://yuuqq.github.io',
  base: '/AI-Research-SKILLs/',
  output: 'static',
  integrations: [
    starlight({
      title: 'AI Research Skills',
      description: '94 AI research skills enabling autonomous AI research — from hypothesis to paper',
      sidebar,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Yuuqq/AI-Research-SKILLs' },
      ],
      customCss: ['/src/styles/custom.css'],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'description',
            content: 'A comprehensive open-source library of 94 AI research skills enabling AI agents to autonomously conduct AI research — from idea to paper.',
          },
        },
      ],
    }),
    sitemap(),
  ],
});
