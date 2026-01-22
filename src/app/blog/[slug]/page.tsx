import React from 'react';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, extractTableOfContents } from '@/lib/blog';
import BlogPostLayout from '@/app/components/blog/BlogPostLayout';
import type { Metadata } from 'next';
import 'highlight.js/styles/github-dark.css';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Ayush's Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTableOfContents(post.content || '');

  // Dynamically import the MDX file
  let MDXContent;
  try {
    MDXContent = (await import(`../../../../content/blog/${slug}.mdx`)).default;
  } catch (error) {
    console.error(`Failed to import MDX file for slug: ${slug}`, error);
    notFound();
  }

  return (
    <BlogPostLayout post={post} tocItems={tocItems}>
      <MDXContent />
    </BlogPostLayout>
  );
}
