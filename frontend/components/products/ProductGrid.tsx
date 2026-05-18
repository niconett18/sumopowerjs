'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';
import { staggerFast, revealItemSmall } from '../../lib/anim';

interface ProductGridProps {
  products: Product[];
  totalCount: number;
}

export function ProductGrid({ products, totalCount }: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'terbaru';

  function setSort(val: string) {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('sort', val);
    router.push(`/produk?${sp.toString()}`);
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[13px] text-ink-3">
          <span className="font-semibold text-ink">{totalCount}</span> produk tersedia
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-ink-3">Urutkan:</span>
          <select
            value={currentSort}
            onChange={(e) => setSort(e.target.value)}
            className="text-[13px] text-ink border border-hairline rounded-[4px] px-2.5 py-1.5 bg-surface outline-none focus:border-ink cursor-pointer"
          >
            <option value="terbaru">Terbaru</option>
            <option value="harga-naik">Harga terendah</option>
            <option value="harga-turun">Harga tertinggi</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-24 text-center border border-hairline rounded-[6px]"
        >
          <p className="text-2xl font-medium text-ink mb-2">Tidak ada hasil</p>
          <p className="text-[15px] text-ink-3">Coba ubah filter atau kata kunci pencarian Anda.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-stretch auto-rows-fr"
          variants={staggerFast}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={revealItemSmall}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
