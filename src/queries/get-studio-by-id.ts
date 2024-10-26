import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a studio by its ID
 * @param client Supabase client
 * @param studioId Studio ID
 * @returns Studio data
 */
export function getStudioById(
  client: TypedSupabaseClient,
  studioId: number | string,
) {
  return client
    .from("studios")
    .select(
      `
        id,
        name,
        original_name,
        movies (
          id,
          name,
          original_name,
          release_date,
          dvd_id,
          front_cover_url
        )
      `,
    )
    .eq("id", studioId)
    .order("release_date", {
      ascending: false,
      foreignTable: "movies",
    })
    .throwOnError()
    .single();
}

/**
 * Get the number of movies a studio has
 * @param client Supabase client
 * @param studioId Studio ID
 * @returns Number of movies
 */
export function getStudioMoviesCount(
  client: TypedSupabaseClient,
  studioId: number | string,
) {
  return client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("studio_id", studioId)
    .throwOnError();
}
