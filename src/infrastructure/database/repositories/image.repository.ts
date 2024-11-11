/**
 * Repository for the Image entity.
 */

import { createSupabaseClient } from "../client";

/**
 * Create a new image in the database.
 * @param uuid - The UUID of the image to add.
 * @param type - The type to assign to the image.
 * @returns The created image.
 */
export async function addImage(
  uuid: string,
  type:
    | "art"
    | "disc"
    | "front_cover"
    | "full_cover"
    | "logo"
    | "profile"
    | "screenshot",
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("images")
    .insert([{ type, uuid }])
    .select("id, uuid")
    .single();

  return data;
}

/**
 * Delete an image from the database.
 * @param imageId - The ID of the image to delete.
 */
export async function deleteImage(imageId: number) {
  const client = await createSupabaseClient();

  await client
    .from("images")
    .delete()
    .eq("id", imageId)
    .throwOnError();
}

/**
 * Get an image from the database.
 * @param imageId - The ID of the image to get.
 * @returns The image.
 */
export async function getImage(imageId: number) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("images")
    .select("*")
    .eq("id", imageId)
    .single();

  return data;
}
