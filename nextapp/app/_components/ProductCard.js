'use client';

import { useMemo } from 'react';

export default function ProductCard({ product, onMore, lang = 'en' }) {
  const nameKey = lang === 'id' ? 'name_id' : 'name_en';
  const name = useMemo(() => product?.[nameKey] || product?.name_en || product?.name_id || '', [product, nameKey]);
  const imageUrl = product?.imageUrl || '';
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={name} loading="lazy" style={{cursor: 'zoom-in'}} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/300x300/CCCCCC/FFFFFF?text=Image+Not+Found'; }} />
      </div>
      <span className="product-category">&nbsp;</span>
      <h3 className="product-title">{name}</h3>
      <button className="title-toggle" aria-label="Toggle full title" onClick={() => onMore(product)}>
        {lang === 'id' ? 'Selengkapnya' : 'View more'}
      </button>
      <a href={product?.shopeeUrl} target="_blank" className="shopee-link" rel="noreferrer">
        <div className="shopee-brand">
          <img src="/assets/images/shopeelogo.png" alt="Shopee" className="shopee-logo" />
          <span className="shopee-text">Shopee</span>
        </div>
      </a>
    </div>
  );
}

