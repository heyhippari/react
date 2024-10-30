'use client';
import { isMovie, isPerson } from '@/core/types';
import { cn } from '@/core/utils/ui';
import { MovieDto } from '@/data/movie.dto';
import { PersonDto } from '@/data/person.dto';
import MdiArrowExpandAll from '~icons/mdi/arrow-expand-all.jsx';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import 'yet-another-react-lightbox/styles.css';
import { Lightbox } from 'yet-another-react-lightbox';

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
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

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
          'relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-pink-300 bg-pink-200 dark:border-pink-700 dark:bg-pink-900',
          small ? 'w-[50px]' : 'w-[150px] lg:w-[250px]',
          fullImageUrl && !small && 'group cursor-pointer',
        )}
      >
        {item && thumbImageUrl ? (
          <>
            <Image
              alt={item?.display_name}
              className={cn(
                'size-full rounded-lg object-cover transition-opacity',
                imageIsLoaded ? 'opacity-100' : 'opacity-0',
              )}
              height={375}
              onClick={() => (fullImageUrl && !small ? setOpen(true) : null)}
              onLoad={(event) => {
                if (event.currentTarget.src.includes('data:image/gif;base64'))
                  return;

                setImageIsLoaded(true);
              }}
              priority
              sizes="(max-width: 1024px) 150w, 250w"
              src={thumbImageUrl}
              unoptimized
              width={250}
            />
            {/* The extra div here is to work around a bug when combining backdrop blur and overlay blend. */}
            <div className="pointer-events-none absolute inset-0 bg-pink-500/50 opacity-0 bg-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
              <MdiArrowExpandAll className="size-8 text-white" />
              <p className="pb-0.5 text-2xl font-semibold text-white">Expand</p>
            </div>
          </>
        ) : (
          <div className="flex size-full items-center justify-center rounded-lg">
            <p
              className={cn(
                'select-none text-center font-black text-pink-300 dark:text-pink-700',
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
