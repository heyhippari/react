import { describe, expect, it } from "vitest";
import { z } from "zod";

import { transformValidationErrors } from "./errors";

describe("Errors utilities", () => {
  describe("transformValidationErrors", () => {
    it("should transform a ZodError into a list of validation errors", () => {
      const schema = z.object({
        age: z.number().min(18, "Must be at least 18"),
        name: z.string().min(1, "Name is required"),
      });

      const result = schema.safeParse({ age: 16, name: "" });

      if (!result.success) {
        const transformedErrors = transformValidationErrors(result.error);
        expect(transformedErrors).toEqual([
          { message: "Must be at least 18", path: "age" },
          { message: "Name is required", path: "name" },
        ]);
      }
    });

    it("should return an empty array if there are no issues", () => {
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
      });

      const result = schema.safeParse({ name: "John" });

      if (!result.success) {
        const transformedErrors = transformValidationErrors(result.error);
        expect(transformedErrors).toEqual([]);
      }
    });
  });
});
