'use client';

import dynamic from 'next/dynamic';

const Setup = dynamic(() => import('../Setup'), { ssr: false });

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container mx-auto max-w-[900px] px-6">
        <p className="section-title">about</p>

        <div className="grid md:grid-cols-[1fr_280px] gap-12 items-start">
          {/* Text */}
          <div className="space-y-4 text-[#b0b0b0] leading-relaxed">
            <p>
              I&apos;m a senior at UMass Amherst studying Computer Science and Mathematics. I build
              things that range from data pipelines serving researchers to poker-playing neural
              networks — I just like making stuff that works well.
            </p>
            <p>
              I care about systems that are fast, correct, and maintainable. Outside of coding,
              I&apos;m into security research, competitive programming, and occasionally writing
              about things I&apos;ve dug into.
            </p>
            <p>
              I&apos;m looking for new grad software engineering roles starting 2026. If you&apos;re
              working on something interesting,{' '}
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="text-[var(--text)] underline underline-offset-2 hover:text-[var(--accent)] transition-colors"
              >
                let&apos;s talk
              </button>
              .
            </p>

            {/* Quick facts */}
            <div className="pt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {[
                ['Based in', 'Massachusetts, USA'],
                ['School', 'UMass Amherst'],
                ['Focus', 'Systems · ML · Security'],
                ['Open to', 'New Grad 2026 roles'],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="text-[var(--text-muted)] text-xs uppercase tracking-widest">{k}</span>
                  <p className="text-[var(--text)] text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3D model */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-full aspect-square rounded-xl overflow-hidden border border-[var(--border)]"
              style={{ background: 'transparent' }}
            >
              <Setup />
            </div>
            <p className="text-xs text-[var(--text-muted)] text-center">my desk setup — drag to rotate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
