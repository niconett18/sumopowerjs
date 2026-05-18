'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import { Eyebrow } from '../../../components/ui/Eyebrow';
import Grainient from '../_components/Grainient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus]     = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Store token for legacy admin-api compat
        if (data.token) localStorage.setItem('admin_token', data.token);
        setStatus('success');
        setMessage('Login berhasil. Mengalihkan...');
        router.push('/admin');
      } else {
        setStatus('error');
        setMessage(data.error || 'Username atau password salah.');
      }
    } catch {
      setStatus('error');
      setMessage('Tidak dapat terhubung ke server.');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      
      {/* Left — form (White Theme) */}
      <div className="bg-surface grid place-items-center p-10 lg:p-12 relative">
        <div className="w-full max-w-[380px]">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-ink-3" />
            <Eyebrow>Masuk ke akun admin</Eyebrow>
          </div>
          <h3 className="font-semibold text-[28px] text-ink tracking-tight mb-1">Selamat datang kembali</h3>
          <p className="text-[15px] text-ink-3 mb-8">Masukkan kredensial Anda untuk mengakses dasbor administrasi.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] uppercase tracking-widest font-semibold text-ink-3 block mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="sumopoweradmin123"
                className="w-full border border-hairline rounded-[4px] px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-mute bg-surface outline-none focus:border-ink transition"
              />
            </div>
            <div>
              <label className="text-[12px] uppercase tracking-widest font-semibold text-ink-3 block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-hairline rounded-[4px] px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-mute bg-surface outline-none focus:border-ink transition"
              />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-ink-3 cursor-pointer">
                <input type="checkbox" className="accent-ink" />
                Tetap masuk
              </label>
              <a href="#" className="text-ink-3 hover:text-ink transition-colors">Lupa password?</a>
            </div>

            {/* Status alert */}
            {status === 'error' && (
              <div className="bg-danger/10 border border-danger/30 text-danger rounded-[4px] px-3.5 py-3 text-[13px]">
                {message}
              </div>
            )}
            {status === 'success' && (
              <div className="bg-success/10 border border-success/30 text-success rounded-[4px] px-3.5 py-3 text-[13px]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-ink hover:bg-ink-2 text-paper font-semibold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {status === 'loading' ? 'Memproses...' : 'Masuk ke dasbor'}
              {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/" className="text-[13px] text-ink-3 hover:text-ink transition-colors">
              Bukan admin? Kembali ke beranda
            </a>
          </div>
        </div>
      </div>

      {/* Right — Grainient */}
      <div className="relative hidden lg:flex flex-col justify-end p-12 overflow-hidden bg-black">
        <Grainient
          color1="#ffc200"
          color2="#b5b5b5"
          color3="#acbcd3"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5.9}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={-18}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={1.9}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1.1}
          centerX={0}
          centerY={0}
          zoom={1.15}
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 max-w-md">
          <h2 className="text-[40px] font-medium tracking-tight leading-[1.1] text-white mt-6 mb-4 drop-shadow-md">
            Kelola inventaris cerdas <br /> dengan SumoPower
          </h2>
          <p className="text-[15px] text-white/90 font-medium leading-[1.6] drop-shadow-md">
            Kelola portofolio, analisis performa, dan buat keputusan berdasarkan data dengan platform manajerial profesional kami.
          </p>
        </div>
      </div>

    </div>
  );
}
