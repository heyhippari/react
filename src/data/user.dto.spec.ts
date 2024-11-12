import { UserModel } from "@/infrastructure/database/models/user.model";
import { describe, expect, it } from "vitest";

import { fromUserDto, toUserDto, UserDto, userDtoSchema } from "./user.dto";

describe("User DTO", () => {
  it("should validate a correct user DTO", () => {
    const validDto: UserDto = {
      avatar_url: "http://example.com/avatar.png",
      create_time: "2023-01-01T00:00:00Z",
      email: "user@example.com",
      id: "123",
      roles: [{ role: "user" }],
      username: "testuser",
    };

    const result = userDtoSchema.safeParse(validDto);
    expect(result.success).toBe(true);
  });

  it("should invalidate an incorrect user DTO", () => {
    const invalidDto = {
      avatar_url: "not-a-url",
      create_time: "invalid-date",
      email: "not-an-email",
      id: 123, // should be a string
      roles: [{ role: "invalid-role" }],
      username: 123, // should be a string
    };

    const result = userDtoSchema.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should convert a user model to a user DTO", () => {
    const userModel: UserModel = {
      avatar_url: "http://example.com/avatar.png",
      create_time: "2023-01-01T00:00:00Z",
      email: "user@example.com",
      id: "123",
      roles: [{ role: "user" }],
      username: "testuser",
    };

    const userDto = toUserDto(userModel);
    expect(userDto).toEqual({
      avatar_url: "http://example.com/avatar.png",
      create_time: "2023-01-01T00:00:00Z",
      email: "user@example.com",
      id: "123",
      roles: [{ role: "user" }],
      username: "testuser",
    });
  });

  it("should convert a user DTO to a user model", () => {
    const userDto: UserDto = {
      avatar_url: "http://example.com/avatar.png",
      create_time: "2023-01-01T00:00:00Z",
      email: "user@example.com",
      id: "123",
      roles: [{ role: "user" }],
      username: "testuser",
    };

    const userModel = fromUserDto(userDto);
    expect(userModel).toEqual({
      avatar_url: "http://example.com/avatar.png",
      create_time: "2023-01-01T00:00:00Z",
      email: "user@example.com",
      id: "123",
      username: "testuser",
    });
  });
});
