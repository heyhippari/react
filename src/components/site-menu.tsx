'use client';

import { cn } from '@/utils/ui';
import Link from 'next/link';

import { buttonVariants } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

/**
 * Main site menu navigation component.
 * @returns Site menu component.
 */
export default function SiteMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <div className="flex w-48 flex-col gap-2 p-2">
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start',
                )}
                href="/movie"
              >
                All Movies
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
