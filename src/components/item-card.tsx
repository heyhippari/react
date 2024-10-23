import { MovieWithImages, PersonWithImage } from '@/queries/types';
import { getFrontCoverUrl, getProfileUrl } from '@/utils/images';
import { getUrlForItem, isMovie, isPerson } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from './ui/badge';

export default function ItemCard({
  item,
}: Readonly<{ item: MovieWithImages | PersonWithImage }>) {
  const image = useMemo(() => {
    if (isMovie(item)) {
      return getFrontCoverUrl(item, 'card');
    } else if (isPerson(item)) {
      return getProfileUrl(item, 'card');
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
              className={`object-cover shadow-md transition-opacity ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={image}
              alt={item?.name ?? item?.original_name}
              placeholder="empty"
              fill
              unoptimized
              sizes="200px"
              onLoad={(event) => {
                if (event.currentTarget.src.includes('data:image/gif;base64'))
                  return;

                setImageIsLoaded(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-2 text-center">
              <p className="select-none text-xl font-black text-pink-300 dark:text-pink-800 md:text-3xl">
                No Image
              </p>
            </div>
          )}
          {isMovie(item) ? (
            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between">
              <div />
              <div className="p-2">
                <Badge
                  variant="default"
                  className="bg-pink-600 hover:bg-pink-500 dark:bg-pink-400 dark:hover:bg-pink-500"
                >
                  {item?.dvd_id}
                </Badge>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mb-2 flex flex-col">
          <h3 className="text-md line-clamp-1 font-semibold dark:text-pink-50">
            {item?.name ?? item?.original_name}
          </h3>
          {item?.name ? (
            <p className="line-clamp-1 text-xs font-medium opacity-75 dark:text-pink-50">
              {item?.original_name}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
