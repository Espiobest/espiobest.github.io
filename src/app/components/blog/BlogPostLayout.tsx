'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost, TableOfContentsItem } from '@/lib/blog';
import TableOfContents from './TableOfContents';
import ScrollToTop from './ScrollToTop';

interface BlogPostLayoutProps {
  post: BlogPost;
  tocItems: TableOfContentsItem[];
  children: React.ReactNode;
}

export default function BlogPostLayout({ post, tocItems, children }: BlogPostLayoutProps) {
  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-20">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to blog
      </Link>

      {/* Hero */}
      <div className="max-w-[700px] mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)] leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-[var(--text-muted)] mono">
          <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
          <span>{post.readingTime}</span>
          {post.author && <span>by {post.author}</span>}
        </div>

        <p className="text-sm text-[#888] leading-relaxed mb-5">{post.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Body + TOC */}
      <div className="flex gap-10 justify-center relative">
        {/* Content */}
        <div className="prose-dark w-full max-w-[700px]">
          {children}
        </div>

        {/* TOC (desktop only) */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block w-[240px] shrink-0">
            <TableOfContents items={tocItems} />
          </aside>
        )}
      </div>

      {/* TOC (mobile, below content) */}
      {tocItems.length > 0 && (
        <div className="lg:hidden mt-10 max-w-[700px] mx-auto">
          <TableOfContents items={tocItems} />
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
