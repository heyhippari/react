import MovieCast from '@/app/movie/[id]/edit/cast/cast';
import { getMovieById } from '@/queries/get-movie-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server-side rendered page to edit the cast of a movie.
 * @param props - The component props.
 * @param props.params - The URL parameters.
 * @returns The rendered component.
 */
export default async function MovieCastEditPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If we are not logged in, redirect to login
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getMovieById(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieCast id={id} />
    </HydrationBoundary>
  );
}
