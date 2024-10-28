import { z } from "zod";

import { baseMovieModelSchema, basePersonModelSchema } from "./base.model";

export const roleModelSchema = z.object({
  age: z.number().nullable().optional(),
  id: z.number().nullable().optional(),
  movies: baseMovieModelSchema.nullable().optional(),
  person: basePersonModelSchema.nullable().optional(),
});

export type RoleModel = z.infer<typeof roleModelSchema>;
