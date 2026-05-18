/**
 * Image optimization utilities for the SumoPower image database
 */

// Brand-specific image configurations
export const BRAND_CONFIGS = {
  infinix: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
  iphone: {
    defaultWidth: 300,
    defaultHeight: 220, // iPhone images might be taller
    quality: 90, // Higher quality for premium products
    priority: true, // iPhones are popular, prioritize loading
  },
  samsung: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
  oppo: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
  vivo: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
  xiaomi: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
  nokia: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 80, // Nokia batteries might be lower resolution
    priority: false,
  },
  default: {
    defaultWidth: 300,
    defaultHeight: 190,
    quality: 85,
    priority: false,
  },
};

// Responsive sizes for different screen sizes
export const RESPONSIVE_SIZES = {
  product_card: '(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 992px) 240px, 300px',
  featured_carousel: '(max-width: 640px) 200px, (max-width: 768px) 250px, 300px',
  product_detail: '(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px',
  thumbnail: '(max-width: 640px) 80px, (max-width: 768px) 100px, 120px',
};

/**
 * Get optimized image configuration for a product based on its category/brand
 */
export function getImageConfig(imageUrl: string, usage: 'card' | 'featured' | 'detail' | 'thumbnail' = 'card') {
  // Extract brand from image path
  const brand = extractBrandFromPath(imageUrl);
  const config = BRAND_CONFIGS[brand] || BRAND_CONFIGS.default;
  
  // Adjust dimensions based on usage
  const usageMultipliers = {
    card: 1,
    featured: 1,
    detail: 2,
    thumbnail: 0.4,
  };
  
  const multiplier = usageMultipliers[usage];
  
  return {
    width: Math.round(config.defaultWidth * multiplier),
    height: Math.round(config.defaultHeight * multiplier),
    quality: config.quality,
    priority: config.priority && usage === 'featured', // Only prioritize featured images
    sizes: RESPONSIVE_SIZES[`${usage === 'card' ? 'product_card' : usage === 'featured' ? 'featured_carousel' : usage === 'detail' ? 'product_detail' : 'thumbnail'}`],
  };
}

/**
 * Extract brand name from image path
 */
function extractBrandFromPath(imageUrl: string): string {
  if (!imageUrl) return 'default';
  
  const path = imageUrl.toLowerCase();
  
  if (path.includes('/iphone/')) return 'iphone';
  if (path.includes('/samsung/')) return 'samsung';
  if (path.includes('/infinix/')) return 'infinix';
  if (path.includes('/oppo/')) return 'oppo';
  if (path.includes('/vivo/')) return 'vivo';
  if (path.includes('/xiaomi/')) return 'xiaomi';
  if (path.includes('/nokia/')) return 'nokia';
  
  return 'default';
}

/**
 * Generate optimized srcSet for a product image
 */
export function generateSrcSet(baseUrl: string): string {
  const widths = [160, 200, 240, 300, 400, 500, 600];
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Convert legacy product data to optimized format
 */
export function optimizeProductImages(products: any[]): any[] {
  return products.map(product => {
    const imageUrl = product.imageUrl || product.image;
    if (!imageUrl) return product;
    
    const config = getImageConfig(imageUrl, 'card');
    
    return {
      ...product,
      images: [
        {
          src: imageUrl.startsWith('/') ? imageUrl : `/${imageUrl.replace(/^\.\.\//, '')}`,
          alt: product.name_en || product.name_id || product.title || 'Product Image',
          width: config.width,
          height: config.height,
          priority: config.priority,
        }
      ],
      // Keep legacy imageUrl for backward compatibility
      imageUrl: imageUrl.startsWith('/') ? imageUrl : `/${imageUrl.replace(/^\.\.\//, '')}`,
    };
  });
}

/**
 * Preload critical images (above the fold)
 */
export function preloadCriticalImages(images: string[], count: number = 3) {
  if (typeof window === 'undefined') return;
  
  images.slice(0, count).forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Generate blur placeholder for an image
 */
export function generateBlurPlaceholder(brand: string): string {
  const brandColors = {
    iphone: '#007AFF', // Apple blue
    samsung: '#1428A0', // Samsung blue
    infinix: '#00D4FF', // Infinix cyan
    oppo: '#1BA345', // Oppo green
    vivo: '#4285F4', // Vivo blue
    xiaomi: '#FF6900', // Xiaomi orange
    nokia: '#124191', // Nokia blue
    default: '#6B7280', // Gray
  };
  
  const color = brandColors[brand] || brandColors.default;
  
  // Generate a simple SVG blur placeholder
  const svg = `
    <svg width="300" height="190" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
