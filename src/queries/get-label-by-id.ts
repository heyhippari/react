import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a label by its ID
 * @param client Supabase client
 * @param labelId Label ID
 * @returns Label data
 */
export function getLabelById(
  client: TypedSupabaseClient,
  labelId: number | string,
) {
  return client
    .from("labels")
    .select(
      `
        id,
        name,
        original_name,
        movies (
          id,
          name,
          original_name,
          dvd_id,
          front_cover_url
        )
      `,
    )
    .eq("id", labelId)
    .order("release_date", {
      ascending: false,
      foreignTable: "movies",
    })
    .throwOnError()
    .single();
}

/**
 * Get the number of movies in a label
 * @param client Supabase client
 * @param labelId Label ID
 * @returns Number of movies in the label
 */
export function getLabelMoviesCount(
  client: TypedSupabaseClient,
  labelId: number | string,
) {
  return client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("label_id", labelId)
    .throwOnError();
}
