'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { format } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <Card className="blog-card">
        <CardContent>
          <Typography
            variant="h5"
            style={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem' }}
          >
            {post.title}
          </Typography>

          <Box
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}
          >
            <Typography variant="body2" style={{ color: '#bdbdbd' }}>
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <AccessTimeIcon style={{ fontSize: '1rem', color: '#bdbdbd' }} />
              <Typography variant="body2" className="reading-time">
                {post.readingTime}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" style={{ color: '#e5e7eb', marginBottom: '1rem' }}>
            {post.description}
          </Typography>

          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" className="blog-tag" />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
