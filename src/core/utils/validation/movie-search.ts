import { z } from "zod";

export const movieSearchFormSchema = z.object({
  direction: z.enum(["asc", "desc"]).default("desc"),
  order: z.enum(["create_time", "dvd_id", "popularity", "release_date"])
    .default("create_time"),
  page: z.number().int().positive().default(1),
  q: z.string().optional().default(""),
});

export type MovieSearchFormSchema = z.infer<typeof movieSearchFormSchema>;
