import { z } from 'zod';

export const personEditFormSchema = z.object({
  birth_date: z.string().optional(),
  bust_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  height: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  hips_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  name: z.string().optional(),
  original_name: z.string({
    message: 'Original name is required.',
  }),
  waist_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
});

export type PersonEditFormSchema = z.infer<typeof personEditFormSchema>;
