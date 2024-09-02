import { MovieWithImages } from '@/queries/types';
import { getFrontCoverUrl, getFullCoverUrl } from '@/utils/images';
import { cn } from '@/utils/ui';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({
  movie,
  small = false,
}: Readonly<{
  movie: MovieWithImages;
  small?: boolean;
}>) {
  const [open, setOpen] = useState(false);
  const frontCover = useMemo(() => getFrontCoverUrl(movie, 'poster'), [movie]);
  const fullCover = useMemo(() => getFullCoverUrl(movie), [movie]);

  return (
    <>
      <div
        className={`relative aspect-[2/3] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900 ${small ? 'w-[50px]' : 'w-[150px] lg:w-[250px]'}`}
      >
        {movie && frontCover ? (
          <Image
            className="aspect-[2/3] object-cover"
            src={frontCover}
            alt={movie?.name ?? movie?.original_name}
            unoptimized
            width={250}
            height={375}
            sizes="(max-width: 1024px) 150w, 250w"
            priority
            onClick={() => (fullCover && !small ? setOpen(true) : null)}
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

      {fullCover && !small ? (
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
