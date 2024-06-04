'use client';

import MoviePoster from '@/components/movie-poster';
import RoleCard from '@/components/role-card';
import { Badge } from '@/components/ui/badge';
import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default function Movie({ id }: { id: number }) {
  const supabase = useSupabaseBrowser();
  const { data: movie } = useQuery(getMovieById(supabase, id));

  return (
    <div className="w-full p-4">
      <div className="container flex flex-col gap-6 px-4 md:flex-row">
        <MoviePoster movie={movie} />
        <div className="flex w-full flex-col justify-start gap-2 align-top">
          <div className="flex flex-col gap-0">
            <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
              {movie?.name}
            </h1>
            <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
              {movie?.original_name}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Badge variant="default">{movie?.dvd_id}</Badge>
            {movie?.release_date ? (
              <Badge variant="default">
                {DateTime.fromISO(movie?.release_date).toLocaleString(
                  DateTime.DATE_FULL,
                )}
              </Badge>
            ) : null}
          </div>
          <div className="flex flex-col">
            {movie?.series?.id ? (
              <p className="text-md font-normal text-white">
                Series:{' '}
                <Link
                  className="text-slate-300 hover:text-slate-50 hover:underline"
                  href={`/series/${movie?.series?.id}`}
                >
                  {movie?.series?.name ?? movie?.series?.original_name}
                </Link>
              </p>
            ) : null}
            {movie?.studios?.id ? (
              <p className="text-md font-normal text-white">
                Studio:{' '}
                <Link
                  className="text-slate-300 hover:text-slate-50 hover:underline"
                  href={`/studio/${movie?.studios.id}`}
                >
                  {movie?.studios.name ?? movie?.studios.original_name}
                </Link>
              </p>
            ) : null}
            {movie?.labels?.id ? (
              <p className="text-md font-normal text-white">
                Label:{' '}
                <Link
                  className="text-slate-300 hover:text-slate-50 hover:underline"
                  href={`/label/${movie?.labels.id}`}
                >
                  {movie?.labels.name ?? movie?.labels.original_name}
                </Link>
              </p>
            ) : null}
          </div>
          <h2 className="text-lg font-semibold text-white">Cast</h2>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {movie?.roles.map((role) => <RoleCard key={role.id} role={role} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
