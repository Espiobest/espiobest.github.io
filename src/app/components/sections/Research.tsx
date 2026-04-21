import { getResearch } from '@/lib/data';

export default function Research() {
  const items = getResearch();

  return (
    <section id="research" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">research & academic work</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm">
              <span className="tag self-start">{item.type}</span>

              <div>
                <h3 className="text-sm font-medium text-[var(--text)] mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mono">{item.venue} · {item.date}</p>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{item.description}</p>

              {Array.isArray(item.links) && item.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {item.links.map((link) => (
                    <a
                      key={`${item.title}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--accent)] hover:underline underline-offset-2"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
