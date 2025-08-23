"use client";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import productsStatic from "../../../data/products.static";
import ProductQuickLook from "../../../components/product/ProductQuickLook";
import ProductCard from "../../../components/product/ProductCard";
import { mapLegacyToProduct } from "../../../lib/format";
import LanguageSwitcher from "../../_components/LanguageSwitcher";
import { useLanguage } from "../../_components/useLanguage";
import { getTranslations } from "../../../dictionaries";
export const dynamic = 'force-static';

function ProductsPageInner() {
    const [selected, setSelected] = useState(null);
    const [products, setProducts] = useState(productsStatic);
    const lang = useLanguage('en');
    const t = getTranslations(lang);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [loadedCount, setLoadedCount] = useState(8);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchInputRef = useRef(null);
    const searchParams = useSearchParams();

    // Handle URL parameters for category filtering
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            const categoryKey = `category.${category}`;
            if (productCategories.includes(categoryKey)) {
                setSelectedCategories(new Set([categoryKey]));
                setLoadedCount(8);
            }
        }
    }, [searchParams]);

    const productCategories = useMemo(
        () => [
            "category.charger",
            "category.asus",
            "category.infinix",
            "category.samsung",
            "category.xiaomi",
            "category.vivo",
            "category.oppo",
            "category.iphone",
            "category.nokia",
        ],
        []
    );

    const categoryLabels = useMemo(
        () => ({
            "category.charger": "CHARGER MOBIL / SAVER",
            "category.asus": "BATERAI ASUS",
            "category.infinix": "BATERAI INFINIX",
            "category.samsung": "BATERAI SAMSUNG",
            "category.xiaomi": "BATERAI XIAOMI",
            "category.vivo": "BATERAI VIVO",
            "category.oppo": "BATERAI OPPO",
            "category.iphone": "BATERAI IPHONE",
            "category.nokia": "BATERAI NOKIA",
        }),
        []
    );

    const categoryCounts = useMemo(() => {
        const counts = {};
        (products || []).forEach((p) => {
            counts[p.category_key] = (counts[p.category_key] || 0) + 1;
        });
        return counts;
    }, [products]);

    const CategoryList = () => (
        <>
            <h3 data-lang-key="products.categoryTitle" className="relative mb-6">
                <span className="text-lg font-bold text-gray-800">{t["products.categoryTitle"]}</span>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary rounded-full"></div>
            </h3>
            <div id="category-list" className="space-y-2">
                {productCategories.map((key) => (
                    <div className="category-item" key={key}>
                        <input
                            type="checkbox"
                            id={key}
                            value={key}
                            checked={selectedCategories.has(key)}
                            onChange={(e) => {
                                const next = new Set(selectedCategories);
                                if (e.target.checked) next.add(key); else next.delete(key);
                                setSelectedCategories(next);
                                setLoadedCount(8);
                            }}
                        />
                        <label htmlFor={key}>{categoryLabels[key]} ({categoryCounts[key] || 0})</label>
                    </div>
                ))}
            </div>
            <button
                id="reset-categories-btn"
                data-lang-key="products.reset"
                className="btn-professional focus-ring mt-6 w-full transition-all duration-300"
                onClick={() => { setSelectedCategories(new Set()); setLoadedCount(8); }}
            >
                {t["products.reset"]}
            </button>
        </>
    );

    const filteredProducts = useMemo(() => {
        let list = products || [];
        if (selectedCategories.size > 0) {
            list = list.filter((p) => selectedCategories.has(p.category_key));
        }
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            list = list.filter((p) =>
                (p.name_en || "").toLowerCase().includes(term) ||
                (p.name_id || "").toLowerCase().includes(term)
            );
        }
        return list;
    }, [products, selectedCategories, searchTerm]);
    const hasProducts = Array.isArray(filteredProducts) && filteredProducts.length > 0;
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="container">
                        <a href="/" className="navbar-brand">
                            <img src="/assets/images/logo.png" alt="SumoPower Logo" className="logo" />
                        </a>
                        <div className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
                            <a href="/" data-lang-key="nav.home" className="navbar-item interactive hover:text-primary focus-ring stagger-1 animate-nav-slide">{t["nav.home"]}</a>
                            <a href="/pages/products" data-lang-key="nav.products" className="navbar-item interactive hover:text-primary focus-ring stagger-2 animate-nav-slide">{t["nav.products"]}</a>
                            <a href="/pages/about" data-lang-key="nav.about" className="navbar-item interactive hover:text-primary focus-ring stagger-3 animate-nav-slide">{t["nav.about"]}</a>
                        </div>
                        <div className="controls-container">
                            <LanguageSwitcher />
                            <button className="navbar-toggler" aria-label="Toggle navigation" onClick={() => setIsMenuOpen((v) => !v)}>
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="page-header animate-on-scroll">
                <div className="container">
                    <div className="text-center">
                        <h1 className="section-title animate-fade-in-up relative inline-block" data-lang-key="products.title">
                            <span className="relative z-10">{t["products.title"]}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20 blur-xl"></div>
                        </h1>
                        <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-hover mx-auto mt-4 rounded-full animate-scale-in animation-delay-200"></div>
                    </div>
                </div>
            </section>

            <section id="products" className="products-section scroll-mt-20 animate-on-scroll">
                <div className="container">
                    <div className="products-layout">
                        <aside className="product-sidebar animate-fade-in-left animation-delay-200">
                            <div className="sticky top-20">
                                <CategoryList />
                            </div>
                        </aside>
                        <main className="product-main animate-fade-in-right animation-delay-400">
                            <div className="mobile-filters-row">
                                <button className="filters-toggle btn-professional focus-ring" onClick={() => setIsFiltersOpen(true)}>
                                    <i className="fas fa-filter" aria-hidden="true"></i>
                                    <span style={{marginLeft:8}}>Filters</span>
                                </button>
                            </div>
                            <div className="search-container mb-8">
                                <input
                                    type="text"
                                    id="search-input"
                                    ref={searchInputRef}
                                    placeholder={t["products.searchPlaceholder"]}
                                    data-lang-key="products.searchPlaceholder"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setLoadedCount(8); }}
                                />
                                <button id="search-btn" onClick={() => setLoadedCount(8)}><i className="fas fa-search"></i></button>
                            </div>
                            <div className="product-grid animate-fade-in-up animation-delay-600">
                                {hasProducts ? (
                                    filteredProducts.slice(0, loadedCount).map((p, index) => {
                                        const mapped = mapLegacyToProduct(p);
                                        return (
                                            <ProductCard
                                                key={p.id || `${p.name_en}-${p.imageUrl}`}
                                                product={mapped}
                                                onQuickLook={(mp) => setSelected(mp)}
                                                className="will-change-transform"
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            />
                                        );
                                    })
                                ) : (
                                    <div style={{gridColumn: '1/-1', textAlign:'center', color:'red'}}>{t["products.notFound"]}</div>
                                )}
                            </div>
                            <div className="see-more-container text-center animate-slide-in-bottom animation-delay-800">
                                {loadedCount < filteredProducts.length && (
                                    <button
                                        id="see-more-btn"
                                        className="btn btn-primary btn-professional focus-ring inline-flex items-center gap-3 group"
                                        data-lang-key="products.seeMore"
                                        onClick={() => setLoadedCount((c) => c + 8)}
                                    >
                                        <span>{t["products.seeMore"]}</span>
                                        <i className="fas fa-plus transform group-hover:rotate-90 transition-transform duration-300"></i>
                                    </button>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* Mobile Filters Drawer */}
            {isFiltersOpen && (
                <div className="filters-backdrop" role="dialog" aria-modal="true">
                    <div className="filters-panel">
                        <div className="filters-header">
                            <h3 className="filters-title">Filters</h3>
                            <button className="filters-close" onClick={() => setIsFiltersOpen(false)} aria-label="Close filters">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="filters-content">
                            <CategoryList />
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .mobile-filters-row { display: none; margin: 0 0 16px; }
                .filters-toggle { display: inline-flex; align-items: center; gap: 8px; }
                @media (max-width: 992px) {
                  .mobile-filters-row { display: flex; justify-content: flex-start; }
                }
                .filters-backdrop {
                  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
                  display: flex; justify-content: center; align-items: flex-end; z-index: 1001;
                }
                .filters-panel {
                  background: #fff; width: 100%; max-height: 85vh; border-top-left-radius: 16px; border-top-right-radius: 16px;
                  box-shadow: 0 -8px 24px rgba(0,0,0,0.15); padding: 16px 16px 24px;
                  transform: translateY(0); animation: slideUp 0.25s ease-out;
                }
                .filters-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
                .filters-title { font-weight: 700; font-size: 1.125rem; }
                .filters-close { background: transparent; border: none; font-size: 1.25rem; }
                .filters-content { overflow-y: auto; max-height: calc(85vh - 56px); padding-right: 4px; }
                @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>

            <footer className="footer">
                <div className="container footer-grid">
                    <div className="footer-col">
                        <h3 data-lang-key="footer.sumopower">{t["footer.sumopower"]}</h3>
                        <p data-lang-key="footer.question">{t["footer.question"]}</p>
                        <p><strong data-lang-key="footer.address">{t["footer.address"]}</strong><br /> Jl. Gusti Pertama 9<br /> Jakarta Utara, 14250</p>
                    </div>
                    <div className="footer-col">
                        <h3 data-lang-key="footer.contact">{t["footer.contact"]}</h3>
                        <ul>
                            <li><i className="fas fa-envelope"></i> officialsumopower@gmail.com</li>
                            <li><i className="fas fa-phone"></i> +62 889-7677-2696</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 data-lang-key="footer.info">{t["footer.info"]}</h3>
                        <ul>
                            <li><a href="/pages/products" data-lang-key="footer.info.products">{t["footer.info.products"]}</a></li>
                            <li><a href="#" data-lang-key="footer.info.catalog">{t["footer.info.catalog"]}</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 data-lang-key="footer.connect">{t["footer.connect"]}</h3>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p data-lang-key="footer.copyright" dangerouslySetInnerHTML={{ __html: t["footer.copyright"] }} />
                </div>
            </footer>

            <a href="https://wa.me/6288976772696" className="whatsapp-float transition-all duration-300 hover:scale-105" target="_blank" rel="noopener noreferrer">
                <span className="whatsapp-text" data-lang-key="whatsapp.text">{t["whatsapp.text"]}</span>
                <i className="fab fa-whatsapp"></i>
            </a>
            <ProductQuickLook open={!!selected} product={selected} onClose={() => setSelected(null)} />
        </>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={null}>
            <ProductsPageInner />
        </Suspense>
    );
}

