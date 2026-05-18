'use client';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import PageTransition from '../../components/PageTransition';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en';
    document.documentElement.lang = saved;
    const onStorage = (e) => {
      if (e.key === 'language' && e.newValue) {
        document.documentElement.lang = e.newValue;
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
