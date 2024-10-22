'use client';

import { PersonWithAll } from '@/queries/types';
import { cn } from '@/utils/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/button';

export default function SidebarPersonEdit({
  person,
}: Readonly<{ person: PersonWithAll }>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={`/movie/${person?.id}/edit`}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === `/person/${person?.id}/edit`
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
      >
        Primary Facts
      </Link>
    </>
  );
}
