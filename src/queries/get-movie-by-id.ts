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
          person: persons (
            id,
            name,
            original_name,
            birth_date
          )
        ),
        studio: studios (
          id,
          name,
          original_name
        ),
        series (
          id,
          name,
          original_name
        ),
        label: labels (
          id,
          name,
          original_name
        ),
        movie_images (
          image: images (
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
