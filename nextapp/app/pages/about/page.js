"use client";
import LanguageSwitcher from "../../_components/LanguageSwitcher";
import { useLanguage } from "../../_components/useLanguage";
import { getTranslations } from "../../../dictionaries";
// Minimal page uses lightweight inline sections instead of full about components

export const dynamic = 'force-static';

export default function AboutPage() {
  const currentLang = useLanguage('en');
  const t = getTranslations(currentLang);

  return (
    <div className="about-page">
      <header>
        <nav className="navbar">
          <div className="container">
            <a href="/" className="navbar-brand">
              <img src="/assets/images/logo.png" alt="SumoPower Logo" className="logo" />
            </a>
            <div className="navbar-nav">
              <a href="/" data-lang-key="nav.home" className="navbar-item interactive hover:text-primary focus-ring stagger-1 animate-nav-slide">{t["nav.home"]}</a>
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

      <section className="page-header">
        <div className="container text-center">
          <h1 className="section-title" data-lang-key="about.title">{t["about.title"] || "About SumoPower"}</h1>
          <div className="section-underline" />
        </div>
      </section>

      <main>
        {/* Minimal Intro */}
        <section className="about-section" style={{background: 'var(--white-color)'}}>
          <div className="container">
            <div className="text-center" style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.25rem', lineHeight: 1.2, marginTop: 0, fontWeight: 800 }} data-lang-key="about.headline">{t["about.headline"]}</h2>
              <p style={{ color: '#4b5563', marginTop: 12 }} data-lang-key="about.subcopy">
                {t["about.subcopy"]}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 20 }}>
                <div style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.4)', fontWeight: 600 }} data-lang-key="about.stat.skus">{t["about.stat.skus"]}</div>
                <div style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.4)', fontWeight: 600 }} data-lang-key="about.stat.defect">{t["about.stat.defect"]}</div>
                <div style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.4)', fontWeight: 600 }} data-lang-key="about.stat.warranty">{t["about.stat.warranty"]}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values (3 succinct cards) */}
        <section className="values-section">
          <div className="container">
            <div className="values-grid">
              <div className="values-card">
                <div className="values-icon"><i className="fas fa-battery-full" /></div>
                <h3 data-lang-key="values.honest.title">{t["values.honest.title"]}</h3>
                <p data-lang-key="values.honest.desc">{t["values.honest.desc"]}</p>
              </div>
              <div className="values-card">
                <div className="values-icon"><i className="fas fa-shield-halved" /></div>
                <h3 data-lang-key="values.safety.title">{t["values.safety.title"]}</h3>
                <p data-lang-key="values.safety.desc">{t["values.safety.desc"]}</p>
              </div>
              <div className="values-card">
                <div className="values-icon"><i className="fas fa-headset" /></div>
                <h3 data-lang-key="values.support.title">{t["values.support.title"]}</h3>
                <p data-lang-key="values.support.desc">{t["values.support.desc"]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brands we support (minimal row) */}
        <section className="about-section" style={{ background: '#ffffff' }}>
          <div className="container">
            <div className="brands-grid-simple">
              <a className="brand-logo-simple" href="#" aria-label="Apple"><img src="/assets/images/applelogo.png" alt="Apple" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Samsung"><img src="/assets/images/samsunglogo.png" alt="Samsung" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Xiaomi"><img src="/assets/images/xiaomilogo.png" alt="Xiaomi" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Vivo"><img src="/assets/images/vivologo.png" alt="Vivo" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Oppo"><img src="/assets/images/oppologo.png" alt="Oppo" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Nokia"><img src="/assets/images/nokialogo.png" alt="Nokia" /></a>
              <a className="brand-logo-simple" href="#" aria-label="Infinix"><img src="/assets/images/brandswesupport/infinixlogo.png" alt="Infinix" /></a>
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="about-section" style={{ paddingTop: 24, paddingBottom: 64 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{
              border: '1px solid rgba(255, 193, 7, 0.35)',
              borderRadius: 16,
              padding: 24,
              background: 'linear-gradient(135deg, rgba(255,193,7,0.08), rgba(255,193,7,0.03))'
            }}>
              <div className="text-center">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Ready to power up?</h3>
                <p style={{ color: '#4b5563', marginTop: 8 }}>Browse compatible models and specifications.</p>
                <a href="/pages/products" className="btn btn-primary" style={{ marginTop: 14 }}>
                  Explore products
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}


