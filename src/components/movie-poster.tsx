import { MovieWithImages } from '@/queries/types';
import { getFrontCoverUrl, getFullCoverUrl } from '@/utils/images';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({ movie }: { movie: MovieWithImages }) {
  const [open, setOpen] = useState(false);
  const frontCover = useMemo(() => getFrontCoverUrl(movie), [movie]);
  const fullCover = useMemo(() => getFullCoverUrl(movie), [movie]);

  return (
    <>
      <div className="relative aspect-[2/3] w-[150px] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900 lg:w-[250px]">
        {movie && frontCover ? (
          <>
            <Image
              className="aspect-[2/3] rounded-lg object-cover"
              src={frontCover}
              alt={movie?.name ?? movie?.original_name}
              onClick={() => (fullCover ? setOpen(true) : null)}
              width={250}
              height={375}
              sizes="(max-width: 1024px) 150w, 250w"
              priority
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="select-none text-3xl font-black text-pink-300 dark:text-pink-800">
              No Image
            </p>
          </div>
        )}
      </div>

      {fullCover ? (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: fullCover,
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
