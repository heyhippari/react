import { MovieWithImages } from '@/queries/types';
import { getFrontCover, getFullCover } from '@/utils/images';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({
  movie,
}: {
  movie: MovieWithImages | null | undefined;
}) {
  const [open, setOpen] = useState(false);
  const frontCover = useMemo(
    () => (movie ? getFrontCover(movie) : null),
    [movie],
  );
  const fullCover = useMemo(
    () => (movie ? getFullCover(movie) : null),
    [movie],
  );

  return (
    <>
      <div className="relative aspect-[2/3] w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
        {movie && frontCover ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={frontCover}
            alt={movie?.name ?? movie?.original_name}
            layout="fill"
            onClick={() => (fullCover ? setOpen(true) : null)}
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
              src: `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${fullCover}/public`,
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
