/**
 * Enhanced products data loader with image optimization
 */

import { optimizeProductImages } from '../lib/imageOptimization';

// Client-side utility to read the legacy `allProducts` array injected by
// /public/assets/js/products.js and normalize its image paths to root-relative
// `/assets/...` so they work in Next.js with optimizations.

const normalizePath = (path) => {
  if (typeof path !== 'string' || !path) return path;
  // remove any leading ../ segments
  const stripped = path.replace(/^(\.\.\/)+/, '');
  if (stripped.startsWith('/assets/')) return stripped;
  if (stripped.startsWith('assets/')) return `/${stripped}`;
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

export const normalizeProducts = (list) => {
  if (!Array.isArray(list)) return [];
  
  // First normalize paths
  const normalizedProducts = list.map((p) => ({
    ...p,
    imageUrl: normalizePath(p.imageUrl),
  }));
  
  // Then optimize for Next.js Image component
  return optimizeProductImages(normalizedProducts);
};

export const getProductsFromWindow = () => {
  if (typeof window === 'undefined') return [];
  const list = window.allProducts || [];
  return normalizeProducts(list);
};

/**
 * Get featured products with optimized images
 */
export const getFeaturedProducts = (count = 12) => {
  const products = getProductsFromWindow();
  
  // Get a mix of popular products from different categories
  const categories = ['category.charger', 'category.iphone', 'category.samsung', 'category.infinix'];
  const featuredProducts = [];
  
  categories.forEach(category => {
    const categoryProducts = products.filter(p => p.category_key === category);
    if (categoryProducts.length > 0) {
      // Take 3 products from each category
      featuredProducts.push(...categoryProducts.slice(0, 3));
    }
  });
  
  // If we don't have enough, fill with random products
  if (featuredProducts.length < count) {
    const remaining = products.filter(p => !featuredProducts.find(f => f.id === p.id));
    featuredProducts.push(...remaining.slice(0, count - featuredProducts.length));
  }
  
  return featuredProducts.slice(0, count);
};

/**
 * Get products by category with optimized images
 */
export const getProductsByCategory = (categoryKey) => {
  const products = getProductsFromWindow();
  return products.filter(p => p.category_key === categoryKey);
};

/**
 * Search products with optimized images
 */
export const searchProducts = (query, category = null) => {
  const products = getProductsFromWindow();
  let filtered = products;
  
  if (category) {
    filtered = filtered.filter(p => p.category_key === category);
  }
  
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(p => 
      (p.name_en && p.name_en.toLowerCase().includes(searchTerm)) ||
      (p.name_id && p.name_id.toLowerCase().includes(searchTerm)) ||
      (p.title && p.title.toLowerCase().includes(searchTerm))
    );
  }
  
  return filtered;
};

export default getProductsFromWindow;
