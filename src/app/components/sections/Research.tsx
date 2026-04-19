import { getResearch } from '@/lib/data';

export default function Research() {
  const items = getResearch();

  return (
    <section id="research" className="section">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">research & academic work</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <span className="tag self-start">{item.type}</span>

              <div>
                <h3 className="text-sm font-medium text-[var(--text)] mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mono">{item.venue} · {item.date}</p>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{item.description}</p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent)] hover:underline underline-offset-2 self-start"
                >
                  View ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
