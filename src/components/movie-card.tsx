import { MovieWithImages } from '@/queries/types';
import { getFrontCover } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from './ui/badge';

export default function MovieCard({
  movie,
}: {
  movie: MovieWithImages | null | undefined;
}) {
  const frontCover = useMemo(
    () => (movie ? getFrontCover(movie) : null),
    [movie],
  );

  return (
    <Link href={`/movie/${movie?.id}`}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/3] w-full">
          {movie && frontCover ? (
            <Image
              className="rounded-lg object-cover shadow-md"
              src={frontCover}
              alt={movie?.name ?? movie?.original_name}
              placeholder="empty"
              layout="fill"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-700 shadow-md">
              <p className="text-3xl font-black text-slate-500">No Image</p>
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
