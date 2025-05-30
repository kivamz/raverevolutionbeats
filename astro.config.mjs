import { defineConfig } from 'astro/config';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/raverevolutionbeats/' : '/',
});
