import { getExperiences } from '@/lib/data';

export default function Experience() {
  const experiences = getExperiences();

  return (
    <section id="work" className="section">
      <div className="container mx-auto max-w-[900px] px-6">
        <p className="section-title">work</p>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.org} className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8">
              {/* Left: period */}
              <div className="md:pt-0.5">
                <p className="text-xs text-[var(--text-muted)] mono leading-relaxed">
                  {exp.period}
                </p>
              </div>

              {/* Right: content */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-[var(--text)] font-medium text-sm">{exp.title}</h3>
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
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>

                {/* Impact one-liner */}
                <p className="text-sm text-[#999] mb-3 leading-relaxed">{exp.impact}</p>

                {/* Bullet points */}
                <ul className="space-y-1.5 mb-4">
                  {exp.work.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#777]">
                      <span className="text-[var(--text-subtle)] mt-1 shrink-0">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack */}
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
