'use client';

import { MovieWithAll } from '@/queries/types';
import { getUrlForItem } from '@/utils/types';
import { cn } from '@/utils/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/button';

export default function SidebarMovieEdit({
  movie,
}: Readonly<{ movie: MovieWithAll }>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={getUrlForItem(movie, '/edit')}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === getUrlForItem(movie, '/edit')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
      >
        Primary Facts
      </Link>
      <Link
        href={getUrlForItem(movie, '/edit/cast')}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === getUrlForItem(movie, '/edit/cast')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
      >
        Cast
      </Link>
    </>
  );
}
