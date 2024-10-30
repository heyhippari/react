import { z } from "zod";

export const personSearchFormSchema = z.object({
  direction: z.enum(["asc", "desc"]).default("desc"),
  order: z.enum([
    "name",
    "original_name",
    "popularity",
    "birth_date",
    "create_time",
  ]).default("create_time"),
  page: z.number().int().positive().default(1),
  q: z.string().optional().default(""),
});

export type PersonSearchFormSchema = z.infer<typeof personSearchFormSchema>;
