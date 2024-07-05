import { RoleWithPerson } from '@/queries/types';
import { getProfileUrl } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export default function RoleCard({ role }: { role: RoleWithPerson }) {
  const profile = useMemo(() => getProfileUrl(role.person), [role.person]);

  return (
    <Link href={`/person/${role.person?.id}`}>
      <div className="flex h-24 flex-row items-center gap-4 rounded-lg px-4 py-2 dark:bg-slate-700">
        {role.person && profile ? (
          <Image
            className="rounded-full object-cover"
            src={profile}
            alt={role.person?.name ?? role.person?.original_name}
            placeholder="empty"
            fill
            sizes="64px"
          />
        ) : (
          <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {role.person?.name?.[0]}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h2 className="text-lg font-semibold text-white">
              {role.person?.name ?? role.person?.original_name}
            </h2>
            {role.person?.name ? (
              <p className="text-sm text-gray-300">
                {role.person.original_name}
              </p>
            ) : null}
          </div>
          <p className="text-sm text-gray-300">
            {role.age ? `${role.age} years old` : 'Age not available'}
          </p>
        </div>
      </div>
    </Link>
  );
}
