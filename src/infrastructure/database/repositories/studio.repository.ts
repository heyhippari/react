/**
 * Repository for Studio entity.
 */

import { createSupabaseClient } from "../client";
import { studioModelSchema } from "../models/studio.model";

/**
 * Get a studio by its ID.
 * @param studioId The ID of the studio to get.
 * @returns The studio with the given ID.
 * @throws If an error occurs while getting the studio.
 */
export async function getStudioById(
  studioId: number | string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("studios")
    .select(
      `
        id,
        name,
        original_name,
        homepage,
        movies (
          id,
          name,
          original_name,
          release_date,
          dvd_id,
          format,
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

  return studioModelSchema.parse(data);
}

/**
 * Get the number of movies a studio has.
 * @param studioId The ID of the studio to get the number of movies for.
 * @returns The number of movies the studio has published.
 * @throws If an error occurs while getting the number of movies.
 */
export async function getStudioMoviesCount(
  studioId: number | string,
) {
  const client = await createSupabaseClient();

  const { count } = await client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("studio_id", studioId)
    .throwOnError();

  return count ?? 0;
}

/**
 * Search for studios by name or original name.
 * Limits the results to 15.
 * @param searchValue - The value to search for.
 * @returns The studios that match the search value.
 * @throws If an error occurs while searching for studios.
 */
export async function searchStudioByName(
  searchValue: string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("studios")
    .select("id, name, original_name")
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();

  return data?.map((studio) => studioModelSchema.parse(studio));
}
