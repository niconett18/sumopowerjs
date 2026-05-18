'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './useLanguage';
import { getTranslations } from '../../dictionaries';
import ValuePillars from '../../components/about/ValuePillars';
import QualityAssurance from '../../components/about/QualityAssurance';
import ServiceWarranty from '../../components/about/ServiceWarranty';
import FAQ from '../../components/about/FAQ';
import ContactCTA from '../../components/about/ContactCTA';

const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TIMELINE = [
  { year: '2023', event: 'SumoPower founded in North Jakarta with a focus on honest-rated batteries.' },
  { year: '2024', event: 'Expanded catalog to 400+ SKUs across 9 brands.' },
  { year: '2024', event: 'Launched Shopee storefront; reached thousands of customers nationwide.' },
  { year: '2025', event: 'Introduced 12-month warranty program and online product catalog.' },
];

const STATS = [
  { value: '400+', label: 'Active SKUs' },
  { value: '< 0.5%', label: 'Defect rate' },
  { value: '9', label: 'Brands supported' },
  { value: '12 mo', label: 'Warranty' },
];

export default function AboutClient() {
  const lang = useLanguage('en');
  const t = getTranslations(lang);
  const reduced = useReducedMotion();

  return (
    <>
      <Navbar />

      {/* ── EDITORIAL HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        {/* Amber blob accent */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFC107 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 block mb-5">
              {t['about.title']}
            </span>
          </Reveal>

          {/* Large clip-path headline */}
          <div className="mb-8">
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={reduced ? { opacity: 0 } : { y: '105%' }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="font-black leading-none tracking-tight text-ink"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
              >
                {t['about.headline']}
              </motion.h1>
            </div>
          </div>

          <Reveal delay={0.25}>
            <p className="text-lg md:text-xl text-ink-3 leading-relaxed max-w-2xl mb-10">
              {t['about.subcopy']}
            </p>
          </Reveal>

          {/* Stat row */}
          <Reveal delay={0.35}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="relative bg-surface-2 rounded-2xl p-5 border border-gray-100"
                >
                  <div
                    className="absolute top-0 left-5 h-1 w-10 rounded-b-full bg-amber-400"
                  />
                  <div className="text-2xl md:text-3xl font-black text-ink mt-2">{s.value}</div>
                  <div className="text-xs text-ink-3 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PULL-QUOTE ──────────────────────────────────── */}
      <section className="py-20 bg-ink overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <blockquote>
              <p
                className="text-2xl md:text-4xl leading-relaxed text-white italic"
                style={{ fontFamily: 'var(--font-fraunces)' }}
              >
                {t['about.pullquote']}
              </p>
              <footer className="mt-6 text-amber-400 text-sm font-semibold tracking-wide">
                — SumoPower
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── COMPANY STORY ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 block mb-4">
                {t['about.story.title']}
              </span>
              <p className="text-base md:text-lg text-ink-3 leading-relaxed mb-5">
                {t['about.text']}
              </p>
              <p className="text-sm text-ink-3 leading-relaxed">
                {t['about.mission']}
              </p>
            </Reveal>
            {/* Decorative column of brand logos */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  '/assets/images/brandswesupport/infinixlogo.png',
                  '/assets/images/samsunglogo.png',
                  '/assets/images/xiaomilogo.png',
                  '/assets/images/vivologo.png',
                  '/assets/images/oppologo.png',
                  '/assets/images/applelogo.png',
                ].map((logo, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-2 rounded-2xl flex items-center justify-center p-4 border border-gray-100"
                  >
                    <img src={logo} alt="" className="max-h-8 max-w-full object-contain opacity-60" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────── */}
      <section className="py-20 bg-surface-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-black text-ink mb-10">{t['about.timeline.title']}</h2>
          </Reveal>
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="snap-start flex-none w-64 md:w-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 relative">
                  <div className="absolute top-0 left-6 h-1 w-8 bg-amber-400 rounded-b-full" />
                  <span className="text-xs font-bold text-amber-500 tracking-widest block mb-3 mt-2">{item.year}</span>
                  <p className="text-sm text-ink-3 leading-relaxed">{item.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXISTING SECTIONS ───────────────────────────── */}
      <ValuePillars />
      <QualityAssurance />
      <ServiceWarranty />
      <FAQ />
      <ContactCTA />

      <Footer />

      <a
        href="https://wa.me/6288976772696"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="whatsapp-text">{t['whatsapp.text']}</span>
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
