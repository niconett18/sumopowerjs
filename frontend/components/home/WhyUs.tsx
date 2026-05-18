'use client';
import { motion } from 'framer-motion';
import { Eyebrow } from '../ui/Eyebrow';
import { appleEase, staggerReveal, revealItem, scrollReveal } from '../../lib/anim';

const ITEMS = [
  {
    num: '01',
    title: 'Baterai original, bukan replika.',
    desc: 'Setiap unit melewati pengetesan kapasitas sesuai standar pabrik. Kami tidak menjual baterai replika atau remanufactured.',
  },
  {
    num: '02',
    title: 'Garansi tukar 12 bulan.',
    desc: 'Jika unit mengalami penurunan performa dalam masa garansi, lakukan klaim tukar tanpa biaya tambahan. Cukup tunjukkan invoice pembelian.',
  },
  {
    num: '03',
    title: 'Pengiriman hari yang sama.',
    desc: 'Pesanan yang masuk sebelum pukul 15.00 WIB diproses dan dikirim di hari yang sama melalui JNE, J&T, atau Anteraja.',
  },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24 border-t border-hairline">
      <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20">

          {/* Left */}
          <motion.div {...scrollReveal(0)}>
            <Eyebrow>Mengapa SumoPower</Eyebrow>
            <h2 className="text-[36px] lg:text-[48px] font-medium tracking-tight leading-[1.1] text-ink mt-5 mb-6">
              Tiga komitmen yang konsisten kami pegang.
            </h2>
            <p className="text-[15px] text-ink-3 leading-[1.55]">
              Kami percaya kualitas bukan slogan — ia diukur dari setiap unit yang meninggalkan gudang kami menuju tangan pelanggan.
            </p>
          </motion.div>

          {/* Right — staggered rows */}
          <motion.div
            className="border-t border-ink"
            variants={staggerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {ITEMS.map((item) => (
              <motion.div
                key={item.num}
                variants={revealItem}
                className="grid grid-cols-[56px_1fr] gap-6 py-7 border-b border-hairline"
              >
                <span className="font-mono text-[13px] text-ink-mute pt-0.5">{item.num}</span>
                <div>
                  <h3 className="font-medium text-[19px] text-ink mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-ink-3 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
