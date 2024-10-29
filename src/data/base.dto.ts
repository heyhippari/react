import {
  BaseLabelModel,
  BaseMovieModel,
  BasePersonModel,
  BaseSeriesModel,
  BaseStudioModel,
} from "@/infrastructure/database/models/base.model";
import { ImageModel } from "@/infrastructure/database/models/image.model";
import { z } from "zod";

export const imageModelDto = z.object({
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
  uuid: z.string().uuid().nullable().optional(),
});

export type ImageDto = z.infer<typeof imageModelDto>;

/**
 * Convert an image model to an image DTO.
 * @param model An object representing the image model.
 * @returns An object representing the image DTO.
 */
export function toImageDto(model: ImageModel): ImageDto {
  return {
    type: model.type,
    uuid: model.uuid,
  };
}

/**
 * Convert an image DTO to an image model.
 * @param dto An object representing the image DTO.
 * @returns An object representing the image model.
 */
export function fromImageDto(dto: ImageDto): ImageModel {
  return {
    type: dto.type,
    uuid: dto.uuid,
  };
}

export const imageVariantsSchema = z.object({
  card: z.string().url().nullable(),
  poster: z.string().url().nullable(),
  public: z.string().url().nullable(),
  role: z.string().url().nullable(),
  uuid: z.string().uuid().nullable(),
});

export type ImageVariants = z.infer<typeof imageVariantsSchema>;

/**
 * Convert a UUID to image variants.
 * @param uuid The UUID to convert to image variants.
 * @returns An object containing the image variants.
 */
export function toImageVariants(uuid: string): ImageVariants {
  return {
    card: uuid
      ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/card`
      : null,
    poster: uuid
      ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/poster`
      : null,
    public: uuid
      ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/public`
      : null,
    role: uuid
      ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/role`
      : null,
    uuid,
  };
}

export const baseMovieDtoSchema = z.object({
  alternative_name: z.string().nullable().optional(),
  barcode: z.string().nullable().optional(),
  display_name: z.string(),
  dvd_id: z.string(),
  format: z.enum([
    "DVD",
    "Blu-ray",
    "Blu-ray 4K",
    "Digital",
    "VHS",
    "LaserDisc",
    "UMD Video",
    "Video CD",
  ]).nullable().optional(),
  front_cover_url: imageVariantsSchema.optional(),
  full_cover_url: imageVariantsSchema.optional(),
  has_nudity: z.boolean().nullable().optional(),
  id: z.number().optional(),
  length: z.number().nullable().optional(),
  release_date: z.string().nullable().optional(),
});

export type BaseMovieDto = z.infer<typeof baseMovieDtoSchema>;

/**
 * Convert a base movie model to a base movie DTO.
 * @param model An object representing the base movie model.
 * @returns An object representing the base movie DTO.
 */
export function toBaseMovieDto(model: BaseMovieModel): BaseMovieDto {
  return {
    alternative_name: model.name ? model.original_name : undefined,
    barcode: model.barcode,
    display_name: model.name ?? model.original_name ?? "Unknown",
    dvd_id: model.dvd_id,
    format: model.format,
    front_cover_url: toImageVariants(model.front_cover_url ?? ""),
    full_cover_url: toImageVariants(model.full_cover_url ?? ""),
    has_nudity: model.has_nudity,
    id: model.id,
    length: model.length,
    release_date: model.release_date,
  };
}

/**
 * Convert a base movie DTO to a base movie model.
 * @param dto An object representing the base movie DTO.
 * @returns An object representing the base movie model.
 */
export function fromBaseMovieDto(dto: BaseMovieDto): BaseMovieModel {
  return {
    barcode: dto.barcode,
    dvd_id: dto.dvd_id,
    format: dto.format,
    front_cover_url: dto.front_cover_url?.uuid,
    full_cover_url: dto.full_cover_url?.uuid,
    has_nudity: dto.has_nudity ?? undefined,
    id: dto.id ?? undefined,
    length: dto.length,
    name: dto.alternative_name ? dto.display_name : undefined,
    original_name: dto.alternative_name ?? dto.display_name,
    release_date: dto.release_date,
  };
}

export const baseLabelDtoSchema = z.object({
  alternative_name: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  id: z.number().nullable().optional(),
});

export type BaseLabelDto = z.infer<typeof baseLabelDtoSchema>;

/**
 * Convert a base label model to a base label DTO.
 * @param model The base label model to convert.
 * @returns The converted base label DTO.
 */
export function toBaseLabelDto(model: BaseLabelModel): BaseLabelDto {
  return {
    alternative_name: model.name ? model.original_name : undefined,
    display_name: model.name ?? model.original_name,
    id: model.id,
  };
}

/**
 * Convert a base label DTO to a base label model.
 * @param dto The base label DTO to convert.
 * @returns The converted base label model.
 */
export function fromBaseLabelDto(dto: BaseLabelDto): BaseLabelModel {
  return {
    id: dto.id!,
    name: dto.alternative_name ? dto.display_name : undefined,
    original_name: dto.alternative_name ?? dto.display_name!,
  };
}

export const baseSeriesDtoSchema = z.object({
  alternative_name: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  id: z.number().nullable().optional(),
});

export type BaseSeriesDto = z.infer<typeof baseSeriesDtoSchema>;

/**
 * Convert a base series model to a base series DTO.
 * @param model The base series model to convert.
 * @returns The converted base series DTO.
 */
export function toBaseSeriesDto(model: BaseSeriesModel): BaseSeriesDto {
  return {
    alternative_name: model.name ? model.original_name : undefined,
    display_name: model.name ?? model.original_name,
    id: model.id,
  };
}

/**
 * Convert a base series DTO to a base series model.
 * @param dto The base series DTO to convert.
 * @returns The converted base series model.
 */
export function fromBaseSeriesDto(dto: BaseSeriesDto): BaseSeriesModel {
  return {
    id: dto.id!,
    name: dto.display_name ?? dto.alternative_name,
    original_name: dto.alternative_name ?? dto.display_name!,
  };
}

export const baseStudioDtoSchema = z.object({
  alternative_name: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  id: z.number().nullable().optional(),
});

export type BaseStudioDto = z.infer<typeof baseStudioDtoSchema>;

/**
 * Convert a base studio model to a base studio DTO.
 * @param model The base studio model to convert.
 * @returns The converted base studio DTO.
 */
export function toBaseStudioDto(model: BaseStudioModel): BaseStudioDto {
  return {
    alternative_name: model.name ? model.original_name : undefined,
    display_name: model.name ?? model.original_name,
    id: model.id,
  };
}

/**
 * Convert a base studio DTO to a base studio model.
 * @param dto The base studio DTO to convert.
 * @returns The converted base studio model.
 */
export function fromBaseStudioDto(dto: BaseStudioDto): BaseStudioModel {
  return {
    id: dto.id!,
    name: dto.display_name ?? dto.alternative_name,
    original_name: dto.alternative_name ?? dto.display_name!,
  };
}

export const basePersonDtoSchema = z.object({
  alternative_name: z.string().nullable(),
  birth_date: z.string().nullable().optional(),
  bust_size: z.number().nullable().optional(),
  cup_size: z.enum([
    "AA",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ]).nullable().optional(),
  display_name: z.string(),
  height: z.number().nullable().optional(),
  hips_size: z.number().nullable().optional(),
  id: z.number().optional(),
  profile_url: imageVariantsSchema.optional(),
  waist_size: z.number().nullable().optional(),
});

export type BasePersonDto = z.infer<typeof basePersonDtoSchema>;

/**
 * Convert a base person model to a base person DTO.
 * @param model The base person model to convert.
 * @returns The converted base person DTO.
 */
export function toBasePersonDto(model: BasePersonModel): BasePersonDto {
  return {
    alternative_name: model.name ? model.original_name ?? null : null,
    birth_date: model.birth_date,
    bust_size: model.bust_size,
    cup_size: model.cup_size,
    display_name: model.name ?? model.original_name ?? "Unknown",
    height: model.height,
    hips_size: model.hips_size,
    id: model.id,
    profile_url: toImageVariants(model.profile_url ?? ""),
    waist_size: model.waist_size,
  };
}

/**
 * Convert a base person DTO to a base person model.
 * @param dto The base person DTO to convert.
 * @returns The converted base person model.
 */
export function fromBasePersonDto(dto: BasePersonDto): BasePersonModel {
  return {
    birth_date: dto.birth_date,
    bust_size: dto.bust_size,
    cup_size: dto.cup_size,
    height: dto.height,
    id: dto.id,
    name: dto.alternative_name ? dto.display_name : undefined,
    original_name: dto.alternative_name ?? dto.display_name,
    profile_url: dto.profile_url?.uuid ?? undefined,
    waist_size: dto.waist_size,
  };
}
