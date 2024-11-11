import { LabelDto } from "@/data/label.dto";
import { MovieDto } from "@/data/movie.dto";
import { PersonDto } from "@/data/person.dto";
import { SeriesDto } from "@/data/series.dto";
import { StudioDto } from "@/data/studio.dto";
import { describe, expect, it } from "vitest";

import { getUrlForItem, isMovie, isPerson } from "./index";

describe("Type utilities", () => {
  describe("isMovie", () => {
    it("should return false if item is null or undefined", () => {
      expect(isMovie(null)).toBe(false);
      // @ts-expect-error -- Testing undefined
      expect(isMovie()).toBe(false);
    });

    it("should return false if item is not an object", () => {
      expect(isMovie("string")).toBe(false);
      expect(isMovie(123)).toBe(false);
      expect(isMovie(true)).toBe(false);
    });

    it("should return false if item is a PersonDto", () => {
      const personDto: PersonDto = {
        _type: "person",
        display_name: "Person",
      };

      expect(isMovie(personDto)).toBe(false);
    });

    it("should return false if item is a SeriesDto", () => {
      const seriesDto: SeriesDto = {
        _type: "series",
        display_name: "Series",
      };

      expect(isMovie(seriesDto)).toBe(false);
    });

    it("should return false if item is a StudioDto", () => {
      const studioDto: StudioDto = {
        _type: "studio",
        display_name: "Studio",
      };

      expect(isMovie(studioDto)).toBe(false);
    });

    it("should return false if item is a LabelDto", () => {
      const labelDto: LabelDto = {
        _type: "label",
        display_name: "Label",
      };

      expect(isMovie(labelDto)).toBe(false);
    });

    it("should return true if item is a MovieDto", () => {
      const movieDto: MovieDto = {
        _type: "movie",
        display_name: "Movie",
      };

      expect(isMovie(movieDto)).toBe(true);
    });
  });

  describe("isPerson", () => {
    it("should return false if item is null or undefined", () => {
      expect(isPerson(null)).toBe(false);
      // @ts-expect-error -- Testing undefined
      expect(isPerson()).toBe(false);
    });

    it("should return false if item is not an object", () => {
      expect(isPerson("string")).toBe(false);
      expect(isPerson(123)).toBe(false);
      expect(isPerson(true)).toBe(false);
    });

    it("should return false if item is a MovieDto", () => {
      const movieDto: MovieDto = {
        _type: "movie",
        display_name: "Movie",
        dvd_id: "ABC-123",
      };

      expect(isPerson(movieDto)).toBe(false);
    });

    it("should return false if item is a SeriesDto", () => {
      const seriesDto: SeriesDto = {
        _type: "series",
        display_name: "Series",
      };

      expect(isPerson(seriesDto)).toBe(false);
    });

    it("should return false if item is a StudioDto", () => {
      const studioDto: StudioDto = {
        _type: "studio",
        display_name: "Studio",
      };

      expect(isPerson(studioDto)).toBe(false);
    });

    it("should return false if item is a LabelDto", () => {
      const labelDto: LabelDto = {
        _type: "label",
        display_name: "Label",
      };

      expect(isPerson(labelDto)).toBe(false);
    });

    it("should return true if item is a PersonDto", () => {
      const personDto: PersonDto = {
        _type: "person",
        display_name: "Person",
      };

      expect(isPerson(personDto)).toBe(true);
    });
  });

  describe("getUrlForItem", () => {
    it("should return '/' if item is null or undefined", () => {
      expect(getUrlForItem(null)).toBe("/");
      expect(getUrlForItem()).toBe("/");
    });

    it("should return correct URL for LabelDto", () => {
      const labelDto: LabelDto = {
        _type: "label",
        display_name: "Label",
        id: 123,
      };

      expect(getUrlForItem(labelDto)).toBe("/label/123/");
      expect(getUrlForItem(labelDto, "/details")).toBe(
        "/label/123/details",
      );
    });

    it("should return correct URL for MovieDto", () => {
      const movieDto: MovieDto = {
        _type: "movie",
        display_name: "Movie",
        id: 123,
      };

      expect(getUrlForItem(movieDto)).toBe("/movie/123/");
      expect(getUrlForItem(movieDto, "/details")).toBe(
        "/movie/123/details",
      );
    });

    it("should return correct URL for PersonDto", () => {
      const personDto: PersonDto = {
        _type: "person",
        display_name: "Person",
        id: 123,
      };

      expect(getUrlForItem(personDto)).toBe("/person/123/");
      expect(getUrlForItem(personDto, "/details")).toBe(
        "/person/123/details",
      );
    });

    it("should return correct URL for SeriesDto", () => {
      const seriesDto: SeriesDto = {
        _type: "series",
        display_name: "Series",
        id: 123,
      };

      expect(getUrlForItem(seriesDto)).toBe("/series/123/");
      expect(getUrlForItem(seriesDto, "/details")).toBe(
        "/series/123/details",
      );
    });

    it("should return correct URL for StudioDto", () => {
      const studioDto: StudioDto = {
        _type: "studio",
        display_name: "Studio",
        id: 123,
      };

      expect(getUrlForItem(studioDto)).toBe("/studio/123/");
      expect(getUrlForItem(studioDto, "/details")).toBe(
        "/studio/123/details",
      );
    });

    it("should return '/' if item is not a known type", () => {
      // @ts-expect-error -- Testing unknown type
      expect(getUrlForItem({})).toBe("/");
    });
  });
});
