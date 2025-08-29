'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

export default function ProductCard({ product, onMore, lang = 'en' }) {
  const nameKey = lang === 'id' ? 'name_id' : 'name_en';
  const name = useMemo(() => product?.[nameKey] || product?.name_en || product?.name_id || '', [product, nameKey]);
  const imageUrl = product?.imageUrl || '';
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {imageUrl && !imageError ? (
          <Image 
            src={imageUrl} 
            alt={name} 
            width={300}
            height={190}
            loading="lazy" 
            quality={85}
            className="w-full h-full object-contain"
            style={{cursor: 'zoom-in'}} 
            onError={handleImageError}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 992px) 240px, 300px"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">
            <div className="text-center">
              <i className="fas fa-image text-4xl mb-2"></i>
              <p className="text-sm">Image not found</p>
            </div>
          </div>
        )}
      </div>
      <span className="product-category">&nbsp;</span>
      <h3 className="product-title">{name}</h3>
      <button className="title-toggle" aria-label="Toggle full title" onClick={() => onMore(product)}>
        {lang === 'id' ? 'Selengkapnya' : 'View more'}
      </button>
      <a href={product?.shopeeUrl} target="_blank" className="shopee-link" rel="noreferrer">
        <div className="shopee-brand">
          <Image 
            src="/assets/images/shopeelogo.png" 
            alt="Shopee" 
            width={20}
            height={16}
            className="shopee-logo" 
          />
          <span className="shopee-text">Shopee</span>
        </div>
      </a>
    </div>
  );
}

