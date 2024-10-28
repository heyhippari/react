import { omitNulls } from "@/core/utils/api";
import { MovieDto } from "@/data/movie.dto";
import { movieService } from "@/services/movie.service";
import { z } from "zod";

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
function toMovieSearchResultResponse(
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

/**
 * Search for a movie by its DVD ID. Expects a query parameter "q" with the DVD ID.
 * @param request - The request object.
 * @returns The movie search results.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");
  if (!query) {
    return new Response("Missing search query", { status: 400 });
  }

  const movies = await movieService.searchMovieByDvdId(query);

  return new Response(
    JSON.stringify(
      movieSearchResultArrayResponseSchema.parse(
        movies?.map((movie) => toMovieSearchResultResponse(movie)) ?? [],
      ),
      omitNulls,
    ),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
