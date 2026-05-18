// tailwind.config.ts — drop into Next.js project root
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:          '#0F1115',
        'ink-2':      '#1A1D24',
        'ink-3':      '#4B5160',
        'ink-mute':   '#8A8F9A',
        hairline:     '#E6E8EC',
        'hairline-2': '#EFF1F4',
        paper:        '#FAFAFA',
        'paper-2':    '#F3F4F6',
        surface:      '#FFFFFF',
        yellow:       '#F5B800',
        'yellow-2':   '#E5A800',
        'yellow-ink': '#1A1300',
        success:      '#16A34A',
        danger:       '#B83A26',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 4px-baseline scale that matches the mockup
        'eyebrow': ['11px', { letterSpacing: '0.14em', lineHeight: '1.4' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        container: '1320px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '10px',
        xl: '16px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,17,21,.04), 0 8px 24px -12px rgba(15,17,21,.08)',
        pop:  '0 20px 48px -20px rgba(15,17,21,.18), 0 4px 12px -6px rgba(15,17,21,.08)',
      },
      keyframes: {
        fade: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fade:    'fade 0.2s ease',
        rise:    'rise 0.3s cubic-bezier(.2,.8,.2,1)',
        'fade-in': 'fadeIn 0.35s ease',
      },
    },
  },
  plugins: [],
};

export default config;
