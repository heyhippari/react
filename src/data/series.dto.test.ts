import { SeriesModel } from "@/infrastructure/database/models/series.model";
import { describe, expect, it } from "vitest";

import { baseSeriesDtoSchema } from "./base.dto";
import { fromSeriesDto, SeriesDto, toSeriesDto } from "./series.dto";

describe("Series DTO", () => {
  it("should convert a series model to a series DTO", () => {
    const model: SeriesModel = {
      movies: [
        {
          id: 1,
          original_name: "Test Movie",
        },
      ],
      original_name: "Test Series",
    };

    const dto = toSeriesDto(model);

    expect(dto).toEqual({
      "_type": "series",
      "alternative_name": undefined,
      "display_name": "Test Series",
      "id": undefined,
      "movies": [
        {
          "_type": "movie",
          "alternative_name": undefined,
          "barcode": undefined,
          "display_name": "Test Movie",
          "dvd_id": undefined,
          "format": undefined,
          "front_cover_url": undefined,
          "full_cover_url": undefined,
          "has_nudity": undefined,
          "id": 1,
          "length": undefined,
          "release_date": undefined,
        },
      ],
    });
  });

  it("should convert a series DTO to a series model", () => {
    const dto: SeriesDto = {
      "_type": "series",
      "display_name": "Test Series",
      "movies": [
        {
          "_type": "movie",
          "display_name": "Test Movie",
          "id": 1,
        },
      ],
    };

    const model = fromSeriesDto(dto);

    expect(model).toEqual({
      "id": undefined,
      "movies": [
        {
          "barcode": undefined,
          "dvd_id": undefined,
          "format": undefined,
          "front_cover_url": undefined,
          "full_cover_url": undefined,
          "has_nudity": undefined,
          "id": 1,
          "length": undefined,
          "name": undefined,
          "original_name": "Test Movie",
          "release_date": undefined,
        },
      ],
      "name": undefined,
      "original_name": "Test Series",
    });
  });

  it("should validate a series DTO schema", () => {
    const dto: SeriesDto = {
      "_type": "series",
      "display_name": "Test Series",
      "movies": [
        {
          "_type": "movie",
          "display_name": "Test Movie",
          "id": 1,
        },
      ],
    };

    expect(() => baseSeriesDtoSchema.parse(dto)).not.toThrow();
  });

  it("should invalidate an incorrect series DTO schema", () => {
    const invalidDto = {
      description: "A test series",
      id: 1,
      movies: "invalid movies data",
      title: "Test Series",
    };

    expect(() => baseSeriesDtoSchema.parse(invalidDto)).toThrow();
  });
});
