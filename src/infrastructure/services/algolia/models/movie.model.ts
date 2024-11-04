import { toImageVariants } from "@/data/base.dto";
import { MovieModel } from "@/infrastructure/database/models/movie.model";
import { z } from "zod";

export const algoliaMovieSchema = z.object({
  display_name: z.string(),
  dvd_id: z.string(),
  front_cover_url: z.string().url().nullable().default(null),
  label: z.object({
    id: z.number().nullable().default(null),
    name: z.string().nullable().default(null),
    original_name: z.string(),
  }).nullable().default(null),
  name: z.string().nullable().default(null),
  objectID: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  release_date: z.string().nullable().default(null),
  roles: z.array(
    z.object({
      age: z.number().nullable().default(null),
      id: z.number().nullable().default(null),
      name: z.string().nullable().default(null),
      original_name: z.string(),
    }).nullable().default(null),
  ).nullable().default(null),
  series: z.object({
    id: z.number().nullable().default(null),
    name: z.string().nullable().default(null),
    original_name: z.string(),
  }).nullable().default(null),
  studio: z.object({
    id: z.number().nullable().default(null),
    name: z.string().nullable().default(null),
    original_name: z.string(),
  }).nullable().default(null),
});

export type AlgoliaMovie = z.infer<typeof algoliaMovieSchema>;

export const algoliaMovieArraySchema = z.array(algoliaMovieSchema);

export type AlgoliaMovieArray = z.infer<typeof algoliaMovieArraySchema>;

/**
 * Convers a movie record to an Algolia movie object.
 * @param movie - The movie record to convert.
 * @returns The Algolia movie object.
 */
export function toAlgoliaMovie(movie: MovieModel): AlgoliaMovie {
  return {
    display_name: movie.name ?? movie.original_name,
    dvd_id: movie.dvd_id!,
    front_cover_url: movie.front_cover_url
      ? toImageVariants(movie.front_cover_url).card
      : null,
    label: {
      id: movie.label?.id ?? null,
      name: movie.label?.name ?? null,
      original_name: movie.label?.original_name ?? "",
    },
    name: movie.name!,
    objectID: movie.id?.toString() ?? "undefined",
    original_name: movie.original_name,
    popularity: movie.popularity ?? 0,
    release_date: movie.release_date!,
    roles: movie.roles?.map((role) => ({
      age: role.age ?? null,
      id: role.id ?? null,
      name: role.person?.name ?? null,
      original_name: role.person?.original_name ?? "",
    })) ?? [],
    series: {
      id: movie.series?.id ?? null,
      name: movie.series?.name ?? null,
      original_name: movie.series?.original_name ?? "",
    },
    studio: {
      id: movie.studio?.id ?? null,
      name: movie.studio?.name ?? null,
      original_name: movie.studio?.original_name ?? "",
    },
  } satisfies AlgoliaMovie;
}
