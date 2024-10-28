'use client';
import { isMovie, isPerson } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/**
 * Poster for a movie or person.
 * @param properties - The component properties.
 * @param properties.item - The item to display the poster for, either a movie or a person.
 * @param properties.small - Whether to display a small poster.
 * @returns The rendered component.
 */
export default function ItemPoster({
  item,
  small = false,
}: Readonly<{
  item: MovieDto | PersonDto;
  small?: boolean;
}>) {
  const [open, setOpen] = useState(false);

  const thumbImageUrl = useMemo(() => {
    if (isMovie(item)) {
      return item?.front_cover_url?.poster;
    } else if (isPerson(item)) {
      return item?.profile_url?.poster;
    }

    return null;
  }, [item]);
  const fullImageUrl = useMemo(() => {
    if (isMovie(item)) {
      return item?.full_cover_url?.public;
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
        {item && thumbImageUrl ? (
          <Image
            alt={item?.display_name}
            className="aspect-[2/3] object-cover"
            height={375}
            onClick={() => (fullImageUrl && !small ? setOpen(true) : null)}
            priority
            sizes="(max-width: 1024px) 150w, 250w"
            src={thumbImageUrl}
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

      {fullImageUrl && !small ? (
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
              src: fullImageUrl,
            },
          ]}
        />
      ) : null}
    </>
  );
}
