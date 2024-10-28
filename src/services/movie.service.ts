/**
 * Service to handle movie related operations.
 */
import { fromMovieDto, MovieDto, toMovieDto } from "@/data/movie.dto";
import {
  addMovieRole,
  deleteMovie,
  deleteMovieRole,
  getMovieById,
  getMoviePageCount,
  getMoviesByPrefix,
  getPaginatedMovies,
  searchMovieByDvdId,
  updateMovie,
} from "@/infrastructure/database/repositories/movie.repository";

export const movieService = {
  async addMovieRole(movie_id: number, role_id: number) {
    await addMovieRole(movie_id, role_id);
  },
  async deleteMovie(movie_id: number) {
    await deleteMovie(movie_id);
  },
  async deleteMovieRole(movie_id: number, role_id: number) {
    await deleteMovieRole(movie_id, role_id);
  },
  async getMovie(movie_id: number): Promise<MovieDto> {
    const movie = await getMovieById(movie_id);

    return toMovieDto(movie);
  },
  async getMoviePageCount(query?: string, limit = 25) {
    const pageCount = await getMoviePageCount(query, limit);

    return pageCount ? Math.floor(pageCount / 25) - 1 : 1;
  },
  async getMoviesByPrefix(prefix: string) {
    const movies = await getMoviesByPrefix(prefix);

    return movies?.map((movie) => toMovieDto(movie)) ?? [];
  },
  async getPaginatedMovies(page = 1, perPage = 25, options?: {
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    search?: string;
  }) {
    const movies = await getPaginatedMovies(page, perPage, options);

    return movies?.map((movie) => toMovieDto(movie)) ?? [];
  },
  async searchMovieByDvdId(dvdId: string, limit?: number) {
    const movies = await searchMovieByDvdId(dvdId, limit);

    return movies?.map((movie) => toMovieDto(movie)) ?? [];
  },
  async updateMovie(movie: MovieDto) {
    if (!movie.id) {
      throw new Error("No movie ID provided");
    }

    await updateMovie(fromMovieDto(movie));
  },
};
