import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Writing() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <section id="writing" className="section">
      <div className="container mx-auto max-w-[900px] px-6">
        <div className="flex items-baseline justify-between mb-12">
          <p className="section-title mb-0">writing</p>
          <Link
            href="/blog"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            all posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">No posts yet.</p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-baseline justify-between py-4 gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#666] mt-0.5 truncate">{post.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-[var(--text-muted)] mono">{post.readingTime}</span>
                  <span className="text-xs text-[var(--text-subtle)] group-hover:text-[var(--text-muted)] transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
