import { TypedSupabaseClient } from '@/utils/types';

export function getMoviesByPrefix(client: TypedSupabaseClient, prefix: string) {
  return client
    .from('movies')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
      `,
    )
    .ilike('dvd_id', `${prefix}-%`)
    .order('dvd_id', { ascending: false })
    .throwOnError();
}
