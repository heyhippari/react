'use client';

import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import {
  getStudioById,
  getStudioMoviesCount,
} from '@/queries/get-studio-by-id';
import { useUserRole } from '@/utils/hooks';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import MdiLink from '~icons/mdi/link.jsx';

export default function Studio({ id }: { id: string }) {
  const supabase = useSupabaseBrowser();
  const { data: studio } = useQuery(getStudioById(supabase, id));
  const { count: moviesCount } = useQuery(getStudioMoviesCount(supabase, id));

  const userRole = useUserRole();

  return (
    <>
      <div className="w-full bg-pink-100 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 p-4 md:flex-row">
          <div className="flex flex-grow flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                {studio?.name ?? studio?.original_name}
              </h1>
              {studio?.name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                  {studio?.original_name}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-semibold">{moviesCount} movies</p>
          </div>
        </div>
        {studio?.homepage || ['admin', 'moderator'].includes(userRole ?? '') ? (
          <div className="flex flex-col gap-4 bg-pink-200 py-2 dark:bg-pink-700">
            <div className="container flex flex-row justify-between gap-4 px-4">
              <div className="flex flex-row items-center gap-2">
                {studio?.homepage ? (
                  <a
                    href={`${studio.homepage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center gap-2 text-rose-900 hover:text-rose-800 hover:underline dark:text-rose-200 dark:hover:text-rose-100"
                  >
                    <MdiLink className="h-6 w-6" />
                    Homepage
                  </a>
                ) : null}
              </div>
              {['admin', 'moderator'].includes(userRole ?? '') ? (
                <div className="flex flex-row items-center gap-2">
                  <Button variant={'secondary'}>Edit</Button>
                  <Button variant={'destructive'}>Delete</Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {studio?.movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
