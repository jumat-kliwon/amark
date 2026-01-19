import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Providers } from './providers';
import { getSettingsServer } from '@/lib/settings-server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const settingsResponse = await getSettingsServer();
  const site = settingsResponse?.data?.site;

  // Default metadata
  const defaultTitle = 'Acre26 - Learning Platform';
  const defaultDescription = 'Platform pembelajaran online';

  // Use site settings if available, otherwise use defaults
  const title = site?.site_title || defaultTitle;
  const description = site?.site_description || defaultDescription;
  const keywords = site?.meta_keywords || '';
  const canonicalUrl = site?.canonical_url || site?.site_url || '';

  // Build other metadata
  const other: Record<string, string> = {};
  
  if (site?.verification?.google) {
    other['google-site-verification'] = site.verification.google;
  }
  
  if (site?.verification?.bing) {
    other['msvalidate.01'] = site.verification.bing;
  }

  const metadata: Metadata = {
    title,
    description,
    ...(keywords && { keywords }),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: site?.og?.title || title,
      description: site?.og?.description || description,
      url: site?.site_url || '',
      siteName: title,
      images: site?.og?.image
        ? [
            {
              url: site.og.image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: 'id_ID',
      type: (site?.og?.type as 'website' | 'article') || 'website',
    },
    twitter: {
      card: (site?.twitter?.card as 'summary' | 'summary_large_image') || 'summary_large_image',
      site: site?.twitter?.site || '',
      title: site?.twitter?.title || title,
      description: site?.twitter?.description || description,
      images: site?.twitter?.image ? [site.twitter.image] : [],
    },
    ...(Object.keys(other).length > 0 && { other }),
  };

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
