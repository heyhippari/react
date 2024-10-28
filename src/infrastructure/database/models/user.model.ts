/**
 * Model definition for User.
 */

import { z } from "zod";

export const userModelSchema = z.object({
  avatar_url: z.string().url().nullable(),
  create_time: z.string(),
  email: z.string().email().nullable(),
  id: z.string().nullable().optional(),
  username: z.string().nullable(),
});

export type UserModel = z.infer<typeof userModelSchema>;
