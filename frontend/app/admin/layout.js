'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [authorized, setAuthorized] = useState(isLoginPage);

  useEffect(() => {
    if (isLoginPage) { setAuthorized(true); return; }
    const token = localStorage.getItem('admin_token');
    if (!token) { router.replace('/admin/login'); return; }
    setAuthorized(true);
  }, [isLoginPage, router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  function handleLogout() {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center">
              <img src="/assets/images/logo.png" alt="SumoPower" className="h-7 w-auto" />
            </Link>
            <span className="text-gray-200 select-none">|</span>
            <Link
              href="/admin"
              className="text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors"
            >
              Dashboard
            </Link>

          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
              target="_blank"
              rel="noopener"
            >
              View site <i className="fas fa-external-link-alt ml-1"></i>
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
