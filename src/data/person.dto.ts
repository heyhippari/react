import { PersonModel } from "@/infrastructure/database/models/person.model";
import { z } from "zod";

import {
  basePersonDtoSchema,
  fromBasePersonDto,
  toBasePersonDto,
} from "./base.dto";
import { imageDtoSchema } from "./image.dto";
import { fromRoleDto, roleDtoSchema, toRoleDto } from "./role.dto";

export const personDtoSchema = basePersonDtoSchema.extend({
  person_images: z.array(z.object({
    id: z.number().nullable().optional(),
    image: imageDtoSchema.nullable().optional(),
    image_id: z.number().nullable().optional(),
    movie_id: z.number().nullable().optional(),
  })).nullable().optional(),
  roles: z.array(roleDtoSchema).nullable().optional(),
});

export type PersonDto = z.infer<typeof personDtoSchema>;

/**
 * Convert a person model to a person DTO.
 * @param model The person model to convert.
 * @returns The converted person DTO.
 */
export function toPersonDto(model: PersonModel): PersonDto {
  return {
    ...toBasePersonDto(model),
    roles: model.roles?.map(toRoleDto),
  };
}

/**
 * Convert a person DTO to a person model.
 * @param dto The person DTO to convert.
 * @returns The converted person model.
 */
export function fromPersonDto(dto: PersonDto): PersonModel {
  return {
    ...fromBasePersonDto(dto),
    roles: dto.roles?.map(fromRoleDto),
  };
}
