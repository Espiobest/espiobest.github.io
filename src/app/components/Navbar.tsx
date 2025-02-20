'use client';

import { AppBar, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';

import DesktopNavbar from './NavbarDesktop';
import MobileNavbar from './NavbarMobile';

const Navbar = () => {

    const currentPath = usePathname();
    
    const isMobile = useMediaQuery('(max-width: 640px)');
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            {isMobile ? 
            (
                <MobileNavbar currentPath={currentPath}/>
            ) : (
                <DesktopNavbar currentPath={currentPath} />
            )
            }
        </AppBar>
    )
}

export default Navbar;