'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './useLanguage';
import { getTranslations } from '../../dictionaries';
import { getProducts } from '../../lib/api';
import { mapLegacyToProduct } from '../../lib/format';
import { toLegacyProduct } from '../../lib/api';

const EASE = [0.16, 1, 0.3, 1];

const BRAND_DESCRIPTIONS = {
  samsung: 'Samsung is a global leader in consumer electronics. Our Samsung-compatible batteries are tested for full compatibility with the original BMS and charger.',
  infinix: 'Infinix smartphones demand high-capacity, efficient batteries. Each SumoPower Infinix battery is cell-matched to the original specification.',
  xiaomi: 'Xiaomi devices are engineered for performance. SumoPower Xiaomi batteries maintain that standard with safe chemistry and accurate capacity ratings.',
  vivo: 'Vivo focuses on photography and battery life. Our replacement cells match the original runtime expectations of each Vivo model.',
  oppo: 'Oppo\'s VOOC fast-charge ecosystem requires precise cell chemistry. SumoPower Oppo batteries are compatible with the original fast-charge circuit.',
  iphone: 'Apple\'s tight integration demands precision. SumoPower iPhone batteries use cells that meet Apple\'s capacity and safety thresholds.',
  asus: 'Asus ROG and Zenfone devices prioritize both gaming performance and battery endurance. Our Asus batteries deliver on both.',
  nokia: 'Nokia\'s reputation for durability extends to our replacement batteries — built to last with consistent charge cycles.',
  charger: 'SumoPower chargers and power savers are designed to protect your device\'s battery from overcharging, overheating, and voltage spikes.',
};

const CATEGORY_LABELS = {
  charger: 'Charger / Saver', asus: 'Asus', infinix: 'Infinix',
  samsung: 'Samsung', xiaomi: 'Xiaomi', vivo: 'Vivo',
  oppo: 'Oppo', iphone: 'iPhone', nokia: 'Nokia',
};

function RelatedProductCard({ product, lang }) {
  const legacy = toLegacyProduct(product);
  const mapped = mapLegacyToProduct(legacy);
  const nameKey = lang === 'id' ? 'name_id' : 'name_en';
  const img = mapped.images?.[0];

  return (
    <a
      href={`/pages/products/${product.slug}`}
      className="group flex-none w-44 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300"
    >
      <div className="bg-gray-50 aspect-square relative overflow-hidden">
        {img && (
          <Image
            src={img.src}
            alt={img.alt || product.nameEn}
            fill
            className="object-contain p-3"
            sizes="176px"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold line-clamp-2 text-gray-800 group-hover:text-amber-700 transition-colors leading-snug">
          {product[nameKey] || product.nameEn}
        </p>
      </div>
    </a>
  );
}

export default function ProductDetailClient({ product }) {
  const lang = useLanguage('en');
  const t = getTranslations(lang);
  const reduced = useReducedMotion();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('desc');
  const [related, setRelated] = useState([]);
  const tabIndicatorRef = useRef(null);
  const tabsRef = useRef([]);

  const legacy = toLegacyProduct(product);
  const mapped = mapLegacyToProduct(legacy);
  const images = mapped.images ?? [];
  const nameKey = lang === 'id' ? 'name_id' : 'name_en';
  const descKey = lang === 'id' ? 'descId' : 'descEn';
  const brand = product.brand ?? '';
  const brandLabel = CATEGORY_LABELS[brand] ?? brand;

  // Fetch related products
  useEffect(() => {
    if (!brand) return;
    getProducts({ brand, limit: 8 }).then((data) => {
      setRelated(data.filter((p) => p.id !== product.id).slice(0, 6));
    }).catch(() => {});
  }, [brand, product.id]);

  const tabs = [
    { id: 'desc', label: t['product.detail.tab.desc'] },
    { id: 'brand', label: t['product.detail.tab.brand'] },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-14 min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <a href="/" className="hover:text-gray-600 transition-colors">Home</a>
            <i className="fas fa-chevron-right text-[8px]"></i>
            <a href="/pages/products" className="hover:text-gray-600 transition-colors">{t['nav.products']}</a>
            <i className="fas fa-chevron-right text-[8px]"></i>
            <span className="text-gray-700 truncate max-w-xs">{product[nameKey] || product.nameEn}</span>
          </nav>
        </div>

        {/* Product split layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* LEFT: Gallery */}
            <div className="w-full lg:w-[52%] lg:sticky lg:top-20 lg:self-start">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* Main image */}
                <div className="bg-gray-50 rounded-3xl overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="w-full h-full relative"
                    >
                      {images[activeImg] && (
                        <Image
                          src={images[activeImg].src}
                          alt={images[activeImg].alt || product.nameEn}
                          fill
                          className="object-contain p-8"
                          sizes="(max-width: 1024px) 95vw, 50vw"
                          priority
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Thumbnail strip (vertical on desktop, horizontal on mobile) */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 ${
                          i === activeImg
                            ? 'border-amber-500 shadow-md shadow-amber-200'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt || ''}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-1.5"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* RIGHT: Product info */}
            <div className="w-full lg:w-[48%]">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 block mb-2">
                  {brandLabel}
                </span>

                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ink leading-tight mb-5">
                  {product[nameKey] || product.nameEn}
                </h1>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['6–12 mo warranty', 'Tested capacity', 'Safe chemistry'].map((badge) => (
                    <span key={badge} className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {product.externalUrl && (
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-amber-300/40 mb-8"
                  >
                    <img src="/assets/images/shopeelogo.png" alt="Shopee" className="h-4 w-auto brightness-0 invert" />
                    {t['product.detail.shopee']}
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                )}

                {/* Tabs */}
                <div className="border-b border-gray-100 mb-6 relative">
                  <div className="flex gap-1" role="tablist">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.id}
                        ref={(el) => { tabsRef.current[i] = el; }}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                          activeTab === tab.id ? 'text-amber-600' : 'text-gray-400 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="tabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                            transition={{ duration: 0.25, ease: EASE }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {activeTab === 'desc' && (
                      <div className="text-sm text-ink-3 leading-relaxed space-y-3">
                        {product[descKey] ? (
                          <p>{product[descKey]}</p>
                        ) : (
                          <>
                            <p>High-quality replacement battery engineered to match the original specifications of your device.</p>
                            <ul className="space-y-2 mt-4">
                              {['Honest rated capacity — no inflated numbers', 'Safe chemistry with thermal protection', 'Consistent performance across full charge cycles', '6–12 month warranty from date of purchase'].map((point) => (
                                <li key={point} className="flex items-start gap-2.5">
                                  <i className="fas fa-check text-amber-500 text-xs mt-1 shrink-0"></i>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                    {activeTab === 'brand' && (
                      <div className="text-sm text-ink-3 leading-relaxed">
                        <p>{BRAND_DESCRIPTIONS[brand] || `SumoPower ${brandLabel} batteries are tested for compatibility and safe chemistry.`}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related products rail */}
        {related.length > 0 && (
          <section className="bg-surface-2 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-bold text-ink mb-6">{t['product.detail.related']}</h2>
              <div
                className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {related.map((p) => (
                  <RelatedProductCard key={p.id} product={p} lang={lang} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

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
