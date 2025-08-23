'use client';

import { useState, useEffect, useRef } from 'react';
import productsStatic from '../../data/products.static';

const translations = {
  id: {
    "featured.title": "Produk Unggulan",
    "featured.seeAll": "Lihat Semua Produk",
    "category.charger": "CHARGER MOBIL / SAVER",
    "category.asus": "BATERAI ASUS",
    "category.infinix": "BATERAI INFINIX",
    "category.samsung": "BATERAI SAMSUNG",
    "category.xiaomi": "BATERAI XIAOMI",
    "category.vivo": "BATERAI VIVO",
    "category.oppo": "BATERAI OPPO",
    "category.iphone": "BATERAI IPHONE",
    "category.nokia": "BATERAI NOKIA",
  },
  en: {
    "featured.title": "Featured Products",
    "featured.seeAll": "View All Products",
    "category.charger": "CAR CHARGER / SAVER",
    "category.asus": "ASUS BATTERY",
    "category.infinix": "INFINIX BATTERY",
    "category.samsung": "SAMSUNG BATTERY",
    "category.xiaomi": "XIAOMI BATTERY",
    "category.vivo": "VIVO BATTERY",
    "category.oppo": "OPPO BATTERY",
    "category.iphone": "IPHONE BATTERY",
    "category.nokia": "NOKIA BATTERY",
  }
};

export default function FeaturedProducts({ lang = 'en' }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    // Create featured products with diverse brands
    const validProducts = productsStatic.filter(p => p.imageUrl && String(p.imageUrl).trim() !== '');
    
    // Group by brand/category
    const groups = validProducts.reduce((acc, p) => {
      const key = p.category_key;
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
      return acc;
    }, {});
    
    Object.values(groups).forEach(list => list.sort((a, b) => a.id - b.id));
    
    // Preferred brand order for diversity
    const preference = [
      'category.infinix',
      'category.samsung', 
      'category.xiaomi',
      'category.vivo',
      'category.oppo',
      'category.iphone',
      'category.asus',
      'category.nokia',
      'category.charger'
    ];
    
    const availableCategories = Object.keys(groups);
    const orderedCategories = [
      ...preference.filter(c => availableCategories.includes(c)),
      ...availableCategories.filter(c => !preference.includes(c))
    ];
    
    // Round-robin pick to avoid adjacent same brand
    const targetCount = 18; // More products for infinite scroll
    const picked = [];
    let idxRound = 0;
    
    while (picked.length < targetCount && orderedCategories.length > 0) {
      let placedInThisCycle = false;
      for (let step = 0; step < orderedCategories.length; step++) {
        const cat = orderedCategories[(idxRound + step) % orderedCategories.length];
        const list = groups[cat];
        if (!list || list.length === 0) continue;
        if (picked.length > 0 && picked[picked.length - 1].category_key === cat) {
          continue; // avoid adjacent duplicate brand
        }
        picked.push(list.shift());
        placedInThisCycle = true;
        idxRound = (idxRound + step + 1) % Math.max(1, orderedCategories.length);
        break;
      }
      // prune empty categories
      for (let i = orderedCategories.length - 1; i >= 0; i--) {
        const c = orderedCategories[i];
        if (!groups[c] || groups[c].length === 0) orderedCategories.splice(i, 1);
      }
      if (!placedInThisCycle) break;
    }
    
    // Duplicate products for seamless loop
    const finalProducts = picked.length ? picked : validProducts.slice(0, 18);
    setFeaturedProducts([...finalProducts, ...finalProducts]);
  }, []);
  
  const nameKey = lang === 'id' ? 'name_id' : 'name_en';
  
  return (
    <section id="featured-products" className="products-section scroll-mt-20 animate-on-scroll">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title animate-fade-in-up relative inline-block">
            <span className="relative z-10">{translations[lang]["featured.title"]}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20 blur-xl"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to primary-hover mx-auto mt-4 rounded-full animate-scale-in animation-delay-200"></div>
        </div>
        
                 <div className="featured-carousel-container">
           <div className="carousel-viewport-infinite">
             <div className="carousel-track-infinite animate">
               {featuredProducts.map((product, index) => (
                 <div key={`${product.id}-${index}`} className="product-card-infinite hoverable">
                   <div className="product-image">
                     <img 
                       src={product.imageUrl} 
                       alt={product[nameKey]} 
                       loading="lazy" 
                       onError={(e) => { 
                         e.currentTarget.onerror = null; 
                         e.currentTarget.src = 'https://placehold.co/300x300/CCCCCC/FFFFFF?text=Image+Not+Found'; 
                       }} 
                     />
                   </div>
                   <span className="product-category">{translations[lang][product.category_key]}</span>
                   <h3 className="product-title">{product[nameKey]}</h3>
                 </div>
               ))}
             </div>
           </div>
         </div>
        
        <div className="see-more-container text-center animate-slide-in-bottom animation-delay-500">
          <a href="/pages/products" className="btn btn-primary btn-professional focus-ring inline-flex items-center gap-3 group">
            <span>{translations[lang]["featured.seeAll"]}</span>
            <i className="fas fa-external-link-alt transform group-hover:scale-110 transition-transform duration-300"></i>
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .featured-carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0 -40px;
          padding: 20px 0;
        }
        

        
        .carousel-viewport-infinite {
          flex: 1;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
          padding: 20px 0;
        }
        
        .carousel-track-infinite {
          display: flex;
          gap: 24px;
          width: max-content;
          will-change: transform;
        }
        
                 .carousel-track-infinite.animate {
           animation: infiniteScroll 25s linear infinite;
           animation-play-state: running;
         }
        
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .product-card-infinite {
          flex: 0 0 300px;
          width: 300px;
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          will-change: transform, opacity;
        }
        
                 @media (hover: hover) and (pointer: fine) {
           .product-card-infinite.hoverable:hover {
             transform: translateY(-3px) scale(1.01);
             box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
             border-color: var(--primary-color, #f59e0b);
           }
         }
        
                 @media (prefers-reduced-motion: reduce) {
           .carousel-track-infinite.animate {
             animation: none;
             transform: translateX(0);
           }
           .product-card-infinite.hoverable:hover {
             transform: none;
           }
         }
        
        .product-card-infinite .product-image {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        
        .product-card-infinite .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .product-card-infinite:hover .product-image img {
          transform: scale(1.05);
        }
        
        .product-card-infinite .product-category {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--primary-color, #f59e0b);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        
        .product-card-infinite .product-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        

      `}</style>
    </section>
  );
}
