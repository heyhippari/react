/**
 * Model definition for Image.
 */

import { z } from "zod";

export const imageModelSchema = z.object({
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
  uuid: z.string().nullable().optional(),
});

export type ImageModel = z.infer<typeof imageModelSchema>;
