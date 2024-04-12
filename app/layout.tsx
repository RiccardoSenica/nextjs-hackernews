import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Tiles from '../components/custom/tiles/tiles';
import { cn } from '../utils/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hacker News newsletter by FromPixels',
  description: 'Newsletter delivering the best posts from Hacker News',
  keywords: 'newsletter, hackernews, technology, coding, programming, news'
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'flex min-h-screen items-center justify-center bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Tiles>
          <div style={{ zIndex: 2 }}>{children}</div>
        </Tiles>
        <Analytics />
      </body>
    </html>
  );
}
