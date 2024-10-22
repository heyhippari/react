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

export default async function MoviePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
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
