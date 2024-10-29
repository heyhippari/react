'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

/**
 * Main site menu navigation component.
 * @returns Site menu component.
 */
export default function SiteMenu() {
  return (
    <div className="ml-2 flex flex-row gap-6">
      <HoverCard closeDelay={0} openDelay={0}>
        <HoverCardTrigger className="text-lg">Movies</HoverCardTrigger>
        <HoverCardContent align="center" className="z-50 w-44 p-2">
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
        </HoverCardContent>
      </HoverCard>
      <HoverCard closeDelay={0} openDelay={0}>
        <HoverCardTrigger className="text-lg">Persons</HoverCardTrigger>
        <HoverCardContent align="center" className="z-50 w-44 p-2">
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
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
