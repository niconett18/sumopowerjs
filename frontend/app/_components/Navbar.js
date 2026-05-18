'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/pages/products' },
  { name: 'About Us', href: '/pages/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-amber-400/30">
              <span className="font-black text-white text-xl">S</span>
            </div>
            <span className={`font-black tracking-tight text-xl transition-colors ${scrolled || mobileMenuOpen ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}>
              SumoPower
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative group ${
                    scrolled ? (isActive ? 'text-amber-500' : 'text-gray-600 hover:text-gray-900') : (isActive ? 'text-white' : 'text-white/80 hover:text-white')
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100" />
                </Link>
              );
            })}
            
            <Link
              href="/pages/products"
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                scrolled 
                  ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20' 
                  : 'bg-white text-gray-900 hover:bg-gray-50 shadow-black/10'
              }`}
            >
              Shop Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-gray-900' : 'bg-gray-900'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-gray-900' : 'bg-gray-900'} ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-gray-900' : 'bg-gray-900'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-black ${pathname === link.href ? 'text-amber-500' : 'text-gray-900'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
