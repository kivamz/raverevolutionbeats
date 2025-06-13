import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kivamz.github.io/raverevolutionbeats/',
  base: '/raverevolutionbeats/',
  trailingSlash: 'always',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
