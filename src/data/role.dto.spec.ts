import { RoleModel } from "@/infrastructure/database/models/role.model";
import { describe, expect, it } from "vitest";

import {
  fromBaseMovieDto,
  fromBasePersonDto,
  toBaseMovieDto,
  toBasePersonDto,
} from "./base.dto";
import { fromRoleDto, RoleDto, roleDtoSchema, toRoleDto } from "./role.dto";

describe("Role DTO", () => {
  it("should convert RoleModel to RoleDto", () => {
    const model: RoleModel = {
      age: 30,
      id: 1,
      movies: {
        id: 1,
        original_name: "Test Movie",
      },
      person: {
        id: 1,
        original_name: "Test Person",
      },
    };

    const dto: RoleDto = toRoleDto(model);

    const movieDto = model.movies ? toBaseMovieDto(model.movies) : undefined;
    const personDto = model.person ? toBasePersonDto(model.person) : undefined;

    expect(dto.age).toBe(model.age);
    expect(dto.id).toBe(model.id);
    expect(dto.movie).toEqual(movieDto);
    expect(dto.person).toEqual(personDto);
  });

  it("should convert RoleModel to RoleDto with missing fields", () => {
    const model: RoleModel = {
      age: 30,
      id: 1,
      movies: null,
      person: null,
    };

    const dto: RoleDto = toRoleDto(model);

    expect(dto.age).toBe(model.age);
    expect(dto.id).toBe(model.id);
    expect(dto.movie).toBeUndefined();
    expect(dto.person).toBeUndefined();
  });

  it("should convert RoleDto to RoleModel", () => {
    const dto: RoleDto = {
      age: 30,
      id: 1,
      movie: {
        _type: "movie",
        display_name: "Test Movie",
      },
      person: {
        _type: "person",
        display_name: "Test Person",
      },
    };

    const model: RoleModel = fromRoleDto(dto);

    expect(model.age).toBe(dto.age);
    expect(model.id).toBe(dto.id);
    expect(model.movies).toEqual(fromBaseMovieDto(dto.movie));
    expect(model.person).toEqual(fromBasePersonDto(dto.person));
  });

  it("should convert RoleDto to RoleModel with missing fields", () => {
    const dto: RoleDto = {
      age: 30,
      id: 1,
      movie: null,
      person: null,
    };

    const model: RoleModel = fromRoleDto(dto);

    expect(model.age).toBe(dto.age);
    expect(model.id).toBe(dto.id);
    expect(model.movies).toBeUndefined();
    expect(model.person).toBeUndefined();
  });

  it("should validate RoleDto schema", () => {
    const validDto = {
      age: 30,
      id: 1,
      movie: {
        _type: "movie",
        display_name: "Test Movie",
      },
      person: {
        _type: "person",
        display_name: "Test Person",
      },
    };

    const result = roleDtoSchema.safeParse(validDto);
    expect(result.success).toBe(true);
  });

  it("should validate RoleDto schema with missing fields", () => {
    const dto = {
      age: 30,
      id: 1,
      movie: {
        _type: "movie",
        display_name: "Test Movie",
      },
    };

    const result = roleDtoSchema.safeParse(dto);
    expect(result.success).toBe(true);
  });

  it("should invalidate RoleDto schema with invalid fields", () => {
    const dto = {
      age: "thirty",
      id: "one",
      movie: null,
      person: null,
    };

    const result = roleDtoSchema.safeParse(dto);
    expect(result.success).toBe(false);
  });
});
