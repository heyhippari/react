'use client';

import { buttonVariants } from '@/components/ui/button';
import { getUrlForItem } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { PersonDto } from '@/data/person.dto';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar for editing a person.
 * @param properties The properties for the sidebar.
 * @param properties.person The DTO of the person to edit.
 * @returns The rendered component.
 */
export default function SidebarPersonEdit({
  person,
}: Readonly<{ person: PersonDto }>) {
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
        href={getUrlForItem(person, '/edit')}
      >
        Primary Facts
      </Link>
    </>
  );
}
