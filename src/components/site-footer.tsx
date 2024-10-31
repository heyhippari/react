import ThemeToggle from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/core/utils/ui';
import SIGithub from '~icons/simple-icons/github';

import HomeStats from './home-stats';

/**
 * Site footer component.
 * @returns The site footer component.
 */
export default function SiteFooter() {
  return (
    <footer className="flex w-full flex-col border-t-2 border-pink-300 bg-pink-200 shadow dark:border-pink-700 dark:bg-pink-800">
      <div className="container mx-auto flex w-full items-center justify-between p-4">
        <HomeStats />
      </div>
      <div className="container mx-auto w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-pink-800 dark:text-pink-200 sm:text-center">
          &copy; 2024 Kanojo. All rights reserved.
        </span>
        <div className="flex flex-row justify-end gap-2">
          <a
            className={cn(
              buttonVariants({ size: 'icon', variant: 'outline' }),
              'rounded-full bg-pink-100 text-pink-950 hover:bg-pink-200 dark:border-pink-700 dark:bg-pink-900 dark:text-pink-50 dark:hover:bg-pink-800',
            )}
            href="https://github.com/heyhippari/react/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SIGithub className="size-[1.2rem] text-pink-800 hover:text-pink-900 dark:text-pink-200 dark:hover:text-pink-100" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
