import { StudioModel } from "@/infrastructure/database/models/studio.model";
import { z } from "zod";

import {
  baseStudioDtoSchema,
  fromBaseMovieDto,
  fromBaseStudioDto,
  toBaseMovieDto,
  toBaseStudioDto,
} from "./base.dto";
import { movieDtoSchema } from "./movie.dto";

export const studioDtoSchema = baseStudioDtoSchema.extend({
  movies: z.array(movieDtoSchema).optional().nullable(),
});

export type StudioDto = z.infer<typeof studioDtoSchema>;

/**
 * Convert a studio model to a label DTO.
 * @param model The model of the studio to convert.
 * @returns The converted studio DTO.
 */
export function toStudioDto(model: StudioModel): StudioDto {
  return {
    ...toBaseStudioDto(model),
    movies: model.movies?.map(toBaseMovieDto),
  };
}

/**
 * Convert a label DTO to a label model.
 * @param dto The DTO of the label to convert.
 * @returns The converted label model.
 */
export function fromLabelDto(dto: StudioDto): StudioModel {
  return {
    ...fromBaseStudioDto(dto),
    movies: dto.movies?.map(fromBaseMovieDto),
  };
}
