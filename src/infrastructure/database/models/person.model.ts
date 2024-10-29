/**
 * Model definition for Person.
 */

import { z } from "zod";

import { basePersonModelSchema } from "./base.model";
import { imageModelSchema } from "./image.model";
import { roleModelSchema } from "./role.model";

export const personModelSchema = basePersonModelSchema.extend({
  person_images: z.array(z.object({
    id: z.number().nullable().optional(),
    image: imageModelSchema.nullable().optional(),
    image_id: z.number().nullable().optional(),
    movie_id: z.number().nullable().optional(),
  })).nullable().optional(),
  roles: z.array(roleModelSchema).nullable().optional(),
});

export type PersonModel = z.infer<typeof personModelSchema>;

export const personModelArraySchema = z.array(personModelSchema);

export type PersonModelArray = z.infer<typeof personModelArraySchema>;
