import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Noto_Sans_JP } from 'next/font/google';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import './globals.css';

const fullConfig = resolveConfig(tailwindConfig);

const NotoSansJP = Noto_Sans_JP({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false, // https://github.com/vercel/next.js/pull/44594
});

export function generateViewport(): Viewport {
  return {
    themeColor: fullConfig.theme.colors.pink[700],
  };
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://kanojodb.com`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: { default: 'Kanojo', template: '%s | Kanojo' },
  description: 'A community-run database for gravure idols.',
  keywords: ['gravure', 'idol', 'database', 'community', 'kanojo'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html
        lang="en"
        className={`${NotoSansJP.className}`}
        suppressHydrationWarning
      >
        <body className="bg-white text-pink-900 dark:bg-pink-950 dark:text-white">
          <ThemeProvider attribute="class">
            <div className="flex min-h-screen flex-col items-stretch">
              <SiteHeader />
              <main className="flex flex-grow flex-col items-start justify-normal">
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
