import Person from '@/app/person/[id]/person';
import { getPersonById, getPersonRolesCount } from '@/queries/get-person-by-id';
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
 * Server-side code for the person page.
 * @param props The props for the person page.
 * @param props.params The URL parameters, containing the person ID.
 * @returns The person page.
 */
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: person } = await getPersonById(supabase, id);

    return {
      description: `Information about ${person?.name ?? person?.original_name} from Kanojo.`,
      title: person?.name ?? person?.original_name,
    };
  } catch {
    return {
      description: 'Information about a person from Kanojo.',
      title: 'Person',
    };
  }
}

/**
 * Server-side code for the person page.
 * @param props The props for the person page.
 * @param props.params The URL parameters, containing the person ID.
 * @returns The person page.
 */
export default async function PersonPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getPersonById(supabase, id));
  await prefetchQuery(queryClient, getPersonRolesCount(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Person id={id} />
    </HydrationBoundary>
  );
}
