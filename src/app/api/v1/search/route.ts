import { searchMovieByDvdId } from '@/queries/search-movie-by-dvd-id';
import { omitNulls } from '@/utils/api';
import { Tables } from '@/utils/database.types';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type MovieSearchResult = Pick<
  Tables<'movies'>,
  'id' | 'name' | 'original_name' | 'dvd_id' | 'release_date'
>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  if (!query) {
    return new Response('Missing search query', { status: 400 });
  }

  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  const { data, error } = await searchMovieByDvdId(supabase, query);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(
    JSON.stringify(
      data.map((movie: MovieSearchResult) => ({
        id: movie.id,
        title: movie.name,
        original_title: movie.original_name,
        release_date: movie.release_date,
        dvd_id: movie.dvd_id,
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
