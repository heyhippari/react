import { ImageModel } from "@/infrastructure/database/models/image.model";
import { describe, expect, it } from "vitest";

import { toImageVariants } from "./base.dto";
import {
  fromImageDto,
  ImageDto,
  imageDtoSchema,
  toImageDto,
} from "./image.dto";
import { fromUserDto } from "./user.dto";

describe("Image DTO", () => {
  it("should convert ImageModel to ImageDto", () => {
    const model: ImageModel = {
      created_at: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: {
        email: "john.doe@example.com",
        id: "1",
        username: "john_doe",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    const dto = toImageDto(model);

    expect(dto).toEqual({
      create_time: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: dto.uploader ? fromUserDto(dto.uploader) : undefined,
      url: toImageVariants("123e4567-e89b-12d3-a456-426614174000"),
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    });
  });

  it("should convert ImageModel to ImageDto without uploader", () => {
    const model: ImageModel = {
      created_at: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    const dto = toImageDto(model);

    expect(dto).toEqual({
      create_time: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: undefined,
      url: toImageVariants("123e4567-e89b-12d3-a456-426614174000"),
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    });
  });

  it("should convert ImageDto to ImageModel", () => {
    const dto: ImageDto = {
      create_time: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: {
        email: "john.doe@example.com",
        id: "1",
        username: "john_doe",
      },
      url: {
        card: "card.jpg",
        poster: "poster.jpg",
        public: "public.jpg",
        role: "role.jpg",
        uuid: "123e4567-e89b-12d3-a456-426614174000",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    const model = fromImageDto(dto);

    expect(model).toEqual({
      created_at: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: dto.uploader ? fromUserDto(dto.uploader) : undefined,
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    });
  });

  it("should convert ImageDto to ImageModel without uploader", () => {
    const dto: ImageDto = {
      create_time: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      url: {
        card: "card.jpg",
        poster: "poster.jpg",
        public: "public.jpg",
        role: "role.jpg",
        uuid: "123e4567-e89b-12d3-a456-426614174000",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    const model = fromImageDto(dto);

    expect(model).toEqual({
      created_at: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: undefined,
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    });
  });

  it("should validate ImageDto schema", () => {
    const validDto: ImageDto = {
      create_time: "2023-01-01T00:00:00Z",
      id: 1,
      type: "front_cover",
      uploader: {
        email: "john.doe@example.com",
        id: "1",
        username: "john_doe",
      },
      url: {
        card:
          "https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/123e4567-e89b-12d3-a456-426614174000/card",
        poster:
          "https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/123e4567-e89b-12d3-a456-426614174000/poster",
        public:
          "https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/123e4567-e89b-12d3-a456-426614174000/public",
        role:
          "https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/123e4567-e89b-12d3-a456-426614174000/role",
        uuid: "123e4567-e89b-12d3-a456-426614174000",
      },
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };

    expect(() => imageDtoSchema.parse(validDto)).not.toThrow();

    const invalidDto = {
      create_time: "2023-01-01T00:00:00Z",
      id: "invalid_id",
      type: "invalid_type",
      uploader: null,
      url: "invalid_url",
      uuid: 123,
    };

    expect(() => imageDtoSchema.parse(invalidDto)).toThrow();
  });
});
