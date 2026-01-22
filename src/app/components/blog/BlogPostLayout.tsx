'use client';

import React from 'react';
import { Container, Typography, Box, Chip, Button } from '@mui/material';
import { format } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { BlogPost, TableOfContentsItem } from '@/lib/blog';
import TableOfContents from './TableOfContents';
import ScrollToTop from './ScrollToTop';

interface BlogPostLayoutProps {
  post: BlogPost;
  tocItems: TableOfContentsItem[];
  children: React.ReactNode;
}
// TODO: Align hero with blog content and fix code runner
const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, tocItems, children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: '2rem',
        paddingBottom: '4rem',
        '@media (max-width: 768px)': {
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      }}
    >
      <Link href="/blog" passHref>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}
        >
          Back to Blog
        </Button>
      </Link>

      <Box
        className="blog-post-hero"
        sx={{
          width: '70%',
          maxWidth: '900px',
          margin: '0 auto 2rem auto',
          '@media (max-width: 1024px)': {
            width: '100%',
          },
          '@media (max-width: 768px)': {
            margin: '0 0 2rem 0',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 700,
            marginBottom: '1rem',
            '@media (max-width: 768px)': {
              fontSize: '1.75rem',
            },
          }}
        >
          {post.title}
        </Typography>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body1" style={{ color: '#bdbdbd' }}>
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </Typography>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AccessTimeIcon style={{ fontSize: '1.25rem', color: '#bdbdbd' }} />
            <Typography variant="body1" className="reading-time">
              {post.readingTime}
            </Typography>
          </Box>
          {post.author && (
            <Typography variant="body1" style={{ color: '#bdbdbd' }}>
              by {post.author}
            </Typography>
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: '#e5e7eb',
            marginBottom: '1rem',
            '@media (max-width: 768px)': {
              fontSize: '1rem',
            },
          }}
        >
          {post.description}
        </Typography>

        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} className="blog-tag" />
          ))}
        </Box>
      </Box>

      <Box style={{ display: 'flex', gap: '2rem', position: 'relative', justifyContent: 'center' }}>
        <Box
          className="blog-post-content prose prose-lg"
          sx={{
            width: '70%',
            maxWidth: '900px',
            margin: '0 auto',
            '@media (max-width: 1024px)': {
              width: '100%',
            },
            '@media (max-width: 768px)': {
              margin: 0,
            },
          }}
        >
          {children}
        </Box>

        {tocItems.length > 0 && (
          <Box
            style={{
              width: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: '2rem',
              alignSelf: 'flex-start',
            }}
            sx={{
              display: 'none',
              '@media (min-width: 1024px)': {
                display: 'block',
              },
            }}
          >
            <TableOfContents items={tocItems} />
          </Box>
        )}
      </Box>

      {tocItems.length > 0 && (
        <Box
          sx={{
            display: 'block',
            marginTop: '2rem',
            '@media (min-width: 1024px)': {
              display: 'none',
            },
          }}
        >
          <TableOfContents items={tocItems} />
        </Box>
      )}

      <ScrollToTop />
    </Container>
  );
};

export default BlogPostLayout;
