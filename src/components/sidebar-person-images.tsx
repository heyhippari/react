'use client';

import { buttonVariants } from '@/components/ui/button';
import { getUrlForItem } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { PersonDto } from '@/data/person.dto';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Badge } from './ui/badge';

/**
 * Sidebar for displaying the images of a movie.
 * @param properties The component properties.
 * @param properties.person The person to display the images for.
 * @returns The rendered component.
 */
export default function SidebarPersonImages({
  person,
}: Readonly<{ person: PersonDto }>) {
  const pathname = usePathname();

  const profileCount = useMemo(() => {
    return person?.person_images?.filter(
      (image) => image.image?.type === 'profile',
    ).length;
  }, [person]);

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-between',
          pathname === getUrlForItem(person, '/images/profiles')
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={getUrlForItem(person, '/images/profiles')}
      >
        Profiles
        <Badge variant="outline">{profileCount ?? 0}</Badge>
      </Link>
    </>
  );
}
