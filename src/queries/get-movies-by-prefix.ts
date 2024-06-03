import { TypedSupabaseClient } from '@/lib/types';

export function getMoviesByPrefix(client: TypedSupabaseClient, prefix: string) {
  return client
    .from('movies')
    .select('*')
    .ilike('dvd_id', `${prefix}-%`)
    .order('release_date', { ascending: false })
    .throwOnError();
}
