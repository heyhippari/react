import { z } from 'zod';

export const personEditFormSchema = z.object({
  original_name: z.string({
    message: 'Original name is required.',
  }),
  name: z.string().optional(),
  birth_date: z.string().optional(),
  height: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  bust_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  waist_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
  hips_size: z
    .number({
      description: 'In centimeters',
    })
    .optional(),
});

export type PersonEditFormSchema = z.infer<typeof personEditFormSchema>;
