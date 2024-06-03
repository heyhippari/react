'use client';

import MovieCard from '@/components/movie-card';
import { Badge } from '@/components/ui/badge';
import useSupabaseBrowser from '@/lib/supabase/client';
import { getLabelById, getLabelMoviesCount } from '@/queries/get-label-by-id';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import Link from 'next/link';

export default function Label({ id }: { id: number }) {
  const supabase = useSupabaseBrowser();
  const { data: label } = useQuery(getLabelById(supabase, id));
  const { count: moviesCount } = useQuery(getLabelMoviesCount(supabase, id));

  return (
    <>
      <div className="w-full p-4">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {label?.name}
              </h1>
              <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
                {label?.original_name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 px-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold text-white">Movies</h2>
          <Badge variant="default">{moviesCount}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {label?.movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
