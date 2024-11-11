/* eslint-disable @typescript-eslint/no-unsafe-assignment -- This is the intended type */
import { describe, expect, it } from "vitest";

import { omitNulls } from "./api";

describe("omitNulls", () => {
  it("should return the value if it is not null", () => {
    const result = omitNulls("key", "value");
    expect(result).toBe("value");
  });

  it("should return undefined if the value is null", () => {
    const result = omitNulls("key", null);
    expect(result).toBeUndefined();
  });

  it("should return undefined if the value is undefined", () => {
    // @ts-expect-error -- This is a test case
    const result = omitNulls("key");
    expect(result).toBeUndefined();
  });

  it("should return the value if it is a number", () => {
    const result = omitNulls("key", 123);
    expect(result).toBe(123);
  });

  it("should return the value if it is a boolean", () => {
    const result = omitNulls("key", true);
    expect(result).toBe(true);
  });

  it("should return the value if it is an object", () => {
    const result = omitNulls("key", { a: 1 });
    expect(result).toEqual({ a: 1 });
  });

  it("should return the value if it is an array", () => {
    const result = omitNulls("key", [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment -- This is the intended type */
