'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Setup = dynamic(() => import('../Setup'), { ssr: false });

export default function About() {
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const [modelVisible, setModelVisible] = useState(false);

  useEffect(() => {
    const el = modelContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setModelVisible(entry.isIntersecting),
      { rootMargin: '200px' }, // start loading slightly before it enters view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">about</p>

        <div className="grid md:grid-cols-[1fr_240px] gap-10 md:gap-16 items-start">
          {/* Text */}
          <div className="space-y-4 text-[var(--text-secondary)] leading-[1.85]">
            <p>
              I&apos;m a senior at UMass Amherst studying Computer Science and Mathematics. I build
              things that range from data pipelines serving researchers to poker-playing neural
              networks — I just like making stuff that works well.
            </p>
            <p>
              I care about systems that are fast, correct, and maintainable. Outside of coding
              I&apos;m into security research, competitive programming, and occasionally writing
              about things I&apos;ve dug into.
            </p>
            <p>
              Looking for new grad software engineering roles starting 2026.{' '}
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="text-[var(--text)] underline underline-offset-2 decoration-[var(--border-hover)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
              >
                Let&apos;s talk
              </button>
              .
            </p>

            {/* Fact grid */}
            <div className="pt-2 grid grid-cols-2 gap-x-8 gap-y-5">
              {[
                ['Based in', 'Massachusetts, USA'],
                ['School', 'UMass Amherst'],
                ['Focus', 'Systems · ML · Security'],
                ['Open to', 'New Grad 2026 roles'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[0.68rem] text-[var(--text-muted)] uppercase tracking-[0.1em] mb-1">{k}</p>
                  <p className="text-sm text-[var(--text)]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3D model — hidden on small mobile, shown sm+ */}
          <div className="hidden sm:flex flex-col items-center gap-3">
            <div
              ref={modelContainerRef}
              className="w-full rounded-xl overflow-hidden border border-[var(--border)]"
              style={{ background: 'transparent', height: '240px' }}
            >
              {modelVisible && <Setup />}
            </div>
            <p className="text-[0.65rem] text-[var(--text-muted)] tracking-wide uppercase">
              my desk · drag to rotate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
