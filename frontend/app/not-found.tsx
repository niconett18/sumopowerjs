import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink px-4">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
      <p className="text-xl text-ink-3 mb-8">Halaman tidak ditemukan.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
