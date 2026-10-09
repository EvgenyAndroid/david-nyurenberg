// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static export → Cloudflare Pages
// Production domain: https://david-nyurenberg.com
export default defineConfig({
  site: 'https://david-nyurenberg.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  // /future is an unlisted redesign preview: keep it out of the sitemap.
  integrations: [sitemap({ filter: page => !page.includes('/future') })],
});
