'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENABLE_ANIMATIONS, modalVariants } from '../../lib/anim';

export default function ProductModal({ isOpen, onClose, product, lang = 'en' }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!ENABLE_ANIMATIONS) {
    if (!isOpen || !product) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative bg-white rounded-2xl w-[88%] max-w-[460px] sm:max-w-2xl mx-auto p-4 sm:p-6 z-10 max-h-[80vh] overflow-y-auto m-4 sm:m-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="product-image w-full sm:w-[220px] shrink-0">
              <img src={product.imageUrl} alt={product.name_en || product.name_id} className="mx-auto max-h-[180px] sm:max-h-[190px] object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="product-title" style={{marginBottom: 10}}>{(lang === 'id' ? product.name_id : product.name_en) || product.name_en || product.name_id}</h3>
              {product.description && (
                <p className="text-gray-600" style={{lineHeight: 1.6}}>{product.description}</p>
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
              <div className="product-image w-full sm:w-[220px] shrink-0">
                <img src={product.imageUrl} alt={product.name_en || product.name_id} className="mx-auto max-h-[180px] sm:max-h-[190px] object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="product-title" style={{marginBottom: 10}}>{(lang === 'id' ? product.name_id : product.name_en) || product.name_en || product.name_id}</h3>
                {product.description && (
                  <p className="text-gray-600" style={{lineHeight: 1.6}}>{product.description}</p>
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

