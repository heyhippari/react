import Link from 'next/link';
import { SearchInput } from './search-input';
import UserMenuServer from './user-menu-server';

export default function SiteHeader() {
  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-pink-300 bg-pink-200 p-4 dark:border-pink-800 dark:bg-pink-900">
      <div className="md-flex-row container mx-auto flex flex-col flex-wrap items-center justify-between gap-4 px-4">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          href="/"
        >
          <span className="self-center whitespace-nowrap border-l-4 border-l-pink-500 pl-3 text-4xl font-bold dark:text-white">
            Kanojo
          </span>
        </Link>
        <div className="flex items-center gap-2 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <SearchInput />
          <UserMenuServer />
        </div>
      </div>
    </nav>
  );
}
