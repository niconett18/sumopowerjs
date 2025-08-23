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
    <div className={`lang-switcher ${language === 'en' ? 'lang-en' : 'lang-id'}`} role="group" aria-label="Language selector">
      <span aria-hidden className="lang-thumb" />
      <button
        type="button"
        className="lang-seg"
        data-lang="id"
        aria-pressed={language === 'id'}
        onClick={() => updateLanguage('id')}
      >
        ID
      </button>
      <button
        type="button"
        className="lang-seg"
        data-lang="en"
        aria-pressed={language === 'en'}
        onClick={() => updateLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}


