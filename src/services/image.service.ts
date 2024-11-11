import { deleteImage } from "@/infrastructure/database/repositories/image.repository";

export const imageService = {
  async deleteImage(imageId: number) {
    return deleteImage(imageId);
  },
};
