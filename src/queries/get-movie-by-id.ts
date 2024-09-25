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
        studio_id,
        series_id,
        label_id,
        has_nudity,
        front_cover_url,
        full_cover_url,
        roles (
          age,
          person: persons (
            id,
            name,
            original_name,
            birth_date,
            profile_url
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
    .single();
}
