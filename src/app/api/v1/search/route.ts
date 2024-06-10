import { searchMovieByDvdId } from '@/queries/search-movie-by-dvd-id';
import { omitNulls } from '@/utils/api';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  if (!query) {
    return new Response('Missing search query', { status: 400 });
  }

  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  const { data, error } = await searchMovieByDvdId(supabase, query);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(
    JSON.stringify(
      data.map((movie: any) => ({
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
