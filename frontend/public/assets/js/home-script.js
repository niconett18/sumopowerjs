document.addEventListener('DOMContentLoaded', function() {
    // --- Language and Translations ---
    const translations = {
        id: {
            "nav.home": "Beranda",
            "nav.products": "Produk",
            "nav.about": "Tentang Kami",
            "hero.title": "Power Up Seperti Sumo",
            "hero.subtitle": "Rasakan energi yang tahan lama dan andal dengan baterai SumoPower.",
            "hero.button": "Jelajahi Produk Kami",
            "featured.title": "Produk Unggulan",
            "featured.seeAll": "Lihat Semua Produk",
            "product.viewOnShopee": "Lihat di Shopee",
            "whatsapp.text": "Butuh bantuan? Chat dengan kami",
            "category.charger": "CHARGER MOBIL / SAVER",
            "category.asus": "BATERAI ASUS",
            "category.infinix": "BATERAI INFINIX",
            "category.samsung": "BATERAI SAMSUNG",
            "category.xiaomi": "BATERAI XIAOMI",
            "category.vivo": "BATERAI VIVO",
            "category.oppo": "BATERAI OPPO",
            "category.iphone": "BATERAI IPHONE",
            "category.nokia": "BATERAI NOKIA",
            "about.title": "Tentang SumoPower",
            "about.text": "Didirikan pada tahun 2023, SumoPower berdedikasi untuk menyediakan baterai berkualitas tinggi dan tahan lama untuk semua kebutuhan Anda.",
            "about.readMore": "Baca Selengkapnya",
            "footer.sumopower": "SumoPower",
            "footer.question": "Punya pertanyaan? Hubungi kami sekarang.",
            "footer.address": "Alamat:",
            "footer.contact": "Pusat Kontak",
            "footer.info": "Informasi",
            "footer.info.products": "Produk",
            "footer.info.catalog": "Katalog",
            "footer.connect": "Tetap Terhubung",
            "footer.copyright": "&copy; 2024 SumoPower. Hak Cipta Dilindungi."
        },
        en: {
            "nav.home": "Home",
            "nav.products": "Products",
            "nav.about": "About Us",
            "hero.title": "Power Up Like A Sumo",
            "hero.subtitle": "Experience long-lasting, reliable energy with SumoPower batteries.",
            "hero.button": "Explore Our Products",
            "featured.title": "Featured Products",
            "featured.seeAll": "View All Products",
            "product.viewOnShopee": "View on Shopee",
            "whatsapp.text": "Need help? Chat with us",
            "category.charger": "CAR CHARGER / SAVER",
            "category.asus": "ASUS BATTERY",
            "category.infinix": "INFINIX BATTERY",
            "category.samsung": "SAMSUNG BATTERY",
            "category.xiaomi": "XIAOMI BATTERY",
            "category.vivo": "VIVO BATTERY",
            "category.oppo": "OPPO BATTERY",
            "category.iphone": "IPHONE BATTERY",
            "category.nokia": "NOKIA BATTERY",
            "about.title": "About SumoPower",
            "about.text": "Founded in 2023, SumoPower is dedicated to providing top-tier, long-lasting batteries for all your needs.",
            "about.readMore": "Read More",
            "footer.sumopower": "SumoPower",
            "footer.question": "Have a question? Contact us now.",
            "footer.address": "Address:",
            "footer.contact": "Contact Center",
            "footer.info": "Information",
            "footer.info.products": "Products",
            "footer.info.catalog": "Catalog",
            "footer.connect": "Stay Connected",
            "footer.copyright": "&copy; 2024 SumoPower. All Rights Reserved."
        }
    };

    // Set default language to English, but allow user to change it
    let currentLanguage = (localStorage.getItem('language') || 'en');
    
    const navbar = document.querySelector('.navbar');
    const langSwitcher = document.querySelector('.lang-switcher');
    const featuredProductTrack = document.getElementById('featured-product-track');
    const featuredCarousel = document.getElementById('featured-carousel');

    const setLanguage = (lang) => {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        langSwitcher.classList.toggle('lang-en', lang === 'en');
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        if (featuredProductTrack) renderFeaturedProducts();
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', () => navbarNav.classList.toggle('active'));
    }

    // Render featured products into a horizontal carousel (6 per view, infinite loop)
    const renderFeaturedProducts = () => {
        if (!featuredProductTrack || typeof allProducts === 'undefined') return;

        const viewport = featuredCarousel?.querySelector('.carousel-viewport');
        featuredProductTrack.innerHTML = '';
        const nameKey = `name_${currentLanguage}`;
        // 1) filter products that actually have image
        const validProducts = allProducts.filter(p => p.imageUrl && String(p.imageUrl).trim() !== '');

        // 2) group by brand/category
        const groups = validProducts.reduce((acc, p) => {
            const key = p.category_key;
            if (!acc[key]) acc[key] = [];
            acc[key].push(p);
            return acc;
        }, {});
        Object.values(groups).forEach(list => list.sort((a, b) => a.id - b.id));

        // 3) preferred brand order to diversify
        const preference = [
            'category.infinix',
            'category.samsung',
            'category.xiaomi',
            'category.vivo',
            'category.oppo',
            'category.iphone',
            'category.asus',
            'category.nokia',
            'category.charger'
        ];
        const availableCategories = Object.keys(groups);
        const orderedCategories = [
            ...preference.filter(c => availableCategories.includes(c)),
            ...availableCategories.filter(c => !preference.includes(c))
        ];

        // 4) round-robin pick to avoid adjacent same brand
        const targetCount = 12; // enough for loop feel while showing 6 per view
        const picked = [];
        let idxRound = 0;
        while (picked.length < targetCount && orderedCategories.length > 0) {
            let placedInThisCycle = false;
            for (let step = 0; step < orderedCategories.length; step++) {
                const cat = orderedCategories[(idxRound + step) % orderedCategories.length];
                const list = groups[cat];
                if (!list || list.length === 0) continue;
                if (picked.length > 0 && picked[picked.length - 1].category_key === cat) {
                    continue; // avoid adjacent duplicate brand
                }
                picked.push(list.shift());
                placedInThisCycle = true;
                idxRound = (idxRound + step + 1) % Math.max(1, orderedCategories.length);
                break;
            }
            // prune empty categories
            for (let i = orderedCategories.length - 1; i >= 0; i--) {
                const c = orderedCategories[i];
                if (!groups[c] || groups[c].length === 0) orderedCategories.splice(i, 1);
            }
            if (!placedInThisCycle) break; // nothing else can be placed without breaking rule
        }

        const featuredProducts = picked.length ? picked : validProducts.slice(0, 12);

        const createCard = (product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${index * 0.05}s`;
            const imagePath = (product.imageUrl || '').replace('../', '/');
            card.innerHTML = `
                <div class="product-image">
                    <img src="${imagePath}" alt="${product[nameKey]}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/300x300/CCCCCC/FFFFFF?text=Image+Not+Found';">
                </div>
                <span class="product-category">${translations[currentLanguage][product.category_key]}</span>
                <h3 class="product-title">${product[nameKey]}</h3>
                <a href="${product.shopeeUrl}" target="_blank" class="shopee-link">
                    <div class="shopee-brand">
                        <img src="/assets/images/shopeelogo.png" alt="Shopee" class="shopee-logo">
                        <span class="shopee-text">Shopee</span>
                    </div>
                </a>
            `;
            return card;
        };

        // To achieve an infinite feel, clone head and tail groups
        const allForTrack = [...featuredProducts];
        const groupSize = Math.min(8, allForTrack.length);
        if (groupSize === 0) return;
        const headClones = allForTrack.slice(0, groupSize);
        const tailClones = allForTrack.slice(-groupSize);
        const sequence = [...tailClones, ...allForTrack, ...headClones];

        sequence.forEach((product, index) => {
            featuredProductTrack.appendChild(createCard(product, index));
        });

        // Carousel logic
        let index = groupSize; // start after the prepended tail clones
        let cardWidth = 0;
        const updateCardWidth = () => {
            const firstCard = featuredProductTrack.querySelector('.product-card');
            if (firstCard) {
                const style = getComputedStyle(featuredProductTrack);
                const gap = parseFloat(style.columnGap || style.gap || '24');
                cardWidth = firstCard.getBoundingClientRect().width + gap;
            }
        };
        updateCardWidth();

        const setTranslate = () => {
            featuredProductTrack.style.transform = `translateX(${-index * cardWidth}px)`;
        };

        setTimeout(setTranslate, 0);
        window.addEventListener('resize', () => { updateCardWidth(); setTranslate(); });

        const total = sequence.length;

        const goNext = () => {
            index += 1;
            featuredProductTrack.style.transition = 'transform 0.25s ease';
            setTranslate();
        };
        const goPrev = () => {
            index -= 1;
            featuredProductTrack.style.transition = 'transform 0.25s ease';
            setTranslate();
        };

        featuredProductTrack.addEventListener('transitionend', () => {
            // Jump without transition when hitting the cloned edges
            if (index >= total - groupSize) {
                index = groupSize; // reset to first real slide
                featuredProductTrack.style.transition = 'none';
                setTranslate();
            }
            if (index < groupSize) {
                index = total - groupSize * 2; // last real group start
                featuredProductTrack.style.transition = 'none';
                setTranslate();
            }
        });

        // Controls
        const prevBtn = featuredCarousel?.querySelector('.carousel-btn.prev');
        const nextBtn = featuredCarousel?.querySelector('.carousel-btn.next');
        prevBtn?.addEventListener('click', goPrev);
        nextBtn?.addEventListener('click', goNext);

        // Auto-play loop
        let autoTimer = setInterval(goNext, 1500);
        const pause = () => clearInterval(autoTimer);
        const resume = () => autoTimer = setInterval(goNext, 1500);
        featuredCarousel?.addEventListener('mouseenter', pause);
        featuredCarousel?.addEventListener('mouseleave', resume);
    };

    // --- Make brand logos clickable to open filtered product category ---
    const brandToCategory = {
        'OPPO': 'oppo',
        'ASUS': 'asus',
        'SAMSUNG': 'samsung',
        'VIVO': 'vivo',
        'XIAOMI': 'xiaomi',
        'Apple': 'iphone'
    };

    // Home page brands horizontal row
    document.querySelectorAll('.brands-horizontal-row img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const alt = (img.getAttribute('alt') || '').trim();
            const categoryKey = brandToCategory[alt];
            if (categoryKey) {
                // Navigate to products page with category pre-selected
                window.location.href = '/pages/products?category=' + encodeURIComponent(categoryKey);
            }
        });
    });

    // Handle Infinix brand text click (special case since it's text, not image)
    document.querySelector('.infinix-brand')?.addEventListener('click', () => {
        window.location.href = '/pages/products?category=infinix';
    });
    document.querySelector('.infinix-brand')?.style && (document.querySelector('.infinix-brand').style.cursor = 'pointer');

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => setLanguage(e.target.dataset.lang));
    });

    // Initialize and ensure elements/data exist before rendering
    const ensureFeaturedReady = () => (
        typeof allProducts !== 'undefined' && document.getElementById('featured-product-track')
    );

    const startWhenReady = () => {
        if (ensureFeaturedReady()) {
            setLanguage(currentLanguage);
            return true;
        }
        return false;
    };

    if (!startWhenReady()) {
        let tries = 0;
        const timer = setInterval(() => {
            tries += 1;
            if (startWhenReady() || tries > 200) {
                clearInterval(timer);
            }
        }, 25);
    }
});
