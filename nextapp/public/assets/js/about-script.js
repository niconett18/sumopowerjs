// Ensure the script runs even if DOMContentLoaded already fired (Next.js "afterInteractive")
(function initWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

function init() {
    // --- Language and Translations ---
    const translations = {
        id: {
            "nav.home": "Beranda",
            "nav.products": "Produk",
            "nav.about": "Tentang Kami",
            "about.title": "Tentang SumoPower",
            "about.subtitle": "Memimpin inovasi dalam teknologi baterai untuk masa depan yang berkelanjutan",
            "about.story.title": "Cerita Kami",
            "about.text": "Didirikan pada tahun 2023, SumoPower berdedikasi untuk menyediakan baterai berkualitas tinggi dan tahan lama untuk semua kebutuhan Anda. Komitmen kami terhadap inovasi dan kualitas memastikan bahwa setiap baterai SumoPower memberikan kinerja yang andal. Kami percaya pada masa depan yang berkelanjutan, dan penelitian kami difokuskan pada penciptaan solusi daya yang lebih ramah lingkungan.",
            "about.mission": "Misi kami adalah menjadi pemimpin global dalam teknologi baterai yang berkelanjutan, memberikan solusi energi yang dapat diandalkan untuk kehidupan sehari-hari sambil menjaga kelestarian lingkungan untuk generasi mendatang.",
            "values.title": "Nilai-Nilai Kami",
            "values.quality.title": "Kualitas Terdepan",
            "values.quality.desc": "Kami tidak pernah berkompromi dengan kualitas. Setiap produk melalui standar kontrol kualitas tertinggi.",
            "values.sustainability.title": "Keberlanjutan",
            "values.sustainability.desc": "Komitmen kami terhadap lingkungan tercermin dalam setiap aspek produksi dan operasional.",
            "values.innovation.title": "Inovasi",
            "values.innovation.desc": "Kami terus berinovasi untuk menghadirkan teknologi baterai terdepan di industri.",
            "brands.title": "Brands We Support",
            "brands.subtitle": "We provide high-quality batteries for all major smartphone brands",
            "whatsapp.text": "Butuh bantuan? Chat dengan kami",
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
            "about.title": "About SumoPower",
            "about.subtitle": "Leading innovation in battery technology for a sustainable future",
            "about.story.title": "Our Story",
            "about.text": "Founded in 2023, SumoPower is dedicated to providing top-tier, long-lasting batteries for all your needs. Our commitment to innovation and quality ensures that every SumoPower battery delivers reliable performance. We believe in a sustainable future, and our research is focused on creating more eco-friendly power solutions.",
            "about.mission": "Our mission is to become a global leader in sustainable battery technology, providing reliable energy solutions for everyday life while preserving the environment for future generations.",
            "values.title": "Our Values",
            "values.quality.title": "Leading Quality",
            "values.quality.desc": "We never compromise on quality. Every product goes through the highest quality control standards.",
            "values.sustainability.title": "Sustainability",
            "values.sustainability.desc": "Our commitment to the environment is reflected in every aspect of production and operations.",
            "values.innovation.title": "Innovation",
            "values.innovation.desc": "We continue to innovate to deliver cutting-edge battery technology in the industry.",
            "brands.title": "Brands We Support",
            "brands.subtitle": "We provide high-quality batteries for all major smartphone brands",
            "whatsapp.text": "Need help? Chat with us",
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
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    const navbar = document.querySelector('.navbar');
    const langSwitcher = document.querySelector('.lang-switcher');

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

        if (langSwitcher) langSwitcher.classList.toggle('lang-en', lang === 'en');
        const switchButtons = document.querySelectorAll('.lang-btn, .lang-seg');
        switchButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            if (btn.hasAttribute('aria-pressed')) {
                btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
            }
        });
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

    // Language switcher
    document.querySelectorAll('.lang-btn, .lang-seg').forEach(btn => {
        btn.addEventListener('click', (e) => setLanguage(e.currentTarget.dataset.lang));
    });

    // Initialize
    setLanguage(currentLanguage);
    
    // --- Brands Carousel Functionality ---
    const carousel = document.querySelector('.brands-carousel');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalItems = carousel.children.length;
        // Determine actual card width from the first item so we advance one-by-one exactly
        const firstItem = carousel.children[0];
        const computedGap = 40; // keep in sync with CSS gap
        const itemWidth = () => (firstItem ? firstItem.getBoundingClientRect().width + computedGap : 420);
        
        // Create infinite loop by duplicating items
        const originalItems = Array.from(carousel.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        // Function to update carousel position with infinite loop
        const updateCarousel = (index, animate = true) => {
            const translateX = -(index * itemWidth());
            carousel.style.transition = animate ? 'transform 0.5s ease' : 'none';
            carousel.style.transform = `translateX(${translateX}px)`;
        };
        
        // Next button click - infinite loop
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel(currentIndex);
            
            // Reset to beginning when reaching the end of original items
            if (currentIndex >= originalItems.length) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateCarousel(currentIndex, false);
                }, 500);
            }
        });
        
        // Previous button click - infinite loop
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel(currentIndex);
            
            // Jump to end of original items when going before start
            if (currentIndex < 0) {
                setTimeout(() => {
                    currentIndex = originalItems.length - 1;
                    updateCarousel(currentIndex, false);
                }, 500);
            }
        });
        

        
        // Auto-slide functionality with infinite loop (move exactly 1 card to the right)
        let autoSlideInterval;
        // safety: clear any pre-existing intervals if script re-runs
        if (window.__brandsAutoSlide) clearInterval(window.__brandsAutoSlide);
        
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                currentIndex++;
                updateCarousel(currentIndex);
                
                // Reset to beginning when reaching the end
                if (currentIndex >= originalItems.length) {
                    setTimeout(() => {
                        currentIndex = 0;
                        updateCarousel(currentIndex, false);
                    }, 500);
                }
            }, 1200); // Faster sliding for better user experience
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        // Start auto-slide
        startAutoSlide();
        window.__brandsAutoSlide = autoSlideInterval;
        
        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.brands-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Touch/swipe support for mobile with infinite loop
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe left - next
                    currentIndex++;
                    updateCarousel(currentIndex);
                    
                    if (currentIndex >= originalItems.length) {
                        setTimeout(() => {
                            currentIndex = 0;
                            updateCarousel(currentIndex, false);
                        }, 500);
                    }
                } else if (diff < 0) {
                    // Swipe right - previous
                    currentIndex--;
                    updateCarousel(currentIndex);
                    
                    if (currentIndex < 0) {
                        setTimeout(() => {
                            currentIndex = originalItems.length - 1;
                            updateCarousel(currentIndex, false);
                        }, 500);
                    }
                }
            }
        });
    }

    // --- Make brand logos clickable to open filtered product category ---
    const brandToCategory = {
        'OPPO': 'oppo',
        'ASUS': 'asus',
        'SAMSUNG': 'samsung',
        'vivo': 'vivo',
        'Xiaomi': 'xiaomi',
        'NOKIA': 'nokia',
        'Apple': 'iphone',
        'Infinix': 'infinix'
    };

    document.querySelectorAll('.brands-carousel img').forEach(img => {
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
}
