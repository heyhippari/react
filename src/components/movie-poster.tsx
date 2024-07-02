import { MovieWithImages } from '@/queries/types';
import { getFrontCoverUrl, getFullCoverUrl } from '@/utils/images';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({ movie }: { movie: MovieWithImages }) {
  const [open, setOpen] = useState(false);
  const frontCover = useMemo(
    () => (movie ? getFrontCoverUrl(movie) : null),
    [movie],
  );
  const fullCover = useMemo(
    () => (movie ? getFullCoverUrl(movie) : null),
    [movie],
  );

  return (
    <>
      <div className="relative aspect-[2/3] w-[350px]">
        {movie && frontCover ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={frontCover}
            alt={movie?.name ?? movie?.original_name}
            onClick={() => (fullCover ? setOpen(true) : null)}
            fill
            sizes="350px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-600 shadow-md">
            <p className="text-3xl font-black text-slate-400">No Image</p>
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
