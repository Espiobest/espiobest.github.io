'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/data';

type Project = ReturnType<typeof getProjects>[number];

export default function Projects() {
  const projects = getProjects();
  const [selected, setSelected] = useState<Project | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">projects</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <button
              key={project.name}
              onClick={() => setSelected(project)}
              className="group relative flex flex-col gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 text-left cursor-pointer w-full"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(232,197,71,0.15), 0 0 24px -8px rgba(232,197,71,0.08)' }}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                  {project.name}
                </h3>
                <span className="text-xs text-[var(--text-subtle)] group-hover:text-[var(--text-muted)] transition-colors shrink-0 mt-0.5">↗</span>
              </div>

              {/* Award — first part only, no overflow */}
              {project.awards && (
                <span className="tag tag-accent self-start max-w-full truncate" style={{ fontSize: '0.62rem' }}>
                  ★ {project.awards.split('·')[0].trim()}
                </span>
              )}

              {/* Description */}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {selected.image && (
              <div className="w-full h-44 bg-[var(--surface-2)] flex items-center justify-center overflow-hidden px-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            <div className="p-6 space-y-4">
              {/* Title + close */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium text-[var(--text)]">{selected.name}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Awards */}
              {selected.awards && (
                <div className="space-y-1">
                  {selected.awards.split('·').map((a) => (
                    <p key={a} className="text-xs text-[var(--accent)]">★ {a.trim()}</p>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5">
                {selected.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-1">
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all"
                  >
                    GitHub ↗
                  </a>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-lg bg-[var(--accent)] text-[#111] font-medium hover:opacity-90 transition-opacity"
                  >
                    View live ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
