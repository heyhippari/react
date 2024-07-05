import { PersonWithImage } from '@/queries/types';
import { getProfile } from '@/utils/images';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function PersonPoster({ person }: { person: PersonWithImage }) {
  const [open, setOpen] = useState(false);
  const profile = useMemo(() => getProfile(person), [person]);

  return (
    <>
      <div className="relative aspect-[2/3] w-[150px] lg:w-[300px]">
        {person && profile ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={profile}
            alt={person?.name ?? person?.original_name}
            onClick={() => (profile ? setOpen(true) : null)}
            fill
            sizes="300px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-600 shadow-md">
            <p className="select-none text-3xl font-black text-slate-400">
              No Image
            </p>
          </div>
        )}
      </div>

      {profile ? (
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
