'use client';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Eyebrow } from '../ui/Eyebrow';
import { appleEase, staggerFast, revealItemSmall, scrollReveal } from '../../lib/anim';

const BRANDS = [
  { id: 'samsung', name: 'Samsung',  sub: 'Baterai', count: '37', image: '/assets/images/samsunglogo.png' },
  { id: 'xiaomi',  name: 'Xiaomi',   sub: 'Baterai', count: '46', image: '/assets/images/xiaomilogo.png' },
  { id: 'oppo',    name: 'Oppo',     sub: 'Baterai', count: '50', image: '/assets/images/oppologo.png' },
  { id: 'vivo',    name: 'Vivo',     sub: 'Baterai', count: '37', image: '/assets/images/vivologo.png' },
  { id: 'iphone',  name: 'iPhone',   sub: 'Baterai', count: '29', image: '/assets/images/applelogo.png' },
  { id: 'infinix', name: 'Infinix',  sub: 'Baterai', count: '09', image: '/assets/images/brandswesupport/infinixlogo.png' },
  { id: 'asus',    name: 'Asus',     sub: 'Baterai', count: '01', image: '/assets/images/asuslogo.png' },
  { id: 'nokia',   name: 'Nokia',    sub: 'Baterai', count: '02', image: '/assets/images/nokialogo.png' },
];

export function BrandGrid() {
  const router = useRouter();

  return (
    <section className="py-16 lg:py-24 border-t border-hairline">
      <div className="max-w-[1320px] mx-auto px-5 lg:px-10">

        {/* Section head */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12"
          {...scrollReveal(0)}
        >
          <div>
            <Eyebrow>Katalog</Eyebrow>
            <h2 className="text-3xl lg:text-[40px] font-medium tracking-tight leading-[1.1] text-ink mt-4 max-w-[16ch]">
              Pilih merek HP Anda untuk melihat baterai yang tersedia.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[15px] text-ink-3 leading-[1.55] max-w-[380px]">
              Kami menyediakan baterai pengganti original untuk semua merek dan model HP populer.
              Setiap unit diuji sebelum dikirim dengan garansi resmi 12 bulan.
            </p>
          </div>
        </motion.div>

        {/* Brand grid — staggered reveal */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline bg-surface"
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {BRANDS.map((brand) => (
            <motion.button
              key={brand.id}
              variants={revealItemSmall}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: appleEase } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              onClick={() => router.push(`/produk?category=${brand.id}`)}
              className="border-r border-b border-hairline p-8 min-h-[180px] flex flex-col justify-between relative cursor-pointer hover:bg-paper-2 transition-colors group text-left"
            >
              {/* Count */}
              <span className="font-mono text-[11px] text-ink-mute">{brand.count} produk</span>

              {/* Arrow — revealed on hover */}
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-ink text-paper grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              {/* Bottom */}
              <div className="flex flex-col gap-2">
                {brand.image && (
                  <img
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    className="w-12 h-12 object-contain mb-2 mix-blend-multiply"
                  />
                )}
                <div className="text-[10px] uppercase tracking-widest text-ink-mute mb-1">{brand.sub}</div>
                <div className="font-poppins font-medium text-2xl tracking-tight text-ink">{brand.name}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
