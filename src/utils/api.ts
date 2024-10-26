import { MovieWithAll, RoleWithPerson } from "@/queries/types";

import { getFrontCoverUrl, getFullCoverUrl, getProfileUrl } from "./images";

/**
 * Omit null values from JSON.stringify
 * @param key - The key of the value
 * @param value - The value to check
 * @returns The value if it is not null, otherwise undefined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is the intended type
export function omitNulls(this: any, key: string, value: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- This is the intended return value
  return value ?? undefined;
}

/**
 * Get the API object for a movie.
 * @param movie - The movie to get the API object for.
 * @returns The API object for the movie.
 * TODO(hippari): Replace this with a Zod schema.
 */
export function getApiMovieObject(movie: NonNullable<MovieWithAll>) {
  return {
    art_url: getFullCoverUrl(movie),
    dvd_id: movie.dvd_id,
    id: movie.id,
    original_title: movie.original_name,
    release_date: movie.release_date,
    roles: movie.roles.map((role: RoleWithPerson) => ({
      age: role.age,
      age_string: role.age ? `${role.age} years old` : "Unknown",
      id: role.person?.id,
      name: role.person?.name,
      original_name: role.person?.original_name,
      profile_url: getProfileUrl(role.person),
    })),
    runtime: movie.length,
    series: movie.series
      ? {
        id: movie.series.id,
        name: movie.series.name,
        original_name: movie.series.original_name,
      }
      : undefined,
    studio: movie.studio
      ? {
        id: movie.studio.id,
        name: movie.studio.name,
        original_name: movie.studio.original_name,
      }
      : undefined,
    thumb_url: getFrontCoverUrl(movie),
    title: movie.name,
  };
}
