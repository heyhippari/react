'use client';

import { PersonWithAll } from '@/queries/types';
import { cn } from '@/utils/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from './ui/button';

/**
 * Sidebar for editing a person.
 * @param props The component props.
 * @param props.person The person to edit.
 * @returns The sidebar.
 */
export default function SidebarPersonEdit({
  person,
}: Readonly<{ person: PersonWithAll }>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'justify-start',
          pathname === `/person/${person?.id}/edit`
            ? 'bg-pink-200 text-pink-900 dark:bg-pink-700 dark:text-pink-300'
            : null,
        )}
        href={`/movie/${person?.id}/edit`}
      >
        Primary Facts
      </Link>
    </>
  );
}
