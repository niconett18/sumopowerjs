'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="font-black text-neutral-900 text-lg">S</span>
              </div>
              <span className="font-black tracking-tight text-xl">SumoPower</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Reliable replacement batteries engineered for everyday performance. Honest capacity, safe chemistry, and consistent fitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-tight">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-amber-400 text-sm font-medium transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/pages/products" className="text-neutral-400 hover:text-amber-400 text-sm font-medium transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/pages/about" className="text-neutral-400 hover:text-amber-400 text-sm font-medium transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-tight">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                <i className="fas fa-map-marker-alt text-amber-400 mt-1"></i>
                <span>Jl. Gusti Pertama 9<br />Jakarta Utara, 14250</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <i className="fas fa-envelope text-amber-400"></i>
                <a href="mailto:officialsumopower@gmail.com" className="hover:text-amber-400 transition-colors">officialsumopower@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <i className="fas fa-phone text-amber-400"></i>
                <a href="https://wa.me/6288976772696" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+62 889-7677-2696</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-tight">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-400 hover:text-neutral-900 hover:border-amber-400 transition-all">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-400 hover:text-neutral-900 hover:border-amber-400 transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-400 hover:text-neutral-900 hover:border-amber-400 transition-all">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} SumoPower. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
