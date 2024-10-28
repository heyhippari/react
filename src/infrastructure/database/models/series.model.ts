/**
 * Model definition for Studio.
 */

import { z } from "zod";

import { baseMovieModelSchema, baseSeriesModelSchema } from "./base.model";

export const seriesModelSchema = baseSeriesModelSchema.extend({
  movies: z.array(baseMovieModelSchema).nullable().optional(),
});

export type SeriesModel = z.infer<typeof seriesModelSchema>;
