// TODO(hippari): Add a loading indicator when changing pages to prevent the cards changing in place.
import {
  getMoviePageCount,
  getPaginatedMovies,
} from '@/queries/get-movies-paginated';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import MovieIndex from './movie-index';

/**
 * Server-side code for the movie page.
 * @param props The props for the movie page.
 * @param props.searchParams The search parameters for the movie page, to handle pagination and search.
 * @returns The movie page.
 */
export default async function MoviePage(props: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Parse the page into a number, defaulting to 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const searchQuery = searchParams?.q;

  await prefetchQuery(
    queryClient,
    getPaginatedMovies(supabase, currentPage, 25, {
      orderBy: searchParams?.order,
      orderDirection: searchParams?.asc === 'true' ? 'asc' : 'desc',
      search: searchParams?.q,
    }),
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
