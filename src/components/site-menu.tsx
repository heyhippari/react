'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

import {
  HoverMenu,
  HoverMenuContent,
  HoverMenuProvider,
  HoverMenuTrigger,
} from './ui/hover-menu';

/**
 * Main site menu navigation component.
 * @returns Site menu component.
 */
export default function SiteMenu() {
  return (
    <div className="ml-2 flex flex-row gap-6">
      <HoverMenuProvider>
        <HoverMenu closeDelay={0} openDelay={0}>
          <HoverMenuTrigger className="text-lg">Movies</HoverMenuTrigger>
          <HoverMenuContent align="center" className="z-50 w-44 p-2">
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href="/movie"
            >
              All Movies
            </Link>
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href="/movie?order=popularity&direction=desc"
            >
              Popular Movies
            </Link>
          </HoverMenuContent>
        </HoverMenu>
        <HoverMenu closeDelay={0} openDelay={0}>
          <HoverMenuTrigger className="text-lg">Persons</HoverMenuTrigger>
          <HoverMenuContent align="center" className="z-50 w-44 p-2">
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href="/person"
            >
              All Persons
            </Link>
            <Link
              className={`${buttonVariants({ variant: 'ghost' }).replace('justify-center', 'justify-start')} w-full`}
              href="/person?order=popularity&direction=desc"
            >
              Popular Persons
            </Link>
          </HoverMenuContent>
        </HoverMenu>
      </HoverMenuProvider>
    </div>
  );
}
