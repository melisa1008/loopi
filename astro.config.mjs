import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://melisa1008.github.io',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'pt', 'it', 'de'],
    routing: { prefixDefaultLocale: true },
  },
});
