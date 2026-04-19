'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'work', href: '/#work' },
  { label: 'projects', href: '/#projects' },
  { label: 'research', href: '/#research' },
  { label: 'writing', href: '/#writing' },
  { label: 'contact', href: '/#contact' },
];

interface NavbarProps {
  onTerminalOpen: () => void;
}

export default function Navbar({ onTerminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto max-w-[900px] px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            ayush
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="w-px h-4 bg-[var(--border)]" />

            {/* Terminal toggle */}
            <button
              onClick={onTerminalOpen}
              title="Open terminal (Ctrl + `)"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Open terminal"
            >
              <TerminalIcon />
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Espiobest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </nav>

          {/* Mobile: icons + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onTerminalOpen}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Open terminal"
            >
              <TerminalIcon />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md">
            <nav className="container mx-auto max-w-[900px] px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-left text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://github.com/Espiobest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                github
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

/* ── Inline SVG icons (no icon library needed) ── */

function TerminalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
