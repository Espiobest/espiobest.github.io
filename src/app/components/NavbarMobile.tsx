'use client';

import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TerminalIcon from '@mui/icons-material/Terminal';
import React, { useState } from 'react';
import Link from 'next/link';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Terminal from './Terminal';

const MobileNavbar = (props: { currentPath: string }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  const isActive = (path: string) => {
    const isBlogActive = path === '/blog' && props.currentPath.startsWith('/blog');
    const isExactMatch = props.currentPath === path;

    return isBlogActive || isExactMatch
      ? { justifyContent: 'center', fontWeight: 'bold', backgroundColor: '#3b4352' }
      : { justifyContent: 'center' };
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <Link href="/" passHref>
        <h1 className="text-xl font-semibold">Ayush</h1>
      </Link>
      <div>
        <IconButton color="inherit" href="https://github.com/espiobest">
          <GitHubIcon sx={{ marginRight: '0.5rem', fontSize: 30 }} />
        </IconButton>
        <IconButton color="inherit" href="https://www.linkedin.com/in/ayush-ravichandran/">
          <LinkedInIcon sx={{ marginRight: '0.5rem', fontSize: 30 }} />
        </IconButton>
        <IconButton
          className={'nav-link'}
          color="inherit"
          onClick={() => setTerminalOpen(true)}
          title="Open Terminal"
        >
          <TerminalIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <PopupState variant="popover" popupId="mobile-menu-popup">
          {(popupState) => (
            <>
              <IconButton
                {...bindTrigger(popupState)}
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{
                  transition: 'background-color 0.3s ease',
                  borderRadius: '50%',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                style={{ color: 'white', textAlign: 'center' }}
                PaperProps={{
                  sx: {
                    borderRadius: '12px',
                    minWidth: '150px',
                  },
                }}
              >
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="/"
                  style={isActive('/')}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="/experience"
                  style={isActive('/experience')}
                >
                  Experience
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="/projects"
                  style={isActive('/projects')}
                >
                  Projects
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="/blog"
                  style={isActive('/blog')}
                >
                  Blog
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="/contact"
                  style={isActive('/contact')}
                >
                  Contact
                </MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
        <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </div>
  );
};

export default MobileNavbar;
