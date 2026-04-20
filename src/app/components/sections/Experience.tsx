import { getExperiences } from '@/lib/data';

export default function Experience() {
  const experiences = getExperiences();

  return (
    <section id="work" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">work</p>

        <div className="space-y-14">
          {experiences.map((exp, idx) => (
            <div key={exp.org} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-10">
              {/* Period */}
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 md:pt-0.5">
                <span className="text-[var(--text-muted)] mono text-xs select-none hidden md:block">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-xs text-[var(--text-secondary)] mono leading-relaxed">{exp.period}</p>
              </div>

              {/* Content */}
              <div className="pl-4 md:pl-6 border-l border-[var(--border-hover)] relative">
                <span className="absolute -left-[3px] top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50" />

                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-[var(--text)] font-medium leading-snug">{exp.title}</h3>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] text-sm hover:underline underline-offset-2 transition-colors"
                    >
                      {exp.org} ↗
                    </a>
                  </div>
                  {exp.github && (
                    <a
                      href={exp.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors shrink-0 mono"
                    >
                      repo ↗
                    </a>
                  )}
                </div>

                <p className="text-sm text-[var(--text)] mb-4 leading-relaxed">{exp.impact}</p>

                <ul className="space-y-2 mb-4">
                  {exp.work.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="text-[var(--text-muted)] mt-[3px] shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
