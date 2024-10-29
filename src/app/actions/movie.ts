"use server";
import {
  fromMovieEditForm,
  MovieEditFormSchema,
  MovieRoleAddFormSchema,
} from "@/core/utils/validation/movie-update";
import { movieService } from "@/services/movie.service";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Delete a role from a movie.
 * @param previousState - Unused.
 * @param formData - Form data containing the movie ID and role ID.
 */
export async function deleteMovieRoleAction(
  previousState: null | void,
  formData: FormData,
) {
  if (!formData.get("movie_id")) {
    throw new Error("No movie ID provided");
  }

  const movie_id = Number(formData.get("movie_id"));
  const role_id = Number(formData.get("role_id"));

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  const movie = await movieService.getMovie(movie_id);
  if (!movie) {
    throw new Error("Movie not found");
  }

  await movieService.deleteMovieRole(movie_id, role_id);

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movie_id}`, "page");
  revalidatePath(`/movie/${movie_id}/edit/cast`, "page");
  redirect(`/movie/${movie_id}/edit/cast`);
}

/**
 * Add a role to a movie.
 * @param movie_id - The ID of the movie to add the role to.
 * @param formData - Form data containing the person ID.
 */
export async function addMovieRoleAction(
  movie_id: number,
  formData: MovieRoleAddFormSchema,
) {
  if (!movie_id) {
    throw new Error("No movie ID provided");
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  try {
    const movie = await movieService.getMovie(movie_id);
    if (!movie) {
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching movie");
  }

  await movieService.addMovieRole(movie_id, formData.person_id);

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movie_id}`, "page");
  revalidatePath(`/movie/${movie_id}/edit/cast`, "page");
  redirect(`/movie/${movie_id}/edit/cast`);
}

/**
 * Update a movie in the database.
 * @param formData - Form data containing the movie details.
 */
export async function updateMovieAction(
  formData: MovieEditFormSchema,
) {
  if (!formData.id) {
    throw new Error("No movie ID provided");
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  const movie = await movieService.getMovie(formData.id);
  if (!movie) {
    throw new Error("Movie not found");
  }

  await movieService.updateMovie(fromMovieEditForm(formData));

  // Revalidate the homepage in case the movie updated was on the homepage
  revalidatePath("/", "page");
  redirect(`/movie/${movie.id}`);
}

/**
 * Delete a movie from the database.
 * @param previousState - Unused.
 * @param formData - Form data containing the movie ID.
 */
export async function deleteMovieAction(
  previousState: null | void,
  formData: FormData,
) {
  const id = Number(formData.get("item_id"));

  if (!id) {
    throw new Error("No movie ID provided");
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  // Delete the movie from the database
  await movieService.deleteMovie(id);

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath("/", "page");
  redirect("/");
}
