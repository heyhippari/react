"use server";
import { getUrlForItem } from "@/core/types";
import {
  fromMovieCreateForm,
  MovieCreateFormSchema,
} from "@/core/utils/validation/movie-create";
import {
  fromMovieEditForm,
  MovieEditFormSchema,
  MovieRoleAddFormSchema,
} from "@/core/utils/validation/movie-update";
import { movieService } from "@/services/movie.service";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface DeleteMovieRoleState {
  message: string;
  success?: boolean;
}

/**
 * Delete a role from a movie.
 * @param previousState - Unused.
 * @param formData - Form data containing the movie ID and role ID.
 * @returns An object containing a message in case of an error.
 */
export async function deleteMovieRoleAction(
  previousState: DeleteMovieRoleState | null,
  formData: FormData,
): Promise<DeleteMovieRoleState> {
  if (!formData.get("movie_id")) {
    return { message: "No movie ID provided" };
  }

  const movie_id = Number(formData.get("movie_id"));
  const role_id = Number(formData.get("role_id"));

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    return { message: "User not authenticated" };
  }

  const movie = await movieService.getMovie(movie_id);
  if (!movie) {
    return { message: "Movie not found" };
  }

  const { error, message } = await movieService.deleteMovieRole(
    movie_id,
    role_id,
  );

  if (error) {
    return { message };
  }

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movie_id}`, "page");
  revalidatePath(`/movie/${movie_id}/edit/cast`, "page");

  return { message: "Role deleted", success: true };
}

export interface AddMovieRoleState {
  message: string;
  success?: boolean;
}

/**
 * Add a role to a movie.
 * @param movie_id - The ID of the movie to add the role to.
 * @param formData - Form data containing the person ID.
 * @returns An object containing a message in case of an error.
 */
export async function addMovieRoleAction(
  movie_id: number,
  formData: MovieRoleAddFormSchema,
): Promise<AddMovieRoleState> {
  if (!movie_id) {
    return { message: "No movie ID provided" };
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    return { message: "User not authenticated" };
  }

  const movie = await movieService.getMovie(movie_id);
  if (!movie) {
    return { message: "Movie not found" };
  }

  const result = await movieService.addMovieRole(movie_id, formData.person_id);

  if (result?.error) {
    return { message: result.message };
  }

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movie_id}`, "page");
  revalidatePath(`/movie/${movie_id}/edit/cast`, "page");

  return { message: "Role added", success: true };
}

export interface UpdateMovieRoleState {
  message: string;
  success?: boolean;
}

/**
 * Update a movie in the database.
 * @param formData - Form data containing the movie details.
 * @returns An object containing a message in case of an error.
 */
export async function updateMovieAction(
  formData: MovieEditFormSchema,
): Promise<UpdateMovieRoleState> {
  if (!formData.id) {
    return { message: "No movie ID provided" };
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    return { message: "User not authenticated" };
  }

  const movie = await movieService.getMovie(formData.id);
  if (!movie) {
    return { message: "Movie not found" };
  }

  const { error, message } = await movieService.updateMovie(
    fromMovieEditForm(formData),
  );

  if (error) {
    return { message };
  }

  // Revalidate the homepage in case the movie updated was on the homepage
  revalidatePath("/", "page");

  return { message: "Movie updated", success: true };
}

export interface DeleteMovieState {
  message: string;
  success?: boolean;
}

/**
 * Delete a movie from the database.
 * @param previousState - Unused.
 * @param formData - Form data containing the movie ID.
 * @returns An object containing a message in case of an error.
 */
export async function deleteMovieAction(
  previousState: DeleteMovieState | null,
  formData: FormData,
): Promise<DeleteMovieState> {
  const id = Number(formData.get("item_id"));

  if (!id) {
    return { message: "No movie ID provided" };
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    return { message: "User not authenticated" };
  }

  // Delete the movie from the database
  const { error, message } = await movieService.deleteMovie(id);

  if (error) {
    return { message };
  }

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath("/", "page");

  return { message: "Movie deleted", success: true };
}

/**
 * Create a new movie in the database.
 * @param formData - Form data containing the movie details.
 */
export async function createMovieAction(
  formData: MovieCreateFormSchema,
) {
  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  const movie = await movieService.createMovie(fromMovieCreateForm(formData));

  // Revalidate the homepage in case the movie created was on the homepage
  revalidatePath("/", "page");
  // Revalidate the movie index page
  revalidatePath("/movie", "page");
  // Revalidate the movie page for the new movie
  revalidatePath(getUrlForItem(movie), "page");
  redirect(getUrlForItem(movie));
}
