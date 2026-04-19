'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Background from './Background';

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
      {/* Fixed background — grain + orbs */}
      <Background />

      {/* All content sits above background layers */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <Navbar onTerminalOpen={() => setTerminalOpen(true)} />
        <main>{children}</main>
      </div>

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
