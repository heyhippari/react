import { RoleModel } from "@/infrastructure/database/models/role.model";
import { z } from "zod";

import {
  baseMovieDtoSchema,
  basePersonDtoSchema,
  fromBaseMovieDto,
  fromBasePersonDto,
  toBaseMovieDto,
  toBasePersonDto,
} from "./base.dto";

export const roleDtoSchema = z.object({
  age: z.number().nullable().optional(),
  id: z.number().nullable().optional(),
  movie: baseMovieDtoSchema.nullable().optional(),
  person: basePersonDtoSchema.nullable().optional(),
});

export type RoleDto = z.infer<typeof roleDtoSchema>;

/**
 * Convert a role model to a role DTO.
 * @param model The model of the role to convert.
 * @returns The converted role DTO.
 */
export function toRoleDto(model: RoleModel): RoleDto {
  return {
    age: model.age,
    id: model.id,
    movie: model.movies ? toBaseMovieDto(model.movies) : undefined,
    person: model.person ? toBasePersonDto(model.person) : undefined,
  };
}

/**
 * Convert a role DTO to a role model.
 * @param dto The DTO of the role to convert.
 * @returns The converted role model.
 */
export function fromRoleDto(dto: RoleDto): RoleModel {
  return {
    age: dto.age,
    id: dto.id,
    movies: dto.movie ? fromBaseMovieDto(dto.movie) : undefined,
    person: dto.person ? fromBasePersonDto(dto.person) : undefined,
  };
}
