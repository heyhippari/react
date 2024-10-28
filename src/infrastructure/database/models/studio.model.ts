/**
 * Model definition for Studio.
 */

import { z } from "zod";

import { baseMovieModelSchema, baseStudioModelSchema } from "./base.model";

export const studioModelSchema = baseStudioModelSchema.extend({
  movies: z.array(baseMovieModelSchema).nullable().optional(),
});

export type StudioModel = z.infer<typeof studioModelSchema>;
