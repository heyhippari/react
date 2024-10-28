import { omitNulls } from "@/core/utils/api";
import { MovieDto } from "@/data/movie.dto";
import { movieService } from "@/services/movie.service";
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
function toMovieResponse(movie: MovieDto): MovieResponse {
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
          ? movie.series.display_name!
          : undefined,
        original_name: movie.series.alternative_name ??
          movie.series.display_name ?? "",
      }
      : undefined,
    studio: movie.studio
      ? {
        id: movie.studio.id!,
        name: movie.studio.alternative_name
          ? movie.studio.display_name!
          : undefined,
        original_name: movie.studio.alternative_name ??
          movie.studio.display_name ?? "",
      }
      : undefined,
    thumb_url: movie.front_cover_url?.public ?? undefined,
    title: movie?.alternative_name ? movie?.display_name : undefined,
  };
}

/**
 * Get a movie by its ID.
 * @param _ - Unused.
 * @param properties - The request properties.
 * @param properties.params - The URL parameters containing the movie ID.
 * @returns The movie object.
 */
export async function GET(
  _: Request,
  properties: { params: Promise<{ id: string }> },
) {
  const { id } = await properties.params;

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return new Response(null, { status: 400 });
  }

  const movie = await movieService.getMovie(Number.parseInt(id, 10));

  if (!movie) {
    return new Response(null, { status: 404 });
  }

  return new Response(
    JSON.stringify(
      movieResponseSchema.parse(toMovieResponse(movie)),
      omitNulls,
    ),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
