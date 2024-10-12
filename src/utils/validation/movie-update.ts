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
  barcode: z.string().optional(),
  format: z
    .union([
      z.literal('Unknown'),
      z.literal('DVD'),
      z.literal('Blu-ray'),
      z.literal('Blu-ray 4K'),
      z.literal('Digital'),
      z.literal('VHS'),
      z.literal('LaserDisc'),
      z.literal('UMD Video'),
      z.literal('Video CD'),
    ])
    .optional(),
});

export type MovieEditFormSchema = z.infer<typeof movieEditFormSchema>;
