'use client';

import MovieCard from '@/components/movie-card';
import { Badge } from '@/components/ui/badge';
import {
  getStudioById,
  getStudioMoviesCount,
} from '@/queries/get-studio-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

export default function Studio({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: studio } = useQuery(getStudioById(supabase, id));
  const { count: moviesCount } = useQuery(getStudioMoviesCount(supabase, id));

  return (
    <>
      <div className="w-full bg-slate-100 p-4 dark:bg-slate-700">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {studio?.name ?? studio?.original_name}
              </h1>
              {studio?.name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold text-white opacity-75">
                  {studio?.original_name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold text-white">Movies</h2>
          <Badge variant="default">{moviesCount}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {studio?.movies.map((movie) => <MovieCard movie={movie} />)}
        </div>
      </div>
    </>
  );
}
