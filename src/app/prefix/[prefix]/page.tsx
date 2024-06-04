import { getMoviesByPrefix } from '@/queries/get-movies-by-prefix';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Prefix from './prefix';

export default async function PrefixPage({
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
