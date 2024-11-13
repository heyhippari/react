import { describe, expect, it } from "vitest";

import {
  apiMovieSearchResultSchema,
  apiMovieSearchResultSchemaArray,
} from "./api";

describe("API schema - movie search result", () => {
  it("should validate a correct movie search result", () => {
    const validData = {
      id: 1,
      original_title: "Inception",
      release_date: "2010-07-16",
      title: "Inception",
    };

    expect(() => apiMovieSearchResultSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate an incorrect movie search result", () => {
    const invalidData = {
      id: "1", // id should be a number
      original_title: "Inception",
    };

    expect(() => apiMovieSearchResultSchema.parse(invalidData)).toThrow();
  });

  it("should validate a movie search result with optional fields", () => {
    const validData = {
      id: 1,
      original_title: "Inception",
    };

    expect(() => apiMovieSearchResultSchema.parse(validData)).not.toThrow();
  });
});

describe("API schema - movie search result array", () => {
  it("should validate an array of correct movie search results", () => {
    const validDataArray = [
      {
        id: 1,
        original_title: "Inception",
        release_date: "2010-07-16",
        title: "Inception",
      },
      {
        id: 2,
        original_title: "The Matrix",
        release_date: "1999-03-31",
        title: "The Matrix",
      },
    ];

    expect(() => apiMovieSearchResultSchemaArray.parse(validDataArray)).not
      .toThrow();
  });

  it("should invalidate an array with an incorrect movie search result", () => {
    const invalidDataArray = [
      {
        id: 1,
        original_title: "Inception",
        release_date: "2010-07-16",
        title: "Inception",
      },
      {
        id: "2", // id should be a number
        original_title: "The Matrix",
      },
    ];

    expect(() => apiMovieSearchResultSchemaArray.parse(invalidDataArray))
      .toThrow();
  });
});
