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
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getMovieById(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Movie id={id} />
    </HydrationBoundary>
  );
}
