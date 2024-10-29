'use client';
import { Badge } from '@/components/ui/badge';
import { getUrlForItem, isMovie, isPerson } from '@/core/types';
import { BaseMovieDto, BasePersonDto } from '@/data/base.dto';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

/**
 * Card that displays an item with an image and some information depending on the type of item.
 * @param properties The properties for the item card.
 * @param properties.item The item to display.
 * @param properties.priority Whether the item is a priority item and should be loaded first.
 * @returns The item card component.
 */
export default function ItemCard({
  item,
  priority = false,
}: Readonly<{ item: BaseMovieDto | BasePersonDto; priority: boolean }>) {
  const image = useMemo(() => {
    if (isMovie(item)) {
      return item?.front_cover_url?.card;
    } else if (isPerson(item)) {
      return item?.profile_url?.card;
    }

    return null;
  }, [item]);

  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <Link href={getUrlForItem(item)}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900">
          {item && image ? (
            <Image
              alt={item?.display_name}
              className={`object-cover shadow-md transition-opacity ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}`}
              height={300}
              onLoad={(event) => {
                if (event.currentTarget.src.includes('data:image/gif;base64'))
                  return;

                setImageIsLoaded(true);
              }}
              placeholder="empty"
              priority={priority}
              sizes="200px"
              src={image}
              unoptimized
              width={200}
            />
          ) : (
            <div className="flex size-full items-center justify-center p-2 text-center">
              <p className="select-none text-xl font-black text-pink-300 dark:text-pink-800 md:text-3xl">
                No Image
              </p>
            </div>
          )}
          {isMovie(item) ? (
            <div className="absolute left-0 top-0 flex size-full flex-col justify-between">
              <div />
              <div className="p-2">
                <Badge
                  className="bg-pink-600 hover:bg-pink-500 dark:bg-pink-400 dark:hover:bg-pink-500"
                  variant="default"
                >
                  {item?.dvd_id}
                </Badge>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mb-2 flex flex-col">
          <h3 className="text-md line-clamp-1 font-semibold dark:text-pink-50">
            {item?.display_name}
          </h3>
          <p className="line-clamp-1 text-xs font-medium opacity-75 dark:text-pink-50">
            {item?.alternative_name}
          </p>
        </div>
      </div>
    </Link>
  );
}
