import { StudioModel } from "@/infrastructure/database/models/studio.model";
import { describe, expect, it } from "vitest";

import {
  fromLabelDto,
  StudioDto,
  studioDtoSchema,
  toStudioDto,
} from "./studio.dto";

describe("Studio DTO", () => {
  const mockStudioModel: StudioModel = {
    id: 1,
    movies: [
      {
        id: 1,
        original_name: "My Neighbor Totoro",
        release_date: "1988-04-16",
      },
    ],
    original_name: "Studio Ghibli",
  };

  const mockStudioDto: StudioDto = {
    "_type": "studio",
    "alternative_name": undefined,
    "display_name": "Studio Ghibli",
    "homepage": undefined,
    "id": 1,
    "movies": [
      {
        "_type": "movie",
        "alternative_name": undefined,
        "barcode": undefined,
        "display_name": "My Neighbor Totoro",
        "dvd_id": undefined,
        "format": undefined,
        "front_cover_url": undefined,
        "full_cover_url": undefined,
        "has_nudity": undefined,
        "id": 1,
        "length": undefined,
        "release_date": "1988-04-16",
      },
    ],
  };

  it("should convert StudioModel to StudioDto", () => {
    const dto = toStudioDto(mockStudioModel);
    expect(dto).toEqual(mockStudioDto);
  });

  it("should convert StudioDto to StudioModel", () => {
    const model = fromLabelDto(mockStudioDto);
    expect(model).toEqual(mockStudioModel);
  });

  it("should validate StudioDto schema", () => {
    expect(() => studioDtoSchema.parse(mockStudioDto)).not
      .toThrow();
  });
});
