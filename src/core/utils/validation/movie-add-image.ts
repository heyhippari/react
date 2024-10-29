import { z } from "zod";

export const movieAddImageFormSchema = z.object({
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
    ),
  movie_id: z.coerce.number(),
  type: z.enum([
    "front_cover",
    "full_cover",
  ]),
});

export type MovieAddImageForm = z.infer<typeof movieAddImageFormSchema>;
