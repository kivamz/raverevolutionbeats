import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kivamz.github.io',
  base: '/raverevolutionbeats/',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets'
  }
});
