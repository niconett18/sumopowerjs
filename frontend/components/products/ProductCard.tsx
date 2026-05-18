'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductModal } from './ProductModal';
import { Product } from '../../types/product';
import { appleEase } from '../../lib/anim';
import { formatIDR } from '../../lib/format';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const title = product.nameId || product.model;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setModalOpen(true)}
        whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transition: { duration: 0.22, ease: appleEase } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        className="h-full w-full flex flex-col bg-surface border border-hairline rounded-[4px] overflow-hidden text-left hover:border-ink transition-colors"
      >
        <div className="aspect-square bg-paper-2 relative overflow-hidden shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={title}
              className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-ink-mute text-xs">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-2.5 min-h-[80px] border-t border-hairline">
          <h3 className="text-[11px] leading-[1.35] text-ink line-clamp-3 font-normal mb-1">
            {title}
          </h3>
          {product.price > 0 && (
            <p className="text-[11px] font-semibold text-ink mt-auto">
              {formatIDR(product.price)}
            </p>
          )}
        </div>
      </motion.button>

      {modalOpen && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

