import ThemeToggle from './theme-toggle';

import { cn } from '@/utils/ui';
import SIGithub from '~icons/simple-icons/github';
import { buttonVariants } from './ui/button';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-pink-300 shadow dark:bg-pink-700">
      <div className="container mx-auto w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-pink-800 dark:text-pink-200 sm:text-center">
          &copy; 2024 Kanojo. All rights reserved.
        </span>
        <div className="flex flex-row justify-end gap-2">
          <a
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'rounded-full bg-pink-100 text-pink-950 hover:bg-pink-200 dark:border-pink-700 dark:bg-pink-900 dark:text-pink-50 dark:hover:bg-pink-800',
            )}
            href="https://github.com/heyhippari/react/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SIGithub className="h-[1.2rem] w-[1.2rem] text-pink-800 hover:text-pink-900 dark:text-pink-200 dark:hover:text-pink-100" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
