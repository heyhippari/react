/**
 * Model definition for Image.
 */

import { z } from "zod";

import { userModelSchema } from "./user.model";

export const imageModelSchema = z.object({
  created_at: z.string().optional(),
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
  uploader: userModelSchema.nullable().optional(),
  uuid: z.string().nullable().optional(),
});

export type ImageModel = z.infer<typeof imageModelSchema>;
