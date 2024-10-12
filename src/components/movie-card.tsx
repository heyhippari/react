import { MovieWithImages } from '@/queries/types';
import { getFrontCoverUrl } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from './ui/badge';

export default function MovieCard({
  movie,
}: Readonly<{ movie: MovieWithImages }>) {
  const frontCover = useMemo(() => getFrontCoverUrl(movie, 'card'), [movie]);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <Link href={`/movie/${movie?.id}`}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-pink-200 shadow-md dark:bg-pink-900">
          {movie && frontCover ? (
            <Image
              className={`object-cover shadow-md transition-opacity ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={frontCover}
              alt={movie?.name ?? movie?.original_name}
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
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between">
            <div />
            <div className="p-2">
              <Badge
                variant="default"
                className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
              >
                {movie?.dvd_id}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <h3 className="text-md line-clamp-1 font-semibold dark:text-pink-50">
            {movie?.name ?? movie?.original_name}
          </h3>
          {movie?.name ? (
            <p className="line-clamp-1 text-xs font-medium opacity-75 dark:text-pink-50">
              {movie?.original_name}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
