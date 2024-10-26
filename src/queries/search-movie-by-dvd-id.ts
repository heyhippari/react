import { TypedSupabaseClient } from "@/utils/types";

/**
 * Search a movie by its DVD ID.
 * @param client - Supabase client
 * @param dvdId - DVD ID of the movie
 * @returns Movie details
 */
export function searchMovieByDvdId(client: TypedSupabaseClient, dvdId: string) {
  return client
    .from("movies")
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id
      `,
    )
    .ilike("dvd_id", `%${dvdId}%`)
    .throwOnError();
}
