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
      <div className="relative aspect-[2/3] w-[150px] lg:w-[300px]">
        {movie && frontCover ? (
          <>
            <Image
              className="aspect-[2/3] rounded-lg object-cover shadow-md"
              src={frontCover}
              alt={movie?.name ?? movie?.original_name}
              onClick={() => (fullCover ? setOpen(true) : null)}
              width={300}
              height={450}
              sizes="(max-width: 1024px) 150w, 300w"
              priority
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-stone-600 shadow-md">
            <p className="select-none text-3xl font-black text-stone-400">
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
