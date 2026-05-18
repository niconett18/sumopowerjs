'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { adminGetProducts, adminUpdateProduct, adminDeleteProduct } from '../../lib/admin-api';

const BRANDS = ['Infinix','Samsung','Vivo','Oppo','Xiaomi','iPhone','Asus','Nokia'];

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [togglingId, setTogglingId]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setProducts(await adminGetProducts()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleActive(p) {
    if (!p.id) return;
    setTogglingId(p.id);
    try {
      const updated = await adminUpdateProduct(p.id, { active: !p.active });
      setProducts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    } catch (e) { alert(e.message); }
    finally { setTogglingId(null); }
  }

  async function toggleFeatured(p) {
    if (!p.id) return;
    try {
      const updated = await adminUpdateProduct(p.id, { featured: !p.featured });
      setProducts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    } catch (e) { alert(e.message); }
  }

  async function handleDelete(p) {
    if (!p.id) return;
    if (!confirm(`Hapus permanen produk "${p.nameId}"?\n\nTindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await adminDeleteProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
    } catch (e) { alert(e.message); }
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.nameId.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    const matchBrand  = !filterBrand || p.brand === filterBrand;
    return matchSearch && matchBrand;
  });

  const total = products.length;
  const activeCount = products.filter((p) => p.active).length;

  function formatPrice(n) {
    if (!n) return '—';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {activeCount} aktif · {total - activeCount} nonaktif · {total} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors flex items-center gap-2 shrink-0"
        >
          <span className="text-lg leading-none">+</span> Produk Baru
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Cari nama, merek, kode…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg pl-3 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Semua merek</option>
            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <button onClick={load} className="text-gray-400 hover:text-amber-600 px-2 py-1.5 text-sm rounded-lg hover:bg-gray-50 transition-colors">
            ↻ Refresh
          </button>
          {(search || filterBrand) && (
            <button onClick={() => { setSearch(''); setFilterBrand(''); }} className="text-xs text-gray-400 hover:text-gray-600">
              Hapus filter
            </button>
          )}
          {(search || filterBrand) && (
            <span className="ml-auto text-xs text-gray-400">{filtered.length} hasil</span>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto" />
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-red-500 text-sm">{error}</p>
            <button onClick={load} className="mt-3 text-sm text-amber-600 hover:underline">Coba lagi</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-gray-400 text-sm">
            {products.length === 0 ? 'Belum ada produk.' : 'Tidak ada produk yang sesuai filter.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left w-12" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama / Kode</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Merek</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Harga</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Unggulan</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Aktif</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p, idx) => (
                  <tr key={p.id || `row-${idx}`} className={`hover:bg-gray-50/70 transition-colors ${!p.active ? 'opacity-40' : ''}`}>
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img src={p.image} alt={p.nameId} className="w-10 h-10 object-contain rounded-lg bg-gray-100 border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">?</div>
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-medium text-gray-900 truncate text-[13px]">{p.nameId}</div>
                      <div className="text-gray-400 text-xs">{p.code} · {p.mAh ? `${p.mAh} mAh` : '—'}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.brand}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium whitespace-nowrap">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured(p)}
                        title={p.featured ? 'Hapus dari unggulan' : 'Jadikan unggulan'}
                        className={`text-lg transition-colors ${p.featured ? 'text-amber-500' : 'text-gray-200 hover:text-amber-300'}`}
                      >★</button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(p)}
                        disabled={togglingId === p.id}
                        aria-label={p.active ? 'Nonaktifkan' : 'Aktifkan'}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none disabled:cursor-wait ${p.active ? 'bg-amber-500' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${p.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        title="Edit"
                      >✎</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
