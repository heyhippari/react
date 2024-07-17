import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Person from './person';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  try {
    const { data: person } = await getPersonById(supabase, params.id);

    return {
      title: person?.name ?? person?.original_name,
      description: `Information about ${person?.name ?? person?.original_name} from Kanojo.`,
    };
  } catch {
    return {
      title: 'Person',
      description: 'Information about a person from Kanojo.',
    };
  }
}

export default async function PersonPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(params.id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getPersonById(supabase, params.id));
  await prefetchQuery(queryClient, getPersonRolesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Person id={params.id} />
    </HydrationBoundary>
  );
}
