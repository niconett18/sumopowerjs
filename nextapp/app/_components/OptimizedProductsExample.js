'use client';

import React, { useState, useEffect } from 'react';
import { getFeaturedProducts, searchProducts } from '../../data/products.optimized';
import OptimizedProductImage from '../../components/product/OptimizedProductImage';
import { getImageConfig, preloadCriticalImages } from '../../lib/imageOptimization';

/**
 * Example page demonstrating optimized image usage
 * This shows how to integrate the image optimization system
 * into your product pages
 */
export default function OptimizedProductsExample() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load featured products
    const featured = getFeaturedProducts(12);
    setFeaturedProducts(featured);
    
    // Preload critical images (first 3 products)
    const criticalImages = featured.slice(0, 3).map(p => p.imageUrl);
    preloadCriticalImages(criticalImages, 3);
    
    setLoading(false);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const ProductCard = ({ product, isPriority = false }) => {
    const config = getImageConfig(product.imageUrl, 'card');
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-w-4 aspect-h-3 bg-gray-50">
          <OptimizedProductImage
            src={product.imageUrl}
            alt={product.name_en || product.name_id || 'Product'}
            width={config.width}
            height={config.height}
            priority={isPriority}
            quality={config.quality}
            sizes={config.sizes}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name_en || product.name_id}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {product.category_key?.replace('category.', '').toUpperCase()}
          </p>
          {product.shopeeUrl && (
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              <OptimizedProductImage
                src="/assets/images/shopeelogo.png"
                alt="Shopee"
                width={20}
                height={16}
                className="filter brightness-0 invert"
              />
              <span>Buy on Shopee</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading optimized images...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Optimized Product Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience lightning-fast image loading with Next.js Image optimization.
            Images are automatically converted to WebP/AVIF, resized for your device,
            and loaded with smart caching.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.slice(0, 8).map((product, index) => (
                <ProductCard 
                  key={product.id || index} 
                  product={product}
                  isPriority={index < 2} // Prioritize first 2 search results
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id || index} 
                product={product}
                isPriority={index < 3} // Prioritize first 3 featured products
              />
            ))}
          </div>
        </div>

        {/* Performance Info */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 Performance Features Active
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>✅ Automatic WebP/AVIF conversion for modern browsers</li>
            <li>✅ Responsive images served based on device size</li>
            <li>✅ Lazy loading for images below the fold</li>
            <li>✅ Priority loading for above-the-fold content</li>
            <li>✅ Smart caching with 60-second TTL</li>
            <li>✅ Brand-specific quality optimization</li>
            <li>✅ Graceful error handling with fallbacks</li>
          </ul>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <details>
            <summary className="font-semibold text-gray-700 cursor-pointer">
              🔧 Debug Information
            </summary>
            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p><strong>Featured Products Loaded:</strong> {featuredProducts.length}</p>
              <p><strong>Search Results:</strong> {searchResults.length}</p>
              <p><strong>Image Format:</strong> {typeof window !== 'undefined' && window.navigator.userAgent.includes('Chrome') ? 'WebP/AVIF' : 'JPEG/PNG'}</p>
              <p><strong>Device Type:</strong> {typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop'}</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
