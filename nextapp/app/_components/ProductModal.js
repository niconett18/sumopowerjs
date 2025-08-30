'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENABLE_ANIMATIONS, modalVariants } from '../../lib/anim';

export default function ProductModal({ isOpen, onClose, product, lang = 'en' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to get all images for a product
  const getProductImages = (product) => {
    if (!product) return [];
    
    const images = [];
    
    // Add main product image
    if (product.imageUrl) {
      images.push({
        src: product.imageUrl,
        alt: product.name_en || product.name_id,
        type: 'product'
      });
    }
    
    // Add box image for Samsung products
    if (product.category_key === 'category.samsung' && product.imageUrl) {
      // Extract filename from imageUrl (e.g., "../assets/images/samsung/A217.png" -> "A217.png")
      const filename = product.imageUrl.split('/').pop();
      if (filename) {
        // Replace '/samsung/' with '/samsung box/' in the path
        const boxImageUrl = product.imageUrl.replace('/samsung/', '/samsung box/');
        
        images.push({
          src: boxImageUrl,
          alt: `${product.name_en || product.name_id} - Box`,
          type: 'box'
        });
      }
    }
    
    return images;
  };

  const images = getProductImages(product);
  const currentImage = images[currentImageIndex] || images[0];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { 
      if (e.key === 'Escape') onClose(); 
      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    };
    document.addEventListener('keydown', onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, currentImageIndex, images.length]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  if (!ENABLE_ANIMATIONS) {
    if (!isOpen || !product) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative bg-white rounded-2xl w-[88%] max-w-[460px] sm:max-w-2xl mx-auto p-4 sm:p-6 z-10 max-h-[80vh] overflow-y-auto m-4 sm:m-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="product-image w-full sm:w-[280px] shrink-0">
              {/* Main Image Display */}
              <div className="relative">
                <img 
                  src={currentImage?.src || product.imageUrl} 
                  alt={currentImage?.alt || product.name_en || product.name_id} 
                  className="mx-auto max-h-[180px] sm:max-h-[190px] object-contain w-full" 
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                      disabled={currentImageIndex === 0}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Previous image"
                    >
                      <i className="fas fa-chevron-left text-sm"></i>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                      disabled={currentImageIndex === images.length - 1}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Next image"
                    >
                      <i className="fas fa-chevron-right text-sm"></i>
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 justify-center">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-label={`View ${img.type} image`}
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Image Type Indicator */}
              {images.length > 1 && currentImage && (
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-500 capitalize">
                    {currentImage.type === 'product' ? (lang === 'id' ? 'Produk' : 'Product') : 
                     currentImage.type === 'box' ? (lang === 'id' ? 'Kemasan' : 'Package') : 
                     currentImage.type}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="product-title" style={{marginBottom: 10}}>{(lang === 'id' ? product.name_id : product.name_en) || product.name_en || product.name_id}</h3>
              {product.description && (
                <p className="text-gray-600" style={{lineHeight: 1.6}}>{product.description}</p>
              )}
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {lang === 'id' ? 'Gambar' : 'Image'} {currentImageIndex + 1} {lang === 'id' ? 'dari' : 'of'} {images.length}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 text-right">
            <button className="btn btn-secondary btn-professional focus-ring inline-flex items-center gap-2" onClick={onClose}>
              <span>{lang === 'id' ? 'Tutup' : 'Close'}</span>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
          <motion.div
            className="absolute inset-0 bg-black/60"
            variants={modalVariants.backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="relative bg-white rounded-2xl w-[88%] max-w-[460px] sm:max-w-2xl mx-auto p-4 sm:p-6 z-10 max-h-[80vh] overflow-y-auto m-4 sm:m-6"
            variants={modalVariants.modal}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="product-image w-full sm:w-[280px] shrink-0">
                {/* Main Image Display */}
                <div className="relative">
                  <img 
                    src={currentImage?.src || product.imageUrl} 
                    alt={currentImage?.alt || product.name_en || product.name_id} 
                    className="mx-auto max-h-[180px] sm:max-h-[190px] object-contain w-full" 
                  />
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                        disabled={currentImageIndex === 0}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                        aria-label="Previous image"
                      >
                        <i className="fas fa-chevron-left text-sm"></i>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                        disabled={currentImageIndex === images.length - 1}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                        aria-label="Next image"
                      >
                        <i className="fas fa-chevron-right text-sm"></i>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-3 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        aria-label={`View ${img.type} image`}
                      >
                        <img 
                          src={img.src} 
                          alt={img.alt} 
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Image Type Indicator */}
                {images.length > 1 && currentImage && (
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-500 capitalize">
                      {currentImage.type === 'product' ? (lang === 'id' ? 'Produk' : 'Product') : 
                       currentImage.type === 'box' ? (lang === 'id' ? 'Kemasan' : 'Package') : 
                       currentImage.type}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="product-title" style={{marginBottom: 10}}>{(lang === 'id' ? product.name_id : product.name_en) || product.name_en || product.name_id}</h3>
                {product.description && (
                  <p className="text-gray-600" style={{lineHeight: 1.6}}>{product.description}</p>
                )}
                
                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {lang === 'id' ? 'Gambar' : 'Image'} {currentImageIndex + 1} {lang === 'id' ? 'dari' : 'of'} {images.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 text-right">
              <button className="btn btn-secondary btn-professional focus-ring inline-flex items-center gap-2" onClick={onClose}>
                <span>{lang === 'id' ? 'Tutup' : 'Close'}</span>
                <i className="fas fa-times" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

