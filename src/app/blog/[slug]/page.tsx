import React from 'react';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, serializePost, extractTableOfContents } from '@/lib/blog';
import BlogPostClient from '@/app/components/blog/BlogPostClient';
import type { Metadata } from 'next';

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
  const postData = await serializePost(slug);

  if (!postData) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${postData.title} | Ayush's Blog`,
    description: postData.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postData = await serializePost(slug);

  if (!postData) {
    notFound();
  }

  const tocItems = extractTableOfContents(postData.content || '');

  return <BlogPostClient postData={postData} tocItems={tocItems} />;
}
