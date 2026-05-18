import { cn } from '../../lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1320px] mx-auto px-5 lg:px-10', className)}>
      {children}
    </div>
  );
}
