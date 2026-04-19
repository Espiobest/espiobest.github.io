'use client';

import { useEffect, useRef } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInSection({ children, delay = 0, className }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay ? `${delay}ms` : '';
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { rootMargin: '-80px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
