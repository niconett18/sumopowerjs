'use client';
import { motion } from 'framer-motion';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { HeroGallery } from './HeroGallery';
import { CountUp } from '../ui/CountUp';
import { appleEase, staggerReveal, revealItem } from '../../lib/anim';

export function Hero() {
  return (
    <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">

      {/* Soft ambient glow — brand yellow, no deps */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-24 w-[640px] h-[640px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(245,184,0,0.13) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-20 -left-24 w-[440px] h-[440px] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(245,184,0,0.07) 0%, transparent 65%)' }}
        />
      </div>

      <motion.div 
        variants={staggerReveal}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[1320px] mx-auto px-5 lg:px-10 flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center"
      >
        {/* Left: Text Area */}
        <div className="order-1 lg:col-start-1 lg:row-start-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
          {/* Desktop Text Block */}
          <motion.div variants={revealItem} className="hidden lg:block w-full">
            <Eyebrow>Spesialis baterai HP</Eyebrow>
            <h1 className="text-[40px] lg:text-[76px] font-bold tracking-tight leading-[1.05] mt-6 mb-5 text-ink">
              Power Up<br />
              <span className="text-yellow-600">with Sumo</span>
            </h1>
            <p className="text-[16px] lg:text-[20px] text-ink-3 max-w-[460px] leading-relaxed mb-0 lg:mb-8">
              Solusi daya terbaik untuk setiap model HP Anda. Kualitas pabrik terjamin dengan garansi resmi tukar baru 12 bulan.
            </p>
          </motion.div>

          {/* Mobile Text Block */}
          <motion.div variants={revealItem} className="lg:hidden w-full mb-4 mt-2">
            <h1 className="text-[44px] font-bold tracking-tight leading-none text-ink mb-3">
              Sumo Power
            </h1>
            <p className="text-[18px] text-ink-3">
              Power up with Sumo
            </p>
          </motion.div>
        </div>

        {/* Right: Gallery Container with Background Blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: appleEase, delay: 0.22 }}
          className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative flex justify-center w-full mt-6 lg:mt-0"
        >
          {/* Decorative Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] sm:w-[150%] aspect-square pointer-events-none -z-10">
            {/* Large Orange Blob */}
            <div className="absolute top-[-5%] right-[-15%] w-[80%] h-[95%] bg-[#F59E0B] rounded-[45%_55%_70%_30%/45%_50%_60%_55%] rotate-[20deg] blur-[80px] opacity-80" />
            {/* Large Beige Blob */}
            <div className="absolute top-[5%] left-[-5%] w-[85%] h-[90%] bg-[#F5F2EB] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] -rotate-[15deg] blur-[60px] opacity-80" />
          </div>

          <HeroGallery />
        </motion.div>

        {/* Left Bottom: Buttons & Stats */}
        <div className="order-3 lg:col-start-1 lg:row-start-2 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
          <motion.div variants={revealItem} className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mt-2 lg:mt-0">
            <Button variant="yellow" href="/produk" withArrow className="flex-1 sm:flex-none justify-center px-4 py-3 sm:px-6 sm:py-3.5">
              Lihat katalog
            </Button>
            <Button variant="ghost" href="/tentang" className="flex-1 sm:flex-none justify-center px-4 py-3 sm:px-6 sm:py-3.5 border border-hairline bg-surface">
              Tentang SumoPower
            </Button>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="flex justify-between sm:justify-center lg:justify-start gap-6 sm:gap-14 mt-10 lg:mt-8 pt-6 border-t border-hairline w-full max-w-[500px]"
          >
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                <CountUp to={211} suffix="+" />
              </div>
              <div className="text-[12px] sm:text-[14px] text-ink-3 mt-1">Tipe baterai</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                <CountUp to={9} />
              </div>
              <div className="text-[12px] sm:text-[14px] text-ink-3 mt-1">Merek HP</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">12 bln</div>
              <div className="text-[12px] sm:text-[14px] text-ink-3 mt-1">Garansi resmi</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
