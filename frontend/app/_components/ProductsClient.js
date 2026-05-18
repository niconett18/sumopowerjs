'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { mapLegacyToProduct } from '../../lib/format';

const CATEGORIES = [
  { key: 'category.samsung', label: 'Samsung' },
  { key: 'category.iphone', label: 'iPhone' },
  { key: 'category.xiaomi', label: 'Xiaomi' },
  { key: 'category.oppo', label: 'Oppo' },
  { key: 'category.vivo', label: 'Vivo' },
  { key: 'category.infinix', label: 'Infinix' },
  { key: 'category.asus', label: 'Asus' },
  { key: 'category.nokia', label: 'Nokia' },
  { key: 'category.charger', label: 'Charger / Saver' },
];

export default function ProductsClient({ initialProducts = [] }) {
  const searchParams = useSearchParams();
  const initCategory = searchParams?.get('category') ? `category.${searchParams.get('category')}` : null;
  
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedCount, setLoadedCount] = useState(16);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchCat = selectedCategory ? p.category_key === selectedCategory : true;
      const matchSearch = searchQuery ? (p.name_en || '').toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return matchCat && matchSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, loadedCount);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Header */}
      <header className="bg-neutral-950 text-white pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Our Catalog.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl"
          >
            Find the perfect high-capacity replacement battery for your device. Engineered for safety, endurance, and seamless fit.
          </motion.p>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-sm font-medium shadow-sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Brands</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    !selectedCategory ? 'bg-amber-400 text-neutral-900 shadow-md shadow-amber-400/20' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  All Products
                  <span className="text-xs opacity-60 bg-black/5 px-2 py-0.5 rounded-full">{initialProducts.length}</span>
                </button>
                {CATEGORIES.map(cat => {
                  const count = initialProducts.filter(p => p.category_key === cat.key).length;
                  if (count === 0) return null;
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive ? 'bg-amber-400 text-neutral-900 shadow-md shadow-amber-400/20' : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {cat.label}
                      <span className="text-xs opacity-60 bg-black/5 px-2 py-0.5 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow min-w-0">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Showing <span className="text-neutral-900 font-bold">{filteredProducts.length}</span> results
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-neutral-100 rounded-3xl p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-battery-empty text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">No products found</h2>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                We couldn't find anything matching your search criteria. Try adjusting your filters or search term.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-full transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedProducts.map((p, i) => {
                    const mapped = mapLegacyToProduct(p);
                    const imageSrc = mapped.images?.[0]?.src;
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={p.id}
                        className="group bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                        <div className="relative aspect-square bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
                          {imageSrc ? (
                            <img src={imageSrc} alt={mapped.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <i className="fas fa-image text-4xl text-neutral-200"></i>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white text-neutral-900 text-xs font-bold rounded-full shadow-sm border border-neutral-100">
                              {CATEGORIES.find(c => c.key === p.category_key)?.label || 'Battery'}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-bold text-neutral-900 leading-snug mb-4 line-clamp-2">{mapped.title}</h3>
                          <div className="mt-auto pt-4 border-t border-neutral-100">
                            {mapped.buyUrl ? (
                              <a 
                                href={mapped.buyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20"
                              >
                                <i className="fas fa-shopping-cart"></i>
                                Buy on Shopee
                              </a>
                            ) : (
                              <button disabled className="w-full py-3 bg-neutral-100 text-neutral-400 font-bold rounded-xl cursor-not-allowed">
                                Out of Stock
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {loadedCount < filteredProducts.length && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setLoadedCount(c => c + 12)}
                    className="px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-full hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
