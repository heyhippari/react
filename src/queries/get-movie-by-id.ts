import { TypedSupabaseClient } from '@/lib/types';

export function getMovieById(client: TypedSupabaseClient, movieId: number) {
  return client
    .from('movies')
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id,
        thumb_url,
        art_url,
        roles (
          *,
          persons (
            *
          )
        ),
        studios (
          *
        ),
        series (
          *
        ),
        labels (
          *
        )
      `,
    )
    .eq('id', movieId)
    .throwOnError()
    .single();
}
