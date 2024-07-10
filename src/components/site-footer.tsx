import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-white shadow dark:bg-stone-700">
      <div className="container mx-auto w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-stone-500 dark:text-stone-400 sm:text-center">
          &copy; 2024 Kanojo. All rights reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-stone-500 dark:text-stone-400 sm:mt-0">
          <li>
            <Link href="/changelog" className="me-4 hover:underline md:me-6">
              Changelog
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
