// Utility function to handle base URL consistently across the application
export const getBaseUrl = () => {
  // Use Astro's configured base path from astro.config.mjs
  // This automatically handles development vs production
  return import.meta.env.BASE_URL;
};

export const getAssetUrl = (path: string) => {
  const base = getBaseUrl();
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
