import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

import Protection from '@/components/Protection';

export const metadata: Metadata = {
  metadataBase: new URL('https://aatifmuneeb.in'),
  title: {
    default: 'Aatif Muneeb Khan | CSE & AI Aspirant',
    template: '%s | Aatif Muneeb Khan',
  },
  alternates: {
    canonical: '/',
  },
  description: 'Computer Science student at CUK focusing on AI/ML, web development, and innovative problem solving.',
  keywords: ['Aatif khan', 'aatifkhan', 'atif', 'atifmuneeb', 'Aatif muneeb', 'aatifmuneeb', 'AI Engineer', 'Web Developer', 'Portfolio'],
  authors: [{ name: 'Aatif Muneeb Khan' }],
  creator: 'Aatif Muneeb Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aatifmuneeb.in',
    title: 'Aatif Muneeb Khan | CSE & AI Aspirant',
    description: 'Computer Science student at CUK focusing on AI/ML, web development, and innovative problem solving.',
    siteName: 'Aatif Muneeb Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aatif Muneeb Khan | CSE & AI Aspirant',
    description: 'Computer Science student at CUK focusing on AI/ML, web development, and innovative problem solving.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <Protection />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
