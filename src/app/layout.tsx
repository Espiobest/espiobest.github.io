import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ayush Portfolio & Blog',
  description:
    'Portfolio website showcasing projects, experience, and technical blog posts by Ayush Ravi Chandran, CS & Math student at UMass Amherst.',
  keywords: [
    'Ayush Ravi Chandran',
    'UMass Amherst',
    'Software Engineering',
    'Web Development',
    'Security',
    'Blog',
    'Portfolio',
  ],
  authors: [{ name: 'Ayush Ravi Chandran' }],
  creator: 'Ayush Ravi Chandran',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
