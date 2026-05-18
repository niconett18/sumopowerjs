import Link from 'next/link';
import Image from 'next/image';

const LOGO_SRC = '/assets/images/logo.png';

export function Footer() {
  return (
    <footer className="border-t border-hairline py-16 bg-paper text-sm">
      <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-16">

          <div>
            <Link href="/" className="inline-flex items-center h-10 mb-5" aria-label="SumoPower beranda">
              <Image
                src={LOGO_SRC}
                alt="SumoPower"
                width={240}
                height={62}
                className="h-16 w-auto object-contain object-left"
              />
            </Link>
            <p className="text-ink-3 leading-relaxed max-w-[320px]">
              Penyedia baterai HP original dan aksesoris pengisian daya untuk seluruh Indonesia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-4">Katalog</h4>
            <ul className="space-y-3 text-ink-3">
              <li><Link href="/produk?category=samsung" className="hover:text-ink transition-colors">Baterai Samsung</Link></li>
              <li><Link href="/produk?category=xiaomi" className="hover:text-ink transition-colors">Baterai Xiaomi</Link></li>
              <li><Link href="/produk?category=iphone" className="hover:text-ink transition-colors">Baterai iPhone</Link></li>
              <li><Link href="/produk" className="hover:text-ink transition-colors">Semua produk</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-4">Layanan</h4>
            <ul className="space-y-3 text-ink-3">
              <li><a href="#" className="hover:text-ink transition-colors">Cek tipe baterai</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Klaim garansi</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Pengiriman</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Program reseller</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-4">Kontak</h4>
            <ul className="space-y-3 text-ink-3">
              <li>WhatsApp: 0889-7677-2696</li>
              <li>halo@sumopower.id</li>
              <li>Senin–Sabtu 09–17 WIB</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4 text-ink-mute">
          <p>© {new Date().getFullYear()} PT Sumo Power Indonesia. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-ink transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
