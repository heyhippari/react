/**
 * Data Transfer Object for Image.
 */

import { ImageModel } from "@/infrastructure/database/models/image.model";
import { z } from "zod";

import { imageVariantsSchema, toImageVariants } from "./base.dto";

export const imageDtoSchema = z.object({
  type: z.enum([
    "front_cover",
    "full_cover",
    "art",
    "disc",
    "profile",
    "logo",
    "screenshot",
  ]).nullable().optional(),
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
    type: model.type,
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
    type: dto.type,
    uuid: dto.uuid,
  };
}
