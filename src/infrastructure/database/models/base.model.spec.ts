import { assertType, describe, expect, it } from "vitest";

import {
  BaseLabelModel,
  baseLabelModelSchema,
  BaseMovieModel,
  baseMovieModelSchema,
  BasePersonModel,
  basePersonModelSchema,
  BaseSeriesModel,
  baseSeriesModelSchema,
  BaseStudioModel,
  baseStudioModelSchema,
} from "./base.model";

describe("baseModelSchema", () => {
  describe("baseLabelModelSchema", () => {
    it("should validate a correct and complete object", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate a correct and incomplete object", () => {
      const data = {
        original_name: "Test",
      } satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not validate an incorrect object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect data
        name: 1,
        original_name: "Test",
      } satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incomplete object", () => {
      const data = {
        id: 1,
        name: "Test",
        // @ts-expect-error -- Purposefully incomplete data
      } satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incorrect and incomplete object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect and incomplete data
      } satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an empty object", () => {
      // @ts-expect-error -- Purposefully empty data
      const data = {} satisfies BaseLabelModel;

      const result = baseLabelModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should return a BaseLabelModel type", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseLabelModel;

      assertType<BaseLabelModel>(data);
    });
  });

  describe("baseMovieModelSchema", () => {
    it("should validate a correct and complete object", () => {
      const data = {
        barcode: "8601410719463",
        dvd_id: "ABC-123",
        format: "DVD",
        front_cover_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        full_cover_url: "e22ac79b-3854-453d-8434-330d604b0ae4",
        has_nudity: true,
        id: 1,
        label_id: 1,
        length: 120,
        name: "Test",
        original_name: "Test",
        release_date: "2024-10-28T00:00:00+00:00",
        series_id: 1,
        studio_id: 1,
      } satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate a correct and incomplete object", () => {
      const data = {
        dvd_id: "ABC-123",
        original_name: "Test",
      } satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not validate an incorrect object", () => {
      const data = {
        barcode: "8601410719463",
        dvd_id: "ABC-123",
        format: "DVD",
        front_cover_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        full_cover_url: "e22ac79b-3854-453d-8434-330d604b0ae4",
        has_nudity: true,
        id: 1,
        label_id: 1,
        length: 120,
        name: "Test",
        original_name: "Test",
        release_date: "2024-10-28T00:00:00+00:00",
        series_id: 1,
        // @ts-expect-error -- Purposefully incorrect data
        studio_id: "1",
      } satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incomplete object", () => {
      const data = {
        // @ts-expect-error -- Purposefully incomplete data
      } satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incorrect and incomplete object", () => {
      const data = {
        barcode: "8601410719463",
        format: "DVD",
        front_cover_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        full_cover_url: "e22ac79b-3854-453d-8434-330d604b0ae4",
        has_nudity: true,
        id: 1,
        // @ts-expect-error -- Purposefully incorrect and incomplete data
        label_id: "1",
        length: 120,
        name: "Test",
      } satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an empty object", () => {
      // @ts-expect-error -- Purposefully empty data
      const data = {} satisfies BaseMovieModel;

      const result = baseMovieModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should return a BaseMovieModel type", () => {
      const data = {
        barcode: "8601410719463",
        dvd_id: "ABC-123",
        format: "DVD",
        front_cover_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        full_cover_url: "e22ac79b-3854-453d-8434-330d604b0ae4",
        has_nudity: true,
        id: 1,
        label_id: 1,
        length: 120,
        name: "Test",
        original_name: "Test",
        release_date: "2024-10-28T00:00:00+00:00",
        series_id: 1,
        studio_id: 1,
      } satisfies BaseMovieModel;

      assertType<BaseMovieModel>(data);
    });
  });

  describe("basePersonModelSchema", () => {
    it("should validate a correct and complete object", () => {
      const data = {
        birth_date: "1990-01-01T00:00:00+00:00",
        bust_size: 90,
        cup_size: "AA",
        height: 160,
        hips_size: 90,
        id: 1,
        name: "Test",
        original_name: "Test",
        profile_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        waist_size: 60,
      } satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate a correct and incomplete object", () => {
      const data = {
        original_name: "Test",
      } satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not validate an incorrect object", () => {
      const data = {
        birth_date: "1990-01-01T00:00:00+00:00",
        bust_size: 90,
        cup_size: "AA",
        height: 160,
        hips_size: 90,
        id: 1,
        // @ts-expect-error -- Purposefully incorrect data
        name: 1,
        original_name: "Test",
        profile_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        waist_size: 60,
      } satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incomplete object", () => {
      const data = {
        birth_date: "1990-01-01T00:00:00+00:00",
        bust_size: 90,
        cup_size: "AA",
        height: 160,
        hips_size: 90,
        id: 1,
        // @ts-expect-error -- Purposefully incomplete data
      } satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incorrect and incomplete object", () => {
      const data = {
        birth_date: "1990-01-01T00:00:00+00:00",
        bust_size: 90,
        cup_size: "AA",
        height: 160,
        hips_size: 90,
        id: 1,
        // @ts-expect-error -- Purposefully incorrect and incomplete data
        profile_url: 1,
      } satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an empty object", () => {
      // @ts-expect-error -- Purposefully empty data
      const data = {} satisfies BasePersonModel;

      const result = basePersonModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should return a BasePersonModel type", () => {
      const data = {
        birth_date: "1990-01-01T00:00:00+00:00",
        bust_size: 90,
        cup_size: "AA",
        height: 160,
        hips_size: 90,
        id: 1,
        name: "Test",
        original_name: "Test",
        profile_url: "b3cdf33f-afec-4055-a958-3c359863b976",
        waist_size: 60,
      } satisfies BasePersonModel;

      assertType<BasePersonModel>(data);
    });
  });

  describe("baseSeriesModelSchema", () => {
    it("should validate a correct and complete object", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate a correct and incomplete object", () => {
      const data = {
        original_name: "Test",
      } satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not validate an incorrect object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect data
        name: 1,
        original_name: "Test",
      } satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incomplete object", () => {
      const data = {
        id: 1,
        name: "Test",
        // @ts-expect-error -- Purposefully incomplete data
      } satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incorrect and incomplete object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect and incomplete data
      } satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an empty object", () => {
      // @ts-expect-error -- Purposefully empty data
      const data = {} satisfies BaseSeriesModel;

      const result = baseSeriesModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should return a BaseSeriesModel type", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseSeriesModel;

      assertType<BaseSeriesModel>(data);
    });
  });

  describe("baseStudioModelSchema", () => {
    it("should validate a correct and complete object", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate a correct and incomplete object", () => {
      const data = {
        original_name: "Test",
      } satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not validate an incorrect object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect data
        name: 1,
        original_name: "Test",
      } satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incomplete object", () => {
      const data = {
        id: 1,
        name: "Test",
        // @ts-expect-error -- Purposefully incomplete data
      } satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an incorrect and incomplete object", () => {
      const data = {
        id: 1,
        // @ts-expect-error -- Purposefully incorrect and incomplete data
      } satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should not validate an empty object", () => {
      // @ts-expect-error -- Purposefully empty data
      const data = {} satisfies BaseStudioModel;

      const result = baseStudioModelSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should return a BaseStudioModel type", () => {
      const data = {
        id: 1,
        name: "Test",
        original_name: "Test",
      } satisfies BaseStudioModel;

      assertType<BaseStudioModel>(data);
    });
  });
});
