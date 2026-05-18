// Drop-in starter files for the SumoPower Next.js build.
// Reference component files below — adapt paths to your project (assumes
// app/ + components/ + lib/ structure from HANDOFF.md section 3).

// ===================================================================
// components/ui/BatteryIllo.tsx
// ===================================================================
import { Zap } from 'lucide-react';

interface BatteryIlloProps {
  label?: string;
  sub?: string;
  code?: string;
  mAh?: string | number;
  vol?: string;
  className?: string;
}

export function BatteryIllo({
  label = 'SUMO',
  sub = 'POWER',
  code = '01',
  mAh = '5000',
  vol = '3.85V',
  className = '',
}: BatteryIlloProps) {
  return (
    <div className={`relative aspect-[5/8] [filter:drop-shadow(0_24px_32px_rgba(15,17,21,.10))] ${className}`}>
      {/* top tab */}
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[28%] h-1.5 bg-ink rounded-t-[2px]" />

      {/* body */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f5f5f5] border border-hairline rounded-md flex flex-col p-3.5">
        {/* label */}
        <div className="bg-ink text-paper rounded-[4px] px-3 py-2.5 flex justify-between items-start leading-[1.2] uppercase tracking-[0.08em] text-[9px] font-bold">
          <div>
            <div className="text-[1.3em] tracking-[0.02em]">{label}</div>
            <div className="opacity-70 mt-0.5 font-medium">{sub}</div>
          </div>
          <Zap size={11} className="text-yellow" fill="currentColor" />
        </div>

        {/* specs */}
        <div className="mt-auto pt-3 border-t border-hairline font-mono text-[7.5px] text-ink-3 leading-[1.6] tracking-[0.02em] space-y-px">
          <div className="flex justify-between"><span>CODE</span><span>{code}</span></div>
          <div className="flex justify-between"><span>CAP</span><span>{mAh} mAh</span></div>
          <div className="flex justify-between"><span>VOL</span><span>{vol}</span></div>
          <div className="flex justify-between"><span>TYPE</span><span>Li-ion</span></div>
        </div>
      </div>

      {/* feet */}
      <span className="absolute -bottom-px left-[18%] w-[14%] h-1 bg-ink-mute rounded-b-[2px]" />
      <span className="absolute -bottom-px right-[18%] w-[14%] h-1 bg-ink-mute rounded-b-[2px]" />
    </div>
  );
}


// ===================================================================
// components/ui/Button.tsx
// ===================================================================
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'yellow' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink-2',
  yellow:  'bg-yellow text-yellow-ink font-semibold hover:bg-yellow-2',
  ghost:   'bg-transparent text-ink border border-hairline hover:border-ink',
};

const base = 'group inline-flex items-center gap-2.5 px-5 py-3 rounded-sm text-sm font-medium transition';

export function Button({ variant = 'primary', className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button {...rest} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = 'primary', className, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a {...rest} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}


// ===================================================================
// components/ui/Eyebrow.tsx
// ===================================================================
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ children, onDark = false, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <span className={cn('eyebrow', onDark && 'eyebrow-on-dark', className)}>
      {children}
    </span>
  );
}


// ===================================================================
// components/layout/Nav.tsx
// ===================================================================
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const LINKS = [
  { href: '/',         label: 'Beranda'  },
  { href: '/produk',   label: 'Produk'   },
  { href: '/tentang',  label: 'Tentang'  },
];

export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-hairline">
      <div className="container-x flex items-center justify-between gap-12 h-[68px]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative w-6 h-6 bg-ink rounded-sm grid place-items-center">
            <span className="w-2 h-2 bg-yellow rounded-[2px]" />
          </span>
          <span className="font-semibold text-[17px] tracking-tight">
            SumoPower<span className="font-normal text-ink-3 ml-px">.id</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center text-sm font-medium ml-auto">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={cn(
                'relative py-1.5 transition text-ink-3 hover:text-ink',
                isActive(l.href) && 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-ink',
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/admin/login"
            className={cn(
              'text-xs tracking-[0.12em] uppercase text-ink-mute hover:text-ink',
              pathname.startsWith('/admin') && 'text-ink',
            )}
          >
            Admin
          </Link>
        </nav>

        <Link href="/produk"
          className="hidden md:inline-flex items-center gap-2 px-4.5 py-2.5 bg-ink text-paper rounded-sm text-[13px] font-medium hover:bg-ink-2 transition group"
        >
          Lihat katalog
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}


// ===================================================================
// components/products/ProductCard.tsx
// ===================================================================
'use client';
import { ArrowRight } from 'lucide-react';
import { BatteryIllo } from '@/components/ui/BatteryIllo';
import { formatIDR } from '@/lib/format';
import type { Product } from '@/types/product';

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group bg-surface border border-hairline rounded-md overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:border-ink hover:shadow-soft transition relative"
    >
      <div className="relative aspect-square bg-paper-2 grid place-items-center overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 stage-grid-tight" />
        <BatteryIllo
          label={product.brand.toUpperCase().slice(0, 4)}
          sub={product.brand === 'iPhone' ? 'APPLE' : 'SUMO'}
          code={product.code.slice(0, 7)}
          mAh={String(product.mAh)}
          vol={product.voltage}
          className="w-[44%]"
        />

        {/* hover spec overlay */}
        <div className="spec-overlay">
          <div>
            <div className="text-[10px] tracking-[0.14em] uppercase text-yellow font-semibold">Spesifikasi</div>
            <ul className="spec-list mt-3">
              <li><span>Kapasitas</span><span>{product.mAh} mAh</span></li>
              <li><span>Voltase</span><span>{product.voltage}</span></li>
              <li><span>Dimensi</span><span>{product.dimension}</span></li>
              <li><span>Tipe sel</span><span>{product.type}</span></li>
              <li><span>Garansi</span><span>{product.warranty}</span></li>
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px]">{product.code}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow">
              Lihat detail <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[10px] tracking-[0.12em] uppercase text-ink-mute font-semibold">{product.brand}</span>
          <span className="font-mono text-[11px] text-ink-mute">{product.code}</span>
        </div>
        <h3 className="font-medium text-base leading-tight mb-2.5">{product.model}</h3>
        <div className="flex justify-between items-center pt-2.5 border-t border-hairline-2">
          <span className="font-semibold text-[15px]">{formatIDR(product.price)}</span>
          <span className="font-mono text-[11px] text-ink-3">{product.mAh} mAh</span>
        </div>
      </div>
    </div>
  );
}


// ===================================================================
// components/products/ProductModal.tsx (sketch)
// ===================================================================
'use client';
import { useEffect } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { BatteryIllo } from '@/components/ui/BatteryIllo';
import { ButtonLink } from '@/components/ui/Button';
import { formatIDR } from '@/lib/format';
import type { Product } from '@/types/product';

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm grid place-items-center p-6 animate-fade"
    >
      <div className="relative bg-surface rounded-xl w-full max-w-[1000px] max-h-[92vh] overflow-hidden grid grid-cols-1 md:grid-cols-[1.05fr_1fr] shadow-pop animate-rise">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface border border-hairline grid place-items-center hover:bg-ink hover:text-paper hover:border-ink transition"
        >
          <X size={16} />
        </button>

        <div className="relative bg-paper-2 grid place-items-center min-h-[460px] border-r border-hairline">
          <span className="absolute top-5 left-6 font-mono text-[11px] text-ink-mute">SKU · {product.code}</span>
          <BatteryIllo
            label={product.brand.toUpperCase().slice(0, 4)}
            sub={product.brand === 'iPhone' ? 'APPLE' : 'SUMO'}
            code={product.code.slice(0, 7)}
            mAh={String(product.mAh)}
            vol={product.voltage}
            className="w-[48%]"
          />
          <span className="absolute bottom-5 right-6 font-mono text-[11px] text-ink-mute">
            {product.brand} · {product.model}
          </span>
        </div>

        <div className="p-9 overflow-y-auto flex flex-col">
          <div className="flex gap-3 items-center mb-3.5">
            <span className="text-[11px] tracking-[0.14em] uppercase font-semibold text-ink-3">{product.brand}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-paper rounded-sm text-[10px] font-semibold tracking-[0.1em] uppercase">Original</span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-ink-3 before:content-[''] before:w-1.5 before:h-1.5 before:bg-success before:rounded-full">
              Tersedia
            </span>
          </div>

          <h2 className="font-medium text-[32px] tracking-tight leading-[1.1] mb-2">
            {product.brand} {product.model}
            <span className="block text-sm font-normal text-ink-3 mt-1.5">
              Baterai pengganti — {product.type}
            </span>
          </h2>

          <div className="font-mono text-xs text-ink-3 mb-5">Kode: {product.code}</div>

          <div className="flex items-baseline gap-3 py-4.5 border-y border-hairline mb-5">
            <span className="font-semibold text-[32px] leading-none">{formatIDR(product.price)}</span>
            <span className="text-[11px] tracking-[0.14em] uppercase text-ink-mute">IDR · sudah termasuk PPN</span>
          </div>

          <div className="grid grid-cols-2 mb-6">
            {[
              ['Kapasitas',  `${product.mAh} mAh`],
              ['Voltase',    product.voltage],
              ['Dimensi',    product.dimension],
              ['Tipe sel',   product.type],
              ['Garansi',    product.warranty],
              ['Keaslian',   product.origin],
            ].map(([k, v]) => (
              <div key={k} className="py-3 border-t border-hairline-2">
                <div className="text-[11px] tracking-[0.1em] uppercase text-ink-mute font-medium mb-1">{k}</div>
                <div className="font-mono text-[13px] text-ink">{v}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5 mt-auto pt-3">
            <ButtonLink variant="yellow" href={`https://wa.me/628123456789?text=Halo, saya tertarik dengan ${product.brand} ${product.model}`} className="flex-1 justify-center">
              <MessageCircle size={15} />
              Pesan via WhatsApp
            </ButtonLink>
            <ButtonLink variant="ghost" href="#" className="flex-1 justify-center">
              Tambah ke wishlist
            </ButtonLink>
          </div>

          <div className="flex gap-4 mt-4 flex-wrap text-xs text-ink-3">
            <span className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-ink before:rounded-full">Garansi 12 bulan</span>
            <span className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-ink before:rounded-full">Kirim hari ini</span>
            <span className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-ink before:rounded-full">COD tersedia</span>
            <span className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-ink before:rounded-full">Original 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
