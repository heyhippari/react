import {
  getSeriesById,
  getSeriesMoviesCount,
} from '@/queries/get-series-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Series from './series';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data: series } = await getSeriesById(supabase, params.id);

  return {
    title: series?.name ?? series?.original_name,
    description: `Information about ${series?.name ?? series?.original_name} from Kanojo.`,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getSeriesById(supabase, params.id));
  await prefetchQuery(queryClient, getSeriesMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Series id={params.id} />
    </HydrationBoundary>
  );
}
