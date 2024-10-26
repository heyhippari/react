import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a list of movies for a given DVD ID prefix.
 * @param client The Supabase client.
 * @param prefix The DVD ID prefix.
 * @returns The list of movies.
 */
export function getMoviesByPrefix(client: TypedSupabaseClient, prefix: string) {
  return client
    .from("movies")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
      `,
    )
    .ilike("dvd_id", `${prefix}-%`)
    .order("dvd_id", { ascending: false })
    .throwOnError();
}
