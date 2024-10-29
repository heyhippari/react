/**
 * Repository for Postgres views and materialized views.
 */

import { createSupabaseClient } from "../client";
import { movieModelArraySchema } from "../models/movie.model";
import { personModelArraySchema } from "../models/person.model";

/**
 * Get the current counts for the homepage.
 * @returns The current counts for the homepage.
 */
export async function getCurrentCounts() {
  const client = await createSupabaseClient();

  const { data } = await client.from("current_counts").select("*").single()
    .throwOnError();

  return data;
}

/**
 * Get the most recently released movies.
 * @param limit The number of movies to return, defaults to 25.
 * @returns The most recently released movies.
 */
export async function getMostRecentMovies(limit = 25) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies_recently_released")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .limit(limit)
    .throwOnError();

  return movieModelArraySchema.parse(data);
}

/**
 * Get a list of the most popular persons on the previous day.
 * @param limit The number of persons to return, defaults to 25.
 * @returns A list of the most popular persons.
 */
export async function getMostPopularPersons(limit = 25) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("persons")
    .select(
      `
      id,
      name,
      original_name,
      profile_url
    `,
    )
    .order("popularity", { ascending: false })
    .limit(limit)
    .throwOnError();

  return personModelArraySchema.parse(data);
}

/**
 * Get the movies that were released on this day in the past.
 * @param limit The number of movies to return, defaults to 25.
 * @returns The movies that were released on this day in the past.
 */
export async function getReleasedOnThisDay(limit = 25) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies_released_today")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .limit(limit)
    .throwOnError();

  return movieModelArraySchema.parse(data);
}

/**
 * Get the movies that are missing information.
 * @param limit The number of movies to return, defaults to 25.
 * @returns The movies that are missing information.
 */
export async function getInformationNeeded(limit = 25) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies_missing_info")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      release_date,
      front_cover_url
    `,
    )
    .limit(limit)
    .throwOnError();

  return movieModelArraySchema.parse(data);
}

/**
 * Get the number of roles by age.
 * @returns The number of roles by age.
 */
export async function getRolesByAge() {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("roles_by_age")
    .select(
      `
      age,
      count
    `,
    )
    .throwOnError();

  return data;
}
