import { MovieDto } from "@/data/movie.dto";
import { z } from "zod";

export const movieCreateFormSchema = z.object({
  barcode: z.string().optional(),
  dvd_id: z.string({
    message: "DVD ID is required.",
  }),
  format: z
    .union([
      z.literal("Unknown"),
      z.literal("DVD"),
      z.literal("Blu-ray"),
      z.literal("Blu-ray 4K"),
      z.literal("Digital"),
      z.literal("VHS"),
      z.literal("LaserDisc"),
      z.literal("UMD Video"),
      z.literal("Video CD"),
    ])
    .optional(),
  label_id: z.coerce.number().nullable().optional(),
  length: z.number().optional(),
  name: z.string().optional(),
  original_name: z.string({
    message: "Original title is required.",
  }),
  release_date: z.string().optional(),
  series_id: z.coerce.number().nullable().optional(),
  studio_id: z.coerce.number().nullable().optional(),
});

export type MovieCreateFormSchema = z.infer<typeof movieCreateFormSchema>;

/**
 * Convert a movie edit form to a movie DTO.
 * @param form An object representing a movie edit form.
 * @returns A movie data transfer object.
 */
export function fromMovieCreateForm(form: MovieCreateFormSchema): MovieDto {
  return {
    _type: "movie",
    alternative_name: form.name ? form.original_name : undefined,
    barcode: form.barcode,
    display_name: form.name ?? form.original_name ?? "",
    dvd_id: form.dvd_id,
    format: form.format === "Unknown" ? undefined : form.format,
    label: {
      _type: "label",
      display_name: "Unknown", // This doesn't matter for the form
      id: form.label_id,
    },
    length: form.length,
    release_date: form.release_date,
    series: {
      _type: "series",
      display_name: "Unknown", // This doesn't matter for the form
      id: form.series_id,
    },
    studio: {
      _type: "studio",
      display_name: "Unknown", // This doesn't matter for the form
      id: form.studio_id,
    },
  };
}

export const movieRoleAddFormSchema = z.object({
  person_id: z.coerce.number(),
});

export type MovieRoleAddFormSchema = z.infer<typeof movieRoleAddFormSchema>;
