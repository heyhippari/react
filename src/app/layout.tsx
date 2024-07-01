import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import './globals.css';

const fullConfig = resolveConfig(tailwindConfig);

const NotoSansJP = Noto_Sans_JP({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false, // https://github.com/vercel/next.js/pull/44594
});

export const viewport: Viewport = {
  themeColor: fullConfig.theme.colors.slate[900],
  colorScheme: 'dark',
};

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: { default: 'Kanojo', template: '%s | Kanojo' },
  description: 'A community-run database for gravure idols.',
  keywords: ['gravure', 'idol', 'database', 'community', 'kanojo'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className={`${NotoSansJP.className} dark`}>
        <body className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
          <div className="flex min-h-screen flex-col items-stretch">
            <SiteHeader />
            <main className="flex flex-grow flex-col items-start justify-normal">
              {children}
            </main>
            <SiteFooter />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
