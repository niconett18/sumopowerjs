import { cn } from '../../lib/cn';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'ghost' | 'outline-dark';
  href?: string;
  withArrow?: boolean;
}

const variants = {
  primary:
    'bg-ink text-paper hover:bg-ink-2',
  yellow:
    'bg-yellow text-yellow-ink hover:bg-yellow-2',
  ghost:
    'bg-surface text-ink border border-hairline hover:border-ink',
  'outline-dark':
    'bg-transparent text-paper border border-[#2c2f36] hover:border-[#4b5160] hover:bg-white/5',
};

export function Button({
  variant = 'primary',
  className,
  children,
  href,
  withArrow,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'h-11 px-5 rounded-[6px]',
    'text-sm font-medium leading-none',
    'whitespace-nowrap transition-colors',
    'shrink-0',
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="inline-flex items-center gap-2 leading-none">{children}</span>
      {withArrow && (
        <ArrowRight
          className="w-4 h-4 shrink-0"
          strokeWidth={2}
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={baseClasses} {...props}>
      {content}
    </button>
  );
}
