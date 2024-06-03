import useSupabaseServer from '@/lib/supabase/server';
import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Person from './person';

export default async function PersonPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getPersonById(supabase, params.id));
  await prefetchQuery(queryClient, getPersonRolesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Person id={params.id} />
    </HydrationBoundary>
  );
}
