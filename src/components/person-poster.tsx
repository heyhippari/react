import { PersonWithImage } from '@/queries/types';
import { getProfileUrl } from '@/utils/images';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function PersonPoster({
  person,
}: Readonly<{ person: PersonWithImage }>) {
  const [open, setOpen] = useState(false);
  const profile = useMemo(() => getProfileUrl(person, 'poster'), [person]);

  return (
    <>
      <div className="relative aspect-[2/3] w-[150px] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900 lg:w-[250px]">
        {person && profile ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={profile}
            alt={person?.name ?? person?.original_name}
            unoptimized
            width={250}
            height={375}
            onClick={() => (profile ? setOpen(true) : null)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="select-none text-3xl font-black text-pink-300 dark:text-pink-800">
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
