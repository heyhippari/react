import { MovieWithImages } from '@/queries/types';
import { getFrontCoverUrl } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from './ui/badge';

export default function MovieCard({ movie }: { movie: MovieWithImages }) {
  const frontCover = useMemo(() => getFrontCoverUrl(movie), [movie]);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <Link href={`/movie/${movie?.id}`}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/3] w-full">
          {movie && frontCover ? (
            <Image
              className={`rounded-lg object-cover shadow-md transition-opacity ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={frontCover}
              alt={movie?.name ?? movie?.original_name}
              placeholder="empty"
              fill
              sizes="200px"
              onLoad={(event) => {
                if (event.currentTarget.src.includes('data:image/gif;base64'))
                  return;

                setImageIsLoaded(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-700 shadow-md">
              <p className="select-none text-3xl font-black text-slate-500">
                No Image
              </p>
            </div>
          )}
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between">
            <div />
            <div className="p-2">
              <Badge variant="default">{movie?.dvd_id}</Badge>
            </div>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <h3 className="text-md line-clamp-1 font-semibold text-white">
            {movie?.name ?? movie?.original_name}
          </h3>
          {movie?.name ? (
            <p className="line-clamp-1 text-xs font-medium text-white opacity-75">
              {movie?.original_name}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
