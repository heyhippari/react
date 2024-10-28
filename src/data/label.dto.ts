import { LabelModel } from "@/infrastructure/database/models/label.model";
import { z } from "zod";

import {
  baseLabelDtoSchema,
  fromBaseLabelDto,
  fromBaseMovieDto,
  toBaseLabelDto,
  toBaseMovieDto,
} from "./base.dto";
import { movieDtoSchema } from "./movie.dto";

export const labelDtoSchema = baseLabelDtoSchema.extend({
  movies: z.array(movieDtoSchema).optional().nullable(),
});

export type LabelDto = z.infer<typeof labelDtoSchema>;

/**
 * Convert a label model to a label DTO.
 * @param model The model of the label to convert.
 * @returns The converted label DTO.
 */
export function toLabelDto(model: LabelModel): LabelDto {
  return {
    ...toBaseLabelDto(model),
    movies: model.movies?.map(toBaseMovieDto),
  };
}

/**
 * Convert a label DTO to a label model.
 * @param dto The DTO of the label to convert.
 * @returns The converted label model.
 */
export function fromLabelDto(dto: LabelDto): LabelModel {
  return {
    ...fromBaseLabelDto(dto),
    movies: dto.movies?.map(fromBaseMovieDto),
  };
}
