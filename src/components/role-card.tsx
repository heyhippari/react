import { RoleWithPerson } from '@/queries/types';
import { getProfileUrl } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export default function RoleCard({ role }: Readonly<{ role: RoleWithPerson }>) {
  const profile = useMemo(() => getProfileUrl(role.person), [role.person]);

  return (
    <Link href={`/person/${role.person?.id}`}>
      <div className="flex h-24 flex-row items-center gap-4 rounded-lg bg-pink-100 px-4 py-2 text-pink-700 dark:bg-pink-800 dark:text-pink-300">
        {role.person && profile ? (
          <Image
            className="rounded-full object-cover"
            src={profile}
            alt={role.person?.name ?? role.person?.original_name}
            unoptimized
            placeholder="empty"
            width={64}
            height={64}
          />
        ) : (
          <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-pink-200 text-pink-400 dark:bg-pink-300 dark:text-pink-500">
            <span className="text-4xl font-medium">
              {role.person?.name?.[0]}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h2 className="text-lg font-extrabold text-pink-800 dark:text-pink-200">
              {role.person?.name ?? role.person?.original_name}
            </h2>
            {role.person?.name ? (
              <p className="text-sm">{role.person.original_name}</p>
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
