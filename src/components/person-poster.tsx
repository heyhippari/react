import { PersonWithImage } from '@/queries/types';
import { getProfile } from '@/utils/images';
import { CldImage } from 'next-cloudinary';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function PersonPoster({ person }: { person: PersonWithImage }) {
  const [open, setOpen] = useState(false);
  const profile = useMemo(() => getProfile(person), [person]);

  return (
    <>
      <div className="relative aspect-[2/3] w-[150px] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900 lg:w-[250px]">
        {person && profile ? (
          <CldImage
            className="rounded-lg object-cover shadow-md"
            src={profile}
            alt={person?.name ?? person?.original_name}
            onClick={() => (profile ? setOpen(true) : null)}
            width={250}
            height={375}
            sizes="(max-width: 1024px) 150w, 250w"
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
              src: `https://res.cloudinary.com/dmkkeggvt/image/upload/${profile}.jpg`,
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
