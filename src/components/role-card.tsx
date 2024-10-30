import { RoleDto } from '@/data/role.dto';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

/**
 * Card component to display a role with a person.
 * @param properties The properties for the component.
 * @param properties.role The role with the person to display.
 * @returns The rendered component.
 */
export default function RoleCard({ role }: Readonly<{ role: RoleDto }>) {
  const profile = useMemo(
    () => (role.person ? role?.person?.profile_url?.role : null),
    [role.person],
  );

  return (
    <Link className="group" href={`/person/${role.person?.id}`}>
      <div className="flex h-24 flex-row items-center gap-4 rounded-lg border-2 border-pink-200 bg-pink-100 px-4 py-2 text-pink-700 transition-colors duration-300 group-hover:bg-pink-200 dark:border-pink-700 dark:bg-pink-800 dark:text-pink-300 dark:group-hover:bg-pink-700">
        {role.person && profile ? (
          <Image
            alt={role.person.display_name}
            className="rounded-full object-cover"
            height={64}
            placeholder="empty"
            src={profile}
            unoptimized
            width={64}
          />
        ) : (
          <div className="relative inline-flex size-16 items-center justify-center overflow-hidden rounded-full bg-pink-300 text-pink-500 dark:bg-pink-300 dark:text-pink-500">
            <span className="text-4xl font-medium">
              {role.person?.display_name?.[0]}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h2 className="text-lg font-extrabold text-pink-800 dark:text-pink-200">
              {role.person?.display_name}
            </h2>
            {role.person?.alternative_name ? (
              <p className="text-sm">{role.person.alternative_name}</p>
            ) : null}
          </div>
          <p className="text-sm">
            {role.age ? `${role.age} years old` : 'Age not available'}
          </p>
        </div>
      </div>
    </Link>
  );
}
