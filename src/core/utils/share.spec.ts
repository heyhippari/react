import { LabelDto } from "@/data/label.dto";
import { MovieDto } from "@/data/movie.dto";
import { PersonDto } from "@/data/person.dto";
import { SeriesDto } from "@/data/series.dto";
import { StudioDto } from "@/data/studio.dto";
import { describe, expect, it } from "vitest";

import { getShareText, getShareTitle } from "./share";

// Mock data
const movieItem: MovieDto = {
  _type: "movie",
  display_name: "Sample Movie",
  dvd_id: "ABC-123",
};

const labelItem: LabelDto = {
  _type: "label",
  display_name: "Sample Label",
};

const personItem: PersonDto = {
  _type: "person",
  display_name: "Sample Person",
};

const seriesItem: SeriesDto = {
  _type: "series",
  display_name: "Sample Series",
};

const studioItem: StudioDto = {
  _type: "studio",
  display_name: "Sample Studio",
};

describe("Sharing utilities", () => {
  describe("getShareTitle", () => {
    it("should return the correct title for a movie item", () => {
      const result = getShareTitle(movieItem);
      expect(result).toBe("[ABC-123] Sample Movie");
    });

    it("should return the correct title for a label item", () => {
      const result = getShareTitle(labelItem);
      expect(result).toBe("Sample Label");
    });

    it("should return the correct title for a person item", () => {
      const result = getShareTitle(personItem);
      expect(result).toBe("Sample Person");
    });

    it("should return the correct title for a series item", () => {
      const result = getShareTitle(seriesItem);
      expect(result).toBe("Sample Series");
    });

    it("should return the correct title for a studio item", () => {
      const result = getShareTitle(studioItem);
      expect(result).toBe("Sample Studio");
    });
  });

  describe("getShareText", () => {
    it("should return the correct text for a movie item", () => {
      const result = getShareText(movieItem);
      expect(result).toBe("Find out more about Sample Movie on Kanojo");
    });

    it("should return the correct text for a label item", () => {
      const result = getShareText(labelItem);
      expect(result).toBe("Find out more about Sample Label on Kanojo");
    });

    it("should return the correct text for a person item", () => {
      const result = getShareText(personItem);
      expect(result).toBe("Find out more about Sample Person on Kanojo");
    });

    it("should return the correct text for a series item", () => {
      const result = getShareText(seriesItem);
      expect(result).toBe("Find out more about Sample Series on Kanojo");
    });

    it("should return the correct text for a studio item", () => {
      const result = getShareText(studioItem);
      expect(result).toBe("Find out more about Sample Studio on Kanojo");
    });
  });
});
