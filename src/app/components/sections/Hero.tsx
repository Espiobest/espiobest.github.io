'use client';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-14">
      <div className="container mx-auto max-w-[900px] px-6">
        {/* Name block */}
        <div className="mb-8">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--text)] leading-none mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ayush Ravi Chandran
          </h1>
          <p
            className="text-base text-[var(--text-muted)]"
            style={{ fontFeatureSettings: '"kern"' }}
          >
            आयुष रवि चंद्रन &nbsp;·&nbsp; ஆயுஷ் ரவி சந்திரன்
          </p>
        </div>

        {/* Status */}
        <div className="mb-10 space-y-1">
          <p className="text-[var(--text-secondary)] text-sm">
            CS & Mathematics @ UMass Amherst &nbsp;·&nbsp; New Grad 2026
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            Currently: SWE Intern{' '}
            <a
              href="https://ds.cs.umass.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] hover:text-[var(--accent)] transition-colors underline underline-offset-2"
            >
              @CDS-AI
            </a>
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 flex-wrap">
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
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('work')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors"
          aria-label="Scroll down"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>
      </div>
    </section>
  );
}
