"use server";
import { transformValidationErrors } from "@/core/utils/validation/errors";
import {
  itemDeleteImageFormSchema,
} from "@/core/utils/validation/item-delete-image";
import { imageService } from "@/services/image.service";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

/**
 * Delete an image from an item and Cloudflare.
 * @param previousState - Unused.
 * @param formData - Form data containing the image ID, item ID, and item type.
 * @returns The result of the action.
 */
export async function deleteImageAction(
  previousState:
    | { data: null | string; errors: { message: string }[] | null }
    | null,
  formData: FormData,
) {
  try {
    const { image_id, item_id, item_type } = itemDeleteImageFormSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    await imageService.deleteImage(image_id);

    revalidatePath(`/${item_type}/${item_id}`, "page");

    return {
      data: "Image deleted",
      errors: null,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: null,
        errors: transformValidationErrors(error),
      };
    }

    return {
      data: null,
      errors: [
        {
          message: "An unexpected error occurred while deleting the image",
        },
      ],
    };
  }
}
