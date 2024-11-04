"use server";
import { MovieModel } from "@/infrastructure/database/models/movie.model";

import { createAlgoliaClient } from "../client";

export const MovieIndex = "movies";
export const PersonIndex = "persons";

/**
 * Save a movie to Algolia for search.
 * @param movie - The movie to index.
 * @throws Error if there is an error saving the movie.
 */
export async function saveMovie(movie: MovieModel) {
  const client = await createAlgoliaClient();

  await client.saveObject({
    body: {
      barcode: movie.barcode,
      dvd_id: movie.dvd_id,
      format: movie.format,
      front_cover_url: movie.front_cover_url,
      label: {
        name: movie.label?.name,
        original_name: movie.label?.original_name,
      },
      objectID: `movie_${movie.id}`,
      original_name: movie.original_name,
      release_date: movie.release_date,
      roles: movie?.roles?.map((role) => {
        return {
          age: role.age,
          name: role.person?.name,
          original_name: role.person?.original_name,
        };
      }),
      series: {
        name: movie.series?.name,
        original_name: movie.series?.original_name,
      },
      studio: {
        name: movie.studio?.name,
        original_name: movie.studio?.original_name,
      },
      title: movie.name,
    },
    indexName: MovieIndex,
  });
}
