interface QuoteProps {
  text: string;
  author: string;
}

export default function Quote({ text, author }: QuoteProps) {
  return (
    <div className="py-14 border-y border-[var(--border)]">
      <div className="mx-auto max-w-[900px] px-6">
        <blockquote className="max-w-xl">
          {/* Decorative mark */}
          <span className="block text-3xl text-[var(--accent)] leading-none mb-4 select-none opacity-60">&ldquo;</span>
          <p className="text-base md:text-lg font-light text-[var(--text-secondary)] leading-relaxed italic">
            {text}
          </p>
          <footer className="mt-5 text-[0.7rem] text-[var(--text-muted)] uppercase tracking-[0.12em]">
            {author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
