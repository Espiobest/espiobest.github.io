'use client';

import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { usePathname } from 'next/navigation';

const Navbar = ({ mode, setMode }) => {

    const currentPath = usePathname();
    const isActive = (path: string) => (currentPath === path ? { fontWeight: 'bold', textDecoration: 'underline', color:'#0070f3'} : {});
    
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar style={{ justifyContent: 'flex-end' }}>
                <Link href="/" passHref>
                    <Typography variant="h6" className={"section-link"} style={isActive('/')}>
                        Home
                    </Typography>
                </Link>

                <Link href="/projects" passHref>
                    <Typography variant="h6" className={"section-link"} style={isActive('/projects')}>
                        Projects
                    </Typography>
                </Link>

                <Link href="/contact" passHref>
                    <Typography variant="h6" className={"section-link"} style={isActive('/contact')}>
                        Contact
                    </Typography>
                </Link>
                <IconButton className={"nav-link"} color="inherit" href="https://github.com/espiobest" target="_blank">
                    <GitHubIcon sx={{fontSize: 40}} />
                </IconButton>
                <IconButton className={"nav-link"} color="inherit" href="https://www.linkedin.com/in/ayush-ravichandran/" target="_blank">
                    <LinkedInIcon sx={{fontSize: 40}}  />
                </IconButton>
                <Switch onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;