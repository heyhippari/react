'use client';

import { buttonVariants } from '@/components/ui/button';
import { MovieWithAll } from '@/queries/types';
import { getUrlForItem } from '@/utils/types';
import { cn } from '@/utils/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar for editing a movie.
 * @param props The component props.
 * @param props.movie The movie to edit.
 * @returns The rendered component.
 */
export default function SidebarMovieEdit({
  movie,
}: Readonly<{ movie: MovieWithAll }>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === getUrlForItem(movie, '/edit')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={getUrlForItem(movie, '/edit')}
      >
        Primary Facts
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === getUrlForItem(movie, '/edit/cast')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={getUrlForItem(movie, '/edit/cast')}
      >
        Cast
      </Link>
    </>
  );
}
