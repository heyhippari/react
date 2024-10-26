import {
  getStudioById,
  getStudioMoviesCount,
} from '@/queries/get-studio-by-id';
import createClient from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Studio from './studio';

export async function generateMetadata(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: studio } = await getStudioById(supabase, params.id);

    return {
      description: `Information about ${studio?.name ?? studio?.original_name} from Kanojo.`,
      title: studio?.name ?? studio?.original_name,
    };
  } catch {
    return {
      description: 'Information about a studio from Kanojo.',
      title: 'Studio',
    };
  }
}

export default async function StudioPage(props: {
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

  await prefetchQuery(queryClient, getStudioById(supabase, params.id));
  await prefetchQuery(queryClient, getStudioMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Studio id={params.id} />
    </HydrationBoundary>
  );
}
