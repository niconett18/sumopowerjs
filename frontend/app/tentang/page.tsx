import { Nav } from '../../components/layout/Nav';
import { Footer } from '../../components/layout/Footer';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Button } from '../../components/ui/Button';
import { FadeIn } from '../../components/ui/FadeIn';
import { AboutStats } from '../../components/about/AboutStats';
import { AnimatedPrinciples } from '../../components/about/AnimatedPrinciples';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Hanya menjual produk original',
    desc: 'Kami tidak menyediakan baterai replika, refurbish, atau remanufactured. Supplier yang menawarkan produk non-original tidak kami terima.',
  },
  {
    num: '02',
    title: 'Pengetesan sebelum pengiriman',
    desc: 'Setiap baterai diuji kapasitas dan voltasenya. Unit yang tidak memenuhi spesifikasi pabrik tidak akan disertakan dalam paket pesanan.',
  },
  {
    num: '03',
    title: 'Garansi tukar tanpa biaya',
    desc: 'Selama masa garansi 12 bulan, klaim tukar baru dilakukan tanpa biaya tambahan. Cukup melampirkan invoice asli pembelian.',
  },
  {
    num: '04',
    title: 'Harga wajar dan transparan',
    desc: 'Kami tidak bersaing pada harga termurah karena harga terlalu rendah seringkali mengindikasikan produk non-original. Kami menetapkan harga wajar sesuai biaya operasional dan jaminan kualitas.',
  },
];

export default function TentangPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section className="bg-surface border-b border-hairline py-20">
          <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
            <FadeIn delay={0}>
              <Eyebrow>Tentang Kami</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-[28px] md:text-[44px] lg:text-[64px] font-light tracking-[-0.03em] leading-[1.1] text-ink mt-6 max-w-[20ch]">
                Penyedia baterai HP <strong className="font-semibold">original</strong> dan aksesoris pengisian daya untuk seluruh Indonesia.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Two-col section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20">

              {/* Left */}
              <FadeIn>
                <p className="text-[18px] lg:text-[22px] font-normal leading-[1.5] text-ink mb-10">
                  SumoPower melayani teknisi HP, toko service, dan pengguna individu yang membutuhkan baterai pengganti original dengan kualitas terjamin.
                </p>
                <AboutStats />
              </FadeIn>

              {/* Right */}
              <FadeIn delay={0.1} className="space-y-6 text-base text-ink-2 leading-[1.7] max-w-[60ch]">
                <p>
                  SumoPower didirikan dengan tujuan menjawab kebutuhan pasar terhadap baterai HP original yang sulit ditemukan di jalur distribusi umum. Beredarnya baterai replika berkualitas rendah merugikan pengguna akhir maupun teknisi yang mengandalkan komponen original untuk menjaga reputasi layanannya.
                </p>
                <p>
                  Kami membangun rantai pasok langsung dengan distributor pabrikan, sehingga setiap produk yang masuk gudang kami dapat ditelusuri keasliannya. Setiap unit melewati pengetesan kapasitas dan voltase sebelum dikemas — memastikan spesifikasi yang tertera sesuai dengan performa di lapangan.
                </p>
                <p>
                  Saat ini SumoPower melayani permintaan dari teknisi independen, jaringan toko service, hingga pelanggan retail di seluruh Indonesia. Kami fokus pada satu kategori produk dengan standar kualitas yang tidak kami kompromikan.
                </p>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* Values list */}
        <section className="border-t border-ink">
          <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
            <AnimatedPrinciples principles={PRINCIPLES} />
          </div>
        </section>

        {/* CTAs */}
        <FadeIn className="py-16 lg:py-20">
          <div className="max-w-[1320px] mx-auto px-5 lg:px-10 flex flex-wrap gap-4">
            <Button variant="yellow" href="/produk" withArrow>
              Lihat katalog produk
            </Button>
            <Button variant="ghost" href="https://wa.me/6288976772696">
              Hubungi tim kami
            </Button>
          </div>
        </FadeIn>

      </main>
      <Footer />
    </>
  );
}
