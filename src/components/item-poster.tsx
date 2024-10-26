'use client';
import { MovieWithImages, PersonWithImage } from '@/queries/types';
import {
  getFrontCoverUrl,
  getFullCoverUrl,
  getProfileUrl,
} from '@/utils/images';
import { isMovie, isPerson } from '@/utils/types';
import { cn } from '@/utils/ui';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/**
 * Poster for a movie or person.
 * @param props - The component props.
 * @param props.item - The item to display the poster for, either a movie or a person.
 * @param props.small - Whether to display a small poster.
 * @returns The rendered component.
 */
export default function ItemPoster({
  item,
  small = false,
}: Readonly<{
  item: MovieWithImages | PersonWithImage;
  small?: boolean;
}>) {
  const [open, setOpen] = useState(false);

  const image = useMemo(() => {
    if (isMovie(item)) {
      return getFrontCoverUrl(item, 'poster');
    } else if (isPerson(item)) {
      return getProfileUrl(item, 'poster');
    }

    return null;
  }, [item]);
  const fullImage = useMemo(() => {
    if (isMovie(item)) {
      return getFullCoverUrl(item);
    }

    return null;
  }, [item]);

  return (
    <>
      <div
        className={cn(
          'relative aspect-[2/3] overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900',
          small ? 'w-[50px]' : 'w-[150px] lg:w-[250px]',
        )}
      >
        {item && image ? (
          <Image
            alt={item?.name ?? item?.original_name}
            className="aspect-[2/3] object-cover"
            height={375}
            onClick={() => (fullImage && !small ? setOpen(true) : null)}
            priority
            sizes="(max-width: 1024px) 150w, 250w"
            src={image}
            unoptimized
            width={250}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
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

      {fullImage && !small ? (
        <Lightbox
          carousel={{ finite: true }}
          close={() => setOpen(false)}
          open={open}
          render={{
            buttonNext: () => null,
            buttonPrev: () => null,
          }}
          slides={[
            {
              src: fullImage,
            },
          ]}
        />
      ) : null}
    </>
  );
}
