import { z } from "zod";

/**
 * Transforms a Zod error into a list of validation errors for serialization between the server and client.
 * @param error - The Zod error to transform.
 * @returns The list of validation errors.
 */
export function transformValidationErrors(error: z.ZodError) {
  return error.issues.map((issue) => ({
    message: issue.message,
    path: issue.path.join("."),
  }));
}
