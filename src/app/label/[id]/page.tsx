import { getLabelById, getLabelMoviesCount } from '@/queries/get-label-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Label from './label';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  const { data: label } = await getLabelById(supabase, params.id);

  return {
    title: label?.name ?? label?.original_name,
    description: `Information about ${label?.name ?? label?.original_name} from Kanojo.`,
  };
}

export default async function LabelPage({
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

  await prefetchQuery(queryClient, getLabelById(supabase, params.id));
  await prefetchQuery(queryClient, getLabelMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Label id={params.id} />
    </HydrationBoundary>
  );
}
