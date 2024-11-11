import { MovieDto } from "@/data/movie.dto";
import { z } from "zod";

export const movieResponseSchema = z.object({
  art_url: z.string().url().optional(),
  dvd_id: z.string(),
  id: z.number(),
  original_title: z.string(),
  release_date: z.string().nullable().optional(),
  roles: z.array(
    z.object({
      age: z.number().nullable().optional(),
      age_string: z.string(),
      id: z.number().optional(),
      name: z.string().optional(),
      original_name: z.string(),
      profile_url: z.string().url().optional(),
    }),
  ),
  runtime: z.number().nullable().optional(),
  series: z.object({
    id: z.number(),
    name: z.string().optional(),
    original_name: z.string(),
  }).optional(),
  studio: z.object({
    id: z.number(),
    name: z.string().optional(),
    original_name: z.string(),
  }).optional(),
  thumb_url: z.string().url().optional(),
  title: z.string().optional(),
});

type MovieResponse = z.infer<typeof movieResponseSchema>;

/**
 * Convert a movie DTO to a movie response object.
 * @param movie An instance of the movie DTO.
 * @returns The movie response object.
 */
export function toMovieResponse(movie: MovieDto): MovieResponse {
  return {
    art_url: movie.full_cover_url?.public ?? undefined,
    dvd_id: movie.dvd_id!,
    id: movie.id!,
    original_title: movie.alternative_name ?? movie.display_name,
    release_date: movie.release_date!,
    roles: movie.roles?.map((role) => ({
      age: role.age!,
      age_string: role.age ? `${role.age} years old` : "Unknown",
      id: role.person?.id,
      name: role.person?.alternative_name
        ? role.person?.display_name
        : undefined,
      original_name: role.person?.alternative_name ??
        role.person?.display_name ?? "",
      profile_url: role.person?.profile_url?.public ?? undefined,
    })) ?? [],
    runtime: movie.length!,
    series: movie.series
      ? {
        id: movie.series.id!,
        name: movie.series.alternative_name
          ? movie.series.display_name
          : undefined,
        original_name: movie.series.alternative_name ??
          movie.series.display_name ?? "",
      }
      : undefined,
    studio: movie.studio
      ? {
        id: movie.studio.id!,
        name: movie.studio.alternative_name
          ? movie.studio.display_name
          : undefined,
        original_name: movie.studio.alternative_name ??
          movie.studio.display_name ?? "",
      }
      : undefined,
    thumb_url: movie.front_cover_url?.public ?? undefined,
    title: movie?.alternative_name ? movie?.display_name : undefined,
  };
}

export const movieSearchResultResponseSchema = z.object({
  dvd_id: z.string(),
  id: z.number(),
  original_title: z.string(),
  release_date: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
});

export type MovieSearchResultResponse = z.infer<
  typeof movieSearchResultResponseSchema
>;

/**
 * Convert a movie DTO to a movie search result response object.
 * @param movie An instance of the movie DTO.
 * @returns The movie search result response object.
 */
export function toMovieSearchResultResponse(
  movie: MovieDto,
): MovieSearchResultResponse {
  return {
    dvd_id: movie.dvd_id!,
    id: movie.id!,
    original_title: movie.alternative_name ?? movie.display_name,
    release_date: movie.release_date!,
    title: movie?.alternative_name ? movie?.display_name : undefined,
  };
}

export const movieSearchResultArrayResponseSchema = z.array(
  movieSearchResultResponseSchema,
);

export type MovieSearchResultArrayResponse = z.infer<
  typeof movieSearchResultArrayResponseSchema
>;
