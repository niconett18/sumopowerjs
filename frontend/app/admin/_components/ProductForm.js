'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminCreateProduct, adminUpdateProduct } from '../../../lib/admin-api';

const BRANDS = ['Infinix','Samsung','Vivo','Oppo','Xiaomi','iPhone','Asus','Nokia'];

const EMPTY = {
  brand: 'Samsung', nameId: '', model: '', code: '',
  mAh: '', voltage: '', limitedChargeVoltage: '', compatibleFor: '',
  price: '', stock: '1', image: '', shopeeUrl: '',
  warranty: '12 bulan', type: 'Li-ion', active: true, featured: false,
};

export default function ProductForm({ product }) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm]       = useState(isEdit ? { ...product, mAh: String(product.mAh), price: String(product.price), stock: String(product.stock) } : EMPTY);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const [uploadingImage, setUploadingImage] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    setError('');
    
    try {
      const { adminUploadImage } = await import('../../../lib/admin-api');
      const url = await adminUploadImage(file);
      set('image', url);
    } catch (err) {
      setError(err.message || 'Gagal mengupload gambar');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const body = {
        ...form,
        mAh:   Number(form.mAh)   || 0,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 1,
      };
      if (isEdit) {
        await adminUpdateProduct(product.id, body);
        setSuccess('Produk berhasil diperbarui!');
      } else {
        await adminCreateProduct(body);
        setSuccess('Produk berhasil ditambahkan!');
        setForm(EMPTY);
      }
      setTimeout(() => router.push('/admin'), 1200);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete() {
    if (!confirm('Hapus permanen produk ini? Tindakan ini tidak bisa dibatalkan.')) return;
    setSaving(true);
    setError('');
    try {
      const { adminDeleteProduct } = await import('../../../lib/admin-api');
      await adminDeleteProduct(product.id);
      router.push('/admin');
    } catch (e) {
      setError(e.message || 'Gagal menghapus produk');
      setSaving(false);
    }
  }

  const Field = ({ label, id, children, hint }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Left column (2/3) ── */}
      <div className="lg:col-span-2 space-y-6">

        {/* Basic Info */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Informasi Dasar</h2>

          <Field label="Merek *" id="brand">
            <select id="brand" value={form.brand} onChange={(e) => set('brand', e.target.value)} className={cls} required>
              {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>

          <Field label="Nama Produk (ID) *" id="nameId">
            <input id="nameId" type="text" value={form.nameId} onChange={(e) => set('nameId', e.target.value)}
              placeholder="cth. Baterai Sumopower Samsung A10S / A20S / A21 SCUD-WT-N6"
              className={cls} required />
          </Field>

          <Field label="Model" id="model">
            <input id="model" type="text" value={form.model} onChange={(e) => set('model', e.target.value)}
              placeholder="cth. A10S / A20S / A21" className={cls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kode Baterai" id="code">
              <input id="code" type="text" value={form.code} onChange={(e) => set('code', e.target.value)}
                placeholder="cth. SCUD-WT-N6" className={cls} />
            </Field>
            <Field label="Tipe" id="type">
              <input id="type" type="text" value={form.type} onChange={(e) => set('type', e.target.value)}
                placeholder="Li-ion" className={cls} />
            </Field>
          </div>
        </section>

        {/* Specs */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Spesifikasi Teknis</h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kapasitas (mAh)" id="mAh">
              <input id="mAh" type="number" min="0" value={form.mAh} onChange={(e) => set('mAh', e.target.value)}
                placeholder="4900" className={cls} />
            </Field>
            <Field label="Voltase" id="voltage">
              <input id="voltage" type="text" value={form.voltage} onChange={(e) => set('voltage', e.target.value)}
                placeholder="cth. 3.85 V - 4.4 V" className={cls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tegangan Maks Pengisian" id="limitedChargeVoltage">
              <input id="limitedChargeVoltage" type="text" value={form.limitedChargeVoltage}
                onChange={(e) => set('limitedChargeVoltage', e.target.value)}
                placeholder="cth. 4.4 V" className={cls} />
            </Field>
            <Field label="Garansi" id="warranty">
              <input id="warranty" type="text" value={form.warranty} onChange={(e) => set('warranty', e.target.value)}
                placeholder="12 bulan" className={cls} />
            </Field>
          </div>

          <Field label="Kompatibel Dengan" id="compatibleFor"
            hint="Pisahkan model HP dengan garis miring ( / )">
            <textarea id="compatibleFor" rows={3} value={form.compatibleFor}
              onChange={(e) => set('compatibleFor', e.target.value)}
              placeholder="cth. Samsung A10S / A20S / A21"
              className={cls + ' resize-none'} />
          </Field>
        </section>

        {/* Image & URL */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Gambar & Tautan</h2>



          <Field label="Gambar Produk" id="image" hint="Upload gambar dalam format PNG, JPG, atau WEBP">
            <label className={`w-full flex items-center justify-center py-3 rounded-lg text-sm font-medium border-2 border-dashed transition-colors cursor-pointer ${uploadingImage ? 'bg-amber-50 text-amber-500 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}>
              <span className="flex items-center gap-2">
                {uploadingImage ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengupload...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Pilih Gambar dari Komputer
                  </>
                )}
              </span>
              <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} disabled={uploadingImage} />
            </label>
          </Field>

          {form.image && (
            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={form.image} alt="Preview" className="h-20 w-20 object-contain rounded" onError={(e) => { e.target.style.display='none'; }} />
                <p className="text-xs text-gray-400">Preview gambar</p>
              </div>
              <button 
                type="button" 
                onClick={() => set('image', '')}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                title="Hapus gambar ini dari produk"
              >
                Hapus
              </button>
            </div>
          )}

          <Field label="URL Shopee" id="shopeeUrl">
            <input id="shopeeUrl" type="url" value={form.shopeeUrl} onChange={(e) => set('shopeeUrl', e.target.value)}
              placeholder="https://shopee.co.id/..." className={cls} />
          </Field>
        </section>
      </div>

      {/* ── Right column (1/3) ── */}
      <div className="space-y-6">

        {/* Pricing */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Harga & Stok</h2>
          <Field label="Harga (IDR)" id="price">
            <input id="price" type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)}
              placeholder="120000" className={cls} />
          </Field>
          <Field label="Stok" id="stock">
            <input id="stock" type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)}
              placeholder="1" className={cls} />
          </Field>
        </section>

        {/* Status */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Status</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)}
              className="w-4 h-4 accent-amber-500" />
            <span className="text-sm text-gray-700">Produk aktif (tampil di katalog)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)}
              className="w-4 h-4 accent-amber-500" />
            <span className="text-sm text-gray-700">Produk unggulan</span>
          </label>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-2 text-sm">{success}</div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors"
          >
            {saving ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="w-full text-gray-500 hover:text-gray-800 text-sm py-2 transition-colors"
          >
            Batal
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="w-full mt-4 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 font-medium rounded-xl py-2.5 text-sm transition-colors"
            >
              Hapus Produk
            </button>
          )}
        </section>
      </div>
    </form>
  );
}
