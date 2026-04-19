interface QuoteProps {
  text: string;
  author: string;
}

export default function Quote({ text, author }: QuoteProps) {
  return (
    <div className="py-16 border-y border-[var(--border)]">
      <div className="container mx-auto max-w-[900px] px-6">
        <blockquote className="text-center">
          <p className="text-lg md:text-xl font-light text-[var(--text-secondary)] leading-relaxed italic max-w-2xl mx-auto">
            &ldquo;{text}&rdquo;
          </p>
          <footer className="mt-4 text-xs text-[var(--text-muted)] uppercase tracking-widest">
            — {author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
