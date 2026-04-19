'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';

const Terminal = dynamic(() => import('./Terminal'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      <Navbar onTerminalOpen={() => setTerminalOpen(true)} />
      <main>{children}</main>
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
