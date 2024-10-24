'use client';

import { registerViewAction } from '@/app/actions/view';
import ItenCard from '@/components/item-card';
import { Badge } from '@/components/ui/badge';
import {
  getStudioById,
  getStudioMoviesCount,
} from '@/queries/get-studio-by-id';
import useSupabaseBrowser from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Studio({ id }: Readonly<{ id: string }>) {
  const supabase = useSupabaseBrowser();
  const { data: studio } = useQuery(getStudioById(supabase, id));
  const { count: moviesCount } = useQuery(getStudioMoviesCount(supabase, id));

  // On initial load, register the visit
  useEffect(() => {
    const registerView = async () => {
      if (studio) {
        try {
          await registerViewAction(studio.id, 'studio');
        } catch {
          // Just ignore the error, we don't want to block the page load
        }
      }
    };

    void registerView();
  }, [studio]);

  if (!studio) {
    return redirect('/404');
  }

  return (
    <>
      <div className="w-full bg-pink-100 p-4 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-2 align-top">
            <div className="flex flex-col gap-0">
              <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
                {studio?.name ?? studio?.original_name}
              </h1>
              {studio?.name ? (
                <p className="line-clamp-2 text-ellipsis text-lg font-semibold">
                  {studio?.original_name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-2">
          <h2 className="text-lg font-semibold">Movies</h2>
          <Badge
            variant="default"
            className="bg-pink-500 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500"
          >
            {moviesCount}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {studio?.movies.map((movie, index) => (
            <ItenCard key={index} item={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
