'use client';

import { IconButton, Typography, Menu, MenuItem, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';
import Link from 'next/link';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const MobileNavbar = (props: { currentPath: string }) => {
  const isActive = (path: string) =>
    props.currentPath === path ? { justifyContent: 'center', fontWeight: 'bold', backgroundColor: '#3b4352' } : {justifyContent: 'center'};

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <Typography variant="h6">Ayush</Typography>
      <div>
        <IconButton color="inherit" href="https://github.com/espiobest">
          <GitHubIcon sx={{ marginRight: '0.5rem', fontSize: 30 }} />
        </IconButton>
        <IconButton color="inherit" href="https://www.linkedin.com/in/ayush-ravichandran/">
          <LinkedInIcon sx={{ marginRight: '0.5rem', fontSize: 30 }} />
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
                  href="/projects"
                  style={isActive('/projects')}
                >
                  Projects
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  component={Link}
                  href="mailto:ayushravicha@umass.edu"
                  >
                    <Button
                    variant="contained"
                    color="primary"
                    className="px-6 capitalize"
                    style={{ borderRadius: '100px' }}
                    >
                    <Typography>Contact Me</Typography>
                    </Button>
                </MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </div>
    </div>
  );
};

export default MobileNavbar;
