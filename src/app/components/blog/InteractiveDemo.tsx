'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface InteractiveDemoProps {
  title?: string;
  src?: string; // For iframe embeds
  children?: React.ReactNode; // For inline React components
  height?: string;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  title,
  src,
  children,
  height = '500px',
}) => {
  return (
    <Box
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      {title && (
        <Typography
          variant="h6"
          style={{ marginBottom: '1rem', color: '#0070f3', fontWeight: 600 }}
        >
          {title}
        </Typography>
      )}
      {src ? (
        <iframe
          src={src}
          style={{
            width: '100%',
            height,
            border: 'none',
            borderRadius: '0.5rem',
            backgroundColor: 'rgb(28 28 34)',
          }}
          title={title || 'Interactive Demo'}
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        children
      )}
    </Box>
  );
};

export default InteractiveDemo;
