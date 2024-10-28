import { omitNulls } from "@/core/utils/api";
import { movieResponseSchema, toMovieResponse } from "@/data/api.dto";
import { movieService } from "@/services/movie.service";

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
