import type { Metadata, Viewport } from 'next';

import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';
import { Noto_Sans_JP } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';
import './globals.css';

const fullConfig = resolveConfig(tailwindConfig);

const NotoSansJP = Noto_Sans_JP({
  preload: false, // https://github.com/vercel/next.js/pull/44594
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

/**
 * Generate the viewport meta tags for the site
 * @returns The viewport meta tags
 */
export function generateViewport(): Viewport {
  return {
    themeColor: fullConfig.theme.colors.pink[700],
  };
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://kanojodb.com`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  description: 'A community-run database for gravure idols.',
  keywords: ['gravure', 'idol', 'database', 'community', 'kanojo'],
  metadataBase: new URL(defaultUrl),
  title: { default: 'Kanojo', template: '%s | Kanojo' },
};

/**
 * The root layout for the site
 * @param props - The component props
 * @param props.children - The children to render
 * @returns The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html
        className={`${NotoSansJP.className}`}
        lang="en"
        suppressHydrationWarning
      >
        <body className="bg-white text-pink-900 dark:bg-pink-950 dark:text-white">
          <ThemeProvider attribute="class">
            <div className="flex min-h-screen flex-col items-stretch">
              <SiteHeader />
              <main className="flex grow flex-col items-start justify-normal">
                {children}
              </main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
