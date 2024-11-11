import { describe, expect, it } from "vitest";

import { baseMovieModelSchema } from "./base.model";
import { labelModelSchema } from "./label.model";

describe("labelModelSchema", () => {
  it("should validate a correct label model", () => {
    const validLabel = {
      id: 1,
      movies: [
        baseMovieModelSchema.parse(
          {
            dvd_id: "ABC-123",
            original_name: "Test",
          },
        ),
      ],
      name: "Test",
      original_name: "Test",
    };

    expect(() => labelModelSchema.parse(validLabel)).not.toThrow();
  });

  it("should invalidate an incorrect label model", () => {
    const invalidLabel = {
      id: 1,
      movies: [
        baseMovieModelSchema.parse(
          {
            dvd_id: "ABC-123",
            original_name: "Test",
          },
        ),
      ],
      original_name: 123,
    };

    expect(() => labelModelSchema.parse(invalidLabel)).toThrow();
  });

  it("should allow nullable and optional movies field", () => {
    const validLabelWithNullMovies = {
      id: 1,
      movies: null,
      name: "Test",
      original_name: "Test",
    };

    const validLabelWithoutMovies = {
      id: 1,
      name: "Test",
      original_name: "Test",
    };

    expect(() => labelModelSchema.parse(validLabelWithNullMovies)).not
      .toThrow();
    expect(() => labelModelSchema.parse(validLabelWithoutMovies)).not
      .toThrow();
  });
});
