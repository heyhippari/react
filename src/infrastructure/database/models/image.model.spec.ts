import { describe, expect, it } from "vitest";

import { ImageModel, imageModelSchema } from "./image.model";

describe("imageModelSchema", () => {
  it("should validate a correct image model", () => {
    const validImageModel: ImageModel = {
      created_at: "2023-10-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: {
        email: "john.doe@example.com",
        id: "1",
        username: "john_doe",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    expect(() => imageModelSchema.parse(validImageModel)).not.toThrow();
  });

  it("should invalidate an image model with missing uuid", () => {
    const invalidImageModel = {
      created_at: "2023-10-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: {
        email: "john.doe@example.com",
        id: 1,
        name: "John Doe",
      },
    };

    expect(() => imageModelSchema.parse(invalidImageModel)).toThrow();
  });

  it("should invalidate an image model with incorrect type", () => {
    const invalidImageModel = {
      created_at: "2023-10-01T00:00:00Z",
      id: 1,
      type: "invalid_type",
      uploader: {
        email: "john.doe@example.com",
        id: 1,
        name: "John Doe",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    expect(() => imageModelSchema.parse(invalidImageModel)).toThrow();
  });

  it("should validate an image model with optional fields missing", () => {
    const validImageModel = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    expect(() => imageModelSchema.parse(validImageModel)).not.toThrow();
  });
});
