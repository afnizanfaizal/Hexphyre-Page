import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

import { getSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteTitle = settings?.siteTitle || 'Hexphyre';
  const siteDescription = settings?.siteDescription || 'AI R&D Solution Provider';

  return {
    metadataBase: new URL('https://hexphyre.com'),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: ['AI', 'Artificial Intelligence', 'R&D', 'Scientific Accelerator', 'Hexphyre'],
    authors: [{ name: 'Hexphyre Technologies' }],
    creator: 'Hexphyre Technologies',
    publisher: 'Hexphyre Technologies',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://hexphyre.com',
      siteName: siteTitle,
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: '/cover.png',
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: ['/cover.png'],
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/favicon.ico',
      apple: '/icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        {/* Elfsight Cookie Consent | Hexphyre Consent Widget */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
        <div className="elfsight-app-1354115f-b19c-46c9-8433-ec0015796206" data-elfsight-app-lazy></div>
      </body>
    </html>
  );
}
