import { MovieModel } from "@/infrastructure/database/models/movie.model";
import { z } from "zod";

import {
  baseLabelDtoSchema,
  baseMovieDtoSchema,
  baseSeriesDtoSchema,
  baseStudioDtoSchema,
  fromBaseLabelDto,
  fromBaseMovieDto,
  fromBaseSeriesDto,
  fromBaseStudioDto,
  toBaseLabelDto,
  toBaseMovieDto,
  toBaseSeriesDto,
  toBaseStudioDto,
} from "./base.dto";
import { fromImageDto, imageDtoSchema, toImageDto } from "./image.dto";
import { fromRoleDto, roleDtoSchema, toRoleDto } from "./role.dto";

export const movieDtoSchema = baseMovieDtoSchema.extend({
  label: baseLabelDtoSchema.optional().nullable(),
  movie_images: z.array(z.object({
    id: z.number().nullable().optional(),
    image: imageDtoSchema.nullable().optional(),
    image_id: z.number().nullable().optional(),
    movie_id: z.number().nullable().optional(),
  })).nullable().optional(),
  roles: z.array(roleDtoSchema).optional().nullable(),
  series: baseSeriesDtoSchema.optional().nullable(),
  studio: baseStudioDtoSchema.optional().nullable(),
});

export type MovieDto = z.infer<typeof movieDtoSchema>;

/**
 * Convert a movie model to a movie DTO.
 * @param model A model of a movie to convert.
 * @returns The converted movie DTO.
 */
export function toMovieDto(model: MovieModel): MovieDto {
  return {
    ...toBaseMovieDto(model),
    label: model.label ? toBaseLabelDto(model.label) : undefined,
    movie_images: model.movie_images?.map((image) => ({
      id: image.id,
      image: image.image ? toImageDto(image.image) : undefined,
      image_id: image.image_id,
      movie_id: image.movie_id,
    })),
    roles: model.roles?.map(toRoleDto),
    series: model.series ? toBaseSeriesDto(model.series) : undefined,
    studio: model.studio ? toBaseStudioDto(model.studio) : undefined,
  };
}

/**
 * Convert a movie DTO to a movie model.
 * @param dto A movie DTO to convert.
 * @returns The converted movie model.
 */
export function fromMovieDto(dto: MovieDto): MovieModel {
  return {
    ...fromBaseMovieDto(dto),
    label: dto.label ? fromBaseLabelDto(dto.label) : undefined,
    label_id: dto.label?.id,
    movie_images: dto.movie_images?.map((image) => ({
      id: image.id,
      image: image.image ? fromImageDto(image.image) : undefined,
      image_id: image.image_id,
      movie_id: image.movie_id,
    })),
    roles: dto.roles?.map(fromRoleDto),
    series: dto.series ? fromBaseSeriesDto(dto.series) : undefined,
    series_id: dto.series?.id,
    studio: dto.studio ? fromBaseStudioDto(dto.studio) : undefined,
    studio_id: dto.studio?.id,
  };
}
