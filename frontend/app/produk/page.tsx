import { Suspense } from 'react';
import { Nav } from '../../components/layout/Nav';
import { Footer } from '../../components/layout/Footer';
import { FilterPanel } from '../../components/products/FilterPanel';
import { ProductGrid } from '../../components/products/ProductGrid';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { FadeIn } from '../../components/ui/FadeIn';
import { CATEGORIES, Product } from '../../types/product';
import { prisma } from '../../lib/prisma';

interface ProdukPageProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}

export default async function ProdukPage({ searchParams }: ProdukPageProps) {
  const { category = 'all', q = '', sort = 'terbaru' } = await searchParams;

  const cat = CATEGORIES.find((c) => c.id === category);

  // Build where clause
  const where: any = {};
  if (cat?.brand) where.brand = cat.brand;
  if (q) {
    where.OR = [
      { brand: { contains: q, mode: 'insensitive' } },
      { model: { contains: q, mode: 'insensitive' } },
      { code:  { contains: q, mode: 'insensitive' } },
    ];
  }

  // Build orderBy
  const orderBy =
    sort === 'harga-naik'  ? { price: 'asc'  as const } :
    sort === 'harga-turun' ? { price: 'desc' as const } :
    { createdAt: 'desc' as const };

  let products: Product[] = [];
  try {
    products = await (prisma as any).product.findMany({ where, orderBy });
  } catch {
    products = [];
  }

  const activeCatName = cat?.name || 'Semua Produk';
  const heroTitle =
    category === 'all' || !cat?.brand
      ? 'Katalog lengkap baterai HP'
      : `Baterai ${cat.brand} original`;

  return (
    <>
      <Nav />
      <main>
        {/* Products hero */}
        <section className="bg-surface border-b border-hairline py-12">
          <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
            <FadeIn delay={0}>
              <Eyebrow>Katalog · {activeCatName}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.07}>
              <h1 className="text-[40px] lg:text-[56px] font-medium tracking-tight leading-[1.05] text-ink mt-4 mb-4">
                {heroTitle}
              </h1>
            </FadeIn>
            <FadeIn delay={0.13}>
              <p className="text-[15px] text-ink-3">
                {products.length} produk tersedia · Semua dalam stok · Garansi resmi 12 bulan
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Two-col layout */}
        <div className="max-w-[1320px] mx-auto px-5 lg:px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-14">
            <Suspense>
              <FilterPanel />
            </Suspense>
            <Suspense>
              <ProductGrid products={products} totalCount={products.length} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
