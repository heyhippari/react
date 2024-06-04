'use client';

import MovieCard from '@/components/movie-card';
import { getMoviesByPrefix } from '@/queries/get-movies-by-prefix';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import Link from 'next/link';

export default function Prefix({ prefix }: { prefix: string }) {
  const supabase = useSupabaseBrowser();
  const { data: movies } = useQuery(getMoviesByPrefix(supabase, prefix));

  return (
    <>
      <div className="w-full p-4">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {prefix}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 px-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold text-white">Movies</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie?.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
