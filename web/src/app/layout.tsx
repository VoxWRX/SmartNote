import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Smart Note',
  description: 'A minimal, zen smart note app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
