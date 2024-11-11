import { z } from "zod";

export const itemDeleteImageFormSchema = z.object({
  image_id: z.coerce.number(),
  item_id: z.coerce.number(),
  item_type: z.enum([
    "movie",
    "person",
  ]),
});

export type ItemDeleteImageForm = z.infer<typeof itemDeleteImageFormSchema>;
