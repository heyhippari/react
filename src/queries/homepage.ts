import { MovieWithImages, PersonWithImage } from "@/queries/types";
import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get the most recently released movies
 * @param client The Supabase client
 * @param limit The number of movies to return, defaults to 25
 * @returns The most recently released movies
 */
export function getMostRecentMovies(client: TypedSupabaseClient, limit = 25) {
  return client
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
    .returns<MovieWithImages[]>()
    .throwOnError();
}

/**
 * Get the most popular persons
 * @param client The Supabase client
 * @param limit The number of persons to return, defaults to 25
 * @returns The most popular persons
 */
export function getMostPopularPersons(client: TypedSupabaseClient, limit = 25) {
  return client
    .from("most_popular_persons")
    .select(
      `
      id,
      name,
      original_name,
      profile_url
    `,
    )
    .limit(limit)
    .returns<PersonWithImage[]>()
    .throwOnError();
}

/**
 * Get the movies that were released on this day in the past
 * @param client The Supabase client
 * @param limit The number of movies to return, defaults to 25
 * @returns The movies that were released on this day in the past
 */
export function getReleasedOnThisDay(client: TypedSupabaseClient, limit = 25) {
  return client
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
    .returns<MovieWithImages[]>()
    .throwOnError();
}

/**
 * Get the movies that are missing information
 * @param client The Supabase client
 * @param limit The number of movies to return, defaults to 25
 * @returns The movies that are missing information
 */
export function getInformationNeeded(client: TypedSupabaseClient, limit = 25) {
  return client
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
    .returns<MovieWithImages[]>()
    .throwOnError();
}

/**
 * Get the current counts for the homepage
 * @param client The Supabase client
 * @returns The current counts for the homepage
 */
export function getCurrentCounts(client: TypedSupabaseClient) {
  return client.from("current_counts").select("*").single().throwOnError();
}
