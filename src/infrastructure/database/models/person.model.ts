/**
 * Model definition for Person.
 */

import { z } from "zod";

import { basePersonModelSchema } from "./base.model";
import { roleModelSchema } from "./role.model";

export const personModelSchema = basePersonModelSchema.extend({
  roles: z.array(roleModelSchema).nullable().optional(),
});

export type PersonModel = z.infer<typeof personModelSchema>;

export const personModelArraySchema = z.array(personModelSchema);

export type PersonModelArray = z.infer<typeof personModelArraySchema>;
