'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const fps = 60;
    const totalFrames = Math.round(duration * fps);
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (frame >= totalFrames) {
        clearInterval(id);
        setCount(to);
      }
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
