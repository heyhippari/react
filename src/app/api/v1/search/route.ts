import { omitNulls } from "@/core/utils/api";
import {
  movieSearchResultArrayResponseSchema,
  toMovieSearchResultResponse,
} from "@/data/api.dto";
import { movieService } from "@/services/movie.service";

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
