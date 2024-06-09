import { getFrontCover, getFullCover } from '@/utils/images';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({ movie }: { movie: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative aspect-[2/3] w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
        {getFrontCover(movie) ? (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={getFrontCover(movie)}
            alt={movie?.name}
            layout="fill"
            onClick={() => setOpen(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-600 shadow-md">
            <p className="text-3xl font-black text-slate-400">No Image</p>
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${getFullCover(movie)}/public`,
          },
        ]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
