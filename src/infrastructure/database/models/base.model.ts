/**
 * Model definition for base schemas.
 * This is not used as-is, but is used to define the actual
 * models without circular dependencies.
 */
import { z } from "zod";

export const baseSeriesModelSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  original_name: z.string(),
});

export type BaseSeriesModel = z.infer<typeof baseSeriesModelSchema>;

export const baseLabelModelSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  original_name: z.string(),
});

export type BaseLabelModel = z.infer<typeof baseLabelModelSchema>;

export const baseStudioModelSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  original_name: z.string(),
});

export type BaseStudioModel = z.infer<typeof baseStudioModelSchema>;

export const baseMovieModelSchema = z.object({
  barcode: z.string().nullable().optional(),
  dvd_id: z.string().optional(),
  format: z.enum([
    "DVD",
    "Blu-ray",
    "Blu-ray 4K",
    "Digital",
    "VHS",
    "LaserDisc",
    "UMD Video",
    "Video CD",
  ]).nullable().optional(),
  front_cover_url: z.string().nullable().optional(),
  full_cover_url: z.string().nullable().optional(),
  has_nudity: z.boolean().optional(),
  id: z.number().optional(),
  label_id: z.number().nullable().optional(),
  length: z.number().nullable().optional(),
  name: z.string().nullable().optional(),
  original_name: z.string(),
  release_date: z.string().nullable().optional(),
  series_id: z.number().nullable().optional(),
  studio_id: z.number().nullable().optional(),
});

export type BaseMovieModel = z.infer<typeof baseMovieModelSchema>;

export const basePersonModelSchema = z.object({
  birth_date: z.string().nullable().optional(),
  bust_size: z.number().nullable().optional(),
  cup_size: z.enum([
    "AA",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ]).nullable().optional(),
  height: z.number().nullable().optional(),
  hips_size: z.number().nullable().optional(),
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  original_name: z.string(),
  profile_url: z.string().nullable().optional(),
  waist_size: z.number().nullable().optional(),
});

export type BasePersonModel = z.infer<typeof basePersonModelSchema>;
