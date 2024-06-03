import useSupabaseServer from '@/lib/supabase/server';
import { getMoviesByPrefix } from '@/queries/get-movies-by-prefix';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Prefix from './prefix';

export default async function PersonPage({
  params,
}: {
  params: { prefix: string };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getMoviesByPrefix(supabase, params.prefix));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Prefix prefix={params.prefix} />
    </HydrationBoundary>
  );
}
