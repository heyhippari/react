import {
  BaseLabelModel,
  BaseMovieModel,
  BasePersonModel,
  BaseSeriesModel,
  BaseStudioModel,
} from "@/infrastructure/database/models/base.model";
import { ImageModel } from "@/infrastructure/database/models/image.model";
import { describe, expect, it } from "vitest";

import {
  fromBaseLabelDto,
  fromBaseMovieDto,
  fromBasePersonDto,
  fromBaseSeriesDto,
  fromBaseStudioDto,
  fromImageDto,
  toBaseLabelDto,
  toBaseMovieDto,
  toBasePersonDto,
  toBaseSeriesDto,
  toBaseStudioDto,
  toImageDto,
  toImageVariants,
} from "./base.dto";

describe("DTO Mappers", () => {
  it("should convert ImageModel to ImageDto and back", () => {
    const imageModel: ImageModel = { type: "front_cover", uuid: "1234" };
    const imageDto = toImageDto(imageModel);
    expect(imageDto).toEqual({ type: "front_cover", uuid: "1234" });

    const newImageModel = fromImageDto(imageDto);
    expect(newImageModel).toEqual(imageModel);
  });

  it("should convert UUID to ImageVariants", () => {
    const uuid = "1234";
    const imageVariants = toImageVariants(uuid);
    expect(imageVariants).toEqual({
      card:
        `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/card`,
      poster:
        `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/poster`,
      public:
        `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/public`,
      role:
        `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/role`,
      uuid,
    });
  });

  it("should convert null UUID to ImageVariants", () => {
    const imageVariants = toImageVariants(null);
    expect(imageVariants).toEqual({
      card: null,
      poster: null,
      public: null,
      role: null,
      uuid: null,
    });
  });

  it("should convert BaseMovieModel to BaseMovieDto and back", () => {
    const baseMovieModel: BaseMovieModel = {
      barcode: "123456789",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: "front-cover-uuid",
      full_cover_url: "full-cover-uuid",
      has_nudity: true,
      id: 1,
      length: 120,
      name: "Movie Name",
      original_name: "Original Movie Name",
      release_date: "2023-01-01",
    };
    const baseMovieDto = toBaseMovieDto(baseMovieModel);
    expect(baseMovieDto).toEqual({
      _type: "movie",
      alternative_name: "Original Movie Name",
      barcode: "123456789",
      display_name: "Movie Name",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: toImageVariants("front-cover-uuid"),
      full_cover_url: toImageVariants("full-cover-uuid"),
      has_nudity: true,
      id: 1,
      length: 120,
      release_date: "2023-01-01",
    });

    const newBaseMovieModel = fromBaseMovieDto(baseMovieDto);
    expect(newBaseMovieModel).toEqual(baseMovieModel);
  });

  it("should convert BaseMovieModel to BaseMovieDto and back with no translated name", () => {
    const baseMovieModel: BaseMovieModel = {
      barcode: "123456789",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: "front-cover-uuid",
      full_cover_url: "full-cover-uuid",
      has_nudity: true,
      id: 1,
      length: 120,
      original_name: "Original Movie Name",
      release_date: "2023-01-01",
    };
    const baseMovieDto = toBaseMovieDto(baseMovieModel);
    expect(baseMovieDto).toEqual({
      _type: "movie",
      barcode: "123456789",
      display_name: "Original Movie Name",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: toImageVariants("front-cover-uuid"),
      full_cover_url: toImageVariants("full-cover-uuid"),
      has_nudity: true,
      id: 1,
      length: 120,
      release_date: "2023-01-01",
    });

    const newBaseMovieModel = fromBaseMovieDto(baseMovieDto);
    expect(newBaseMovieModel).toEqual(baseMovieModel);
  });

  it("should convert BaseMovieModel to BaseMovieDto and back with no images", () => {
    const baseMovieModel: BaseMovieModel = {
      barcode: "123456789",
      dvd_id: "dvd123",
      format: "DVD",
      has_nudity: true,
      id: 1,
      length: 120,
      name: "Movie Name",
      original_name: "Original Movie Name",
      release_date: "2023-01-01",
    };
    const baseMovieDto = toBaseMovieDto(baseMovieModel);
    expect(baseMovieDto).toEqual({
      _type: "movie",
      alternative_name: "Original Movie Name",
      barcode: "123456789",
      display_name: "Movie Name",
      dvd_id: "dvd123",
      format: "DVD",
      has_nudity: true,
      id: 1,
      length: 120,
      release_date: "2023-01-01",
    });

    const newBaseMovieModel = fromBaseMovieDto(baseMovieDto);
    expect(newBaseMovieModel).toEqual(baseMovieModel);
  });

  it("should convert BaseMovieModel to BaseMovieDto and back with no id", () => {
    const baseMovieModel: BaseMovieModel = {
      barcode: "123456789",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: "front-cover-uuid",
      full_cover_url: "full-cover-uuid",
      has_nudity: true,
      length: 120,
      name: "Movie Name",
      original_name: "Original Movie Name",
      release_date: "2023-01-01",
    };
    const baseMovieDto = toBaseMovieDto(baseMovieModel);
    expect(baseMovieDto).toEqual({
      _type: "movie",
      alternative_name: "Original Movie Name",
      barcode: "123456789",
      display_name: "Movie Name",
      dvd_id: "dvd123",
      format: "DVD",
      front_cover_url: toImageVariants("front-cover-uuid"),
      full_cover_url: toImageVariants("full-cover-uuid"),
      has_nudity: true,
      length: 120,
      release_date: "2023-01-01",
    });

    const newBaseMovieModel = fromBaseMovieDto(baseMovieDto);
    expect(newBaseMovieModel).toEqual(baseMovieModel);
  });

  it("should convert BaseLabelModel to BaseLabelDto and back", () => {
    const baseLabelModel: BaseLabelModel = {
      id: 1,
      name: "Label Name",
      original_name: "Original Label Name",
    };
    const baseLabelDto = toBaseLabelDto(baseLabelModel);
    expect(baseLabelDto).toEqual({
      _type: "label",
      alternative_name: "Original Label Name",
      display_name: "Label Name",
      id: 1,
    });

    const newBaseLabelModel = fromBaseLabelDto(baseLabelDto);
    expect(newBaseLabelModel).toEqual(baseLabelModel);
  });

  it("should convert BaseLabelModel to BaseLabelDto and back with no translated name", () => {
    const baseLabelModel: BaseLabelModel = {
      id: 1,
      original_name: "Original Label Name",
    };
    const baseLabelDto = toBaseLabelDto(baseLabelModel);
    expect(baseLabelDto).toEqual({
      _type: "label",
      display_name: "Original Label Name",
      id: 1,
    });

    const newBaseLabelModel = fromBaseLabelDto(baseLabelDto);
    expect(newBaseLabelModel).toEqual(baseLabelModel);
  });

  it("should convert BaseSeriesModel to BaseSeriesDto and back", () => {
    const baseSeriesModel: BaseSeriesModel = {
      id: 1,
      name: "Series Name",
      original_name: "Original Series Name",
    };
    const baseSeriesDto = toBaseSeriesDto(baseSeriesModel);
    expect(baseSeriesDto).toEqual({
      _type: "series",
      alternative_name: "Original Series Name",
      display_name: "Series Name",
      id: 1,
    });

    const newBaseSeriesModel = fromBaseSeriesDto(baseSeriesDto);
    expect(newBaseSeriesModel).toEqual(baseSeriesModel);
  });

  it("should convert BaseSeriesModel to BaseSeriesDto and back with no translated name", () => {
    const baseSeriesModel: BaseSeriesModel = {
      id: 1,
      original_name: "Original Series Name",
    };
    const baseSeriesDto = toBaseSeriesDto(baseSeriesModel);
    expect(baseSeriesDto).toEqual({
      _type: "series",
      display_name: "Original Series Name",
      id: 1,
    });

    const newBaseSeriesModel = fromBaseSeriesDto(baseSeriesDto);
    expect(newBaseSeriesModel).toEqual(baseSeriesModel);
  });

  it("should convert BaseStudioModel to BaseStudioDto and back", () => {
    const baseStudioModel: BaseStudioModel = {
      homepage: "https://studio.com",
      id: 1,
      name: "Studio Name",
      original_name: "Original Studio Name",
    };
    const baseStudioDto = toBaseStudioDto(baseStudioModel);
    expect(baseStudioDto).toEqual({
      _type: "studio",
      alternative_name: "Original Studio Name",
      display_name: "Studio Name",
      homepage: "https://studio.com",
      id: 1,
    });

    const newBaseStudioModel = fromBaseStudioDto(baseStudioDto);
    expect(newBaseStudioModel).toEqual(baseStudioModel);
  });

  it("should convert BaseStudioModel to BaseStudioDto and back with no translated name", () => {
    const baseStudioModel: BaseStudioModel = {
      homepage: "https://studio.com",
      id: 1,
      original_name: "Original Studio Name",
    };
    const baseStudioDto = toBaseStudioDto(baseStudioModel);
    expect(baseStudioDto).toEqual({
      _type: "studio",
      display_name: "Original Studio Name",
      homepage: "https://studio.com",
      id: 1,
    });

    const newBaseStudioModel = fromBaseStudioDto(baseStudioDto);
    expect(newBaseStudioModel).toEqual(baseStudioModel);
  });

  it("should convert BasePersonModel to BasePersonDto and back", () => {
    const basePersonModel: BasePersonModel = {
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      height: 170,
      hips_size: 95,
      id: 1,
      name: "Person Name",
      original_name: "Original Person Name",
      profile_url: "profile-uuid",
      waist_size: 60,
    };
    const basePersonDto = toBasePersonDto(basePersonModel);
    expect(basePersonDto).toEqual({
      _type: "person",
      alternative_name: "Original Person Name",
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      display_name: "Person Name",
      height: 170,
      hips_size: 95,
      id: 1,
      profile_url: toImageVariants("profile-uuid"),
      waist_size: 60,
    });

    const newBasePersonModel = fromBasePersonDto(basePersonDto);
    expect(newBasePersonModel).toEqual(basePersonModel);
  });

  it("should convert BasePersonModel to BasePersonDto and back with no translated name", () => {
    const basePersonModel: BasePersonModel = {
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      height: 170,
      hips_size: 95,
      id: 1,
      original_name: "Original Person Name",
      profile_url: "profile-uuid",
      waist_size: 60,
    };
    const basePersonDto = toBasePersonDto(basePersonModel);
    expect(basePersonDto).toEqual({
      _type: "person",
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      display_name: "Original Person Name",
      height: 170,
      hips_size: 95,
      id: 1,
      profile_url: toImageVariants("profile-uuid"),
      waist_size: 60,
    });

    const newBasePersonModel = fromBasePersonDto(basePersonDto);
    expect(newBasePersonModel).toEqual(basePersonModel);
  });

  it("should convert BasePersonModel to BasePersonDto and back with no images", () => {
    const basePersonModel: BasePersonModel = {
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      height: 170,
      hips_size: 95,
      id: 1,
      name: "Person Name",
      original_name: "Original Person Name",
      waist_size: 60,
    };
    const basePersonDto = toBasePersonDto(basePersonModel);
    expect(basePersonDto).toEqual({
      _type: "person",
      alternative_name: "Original Person Name",
      birth_date: "1990-01-01",
      bust_size: 90,
      cup_size: "C",
      display_name: "Person Name",
      height: 170,
      hips_size: 95,
      id: 1,
      waist_size: 60,
    });

    const newBasePersonModel = fromBasePersonDto(basePersonDto);
    expect(newBasePersonModel).toEqual(basePersonModel);
  });
});
