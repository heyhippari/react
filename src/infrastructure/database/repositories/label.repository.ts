/**
 * Repository for the label entity.
 */

import { createSupabaseClient } from "../client";
import { labelModelSchema } from "../models/label.model";

/**
 * Get a label by its ID.
 * @param labelId The ID of the label to get.
 * @returns The label with the given ID.
 */
export async function getLabelById(
  labelId: number | string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
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
      referencedTable: "movies",
    })
    .throwOnError()
    .single();

  return labelModelSchema.parse(data);
}

/**
 * Get the number of movies in a label.
 * @param labelId The ID of the label to get the number of movies for.
 * @returns Number of movies in the label.
 */
export async function getLabelMoviesCount(
  labelId: number | string,
) {
  const client = await createSupabaseClient();

  const { count } = await client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("label_id", labelId)
    .throwOnError();

  return count ?? 0;
}

/**
 * Search for labels by name or original name.
 * Limits the results to 15.
 * @param searchValue - The value to search for.
 * @returns The labels that match the search value.
 * @throws If an error occurs.
 */
export async function searchLabelByName(
  searchValue: string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("labels")
    .select("id, name, original_name")
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();

  return data?.map((label) => labelModelSchema.parse(label));
}
