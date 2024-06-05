import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import SiteHeader from '@/components/site-header';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const NotoSansJP = Noto_Sans_JP({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false, // https://github.com/vercel/next.js/pull/44594
});

export const metadata: Metadata = {
  title: 'Kanojo',
  description: 'A community-run database for gravure idols.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className={NotoSansJP.className}>
        <body className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
          <div className="flex min-h-screen flex-col items-stretch">
            <SiteHeader />
            <main className="flex flex-grow flex-col items-start justify-normal">
              {children}
            </main>
            {
              //<SiteFooter />
            }
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
