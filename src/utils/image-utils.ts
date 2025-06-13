// Utility functions for handling Printful images with fallbacks
export const createImageWithFallback = (src: string, alt: string, fallbackSrc?: string) => {
  const defaultFallback = "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Product+Image";
  const finalFallback = fallbackSrc || defaultFallback;
  
  return {
    src: src || finalFallback,
    alt: alt || "Product Image",
    onError: `this.onerror=null; this.src='${finalFallback}';`
  };
};

export const validateImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    // Accept any HTTPS URL, not just Printful
    return parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const getOptimizedImageUrl = (originalUrl: string, width = 400, height = 400): string => {
  if (!originalUrl) return `https://via.placeholder.com/${width}x${height}/1a1a1a/ffffff?text=Product`;
  
  // Validate the URL first
  if (!validateImageUrl(originalUrl)) {
    return `https://via.placeholder.com/${width}x${height}/1a1a1a/ffffff?text=Invalid+Image`;
  }
  
  // For Printful images, try to optimize
  if (originalUrl.includes('printful') || originalUrl.includes('printfiles')) {
    try {
      const url = new URL(originalUrl);
      // Some Printful CDNs support size parameters
      if (!url.searchParams.has('width')) {
        url.searchParams.set('width', width.toString());
      }
      if (!url.searchParams.has('height')) {
        url.searchParams.set('height', height.toString());
      }
      return url.toString();
    } catch {
      return originalUrl;
    }
  }
  
  return originalUrl;
};

// Create a safe image source with multiple fallback levels
export const getSafeImageSrc = (imageUrl: string, productName: string, width = 400, height = 400): string => {
  // Level 1: Try optimized original URL
  if (imageUrl && validateImageUrl(imageUrl)) {
    return getOptimizedImageUrl(imageUrl, width, height);
  }
  
  // Level 2: Generate placeholder with product name
  const encodedName = encodeURIComponent(productName || 'Product');
  return `https://via.placeholder.com/${width}x${height}/1a1a1a/ffffff?text=${encodedName}`;
};

// Create fallback onerror handler with multiple fallbacks
export const createImageErrorHandler = (productName: string, width = 400, height = 400): string => {
  const encodedName = encodeURIComponent(productName || 'Product');
  const fallback1 = `https://via.placeholder.com/${width}x${height}/333333/ffffff?text=${encodedName}`;
  const fallback2 = `https://via.placeholder.com/${width}x${height}/1a1a1a/ffffff?text=Image+Not+Found`;
  
  return `
    if (this.dataset.fallbackLevel !== 'final') {
      this.dataset.fallbackLevel = this.dataset.fallbackLevel === 'first' ? 'final' : 'first';
      this.src = this.dataset.fallbackLevel === 'first' ? '${fallback1}' : '${fallback2}';
    }
  `;
};
