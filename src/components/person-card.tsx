import { PersonWithImage } from '@/queries/types';
import { getProfileUrl } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function PersonCard({
  person,
}: Readonly<{ person: PersonWithImage }>) {
  const profile = useMemo(() => getProfileUrl(person, 'card'), [person]);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <Link href={`/person/${person?.id}`}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900">
          {person && profile ? (
            <Image
              className={`object-cover shadow-md transition-opacity ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={profile}
              alt={person?.name ?? person?.original_name}
              placeholder="empty"
              fill
              unoptimized
              sizes="200px"
              onLoad={(event) => {
                if (event.currentTarget.src.includes('data:image/gif;base64'))
                  return;

                setImageIsLoaded(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-2 text-center">
              <p className="select-none text-xl font-black text-pink-300 dark:text-pink-800 md:text-3xl">
                No Image
              </p>
            </div>
          )}
        </div>
        <div className="mb-2 flex flex-col">
          <h3 className="text-md line-clamp-1 font-semibold dark:text-pink-50">
            {person?.name ?? person?.original_name}
          </h3>
          {person?.name ? (
            <p className="line-clamp-1 text-xs font-medium opacity-75 dark:text-pink-50">
              {person?.original_name}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
