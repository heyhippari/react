import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Person from './person';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

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

export default async function PersonPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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
