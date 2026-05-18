'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HERO_PRODUCTS = [
  {
    id: 'samsung-a217',
    label: 'A217',
    sub: 'Samsung Galaxy A21s',
    code: 'SP-A217',
    image: '/assets/images/samsung/A217.png',
  },
  {
    id: 'iphone-11pro',
    label: '11 PRO',
    sub: 'iPhone 11 Pro',
    code: 'SP-11PRO',
    image: '/assets/images/iphone box/11 PRO.png',
  },
  {
    id: 'xiaomi-bm32',
    label: 'BM32',
    sub: 'Xiaomi Mi 4',
    code: 'SP-BM32',
    image: '/assets/images/xiaomi/BM32.png',
  },
];

export function HeroGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = HERO_PRODUCTS[currentIndex];

  return (
    <div className="rounded-[16px] border border-hairline bg-surface shadow-soft overflow-hidden aspect-[4/5] w-full max-w-[600px] flex flex-col">
      <div className="flex-1 bg-paper-2 relative overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.sub}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </AnimatePresence>
      </div>

      <div className="px-5 py-4 border-t border-hairline flex justify-between items-center text-xs bg-surface shrink-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-ink-3 truncate pr-3"
          >
            {current.code} / {current.sub}
          </motion.span>
        </AnimatePresence>
        <span className="flex items-center gap-1.5 bg-success/10 text-success px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-success block" />
          Tersedia
        </span>
      </div>
    </div>
  );
}
