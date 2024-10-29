import { MovieDto } from "@/data/movie.dto";
import { z } from "zod";

export const movieEditFormSchema = z.object({
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
  id: z.number(),
  label_id: z.coerce.number().optional(),
  length: z.number().optional(),
  name: z.string().optional(),
  original_name: z.string({
    message: "Original title is required.",
  }),
  release_date: z.string().optional(),
  series_id: z.coerce.number().optional(),
  studio_id: z.coerce.number().optional(),
});

export type MovieEditFormSchema = z.infer<typeof movieEditFormSchema>;

/**
 * Convert a movie DTO to a movie edit form.
 * @param dto An object representing a movie DTO.
 * @returns An object representing a movie edit form.
 */
export function toMovieEditForm(dto: MovieDto): MovieEditFormSchema {
  return {
    barcode: dto.barcode!,
    dvd_id: dto.dvd_id!,
    format: dto.format ?? "Unknown",
    id: dto.id!,
    label_id: dto.label?.id ?? undefined,
    length: dto.length!,
    name: dto.alternative_name ? dto.display_name : undefined,
    original_name: dto.alternative_name
      ? dto.display_name
      : dto.alternative_name!,
    release_date: dto.release_date!,
    series_id: dto.series?.id ?? undefined,
    studio_id: dto.studio?.id ?? undefined,
  };
}

/**
 * Convert a movie edit form to a movie DTO.
 * @param form An object representing a movie edit form.
 * @returns A movie data transfer object.
 */
export function fromMovieEditForm(form: MovieEditFormSchema): MovieDto {
  return {
    _type: "movie",
    alternative_name: form.name ? form.original_name : undefined,
    barcode: form.barcode,
    display_name: form.name ?? form.original_name ?? "",
    dvd_id: form.dvd_id,
    format: form.format === "Unknown" ? undefined : form.format,
    id: form.id,
    label: {
      _type: "label",
      id: form.label_id,
    },
    length: form.length,
    release_date: form.release_date,
    series: {
      _type: "series",
      id: form.series_id,
    },
    studio: {
      _type: "studio",
      id: form.studio_id,
    },
  };
}

export const movieRoleAddFormSchema = z.object({
  person_id: z.coerce.number(),
});

export type MovieRoleAddFormSchema = z.infer<typeof movieRoleAddFormSchema>;
