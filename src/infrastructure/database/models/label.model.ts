/**
 * Model definition for Studio.
 */

import { z } from "zod";

import { baseLabelModelSchema, baseMovieModelSchema } from "./base.model";

export const labelModelSchema = baseLabelModelSchema.extend({
  movies: z.array(baseMovieModelSchema).nullable().optional(),
});

export type LabelModel = z.infer<typeof labelModelSchema>;
