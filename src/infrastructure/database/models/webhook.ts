import { baseMovieModelSchema } from "@/infrastructure/database/models/base.model";
import { z } from "zod";

export const supabaseWebhookPayloadSchema = z.object({
  old_record: baseMovieModelSchema.nullable(),
  record: baseMovieModelSchema.nullable(),
  schema: z.string(),
  table: z.string(),
  type: z.enum(["INSERT", "UPDATE", "DELETE"]),
});

export type SupabaseWebhookPayload = z.infer<
  typeof supabaseWebhookPayloadSchema
>;
