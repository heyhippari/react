import { getPersonById } from '@/queries/get-person-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PersonEdit from './edit';

export default async function PersonEditPage(
  props: Readonly<{
    params: { id: string };
  }>
) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If we are not logged in, redirect to login
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(params.id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getPersonById(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonEdit id={params.id} />
    </HydrationBoundary>
  );
}
