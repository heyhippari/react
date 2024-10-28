'use client';

import { buttonVariants } from '@/components/ui/button';
import { getUrlForItem } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { MovieDto } from '@/data/movie.dto';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar for editing a movie.
 * @param properties The component properties.
 * @param properties.movie The movie to edit.
 * @returns The rendered component.
 */
export default function SidebarMovieEdit({
  movie,
}: Readonly<{ movie: MovieDto }>) {
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
