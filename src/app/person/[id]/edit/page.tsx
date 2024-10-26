import PersonEdit from '@/app/person/[id]/edit/edit';
import { getPersonById } from '@/queries/get-person-by-id';
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
 * Server-side code for the person edit page.
 * @param props The props for the person edit page.
 * @param props.params The URL parameters, containing the person ID.
 * @returns The person edit page.
 */
export default async function PersonEditPage({
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

  await prefetchQuery(queryClient, getPersonById(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonEdit id={id} />
    </HydrationBoundary>
  );
}
