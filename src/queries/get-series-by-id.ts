import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a series by its ID
 * @param client Supabase client
 * @param seriesId Series ID
 * @returns Series data
 */
export function getSeriesById(
  client: TypedSupabaseClient,
  seriesId: number | string,
) {
  return client
    .from("series")
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
    .eq("id", seriesId)
    .order("release_date", {
      ascending: false,
      foreignTable: "movies",
    })
    .throwOnError()
    .single();
}

/**
 * Get the number of movies in a series
 * @param client Supabase client
 * @param seriesId Series ID
 * @returns Number of movies
 */
export function getSeriesMoviesCount(
  client: TypedSupabaseClient,
  seriesId: number | string,
) {
  return client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("series_id", seriesId)
    .throwOnError();
}
