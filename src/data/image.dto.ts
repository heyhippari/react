/**
 * Data Transfer Object for Image.
 */

import { ImageModel } from "@/infrastructure/database/models/image.model";
import { z } from "zod";

import { imageVariantsSchema, toImageVariants } from "./base.dto";
import { fromUserDto, toUserDto, userDtoSchema } from "./user.dto";

export const imageDtoSchema = z.object({
  create_time: z.string().optional(),
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
  uploader: userDtoSchema.nullable().optional(),
  url: imageVariantsSchema,
  uuid: z.string().nullable().optional(),
});

export type ImageDto = z.infer<typeof imageDtoSchema>;

/**
 * Convert an image model to an image DTO.
 * @param model The model of the image to convert.
 * @returns The converted image DTO.
 */
export function toImageDto(model: ImageModel): ImageDto {
  return {
    create_time: model.created_at,
    type: model.type,
    uploader: model.uploader ? toUserDto(model.uploader) : null,
    url: toImageVariants(model.uuid ?? ""),
    uuid: model.uuid,
  };
}

/**
 * Convert an image DTO to an image model.
 * @param dto The DTO of the image to convert.
 * @returns The converted image model.
 */
export function fromImageDto(dto: ImageDto): ImageModel {
  return {
    created_at: dto.create_time,
    type: dto.type,
    uploader: dto.uploader ? fromUserDto(dto.uploader) : null,
    uuid: dto.uuid,
  };
}
