import { getMovieById } from '@/queries/get-movie-by-id';
import { getApiMovieObject, omitNulls } from '@/utils/api';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  const { data, error } = await getMovieById(supabase, Number(id));

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(getApiMovieObject(data), omitNulls), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
