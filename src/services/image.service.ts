import {
  deleteImage,
  getImage,
} from "@/infrastructure/database/repositories/image.repository";

import { cloudflareService } from "./cloudflare.service";

export const imageService = {
  async deleteImage(imageId: number) {
    const image = await getImage(imageId);

    if (!image) {
      throw new Error(`Image with ID ${imageId} not found`);
    }

    await cloudflareService.deleteImage(image.uuid);

    return deleteImage(imageId);
  },
};
