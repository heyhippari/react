import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Movie from './movie';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data: movie } = await getMovieById(supabase, params.id);

  return {
    title: movie?.name ?? movie?.original_name,
    description: `Information about ${movie?.dvd_id} from Kanojo.`,
  };
}

export default async function MoviePage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getMovieById(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Movie id={params.id} />
    </HydrationBoundary>
  );
}
