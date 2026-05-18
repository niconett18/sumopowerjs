import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F1115',
        'ink-2': '#1A1D24',
        'ink-3': '#4B5160',
        'ink-mute': '#8A8F9A',
        hairline: '#E6E8EC',
        'hairline-2': '#EFF1F4',
        paper: '#FAFAFA',
        'paper-2': '#F3F4F6',
        surface: '#FFFFFF',
        yellow: '#F5B800',
        'yellow-2': '#E5A800',
        'yellow-ink': '#1A1300',
        success: '#16A34A',
        danger: '#B83A26',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,17,21,.04), 0 8px 24px -12px rgba(15,17,21,.08)',
        pop: '0 20px 48px -20px rgba(15,17,21,.18), 0 4px 12px -6px rgba(15,17,21,.08)',
      },
      keyframes: {
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fade: 'fade .2s ease',
        rise: 'rise .3s cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
};

export default config;
