/**
 * Service to interact with the Cloudflare API.
 * Should only be used on the server, to avoid exposing the API token.
 */

import {
  deleteImage,
  uploadImage,
} from "@/infrastructure/services/cloudflare/repositories/image.repository";

export const cloudflareService = {
  async deleteImage(imageId: string) {
    return deleteImage(imageId);
  },
  async uploadImage(image: File) {
    return uploadImage(image);
  },
};
