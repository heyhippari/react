import { LabelModel } from "@/infrastructure/database/models/label.model";
import { describe, expect, it } from "vitest";

import { baseLabelDtoSchema } from "./base.dto";
import { fromLabelDto, LabelDto, toLabelDto } from "./label.dto";

describe("Label DTO Tests", () => {
  it("should convert a label model to a label DTO", () => {
    const model: LabelModel = {
      id: 1,
      movies: [
        {
          id: 1,
          original_name: "Test Movie",
        },
      ],
      original_name: "Test Label",
    };

    const dto = toLabelDto(model);

    expect(dto).toEqual({
      _type: "label",
      alternative_name: undefined,
      display_name: "Test Label",
      id: 1,
      movies: [
        {
          _type: "movie",
          alternative_name: undefined,
          barcode: undefined,
          display_name: "Test Movie",
          dvd_id: undefined,
          format: undefined,
          front_cover_url: undefined,
          full_cover_url: undefined,
          has_nudity: undefined,
          id: 1,
          length: undefined,
          release_date: undefined,
        },
      ],
    });
  });

  it("should convert a label DTO to a label model", () => {
    const dto: LabelDto = {
      _type: "label",
      display_name: "Test Label",
      id: 1,
      movies: [
        {
          _type: "movie",
          display_name: "Test Movie",
          id: 1,
        },
      ],
    };

    const model = fromLabelDto(dto);

    expect(model).toEqual({
      id: 1,
      movies: [
        {
          barcode: undefined,
          dvd_id: undefined,
          format: undefined,
          front_cover_url: undefined,
          full_cover_url: undefined,
          has_nudity: undefined,
          id: 1,
          length: undefined,
          name: undefined,
          original_name: "Test Movie",
          release_date: undefined,
        },
      ],
      original_name: "Test Label",
    });
  });

  it("should validate a label DTO schema", () => {
    const dto: LabelDto = {
      _type: "label",
      display_name: "Test Label",
      id: 1,
      movies: [
        {
          _type: "movie",
          display_name: "Test Movie",
          id: 1,
        },
      ],
    };

    const result = baseLabelDtoSchema.safeParse(dto);
    expect(result.success).toBe(true);
  });

  it("should not validate an invalid label DTO schema", () => {
    const dto = {
      _type: "label",
      id: 1,
      movies: [
        {
          _type: "movie",
          display_name: "Test Movie",
          id: 1,
        },
      ],
    };

    const result = baseLabelDtoSchema.safeParse(dto);
    expect(result.success).toBe(false);
  });
});
