'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/core/utils/ui';
import Link from 'next/link';

/**
 * Main site menu navigation component.
 * @returns Site menu component.
 */
export default function SiteMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg">
            Movies
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <div className="flex w-48 flex-col gap-2 p-2">
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start bg-transparent',
                )}
                href="/movie"
              >
                All Movies
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg">
            Persons
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <div className="flex w-48 flex-col gap-2 p-2">
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start bg-transparent',
                )}
                href="/person"
              >
                All Persons
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
