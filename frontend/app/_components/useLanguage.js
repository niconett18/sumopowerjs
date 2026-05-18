'use client';

import { useEffect, useState } from 'react';

export function useLanguage(defaultLang = 'en') {
  const [language, setLanguage] = useState(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('language') || defaultLang;
    setLanguage(saved);
    const onStorage = (e) => {
      if (e.key === 'language' && e.newValue) setLanguage(e.newValue);
    };
    const onCustom = (e) => {
      if (e?.detail?.lang) setLanguage(e.detail.lang);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('language-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('language-change', onCustom);
    };
  }, [defaultLang]);

  return language;
}


