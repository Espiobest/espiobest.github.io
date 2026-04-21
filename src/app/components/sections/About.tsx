'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Setup = dynamic(() => import('../Setup'), { ssr: false, loading: () => null });

export default function About() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">about</p>

        <div className="grid md:grid-cols-[1fr_240px] gap-10 md:gap-16 items-start">
          {/* Text */}
          <div className="space-y-4 text-[var(--text-secondary)] leading-[1.85]">
            <p>
              Senior at UMass Amherst, CS + Math. I build things that range from data pipelines
              serving researchers to poker-playing agents - I just like making stuff that works well.
            </p>
            <p>
              I care about backend systems that are correct every time, not just most of the time.
              ML and security live nearby; I like that both punish shallow understanding. Outside of
              code: games, anime, gym, and a tendency to go one tab too deep on things adjacent to whatever I&apos;m building.
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
                ['Focus', 'Backend · Data · ML'],
                ['Open to', 'New Grad 2026 roles'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[0.68rem] text-[var(--text-muted)] uppercase tracking-[0.1em] mb-1">{k}</p>
                  <p className="text-sm text-[var(--text)]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo / Setup toggle */}
          <div className="hidden sm:flex flex-col gap-2">
            <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]" style={{ height: '280px' }}>
              {showSetup ? (
                <Setup />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/profile.jpg"
                  alt="Ayush"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.05)', display: 'block' }}
                />
              )}
            </div>
            <button
              onClick={() => setShowSetup((v) => !v)}
              className="text-[0.65rem] text-[var(--text-muted)] hover:text-[var(--accent)] tracking-wide uppercase transition-colors text-center"
            >
              {showSetup ? 'view photo' : 'view my desk ↗'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
