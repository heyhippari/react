import { describe, expect, it } from "vitest";

import { RoleModel, roleModelSchema } from "./role.model";

describe("roleModelSchema", () => {
  it("should validate a correct role model", () => {
    const validRoleModel: RoleModel = {
      age: 30,
      id: 1,
      movies: {
        original_name: "Example Movie",
      },
      person: {
        original_name: "John Doe",
      },
    };

    const result = roleModelSchema.safeParse(validRoleModel);
    expect(result.success).toBe(true);
  });

  it("should invalidate an incorrect role model", () => {
    const invalidRoleModel = {
      age: "thirty",
      id: "one",
      movies: "Example Movie",
      person: "John Doe",
    };

    const result = roleModelSchema.safeParse(invalidRoleModel);
    expect(result.success).toBe(false);
  });

  it("should validate a role model with nullable and optional fields", () => {
    const partialRoleModel = {
      age: null,
      id: null,
      movies: null,
      person: null,
    };

    const result = roleModelSchema.safeParse(partialRoleModel);
    expect(result.success).toBe(true);
  });

  it("should validate a role model with missing optional fields", () => {
    const partialRoleModel = {};

    const result = roleModelSchema.safeParse(partialRoleModel);
    expect(result.success).toBe(true);
  });
});
