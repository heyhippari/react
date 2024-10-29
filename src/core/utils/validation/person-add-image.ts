import { z } from "zod";

/**
 * Validates the dimensions and ratio of an image for uploading a person's profile image.
 * @param file The image file to validate.
 * @returns A promise that resolves to `true` if the image is valid, or `false` otherwise.
 */
export async function validateImageDimensionsForProfile(
  file: File,
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.addEventListener("load", () => {
      URL.revokeObjectURL(url);

      const ratio = img.width / img.height;
      const isValidRatio = Math.abs(ratio - 2 / 3) < 0.01; // Allow small floating point differences

      const isValidSize = img.width >= 300 && img.width <= 2000 &&
        img.height >= 450 && img.height <= 3000;

      resolve(isValidRatio && isValidSize);
    });

    img.src = url;
  });
}

export const personAddImageFormSchema = z.object({
  image: z.custom<File>()
    .refine(
      (file) => file instanceof File,
      "File is required",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "File must be a JPEG, PNG, or WebP image",
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10 MB
      "File must be less than 10 MB",
    )
    .refine(
      async (file) => await validateImageDimensionsForProfile(file),
      "Image must have a resolution between 300x450 and 2000x3000 and an aspect ratio of 2:3",
    ),
  person_id: z.coerce.number(),
  type: z.enum([
    "profile",
  ]),
});

export type PersonAddImageForm = z.infer<typeof personAddImageFormSchema>;
