'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TerminalIcon from '@mui/icons-material/Terminal';
import Tooltip from '@mui/material/Tooltip';

const Terminal = dynamic(() => import('./Terminal'), { ssr: false });

const Footer: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+` to toggle terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Box component="footer" className="w-full p-4 text-center text-gray-400">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <Typography variant="body2" className="text-sm">
            Built with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            using Next.js and Material UI.
          </Typography>
          <Tooltip title="Open Terminal (Ctrl+`)" arrow>
            <IconButton
              onClick={() => setTerminalOpen(true)}
              sx={{
                color: '#60a5fa',
                '&:hover': {
                  color: '#3b82f6',
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                },
              }}
              size="small"
            >
              <TerminalIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
};

export default Footer;
