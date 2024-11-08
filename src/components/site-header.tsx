import { SearchInput } from '@/components/search-input';
import SiteMenu from '@/components/site-menu';
import UserMenuServer from '@/components/user-menu-server';
import MdiPlus from '~icons/mdi/plus.jsx';
import Link from 'next/link';

import { Button, buttonVariants } from './ui/button';
import {
  HoverMenu,
  HoverMenuContent,
  HoverMenuProvider,
  HoverMenuTrigger,
} from './ui/hover-menu';
import { cn } from '@/core/utils/ui';

/**
 * Site header component.
 * @returns The rendered component.
 */
export default function SiteHeader() {
  return (
    <nav className="start-0 top-0 z-20 w-full border-b-2 border-pink-300 bg-pink-200 p-4 dark:border-pink-700 dark:bg-pink-900">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between gap-6 px-4 md:flex-row md:items-start">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          href="/"
        >
          <span className="self-center whitespace-nowrap border-l-4 border-l-pink-500 pl-3 text-4xl font-bold dark:text-white">
            Kanojo
          </span>
        </Link>
        <div className="hidden grow flex-row items-center gap-2 space-x-3 pt-1 md:order-1 md:flex md:space-x-0 rtl:space-x-reverse">
          <SiteMenu />
        </div>
        <div className="flex items-center gap-2 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <SearchInput />
          <HoverMenuProvider>
            <HoverMenu closeDelay={0} openDelay={0}>
              <HoverMenuTrigger asChild>
                <Button
                  className="rounded-full text-pink-400"
                  size={'icon'}
                  variant={'secondary'}
                >
                  <MdiPlus className="size-5" />
                </Button>
              </HoverMenuTrigger>
              <HoverMenuContent align="center" className="z-50 w-28 p-2">
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'w-full justify-start',
                  )}
                  href="/movie/create"
                >
                  Movie
                </Link>
              </HoverMenuContent>
            </HoverMenu>
          </HoverMenuProvider>
          <UserMenuServer />
        </div>
      </div>
    </nav>
  );
}
