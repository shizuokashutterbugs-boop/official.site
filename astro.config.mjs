import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番URL。OGP/canonical/sitemap生成に使用する。
export default defineConfig({
  site: 'https://shizuoka-shutterbugs.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
