import { getLabelById, getLabelMoviesCount } from '@/queries/get-label-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Label from './label';

/**
 * Generate the metadata for the label page
 * @param props - The component props
 * @param props.params - The label ID
 * @returns The metadata
 */
export async function generateMetadata(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: label } = await getLabelById(supabase, id);

    return {
      description: `Information about ${label?.name ?? label?.original_name} from Kanojo.`,
      title: label?.name ?? label?.original_name,
    };
  } catch {
    return {
      description: 'Information about a label from Kanojo.',
      title: 'Label',
    };
  }
}

/**
 * Server-side label page
 * @param props - The component props
 * @param props.params - The URL parameters
 * @returns The label page
 */
export default async function LabelPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(params.id)) {
    return redirect('/404');
  }

  await prefetchQuery(queryClient, getLabelById(supabase, params.id));
  await prefetchQuery(queryClient, getLabelMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Label id={params.id} />
    </HydrationBoundary>
  );
}
