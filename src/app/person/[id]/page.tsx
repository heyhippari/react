import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Person from './person';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  const { data: person } = await getPersonById(supabase, params.id);

  return {
    title: person?.name ?? person?.original_name,
    description: `Information about ${person?.name ?? person?.original_name} from Kanojo.`,
  };
}

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
