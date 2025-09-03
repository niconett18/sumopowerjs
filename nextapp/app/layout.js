'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageTransition from '../components/PageTransition';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('language') || 'en') : 'en';
    setLang(saved);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = saved;
    }
    const onStorage = (e) => {
      if (e.key === 'language' && e.newValue) setLang(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <title>SumoPower - Power up like a SUMO</title>
        <meta name="description" content="Rasakan energi yang tahan lama dan andal dengan baterai SumoPower." />
      </head>
      <body>
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </body>
    </html>
  );
}

