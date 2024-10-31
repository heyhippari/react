/**
 * Model definition for User.
 */

import { z } from "zod";

export const userModelSchema = z.object({
  avatar_url: z.string().url().nullable().optional(),
  create_time: z.string().optional(),
  email: z.string().email().nullable().optional(),
  id: z.string().nullable().optional(),
  roles: z.array(z.object({
    role: z.enum([
      "admin",
      "moderator",
      "user",
      "banned",
    ]),
  })).nullable().optional(),
  username: z.string().nullable().optional(),
});

export type UserModel = z.infer<typeof userModelSchema>;
