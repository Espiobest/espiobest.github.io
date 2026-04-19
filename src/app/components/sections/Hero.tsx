'use client';

import { motion } from 'framer-motion';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14">
      <div className="mx-auto max-w-[900px] px-6 w-full">
        {/* Name */}
        <motion.div className="mb-8" {...fadeUp(0)}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[var(--text)] leading-[1.05] mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            Ayush Ravi Chandran
          </h1>
          <p className="text-sm text-[var(--text-muted)] tracking-wide">
            आयुष रवि चंद्रन &nbsp;&middot;&nbsp; ஆயுஷ் ரவி சந்திரன்
          </p>
        </motion.div>

        {/* Status */}
        <motion.div className="mb-10 space-y-1.5" {...fadeUp(0.12)}>
          <p className="text-sm text-[var(--text-secondary)]">
            CS & Mathematics @ UMass Amherst &nbsp;&middot;&nbsp; New Grad 2026
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Currently: SWE Intern{' '}
            <a
              href="https://ds.cs.umass.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] hover:text-[var(--accent)] transition-colors underline underline-offset-2 decoration-[var(--border-hover)]"
            >
              @CDS-AI
            </a>
          </p>
        </motion.div>

        {/* Links */}
        <motion.div className="flex items-center gap-5 flex-wrap" {...fadeUp(0.22)}>
          <a
            href="/documents/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all duration-200"
          >
            Resume ↗
          </a>
          <a
            href="https://github.com/Espiobest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ayush-ravichandran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.4 },
          y: { delay: 0.8, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-label="Scroll down"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </motion.button>
    </section>
  );
}
