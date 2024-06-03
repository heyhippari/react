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
            src={`https://images.kanojodb.com/${movie.thumb_url}`}
            alt={movie.name}
            layout="fill"
            onClick={() => setOpen(true)}
            onError={() => setLoadError(true)}
          />
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: `https://images.kanojodb.com/${movie.art_url}` }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
