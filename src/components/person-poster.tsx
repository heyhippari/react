import { PersonWithImage } from '@/queries/types';
import { getProfileUrl } from '@/utils/images';
import { cn } from '@/utils/ui';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function PersonPoster({
  person,
  small = false,
}: Readonly<{ person: PersonWithImage; small?: boolean }>) {
  const [open, setOpen] = useState(false);
  const profile = useMemo(() => getProfileUrl(person, 'poster'), [person]);

  return (
    <>
      <div
        className={cn(
          'relative aspect-[2/3] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900',
          small ? 'w-[50px]' : 'w-[150px] lg:w-[250px]',
        )}
      >
        {person && profile ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={profile}
            alt={person?.name ?? person?.original_name}
            unoptimized
            width={250}
            height={375}
            onClick={() => (profile && !small ? setOpen(true) : null)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p
              className={cn(
                'select-none text-center font-black text-pink-300 dark:text-pink-800',
                small ? 'text-xs' : 'text-3xl',
              )}
            >
              No Image
            </p>
          </div>
        )}
      </div>

      {profile && !small ? (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: profile,
            },
          ]}
          carousel={{ finite: true }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      ) : null}
    </>
  );
}
