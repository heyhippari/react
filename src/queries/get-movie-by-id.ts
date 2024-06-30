import { TypedSupabaseClient } from '@/utils/types';

export function getMovieById(
  client: TypedSupabaseClient,
  movieId: string | number,
) {
  return client
    .from('movies')
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id,
        length,
        roles (
          age,
          persons (
            id,
            name,
            original_name
          )
        ),
        studios (
          id,
          name,
          original_name
        ),
        series (
          id,
          name,
          original_name
        ),
        labels (
          id,
          name,
          original_name
        ),
        movie_images (
          images (
            uuid,
            type
          )
        )
      `,
    )
    .eq('id', movieId)
    .throwOnError()
    .single();
}
