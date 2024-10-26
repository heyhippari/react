import { getMovieById } from '@/queries/get-movie-by-id';
import { getApiMovieObject, omitNulls } from '@/utils/api';
import createClient from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * Get a movie by its ID.
 * @param _ - Unused.
 * @param props - The request properties.
 * @param props.params - The URL parameters containing the movie ID.
 * @returns The movie object.
 */
export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return new Response(null, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await getMovieById(supabase, Number(id));

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!data) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(getApiMovieObject(data), omitNulls), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
