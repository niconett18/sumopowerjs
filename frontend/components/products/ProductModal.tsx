'use client';
import { useEffect } from 'react';
import { X, Check, Smartphone } from 'lucide-react';
import { BatteryIllo } from '../ui/BatteryIllo';
import { formatIDR } from '../../lib/format';
import { Product } from '../../types/product';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const title = product.nameId || product.model;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const waMessage = encodeURIComponent(
    `Halo SumoPower, saya ingin memesan: ${title}`
  );

  // Parse compatibleFor into individual model chips
  const compatibleModels = product.compatibleFor
    ? product.compatibleFor.split('/').map((s) => s.trim()).filter(Boolean)
    : [];

  const specs: [string, string][] = [
    ['Kapasitas',   product.mAh ? `${product.mAh} mAh` : '—'],
    ['Voltase',     product.voltage || '—'],
    ['Max Charge',  product.limitedChargeVoltage || '—'],
    ['Kode Baterai', product.code || '—'],
    ['Garansi',     product.warranty || '12 bulan'],
    ['Tipe',        'Li-ion'],
  ];

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface rounded-[8px] w-full max-w-[960px] max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-pop relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full border border-hairline bg-surface hover:bg-paper-2 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Image panel ─────────────────────────── */}
        <div className="bg-paper-2 w-full md:w-[38%] aspect-square md:aspect-auto md:min-h-[400px] relative shrink-0 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={title}
              className="absolute inset-0 w-full h-full object-contain p-6"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <BatteryIllo
                label={product.code}
                sub={product.brand}
                code={product.code}
                mAh={product.mAh}
                vol={product.voltage}
                className="w-[44%]"
              />
            </div>
          )}
        </div>

        {/* ── Info panel ──────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0 p-5 md:p-6 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-ink-mute mb-1">
            {product.brand}
          </p>
          <h2 className="text-base md:text-lg font-medium text-ink leading-snug pr-8">
            {title}
          </h2>

          {/* Price */}
          <p className="text-xl font-semibold text-ink mt-3 mb-4">
            {product.price > 0
              ? formatIDR(product.price)
              : 'Hubungi kami untuk harga'}
          </p>

          {/* CTA buttons (Moved to top) */}
          <div className="flex flex-col gap-2 mb-6">
            <a
              href={`https://wa.me/6288976772696?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 flex items-center justify-center rounded-[4px] bg-yellow text-yellow-ink text-sm font-semibold hover:bg-yellow-2 transition-colors"
            >
              Pesan via WhatsApp
            </a>
            {product.shopeeUrl ? (
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 flex items-center justify-center gap-2 rounded-[4px] border border-hairline text-sm text-ink hover:border-ink transition-colors"
              >
                <img src="/assets/images/shopeelogo.png" alt="Shopee" className="w-5 h-5 object-contain" />
                Beli di Shopee
              </a>
            ) : null}
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] mb-4">
            {specs.map(([label, value]) => (
              <div key={label} className="border border-hairline rounded-[4px] px-2.5 py-2">
                <div className="text-ink-mute mb-0.5">{label}</div>
                <div className="text-ink font-medium truncate">{value}</div>
              </div>
            ))}
          </div>

          {/* Compatible devices */}
          {compatibleModels.length > 0 && (
            <div className="mb-4 border border-hairline rounded-[4px] p-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ink-mute mb-2">
                <Smartphone className="w-3 h-3" />
                Kompatibel dengan
              </div>
              <div className="flex flex-wrap gap-1.5">
                {compatibleModels.map((model) => (
                  <span
                    key={model}
                    className="inline-block text-[11px] text-ink bg-paper-2 border border-hairline rounded-full px-2.5 py-0.5 leading-5"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}



          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-ink-3 mt-4 pt-4 border-t border-hairline">
            {['Garansi 12 bulan', 'Kirim hari ini', 'Original 100%'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1">
                <Check className="w-3 h-3 text-success shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
