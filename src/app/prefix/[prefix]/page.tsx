import { getMoviesByPrefix } from '@/queries/get-movies-by-prefix';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Prefix from './prefix';

export default async function PrefixPage(
  props: {
    params: Promise<{ prefix: string }>;
  }
) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await prefetchQuery(queryClient, getMoviesByPrefix(supabase, params.prefix));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Prefix prefix={params.prefix} />
    </HydrationBoundary>
  );
}
