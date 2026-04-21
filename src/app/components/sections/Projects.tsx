'use client';

import { useState } from 'react';
import { getProjects } from '@/lib/data';

type Project = ReturnType<typeof getProjects>[number];

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="mt-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--surface-2)] overflow-hidden"
      style={{ animation: 'fadeIn 0.2s ease' }}>
      {project.image && (
        <div className="w-full h-36 bg-[#1e1e1e] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.name} className="max-h-full max-w-full object-contain" />
        </div>
      )}
      <div className="p-4 space-y-2.5">
        {project.awards && (
          <div className="space-y-0.5">
            {project.awards.split('·').map((a) => (
              <p key={a} className="text-[0.7rem] text-[var(--accent)]">★ {a.trim()}</p>
            ))}
          </div>
        )}
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[rgba(99,157,255,0.3)] text-[rgba(99,157,255,0.9)] hover:border-[rgba(99,157,255,0.6)] hover:text-[rgba(99,157,255,1)] transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub ↗
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#111] font-medium hover:opacity-90 transition-opacity">
              Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = getProjects();
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">projects</p>

        {/* Desktop layout */}
        <div className="hidden lg:block relative lg:pr-[304px]">
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
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                      {project.awards && <span className="text-[var(--accent)] text-xs">★</span>}
                      {project.year && <span className="text-[0.65rem] text-[var(--text-muted)] mono">{project.year}</span>}
                    </div>
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

          {/* Detail panel */}
          <div className="absolute top-0 right-0 w-[280px]">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              {selected.image ? (
                <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: '#1e1e1e' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img key={selected.name} src={selected.image} alt={selected.name}
                    className="max-h-full max-w-full object-contain"
                    style={{ animation: 'fadeIn 0.35s ease' }} />
                </div>
              ) : (
                <div className="w-full h-40 bg-[var(--surface-2)] flex items-center justify-center">
                  <span className="text-3xl text-[var(--text-subtle)]">{selected.name[0]}</span>
                </div>
              )}
              <div className="p-5 space-y-3" key={selected.name} style={{ animation: 'fadeIn 0.35s ease' }}>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-base font-medium text-[var(--text)]">{selected.name}</h2>
                  {selected.year && <span className="text-xs text-[var(--text-muted)] mono shrink-0">{selected.year}</span>}
                </div>
                {selected.awards && (
                  <div className="space-y-0.5">
                    {selected.awards.split('·').map((a) => (
                      <p key={a} className="text-[var(--accent)] text-[0.7rem]">★ {a.trim()}</p>
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
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[rgba(99,157,255,0.3)] text-[rgba(99,157,255,0.9)] hover:border-[rgba(99,157,255,0.6)] hover:text-[rgba(99,157,255,1)] transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
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

        {/* Mobile layout — accordion */}
        <div className="lg:hidden flex flex-col gap-3">
          {projects.map((project) => {
            const isOpen = expandedMobile === project.name;
            return (
              <div key={project.name}>
                <button
                  onClick={() => setExpandedMobile(isOpen ? null : project.name)}
                  className={`group flex flex-col gap-2.5 p-4 rounded-xl border text-left w-full transition-all duration-200 ${
                    isOpen
                      ? 'border-[var(--accent)]/40 bg-[var(--surface-2)]'
                      : 'border-[var(--border)] bg-[var(--surface)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-medium leading-snug ${isOpen ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                      {project.awards && <span className="text-[var(--accent)] text-xs">★</span>}
                      {project.year && <span className="text-[0.65rem] text-[var(--text-muted)] mono">{project.year}</span>}
                      <span className={`text-[var(--text-muted)] text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>↓</span>
                    </div>
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
                {isOpen && <ProjectDetails project={project} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
