'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MessageCircle, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { CATEGORIES } from '../../types/product';
import { useState, useEffect } from 'react';

export function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const currentQ = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(currentQ);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setInputValue(currentQ);
  }, [currentQ]);

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v);
      else sp.delete(k);
    });
    router.push(`/produk?${sp.toString()}`);
  }

  function handleClear() {
    setInputValue('');
    navigate({ q: '', category: currentCategory });
  }

  return (
    <aside className="w-full lg:w-[240px] shrink-0">
      {/* Search */}
      <div className="border border-hairline rounded-[4px] px-3.5 py-3 mb-6 flex items-center gap-2.5 bg-surface">
        <Search className="w-4 h-4 text-ink-mute shrink-0" />
        <input
          type="text"
          placeholder="Cari merek atau kode..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value === '') {
              navigate({ q: '', category: currentCategory });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate({ q: inputValue, category: currentCategory });
            }
          }}
          className="flex-1 w-full text-[13px] text-ink placeholder:text-ink-mute bg-transparent outline-none"
        />
        {inputValue && (
          <button onClick={handleClear} className="text-ink-mute hover:text-ink transition-colors focus:outline-none">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-center gap-2 border border-hairline rounded-[4px] py-2.5 text-[13px] font-medium text-ink bg-surface hover:bg-gray-50 transition-colors"
        >
          {isFilterOpen ? 'Tutup Filter' : 'Filter Kategori'}
        </button>
      </div>

      <div className={cn("lg:block", isFilterOpen ? "block" : "hidden")}>
        {/* Category filter */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-ink-3">Kategori</span>
          <button
            onClick={() => navigate({ category: 'all', q: '' })}
            className="text-[11px] text-ink-mute hover:text-ink transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  navigate({ category: cat.id });
                  setIsFilterOpen(false); // Auto close on mobile after selection
                }}
                className={cn(
                  'flex w-full items-center min-h-[40px] px-0 py-2 text-[13px] border-b transition-colors text-left',
                  isActive
                    ? 'font-medium text-ink border-ink'
                    : 'text-ink-3 border-hairline-2 hover:text-ink'
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Help card */}
        <div className="bg-ink text-paper rounded-[6px] p-5">
          <span className="block text-[10px] uppercase tracking-widest font-semibold text-yellow mb-2">Butuh bantuan</span>
          <p className="text-[13px] leading-snug text-paper/80 mb-3">Tidak yakin tipe baterai HP Anda?</p>
          <a
            href="https://wa.me/6288976772696"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-yellow hover:text-yellow-2 transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Hubungi tim kami
          </a>
        </div>
      </div>
    </aside>
  );
}
