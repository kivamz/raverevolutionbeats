import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.NODE_ENV === 'production'
    ? 'https://github.com/kivamz/raverevolutionbeats/'
    : 'http://localhost:4321',
  base: process.env.NODE_ENV === 'production' ? '/raverevolutionbeats/' : '/',
  vite: {
    define: {
      // Solo se expone al cliente información no sensible
      'import.meta.env.SITE': JSON.stringify(process.env.NODE_ENV === 'production'
        ? 'https://github.com/kivamz/raverevolutionbeats/'
        : 'http://localhost:4321')
    }
  }
});
