"use client";
import { motion } from "framer-motion";
import Script from "next/script";
import FeaturedProducts from "./_components/FeaturedProducts";
import Reveal from "../components/Reveal";
import { ENABLE_ANIMATIONS, variants } from "../lib/anim";
import LanguageSwitcher from "./_components/LanguageSwitcher";
import { useLanguage } from "./_components/useLanguage";
import { getTranslations } from "../dictionaries";

export const dynamic = 'force-static';

export default function HomePage() {
  const currentLang = useLanguage('en');
  const t = getTranslations(currentLang);
  
  const HeroContent = ENABLE_ANIMATIONS ? (
    <motion.div 
      className="hero-content"
      variants={variants.staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        className="animate-fade-in-up text-center relative"
        variants={variants.slideUp}
      >
        <span>Power</span>
        <span className="inline-block animate-scale-in animation-delay-300 mx-2 font-black text-white drop-shadow-md">Up</span>
        <span>Like A</span>
        <span className="inline-block animate-fade-in-left animation-delay-700 text-white font-black">Sumo</span>
      </motion.h1>
      <motion.p 
        data-lang-key="hero.subtitle" 
        className="animate-slide-in-bottom animation-delay-800 text-center max-w-2xl mx-auto"
        variants={variants.slideUp}
      >
        {t["hero.subtitle"]}
      </motion.p>
      <motion.a 
        href="/pages/products" 
        className="btn btn-primary btn-professional animate-scale-in animation-delay-1000 focus-ring inline-flex items-center gap-2 group"
        variants={variants.slideUp}
      >
        <span data-lang-key="hero.button">{t["hero.button"]}</span>
        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
      </motion.a>
    </motion.div>
  ) : (
    <div className="hero-content">
      <h1 className="animate-fade-in-up text-center relative">
        <span>Power</span>
        <span className="inline-block animate-scale-in animation-delay-300 mx-2 font-black text-white drop-shadow-md">Up</span>
        <span>Like A</span>
        <span className="inline-block animate-fade-in-left animation-delay-700 text-white font-black">Sumo</span>
      </h1>
      <p data-lang-key="hero.subtitle" className="animate-slide-in-bottom animation-delay-800 text-center max-w-2xl mx-auto">{t["hero.subtitle"]}</p>
      <a href="/pages/products" className="btn btn-primary btn-professional animate-scale-in animation-delay-1000 focus-ring inline-flex items-center gap-2 group">
        <span data-lang-key="hero.button">{t["hero.button"]}</span>
        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
      </a>
    </div>
  );
  
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="container">
            <a href="/" className="navbar-brand">
              <img src="/assets/images/logo.png" alt="SumoPower Logo" className="logo" />
            </a>
            <div className="navbar-nav">
              <a href="#home" data-lang-key="nav.home" className="navbar-item interactive hover:text-primary focus-ring stagger-1 animate-nav-slide">{t["nav.home"]}</a>
              <a href="/pages/products" data-lang-key="nav.products" className="navbar-item interactive hover:text-primary focus-ring stagger-2 animate-nav-slide">{t["nav.products"]}</a>
              <a href="/pages/about" data-lang-key="nav.about" className="navbar-item interactive hover:text-primary focus-ring stagger-3 animate-nav-slide">{t["nav.about"]}</a>
            </div>
            <div className="controls-container">
              <LanguageSwitcher />
              <button className="navbar-toggler">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <Script src="/assets/js/about-script.js?v=3" strategy="afterInteractive" />

      <section id="home" className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/assets/videos/videobg1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1 className="animate-fade-in-up text-center relative">
            <span>Power</span>
            <span className="inline-block animate-scale-in animation-delay-300 mx-2 font-black text-white drop-shadow-md">Up</span>
            <span>Like A</span>
            <span className="inline-block animate-fade-in-left animation-delay-700 text-white font-black">Sumo</span>
          </h1>
          <p data-lang-key="hero.subtitle" className="animate-slide-in-bottom animation-delay-800 text-center max-w-2xl mx-auto">Experience long-lasting, reliable energy with SumoPower batteries.</p>
          <a href="/pages/products" className="btn btn-primary btn-professional animate-scale-in animation-delay-1000 focus-ring inline-flex items-center gap-2 group">
            <span data-lang-key="hero.button">Explore Our Products</span>
            <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </a>
        </div>
      </section>

      <FeaturedProducts lang={currentLang} />

      {/* Replace About with Brands We Support */}
      <section className="brands-section py-20 animate-on-scroll">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title" data-lang-key="brands.title">{t["brands.title"]}</h2>
            <div className="section-underline"></div>
            <p className="brands-subtitle" data-lang-key="brands.subtitle">{t["brands.subtitle"]}</p>
          </div>
          <div className="brands-carousel-wrapper">
            <button className="carousel-btn carousel-btn-prev" aria-label="Previous">&#8249;</button>
            <div className="brands-carousel-container">
              <div className="brands-carousel">
                <div className="brand-item"><img src="/assets/images/samsunglogo.png" alt="SAMSUNG" /></div>
                <div className="brand-item"><img src="/assets/images/vivologo.png" alt="vivo" /></div>
                <div className="brand-item"><img src="/assets/images/xiaomilogo.png" alt="Xiaomi" /></div>
                <div className="brand-item"><img src="/assets/images/nokialogo.png" alt="NOKIA" /></div>
                <div className="brand-item"><img src="/assets/images/asuslogo.png" alt="ASUS" /></div>
                <div className="brand-item"><img src="/assets/images/oppologo.png" alt="OPPO" /></div>
                <div className="brand-item"><img src="/assets/images/applelogo.png" alt="Apple" /></div>
                <div className="brand-item"><img src="/assets/images/brandswesupport/infinixlogo.png" alt="Infinix" /></div>
              </div>
            </div>
            <button className="carousel-btn carousel-btn-next" aria-label="Next">&#8250;</button>
          </div>
        </div>
      </section>



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
    </>
  );
}

