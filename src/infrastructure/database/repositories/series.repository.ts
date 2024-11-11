/**
 * Repository for series entity.
 */

import { createSupabaseClient } from "../client";
import { seriesModelSchema } from "../models/series.model";

/**
 * Get a series by its ID.
 * @param seriesId The ID of the series to get.
 * @returns The series with the given ID.
 * @throws If an error occurs while getting the series.
 */
export async function getSeriesById(
  seriesId: number | string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
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
          format,
          front_cover_url
        )
      `,
    )
    .eq("id", seriesId)
    .order("release_date", {
      ascending: false,
      referencedTable: "movies",
    })
    .throwOnError()
    .single();

  return seriesModelSchema.parse(data);
}

/**
 * Get the number of movies in a series.
 * @param seriesId The ID of the series to get the number of movies for.
 * @returns The number of movies in the series.
 * @throws If an error occurs while getting the number of movies.
 */
export async function getSeriesMoviesCount(
  seriesId: number | string,
) {
  const client = await createSupabaseClient();

  const { count } = await client
    .from("movies")
    .select("id", { count: "exact", head: true })
    .eq("series_id", seriesId)
    .throwOnError();

  return count ?? 0;
}

/**
 * Search for series by name or original name.
 * Limits the results to 15.
 * @param searchValue - The value to search for.
 * @returns The series that match the search value.
 * @throws If an error occurs.
 */
export async function searchSeriesByName(
  searchValue: string,
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("series")
    .select("id, name, original_name")
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();

  return data?.map((series) => seriesModelSchema.parse(series));
}
