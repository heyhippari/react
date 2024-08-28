import { getMovieById } from '@/queries/get-movie-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Edit from './edit';


export default async function MoviePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  // If we are not logged in, redirect to login
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(params.id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getMovieById(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Edit id={params.id} />
    </HydrationBoundary>
  );
}
