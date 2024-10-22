import { getMovieById } from '@/queries/get-movie-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Movie from './movie';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  try {
    const { data: movie } = await getMovieById(supabase, params.id);

    return {
      title: movie?.name ?? movie?.original_name,
      description: `Information about ${movie?.dvd_id} from Kanojo.`,
    };
  } catch {
    return {
      title: 'Movie',
      description: 'Information about a movie from Kanojo.',
    };
  }
}

export default async function MoviePage(
  props: Readonly<{
    params: { id: string };
  }>
) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(params.id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getMovieById(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Movie id={params.id} />
    </HydrationBoundary>
  );
}
