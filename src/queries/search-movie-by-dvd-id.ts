import { TypedSupabaseClient } from '@/utils/types';

export function searchMovieByDvdId(client: TypedSupabaseClient, dvdId: string) {
  return client
    .from('movies')
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id
      `,
    )
    .ilike('dvd_id', `%${dvdId}%`)
    .throwOnError();
}
