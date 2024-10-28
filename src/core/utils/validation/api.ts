import { z } from "zod";

export const apiMovieSearchResultSchema = z.object({
  dvd_id: z.string().optional(),
  id: z.number(),
  original_title: z.string(),
  release_date: z.string().optional(),
  title: z.string().optional(),
});

export type ApiMovieSearchResult = z.infer<typeof apiMovieSearchResultSchema>;

export const apiMovieSearchResultSchemaArray = z.array(
  apiMovieSearchResultSchema,
);

export type ApiMovieSearchResultArray = z.infer<
  typeof apiMovieSearchResultSchemaArray
>;
