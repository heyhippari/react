import { fromBaseMovieDto, toBaseMovieDto } from "@/data/base.dto";
/**
 * Service to handle movie related operations.
 */
import { fromMovieDto, MovieDto, toMovieDto } from "@/data/movie.dto";
import { addImage } from "@/infrastructure/database/repositories/image.repository";
import {
  addMovieImage,
  addMovieRole,
  createMovie,
  deleteMovie,
  deleteMovieRole,
  getMovieById,
  getMoviePageCount,
  getMoviesByPrefix,
  getPaginatedMovies,
  searchMovieByDvdId,
  updateMovie,
} from "@/infrastructure/database/repositories/movie.repository";

import { cloudflareService } from "./cloudflare.service";

export const movieService = {
  async addMovieImage(
    image: File,
    movie_id: number,
    type:
      | "front_cover"
      | "full_cover",
  ) {
    const movie = await this.getMovie(movie_id);

    if (!movie?.id) {
      throw new Error("Movie not found");
    }

    const cloudflareImageUUID = await cloudflareService.uploadImage(image);

    if (!cloudflareImageUUID) {
      throw new Error("Error uploading image");
    }

    const imageRecord = await addImage(cloudflareImageUUID, type);

    if (!imageRecord) {
      // Delete the image from Cloudflare to avoid orphaned images.
      await cloudflareService.deleteImage(cloudflareImageUUID);

      throw new Error("Error adding image to database");
    }

    await addMovieImage(movie.id, imageRecord.id);

    const updatedMovie = fromBaseMovieDto(movie);

    // If the movie does not have a default image, set it to the new image.
    switch (type) {
      case "front_cover": {
        if (!updatedMovie.front_cover_url) {
          updatedMovie.front_cover_url = imageRecord.uuid;

          await updateMovie(updatedMovie);
        }
        break;
      }
      case "full_cover": {
        if (!updatedMovie.full_cover_url) {
          updatedMovie.full_cover_url = imageRecord.uuid;

          await updateMovie(updatedMovie);
        }
        break;
      }
    }
  },
  async addMovieRole(movie_id: number, role_id: number) {
    await addMovieRole(movie_id, role_id);
  },
  async createMovie(movie: MovieDto) {
    const createdMovie = await createMovie(fromBaseMovieDto(movie));

    return toBaseMovieDto(createdMovie);
  },
  async deleteMovie(movie_id: number) {
    const movie = await this.getMovie(movie_id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    try {
      await Promise.all(
        movie.movie_images?.map(async ({ image }) => {
          if (image) {
            await cloudflareService.deleteImage(image.uuid);
          }
        }) ?? [],
      );
    } catch {
      throw new Error("Error deleting images");
    }

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

    return pageCount ? pageCount - 1 : 0;
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
