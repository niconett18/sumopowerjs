'use client';
import { motion } from 'framer-motion';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { MessageCircle } from 'lucide-react';
import { appleEase, staggerReveal, revealItem, scrollReveal } from '../../lib/anim';

const STEPS = [
  {
    label: 'LANGKAH 01',
    title: 'Buka tutup belakang HP',
    desc: 'Untuk HP dengan baterai removable seperti Samsung J-series atau Nokia. Untuk HP non-removable, lewati ke langkah 03.',
  },
  {
    label: 'LANGKAH 02',
    title: 'Catat kode part number',
    desc: (
      <>
        Format umumnya 4–8 karakter, contoh{' '}
        <code className="font-mono text-paper">BN5A</code>,{' '}
        <code className="font-mono text-paper">EB-BA526</code>, atau{' '}
        <code className="font-mono text-paper">BLP817</code>.
      </>
    ),
  },
  {
    label: 'LANGKAH 03',
    title: 'Cari di katalog kami',
    desc: 'Gunakan filter merek atau cari berdasarkan kode di kolom pencarian. Tim kami siap membantu via WhatsApp jika diperlukan.',
  },
];

export function Guide() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
        <motion.div
          className="bg-ink text-paper rounded-[16px] p-8 lg:p-18"
          {...scrollReveal(0)}
        >
          <Eyebrow variant="dark">Panduan</Eyebrow>

          <h2 className="text-[28px] lg:text-[56px] font-light tracking-tight leading-[1.1] text-paper mt-6 mb-0 max-w-[16ch]">
            Cara menemukan tipe baterai yang sesuai dengan HP Anda.
          </h2>

          {/* Steps — staggered */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14"
            variants={staggerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.label}
                variants={revealItem}
                className="border-t border-[#2c2f36] pt-6"
              >
                <span className="font-mono text-[11px] text-yellow tracking-widest uppercase">{step.label}</span>
                <h3 className="font-medium text-[19px] text-paper mt-3.5 mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-ink-mute leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-14"
            {...scrollReveal(0.1)}
          >
            <Button variant="yellow" href="/produk" withArrow>
              Cari di katalog
            </Button>
            <Button
              variant="outline-dark"
              href="https://wa.me/6288976772696"
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2} />
              Hubungi via WhatsApp
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
