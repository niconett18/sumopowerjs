'use client';

import { useEffect, useState, useCallback } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('language') || 'en') : 'en';
    setLanguage(saved);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = saved;
    }
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'language' && e.newValue) {
        setLanguage(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    window.dispatchEvent(new CustomEvent('language-change', { detail: { lang } }));
  }, []);

  return (
    <div 
      className="relative flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full p-1"
      role="group" 
      aria-label="Language selector"
    >
      <div 
        className="absolute w-1/2 h-[calc(100%-8px)] top-1 left-1 bg-white dark:bg-neutral-700 rounded-full shadow-sm transition-transform duration-300 ease-in-out"
        style={{ transform: language === 'en' ? 'translateX(0)' : 'translateX(100%)' }}
      />
      <button
        type="button"
        className={`relative z-10 w-9 h-6 flex items-center justify-center text-[10px] font-bold rounded-full transition-colors ${
          language === 'en' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-pressed={language === 'en'}
        onClick={() => updateLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`relative z-10 w-9 h-6 flex items-center justify-center text-[10px] font-bold rounded-full transition-colors ${
          language === 'id' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-pressed={language === 'id'}
        onClick={() => updateLanguage('id')}
      >
        ID
      </button>
    </div>
  );
}


