'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';

const BRANDS = [
  { name: 'Samsung', img: '/assets/images/samsunglogo.png' },
  { name: 'iPhone', img: '/assets/images/applelogo.png' },
  { name: 'Xiaomi', img: '/assets/images/xiaomilogo.png' },
  { name: 'Oppo', img: '/assets/images/oppologo.png' },
  { name: 'Vivo', img: '/assets/images/vivologo.png' },
  { name: 'Infinix', img: '/assets/images/brandswesupport/infinixlogo.png' },
  { name: 'Asus', img: '/assets/images/asuslogo.png' },
];

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y: y1, opacity }} 
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-neutral-950 to-neutral-950 mix-blend-multiply" />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="/assets/videos/videobg1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Premium Power Solutions
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            Power Engineered <br />
            <span className="text-amber-400">
              For Excellence.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-medium">
            High-performance replacement batteries designed with precision chemistry, exact tolerances, and uncompromising safety standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pages/products"
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            >
              Explore Products
            </Link>
            <Link
              href="/pages/about"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Our Process
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </div>
  );
}

function BrandMarquee() {
  return (
    <div className="py-24 bg-white overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Trusted replacements for top brands</h3>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="mx-12 lg:mx-20 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <img src={brand.img} alt={brand.name} className="h-8 md:h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex items-center">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={`dup-${i}`} className="mx-12 lg:mx-20 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <img src={brand.img} alt={brand.name} className="h-8 md:h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: 'fa-microchip',
      title: 'Advanced BMS',
      desc: 'Integrated smart circuits protect against overcharging, overheating, and short circuits for maximum safety.'
    },
    {
      icon: 'fa-battery-full',
      title: 'Honest Capacity',
      desc: 'No inflated numbers. Our batteries deliver the exact mAh rating printed on the label, verified by rigorous testing.'
    },
    {
      icon: 'fa-check-double',
      title: 'Perfect Fitment',
      desc: 'Manufactured to exact OEM specifications ensuring seamless installation and reliable connector alignment.'
    }
  ];

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-6">
            The standard in <br/> aftermarket power.
          </h2>
          <p className="text-lg text-neutral-500">
            We don't just supply batteries; we engineer trust. Every SumoPower unit undergoes strict quality control to guarantee performance that rivals or exceeds original equipment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-10 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-8">
                <i className={`fas ${f.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">{f.title}</h3>
              <p className="text-neutral-500 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-amber-400/5" />
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight mb-8">
          Ready to restore your device's power?
        </h2>
        <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
          Browse our extensive catalog of high-quality replacement batteries and order directly via Shopee for secure checkout and fast shipping.
        </p>
        <Link
          href="/pages/products"
          className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-neutral-900/20"
        >
          View Product Catalog
          <i className="fas fa-arrow-right text-sm" />
        </Link>
      </div>
    </section>
  );
}

export default function HomeClient({ initialProducts = [] }) {
  return (
    <main className="font-sans antialiased selection:bg-amber-400 selection:text-neutral-900">
      <Navbar />
      <Hero />
      <BrandMarquee />
      <FeatureGrid />
      <CTA />
      <Footer />
      
      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/6288976772696"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg shadow-green-500/30 hover:scale-110 hover:rotate-12 transition-all duration-300"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Marquee Keyframes (injected globally via style for ease) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee2 { animation: marquee2 25s linear infinite; }
      `}} />
    </main>
  );
}
