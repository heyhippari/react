import { describe, expect, it } from "vitest";

import { sha256 } from "./hash";

describe("sha256", () => {
  it("should return the correct SHA-256 hash for a given string", async () => {
    const data = "hello";
    const expectedHash =
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
    const hash = await sha256(data);
    expect(hash).toBe(expectedHash);
  });

  it("should return the correct SHA-256 hash for an empty string", async () => {
    const data = "";
    const expectedHash =
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    const hash = await sha256(data);
    expect(hash).toBe(expectedHash);
  });

  it("should return the correct SHA-256 hash for a long string", async () => {
    const data = "a".repeat(1000);
    const expectedHash =
      "41edece42d63e8d9bf515a9ba6932e1c20cbc9f5a5d134645adb5db1b9737ea3";
    const hash = await sha256(data);
    expect(hash).toBe(expectedHash);
  });
});
