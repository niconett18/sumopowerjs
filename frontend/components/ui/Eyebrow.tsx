import { cn } from '../../lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}

export function Eyebrow({ children, className, variant = 'light' }: EyebrowProps) {
  return (
    <div className={cn('flex items-center text-[11px] tracking-[0.14em] uppercase font-semibold', variant === 'dark' ? 'text-ink-mute' : 'text-ink-3', className)}>
      <span className={cn('block w-6 h-px mr-2.5 opacity-70', variant === 'dark' ? 'bg-hairline' : 'bg-current')} />
      {children}
    </div>
  );
}
