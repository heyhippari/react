'use client';

import Link from 'next/link';

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
            <ul>
              <li>
                <Link href="/movie">All Movies</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
