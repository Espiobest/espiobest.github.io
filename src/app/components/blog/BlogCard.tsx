import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block blog-card group">
      <h2 className="text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
        {post.title}
      </h2>

      <div className="flex items-center gap-4 mb-3">
        <span className="text-xs text-[var(--text-muted)] mono">
          {format(new Date(post.date), 'MMM dd, yyyy')}
        </span>
        <span className="text-xs text-[var(--text-muted)] mono">{post.readingTime}</span>
        {post.author && (
          <span className="text-xs text-[var(--text-muted)]">by {post.author}</span>
        )}
      </div>

      <p className="text-sm text-[#777] leading-relaxed mb-4">{post.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
