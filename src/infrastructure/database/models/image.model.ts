/**
 * Model definition for Image.
 */

import { z } from "zod";

import { userModelSchema } from "./user.model";

export const imageModelSchema = z.object({
  created_at: z.string().optional(),
  id: z.number().nullable().optional(),
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
  uploader: userModelSchema.optional(),
  uuid: z.string(),
});

export type ImageModel = z.infer<typeof imageModelSchema>;
