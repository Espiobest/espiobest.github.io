'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="mx-auto max-w-[900px] px-6 w-full">
        <div className="mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[var(--text)] leading-[1.06] mb-4"
            style={{ letterSpacing: '-0.025em' }}
          >
            Ayush Ravi Chandran
          </h1>
          <p className="text-base text-[var(--text-muted)] tracking-wide">
            आयुष रवि चंद्रन &nbsp;&middot;&nbsp; ஆயுஷ் ரவி சந்திரன்
          </p>
        </div>

        {/* Status */}
        <div className="mb-10 space-y-2 hero-fade" style={{ animationDelay: '120ms' }}>
          <p className="text-base text-[var(--text-secondary)]">
            CS & Mathematics @ UMass Amherst &nbsp;&middot;&nbsp; New Grad 2026
          </p>
          <p className="text-base text-[var(--text-secondary)]">
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
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 flex-wrap hero-fade" style={{ animationDelay: '220ms' }}>
          <a
            href="/documents/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[#111] font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Resume ↗
          </a>
          <a
            href="https://github.com/Espiobest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ayush-ravichandran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors hero-fade"
        style={{ animationDelay: '600ms' }}
        aria-label="Scroll down"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </button>
    </section>
  );
}
