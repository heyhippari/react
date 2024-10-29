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
