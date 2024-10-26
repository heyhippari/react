import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a movie by its ID.
 * @param client The Supabase client.
 * @param movieId The movie ID.
 * @returns The movie.
 */
export function getMovieById(
  client: TypedSupabaseClient,
  movieId: number | string,
) {
  return client
    .from("movies")
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
        barcode,
        format,
        has_nudity,
        front_cover_url,
        full_cover_url,
        roles (
          id,
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
    .eq("id", movieId)
    .single();
}
