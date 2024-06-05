import HomeStats from '@/components/home-stats';
import {
  getMostRecentMovies,
  getMovieCount,
  getPersonCount,
  getRecentlyAddedMovies,
  getRecentlyUpdatedMovies,
} from '@/queries/homepage';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import HomeSliders from '@/components/home-sliders';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  // These should all be cached for a day, as we don't expect them to change often
  await prefetchQuery(queryClient, getMovieCount(supabase), {
    staleTime: 1000 * 60 * 60 * 24,
  });
  await prefetchQuery(queryClient, getPersonCount(supabase), {
    staleTime: 1000 * 60 * 60 * 24,
  });
  await prefetchQuery(queryClient, getMostRecentMovies(supabase), {
    staleTime: 1000 * 60 * 60 * 24,
  });
  await prefetchQuery(queryClient, getRecentlyAddedMovies(supabase), {
    staleTime: 1000 * 60 * 60 * 24,
  });
  await prefetchQuery(queryClient, getRecentlyUpdatedMovies(supabase), {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-48 w-full bg-slate-700">
        <HomeStats />
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <HomeSliders />
      </div>
    </HydrationBoundary>
  );
}
