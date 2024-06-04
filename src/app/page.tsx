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

  await prefetchQuery(queryClient, getMovieCount(supabase));
  await prefetchQuery(queryClient, getPersonCount(supabase));
  await prefetchQuery(queryClient, getMostRecentMovies(supabase));
  await prefetchQuery(queryClient, getRecentlyAddedMovies(supabase));
  await prefetchQuery(queryClient, getRecentlyUpdatedMovies(supabase));

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
