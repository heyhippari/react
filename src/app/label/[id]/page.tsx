import useSupabaseServer from '@/lib/supabase/server';
import { getLabelById, getLabelMoviesCount } from '@/queries/get-label-by-id';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Label from './label';

export default async function LabelPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getLabelById(supabase, params.id));
  await prefetchQuery(queryClient, getLabelMoviesCount(supabase, params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Label id={params.id} />
    </HydrationBoundary>
  );
}
