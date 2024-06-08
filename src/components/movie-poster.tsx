import { getFrontCover, getFullCover } from '@/utils/images';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export default function MoviePoster({ movie }: { movie: any }) {
  const [loadError, setLoadError] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative aspect-[2/3] w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
        {loadError ? (
          <div>Failed to load image</div>
        ) : (
          <Image
            className="rounded-lg object-cover shadow-md"
            src={getFrontCover(movie)}
            alt={movie?.name}
            layout="fill"
            onClick={() => setOpen(true)}
            onError={() => setLoadError(true)}
          />
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
