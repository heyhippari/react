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
      movie_images (
          images (
            uuid,
            type
          )
        )
      `,
    )
    .ilike('dvd_id', `${prefix}-%`)
    .order('release_date', { ascending: false })
    .throwOnError();
}
