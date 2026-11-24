// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site 100 % statique, publié sur GitHub Pages (domaine perso hugoreal.fr).
export default defineConfig({
  site: 'https://hugoreal.fr',
  output: 'static',
  integrations: [sitemap()],
});
