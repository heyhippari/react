"use server";
import { createClient } from "../client";

/**
 * Delete an image from Cloudflare.
 * @param imageId - The ID of the image to delete.
 * @throws Error if there is an error deleting the image.
 */
export async function deleteImage(imageId: string) {
  const cloudflareClient = await createClient();

  await cloudflareClient.images.v1
    .delete(imageId, {
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
    });
}

/**
 * Upload an image to Cloudflare.
 * @param image - The image file to upload.
 * @returns The UUID of the uploaded image.
 * @throws Error if there is an error uploading the image.
 */
export async function uploadImage(image: File) {
  const cloudflareClient = await createClient();

  const { id } = await cloudflareClient.images.v1
    .create({
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
      file: image,
    });

  return id;
}
