import { searchMovieByDvdId } from '@/queries/search-movie-by-dvd-id';
import { omitNulls } from '@/utils/api';
import { Tables } from '@/utils/database.types';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type MovieSearchResult = Pick<
  Tables<'movies'>,
  'dvd_id' | 'id' | 'name' | 'original_name' | 'release_date'
>;

/**
 * Search for a movie by its DVD ID. Expects a query parameter "q" with the DVD ID.
 * @param request - The request object.
 * @returns The movie search results.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  if (!query) {
    return new Response('Missing search query', { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await searchMovieByDvdId(supabase, query);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(
    JSON.stringify(
      data.map((movie: MovieSearchResult) => ({
        dvd_id: movie.dvd_id,
        id: movie.id,
        original_title: movie.original_name,
        release_date: movie.release_date,
        title: movie.name,
      })),
      omitNulls,
    ),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
