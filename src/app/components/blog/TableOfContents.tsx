'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/lib/blog';

interface TOCSection {
  h2: TableOfContentsItem;
  h3s: TableOfContentsItem[];
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const sections: TOCSection[] = [];
  let currentSection: TOCSection | null = null;
  items.forEach((item) => {
    if (item.level === 2) {
      currentSection = { h2: item, h3s: [] };
      sections.push(currentSection);
    } else if (item.level === 3 && currentSection) {
      currentSection.h3s.push(item);
    }
  });

  useEffect(() => {
    const onScroll = () => {
      const els = items
        .map((i) => document.getElementById(i.id))
        .filter((el): el is HTMLElement => el !== null);

      let active = '';
      const pos = window.scrollY + 120;
      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].offsetTop <= pos) { active = els[i].id; break; }
      }
      if (!active && els.length) active = els[0].id;
      setActiveId(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });

  const isExpanded = (s: TOCSection) =>
    expanded.has(s.h2.id) || activeId === s.h2.id || s.h3s.some((h) => h.id === activeId);

  if (!items.length) return null;

  return (
    <div className="toc-card">
      <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 font-medium">
        On this page
      </p>
      <nav className="space-y-0.5">
        {sections.map((section) => {
          const open = isExpanded(section);
          return (
            <div key={section.h2.id}>
              <div className="flex items-center gap-1">
                <a
                  href={`#${section.h2.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(section.h2.id); }}
                  className={`toc-link flex-1 ${activeId === section.h2.id ? 'active' : ''}`}
                >
                  {section.h2.title}
                </a>
                {section.h3s.length > 0 && (
                  <button
                    onClick={() => toggle(section.h2.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-0.5"
                    aria-label="Toggle subsections"
                  >
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                )}
              </div>

              {section.h3s.length > 0 && open && (
                <div className="mt-0.5 space-y-0.5">
                  {section.h3s.map((h3) => (
                    <a
                      key={h3.id}
                      href={`#${h3.id}`}
                      onClick={(e) => { e.preventDefault(); scrollTo(h3.id); }}
                      className={`toc-link toc-link-h3 ${activeId === h3.id ? 'active' : ''}`}
                    >
                      {h3.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
