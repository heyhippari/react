import {
  getSeriesById,
  getSeriesMoviesCount,
} from '@/queries/get-series-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Series from './series';

/**
 * Metadata generation for the series page.
 * @param params The URL parameters, containing the series ID.
 * @param params.params The URL parameters, containing the series ID.
 * @returns The metadata for the series page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: series } = await getSeriesById(supabase, id);

    return {
      description: `Information about ${series?.name ?? series?.original_name} from Kanojo.`,
      title: series?.name ?? series?.original_name,
    };
  } catch {
    return {
      description: 'Information about a series from Kanojo.',
      title: 'Series',
    };
  }
}

/**
 * Server-side code for the series page.
 * @param props The props for the series page.
 * @param props.params The URL parameters, containing the series ID.
 * @returns The series page.
 */
export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getSeriesById(supabase, id));
  await prefetchQuery(queryClient, getSeriesMoviesCount(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Series id={id} />
    </HydrationBoundary>
  );
}
