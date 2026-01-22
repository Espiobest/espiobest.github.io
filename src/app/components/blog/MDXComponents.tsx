'use client';

import React from 'react';
import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import CodeBlock from './CodeBlock';
import InteractiveDemo from './InteractiveDemo';
import InteractiveCodeRunner from './InteractiveCodeRunner';
import BufferOverflowDemo from './BufferOverflowDemo';

/* eslint-disable @typescript-eslint/no-explicit-any */
const MDXComponents = {
  h1: (props: any) => (
    <Typography
      variant="h3"
      component="h1"
      style={{ marginTop: '2rem', marginBottom: '1rem', color: '#60a5fa', fontWeight: 600 }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <Typography
      variant="h4"
      component="h2"
      style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#60a5fa', fontWeight: 600 }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <Typography
      variant="h5"
      component="h3"
      style={{ marginTop: '1.25rem', marginBottom: '0.5rem', color: '#60a5fa', fontWeight: 600 }}
      {...props}
    />
  ),
  p: (props: any) => (
    <Typography
      variant="body1"
      style={{ marginBottom: '1rem', color: '#e5e7eb', lineHeight: 1.8 }}
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      style={{ color: '#0070f3', textDecoration: 'underline' }}
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  ul: (props: any) => (
    <Box
      component="ul"
      style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: '#e5e7eb' }}
      {...props}
    />
  ),
  ol: (props: any) => (
    <Box
      component="ol"
      style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: '#e5e7eb' }}
      {...props}
    />
  ),
  li: (props: any) => (
    <li style={{ marginBottom: '0.5rem', color: '#e5e7eb' }} {...props} />
  ),
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return (
        <code
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.2em 0.4em',
            borderRadius: '0.25rem',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.9em',
            color: '#60a5fa',
          }}
          {...props}
        />
      );
    }
    // Block code (handled by CodeBlock component)
    return <CodeBlock {...props} />;
  },
  pre: (props: any) => <div className="code-block-wrapper">{props.children}</div>,
  img: (props: any) => {
    // Use regular img tag for GIFs to preserve animation
    if (props.src?.endsWith('.gif')) {
      return (
        <img
          {...props}
          style={{
            borderRadius: '0.5rem',
            margin: '1.5rem 0',
            maxWidth: '100%',
            height: 'auto'
          }}
          alt={props.alt || ''}
        />
      );
    }
    // Use Next.js Image for other formats
    return (
      <Image
        {...props}
        width={800}
        height={450}
        style={{ borderRadius: '0.5rem', margin: '1.5rem 0' }}
        alt={props.alt || ''}
        unoptimized
      />
    );
  },
  blockquote: (props: any) => (
    <Box
      component="blockquote"
      style={{
        borderLeft: '4px solid #0070f3',
        paddingLeft: '1rem',
        marginLeft: 0,
        marginBottom: '1rem',
        fontStyle: 'italic',
        color: '#bdbdbd',
      }}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />
  ),
  b: (props: any) => (
    <b style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />
  ),
  em: (props: any) => (
    <em style={{ color: '#e5e7eb' }} {...props} />
  ),
  InteractiveDemo,
  InteractiveCodeRunner,
  BufferOverflowDemo,
};

export default MDXComponents;
