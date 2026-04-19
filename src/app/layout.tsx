import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';
import ClientLayout from './components/ClientLayout';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ayush Ravi Chandran',
  description:
    'CS & Math student at UMass Amherst. Building software, doing research, writing occasionally.',
  keywords: ['Ayush Ravi Chandran', 'UMass Amherst', 'Software Engineering', 'Portfolio'],
  authors: [{ name: 'Ayush Ravi Chandran' }],
  creator: 'Ayush Ravi Chandran',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
