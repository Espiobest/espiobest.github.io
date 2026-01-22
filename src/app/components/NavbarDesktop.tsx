import React from 'react';
import Link from 'next/link';
import { Toolbar, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const DesktopNavbar = (props: { currentPath: string }) => {
  const isActive = (path: string) => {
    const isBlogActive = path === '/blog' && props.currentPath.startsWith('/blog');
    const isExactMatch = props.currentPath === path;

    return isBlogActive || isExactMatch
      ? { fontWeight: 'bold', textDecoration: 'underline', color: '#0070f3' }
      : {};
  };

  return (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" passHref>
          <h1 className="text-3xl font-semibold">Ayush</h1>
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/" passHref>
            <Typography variant="h6" className={'section-link'} style={isActive('/')}>
              Home
            </Typography>
          </Link>

          <Link href="/experience" passHref>
            <Typography variant="h6" className={'section-link'} style={isActive('/experience')}>
              Experience
            </Typography>
          </Link>

          <Link href="/projects" passHref>
            <Typography variant="h6" className={'section-link'} style={isActive('/projects')}>
              Projects
            </Typography>
          </Link>

          <Link href="/blog" passHref>
            <Typography variant="h6" className={'section-link'} style={isActive('/blog')}>
              Blog
            </Typography>
          </Link>

          <Link href="/contact" passHref>
            <Typography variant="h6" className={'section-link'} style={isActive('/contact')}>
              Contact
            </Typography>
          </Link>

          <IconButton
            className={'nav-link'}
            color="inherit"
            href="https://github.com/espiobest"
            target="_blank"
          >
            <GitHubIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            className={'nav-link'}
            color="inherit"
            href="https://www.linkedin.com/in/ayush-ravichandran/"
            target="_blank"
          >
            <LinkedInIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Toolbar>
    </div>
  );
};

export default DesktopNavbar;
