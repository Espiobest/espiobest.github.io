'use client';

interface InteractiveDemoProps {
  title?: string;
  src?: string;
  children?: React.ReactNode;
  height?: string;
}

export default function InteractiveDemo({
  title,
  src,
  children,
  height = '500px',
}: InteractiveDemoProps) {
  return (
    <div className="border border-[var(--border)] rounded-xl p-5 my-6 bg-[var(--surface)]">
      {title && (
        <h4 className="text-sm font-semibold text-[#93c5fd] mb-4">{title}</h4>
      )}
      {src ? (
        <iframe
          src={src}
          style={{ width: '100%', height, border: 'none', borderRadius: '0.5rem' }}
          title={title ?? 'Interactive Demo'}
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        children
      )}
    </div>
  );
}
