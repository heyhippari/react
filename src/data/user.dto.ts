import { UserModel } from "@/infrastructure/database/models/user.model";
import { z } from "zod";

export const userDtoSchema = z.object({
  avatar_url: z.string().url().nullable().optional(),
  create_time: z.string().optional(),
  email: z.string().email().nullable().optional(),
  id: z.string().nullable().optional(),
  roles: z.array(z.object({
    role: z.enum([
      "admin",
      "moderator",
      "user",
      "banned",
    ]),
  })).nullable().optional(),
  username: z.string().nullable().optional(),
});

export type UserDto = z.infer<typeof userDtoSchema>;

/**
 * Convert a user model to a user DTO.
 * @param model A model of the user to convert.
 * @returns The converted user DTO.
 */
export function toUserDto(model: UserModel): UserDto {
  return {
    avatar_url: model.avatar_url,
    create_time: model.create_time,
    email: model.email,
    id: model.id,
    roles: model.roles,
    username: model.username,
  };
}

/**
 * Convert a user DTO to a user model.
 * @param dto A DTO of the user to convert.
 * @returns The converted user model.
 */
export function fromUserDto(dto: UserDto): UserModel {
  return {
    avatar_url: dto.avatar_url,
    create_time: dto.create_time,
    email: dto.email,
    id: dto.id,
    username: dto.username,
  };
}
