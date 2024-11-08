/**
 * Repository for the movie entity.
 */

import { createSupabaseClient } from "../client";
import { BaseMovieModel } from "../models/base.model";
import { MovieModel, movieModelSchema } from "../models/movie.model";

/**
 * Get a movie by its ID.
 * @param movie_id The ID of the movie to get.
 * @returns The validated movie model.
 * @throws Error if the movie is not found.
 */
export async function getMovieById(
  movie_id: number | string,
): Promise<MovieModel> {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies")
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id,
        length,
        studio_id,
        series_id,
        label_id,
        barcode,
        format,
        has_nudity,
        front_cover_url,
        full_cover_url,
        roles (
          id,
          age,
          person: persons (
            id,
            name,
            original_name,
            birth_date,
            profile_url
          )
        ),
        studio: studios (
          id,
          name,
          original_name
        ),
        series (
          id,
          name,
          original_name
        ),
        label: labels (
          id,
          name,
          original_name
        ),
        movie_images (
          image: images (
            created_at,
            uuid,
            type,
            uploader: profiles (
              id,
              username,
              avatar_url
            )
          )
        )
      `,
    )
    .eq("id", movie_id)
    .single()
    .throwOnError();

  return movieModelSchema.parse(data);
}

/**
 * Create a new movie in the database.
 * @param movie The movie to create.
 * @returns The created movie.
 * @throws Error if there is an error creating the movie.
 */
export async function createMovie(movie: BaseMovieModel) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies")
    .insert(movie)
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id
        `,
    )
    .single()
    .throwOnError();

  return movieModelSchema.parse(data);
}

/**
 * Update a movie in the database.
 * @param movie The movie details to update.
 * @returns The updated movie.
 * @throws Error if the movie is not found.
 * @throws Error if there is an error updating the movie.
 */
export async function updateMovie(
  movie: MovieModel,
) {
  if (!movie.id) {
    throw new Error("No movie ID provided");
  }

  const client = await createSupabaseClient();

  // We need to remove the nested properties before updating the movie.
  delete movie.label;
  delete movie.roles;
  delete movie.series;
  delete movie.studio;

  await client
    .from("movies")
    .update(movie)
    .eq("id", movie.id)
    .single()
    .throwOnError();
}

/**
 * Delete a movie from the database.
 * @param movie_id The movie ID.
 * @returns The deleted movie.
 * @throws Error if the movie is not found.
 * @throws Error if there is an error deleting the movie.
 */
export async function deleteMovie(movie_id: number) {
  const client = await createSupabaseClient();

  await client
    .from("movies")
    .delete()
    .eq("id", movie_id)
    .throwOnError();
}

/**
 * Search a movie by its DVD ID.
 * @param dvdId - A DVD ID to search for.
 * @param limit - The maximum number of results to return.
 * @returns A list of movies that partially match the DVD ID.
 */
export async function searchMovieByDvdId(dvdId: string, limit = 25) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies")
    .select(
      `
        id,
        name,
        original_name,
        release_date,
        dvd_id
      `,
    )
    .ilike("dvd_id", `%${dvdId}%`)
    .limit(limit)
    .throwOnError();

  return data?.map((movie) => movieModelSchema.parse(movie));
}

/**
 * Get a list of movies for a given DVD ID prefix.
 * @param prefix The DVD ID prefix.
 * @returns The list of movies.
 */
export async function getMoviesByPrefix(prefix: string) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("movies")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
      `,
    )
    .ilike("dvd_id", `${prefix}-%`)
    .order("dvd_id", { ascending: false })
    .throwOnError();

  return data?.map((movie) => movieModelSchema.parse(movie));
}

/**
 * Get the total number of pages of movies based on the search query.
 * @param search The query to search for.
 * @param limit The number of movies per page.
 * @returns The total number of movies.
 */
export async function getMoviePageCount(
  search?: string,
  limit = 25,
) {
  const client = await createSupabaseClient();

  let query = client.from("movies").select("id", { count: "exact" });

  if (search) {
    query = query.ilike("dvd_id", `%${search}%`);
  }

  const { count } = await query.throwOnError();

  return Math.floor((count ?? 0) / limit);
}

/**
 * Get a paginated list of movies.
 * @param page The page number.
 * @param perPage The number of movies per page.
 * @param options Optional parameters.
 * @param options.orderBy The column to order by.
 * @param options.orderDirection The direction to order by.
 * @param options.search The search query.
 * @returns The paginated list of movies.
 */
export async function getPaginatedMovies(
  page = 1,
  perPage = 25,
  options?: {
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    search?: string;
  },
) {
  const client = await createSupabaseClient();

  let query = client
    .from("movies")
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      release_date,
      front_cover_url
    `,
    )
    .order(options?.orderBy ?? "create_time", {
      ascending: options?.orderDirection === "asc",
    })
    .range((page - 1) * perPage, page * perPage - 1);

  if (options?.search) {
    query = query.ilike("dvd_id", `%${options.search}%`);
  }

  const { data } = await query.throwOnError();

  return data?.map((movie) => movieModelSchema.parse(movie));
}

/**
 * Add a role to a movie for a person.
 * @param movie_id ID of the movie to add the role to.
 * @param person_id ID of the person to add the role for.
 */
export async function addMovieRole(
  movie_id: number,
  person_id: number,
) {
  const client = await createSupabaseClient();

  await client
    .from("roles")
    .insert({ movie_id, person_id })
    .throwOnError();
}

/**
 * Delete a role from a movie for a person.
 * @param movie_id ID of the movie to delete the role from.
 * @param role_id ID of the person to delete the role for.
 */
export async function deleteMovieRole(
  movie_id: number,
  role_id: number,
) {
  const client = await createSupabaseClient();

  await client
    .from("roles")
    .delete()
    .eq("movie_id", movie_id)
    .eq("id", role_id)
    .throwOnError();
}

/**
 * Create a new image for a movie.
 * @param movie_id The ID of the movie to add the image to.
 * @param image_id The ID of the image to add.
 * @returns The created image.
 */
export async function addMovieImage(
  movie_id: number,
  image_id: number,
) {
  const client = await createSupabaseClient();

  await client
    .from("movie_images")
    .insert({ image_id, movie_id })
    .throwOnError();
}
