import { z } from 'zod';

export const movieEditFormSchema = z.object({
  original_name: z.string({
    message: 'Original title is required.',
  }),
  name: z.string().optional(),
  release_date: z.string().optional(),
  length: z.number().optional(),
  dvd_id: z.string({
    message: 'DVD ID is required.',
  }),
  label_id: z.coerce.number().optional(),
  series_id: z.coerce.number().optional(),
  studio_id: z.coerce.number().optional(),
});

export type MovieEditFormSchema = z.infer<typeof movieEditFormSchema>;
