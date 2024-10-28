/**
 * Model definition for Movie.
 */

import { z } from "zod";

import {
  baseLabelModelSchema,
  baseMovieModelSchema,
  baseSeriesModelSchema,
  baseStudioModelSchema,
} from "./base.model";
import { imageModelSchema } from "./image.model";
import { roleModelSchema } from "./role.model";

export const movieModelSchema = baseMovieModelSchema.extend({
  label: baseLabelModelSchema.nullable().optional(),
  movie_images: z.array(z.object({
    id: z.number().nullable().optional(),
    image: imageModelSchema.nullable().optional(),
    image_id: z.number().nullable().optional(),
    movie_id: z.number().nullable().optional(),
  })).nullable().optional(),
  roles: z.array(
    roleModelSchema,
  ).nullable().optional(),
  series: baseSeriesModelSchema.nullable().optional(),
  studio: baseStudioModelSchema.nullable().optional(),
});

export type MovieModel = z.infer<typeof movieModelSchema>;

export const movieModelArraySchema = z.array(movieModelSchema);

export type MovieModelArray = z.infer<typeof movieModelArraySchema>;
