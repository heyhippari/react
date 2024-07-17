import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Movie from './movie';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

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

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

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
