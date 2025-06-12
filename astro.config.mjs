import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kivamz.github.io',
  base: '/raverevolutionbeats',
  build: {
    assets: 'assets'
  },
  vite: {
    define: {
      'import.meta.env.SITE': JSON.stringify('https://kivamz.github.io/raverevolutionbeats')
    }
  }
});
