import {
  getMoviePageCount,
  getPaginatedMovies,
} from '@/queries/get-movies-paginated';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import MovieIndex from './movie-index';

export default async function MoviePage({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  // Parse the page into a number, defaulting to 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const searchQuery = searchParams?.q;

  await prefetchQuery(
    queryClient,
    getPaginatedMovies(supabase, currentPage, 25, { search: searchQuery }),
  );
  await prefetchQuery(
    queryClient,
    getMoviePageCount(supabase, { search: searchQuery }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieIndex page={currentPage} />
    </HydrationBoundary>
  );
}
