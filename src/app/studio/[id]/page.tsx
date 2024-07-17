import {
  getStudioById,
  getStudioMoviesCount,
} from '@/queries/get-studio-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Studio from './studio';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  try {
    const { data: studio } = await getStudioById(supabase, params.id);

    return {
      title: studio?.name ?? studio?.original_name,
      description: `Information about ${studio?.name ?? studio?.original_name} from Kanojo.`,
    };
  } catch {
    return {
      title: 'Studio',
      description: 'Information about a studio from Kanojo.',
    };
  }
}

export default async function StudioPage({
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

  await prefetchQuery(queryClient, getStudioById(supabase, params.id));
  await prefetchQuery(queryClient, getStudioMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Studio id={params.id} />
    </HydrationBoundary>
  );
}
