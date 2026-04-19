import { getResearch } from '@/lib/data';

export default function Research() {
  const items = getResearch();

  return (
    <section id="research" className="section">
      <div className="container mx-auto max-w-[900px] px-6">
        <p className="section-title">research & academic work</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="card p-5 flex flex-col gap-3">
              {/* Type badge */}
              <span className="tag self-start">{item.type}</span>

              <div>
                <h3 className="text-sm font-medium text-[var(--text)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mono">{item.venue} · {item.date}</p>
              </div>

              <p className="text-xs text-[#777] leading-relaxed flex-1">{item.description}</p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--accent)] hover:underline underline-offset-2 self-start"
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
