'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

const LOGO_SRC = '/assets/images/logo.png';

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/produk', label: 'Produk' },
    { href: '/tentang', label: 'Tentang' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper/92 backdrop-blur-md border-b border-hairline">
      <div className="relative z-50 h-[68px] max-w-[1320px] mx-auto px-5 lg:px-10 flex items-center justify-between gap-8 lg:gap-12 bg-transparent">
        <Link
          href="/"
          className="flex items-center shrink-0 h-11"
          aria-label="SumoPower beranda"
        >
          <Image
            src={LOGO_SRC}
            alt="SumoPower"
            width={220}
            height={56}
            className="h-10 lg:h-14 w-auto object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 flex-1 self-stretch min-w-0">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex items-center h-full text-sm font-medium border-b-2 transition-colors',
                  isActive
                    ? 'text-ink border-ink'
                    : 'text-ink-3 border-transparent hover:text-ink hover:border-hairline'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
          <Button href="/produk" withArrow className="hidden sm:inline-flex">
            Lihat katalog
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-ink-3 hover:text-ink focus:outline-none transition-transform"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden fixed top-[68px] left-0 w-full h-[calc(100vh-68px)] bg-paper border-t border-hairline z-40 flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col px-8 py-12 gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[32px] font-light text-ink tracking-tight hover:text-yellow transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 + 0.1, duration: 0.3 }}
                className="mt-8 pt-8 border-t border-hairline flex flex-col gap-6"
              >
                <Button href="/produk" className="w-full justify-center py-4 text-base" onClick={() => setIsOpen(false)}>
                  Lihat katalog lengkap
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
