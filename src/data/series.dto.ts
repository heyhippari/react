import { SeriesModel } from "@/infrastructure/database/models/series.model";
import { z } from "zod";

import {
  baseSeriesDtoSchema,
  fromBaseMovieDto,
  fromBaseSeriesDto,
  toBaseMovieDto,
  toBaseSeriesDto,
} from "./base.dto";
import { movieDtoSchema } from "./movie.dto";

export const seriesDtoSchema = baseSeriesDtoSchema.extend({
  movies: z.array(movieDtoSchema).optional().nullable(),
});

export type SeriesDto = z.infer<typeof seriesDtoSchema>;

/**
 * Convert a series model to a series DTO.
 * @param model The model of the series to convert.
 * @returns The converted series DTO.
 */
export function toSeriesDto(model: SeriesModel): SeriesDto {
  return {
    ...toBaseSeriesDto(model),
    movies: model.movies?.map(toBaseMovieDto),
  };
}

/**
 * Convert a series DTO to a series model.
 * @param dto The DTO of the series to convert.
 * @returns The converted series model.
 */
export function fromSeriesDto(dto: SeriesDto): SeriesModel {
  return {
    ...fromBaseSeriesDto(dto),
    movies: dto.movies?.map(fromBaseMovieDto),
  };
}
