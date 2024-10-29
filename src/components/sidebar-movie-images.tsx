'use client';

import { buttonVariants } from '@/components/ui/button';
import { getUrlForItem } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { MovieDto } from '@/data/movie.dto';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Badge } from './ui/badge';

/**
 * Sidebar for displaying the images of a movie.
 * @param properties The component properties.
 * @param properties.movie The movie to display the images for.
 * @returns The rendered component.
 */
export default function SidebarMovieImages({
  movie,
}: Readonly<{ movie: MovieDto }>) {
  const pathname = usePathname();

  const frontCoverCount = useMemo(() => {
    return movie?.movie_images?.filter(
      (image) => image.image?.type === 'front_cover',
    ).length;
  }, [movie]);

  const fullCoverCount = useMemo(() => {
    return movie?.movie_images?.filter(
      (image) => image.image?.type === 'full_cover',
    ).length;
  }, [movie]);

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-between',
          pathname === getUrlForItem(movie, '/images/posters')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={getUrlForItem(movie, '/images/posters')}
      >
        Posters
        <Badge variant="outline">{frontCoverCount ?? 0}</Badge>
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-between',
          pathname === getUrlForItem(movie, '/images/backdrops')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={getUrlForItem(movie, '/images/backdrops')}
      >
        Backdrops
        <Badge variant="outline">{fullCoverCount ?? 0}</Badge>
      </Link>
    </>
  );
}
