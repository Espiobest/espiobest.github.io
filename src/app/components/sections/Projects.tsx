'use client';

import { useState } from 'react';
import { getProjects } from '@/lib/data';

type Project = ReturnType<typeof getProjects>[number];

export default function Projects() {
  const projects = getProjects();
  const [selected, setSelected] = useState<Project>(projects[0]);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">projects</p>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Card grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {projects.map((project) => {
              const isSelected = selected.name === project.name;
              return (
                <button
                  key={project.name}
                  onClick={() => setSelected(project)}
                  className={`group relative flex flex-col gap-2.5 p-4 rounded-xl border text-left w-full transition-all duration-200 ${
                    isSelected
                      ? 'border-[var(--accent)]/40 bg-[var(--surface-2)]'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-medium leading-snug transition-colors duration-200 ${
                      isSelected ? 'text-[var(--accent)]' : 'text-[var(--text)] group-hover:text-[var(--accent)]'
                    }`}>
                      {project.name}
                    </h3>
                    {project.awards && (
                      <span className="text-[var(--accent)] text-xs shrink-0 mt-0.5">★</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-auto pt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky detail panel */}
          <div className="lg:sticky lg:top-20">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              {/* Image */}
              {selected.image ? (
                <div className="w-full h-40 bg-[var(--surface-2)] flex items-center justify-center px-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={selected.name}
                    src={selected.image}
                    alt={selected.name}
                    className="max-h-full max-w-full object-contain"
                    style={{ animation: 'fadeIn 0.2s ease' }}
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-[var(--surface-2)] flex items-center justify-center">
                  <span className="text-3xl text-[var(--text-subtle)]">{selected.name[0]}</span>
                </div>
              )}

              <div className="p-5 space-y-3" key={selected.name} style={{ animation: 'fadeIn 0.15s ease' }}>
                <h2 className="text-base font-medium text-[var(--text)]">{selected.name}</h2>

                {selected.awards && (
                  <div className="space-y-0.5">
                    {selected.awards.split('·').map((a) => (
                      <p key={a} className="text-[0.7rem] text-[var(--accent)]">★ {a.trim()}</p>
                    ))}
                  </div>
                )}

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>

                <div className="flex flex-wrap gap-1">
                  {selected.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  {selected.github && (
                    <a href={selected.github} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all">
                      GitHub ↗
                    </a>
                  )}
                  {selected.link && (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#111] font-medium hover:opacity-90 transition-opacity">
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
