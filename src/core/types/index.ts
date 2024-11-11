import type { Database } from "@/infrastructure/database/models/database.types";

import { LabelDto } from "@/data/label.dto";
import { MovieDto } from "@/data/movie.dto";
import { PersonDto } from "@/data/person.dto";
import { SeriesDto } from "@/data/series.dto";
import { StudioDto } from "@/data/studio.dto";
import { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient<Database>;

export interface ImageUploadUrl {
  id: string;
  uploadUrl: string;
}

/**
 * Check if the item is a movie.
 * @param item The item to check.
 * @returns True if the item is a movie.
 */
export function isMovie(item: unknown): item is MovieDto {
  if (!item) {
    return false;
  }

  return typeof item === "object" && item !== null &&
    ("dvd_id" in item || "barcode" in item);
}

/**
 * Check if the item is a person.
 * @param item The item to check.
 * @returns True if the item is a person.
 */
export function isPerson(item: unknown): item is PersonDto {
  if (!item) {
    return false;
  }

  return typeof item === "object" && ("birth_date" in item ||
    "profile_url" in item);
}

/**
 * Returns the given item's URL, optionally with a path.
 * @param item The item to get the URL for.
 * @param path The path to append to the URL. Defaults to `/`.
 * @returns A constructed URL for the item, with the path appended.
 */
export function getUrlForItem(
  item: LabelDto | MovieDto | PersonDto | SeriesDto | StudioDto,
  path = "/",
): string {
  if (!item) {
    return "/";
  }

  switch (item._type) {
    case "label": {
      return `/label/${item.id}${path ?? ""}`;
    }
    case "movie": {
      return `/movie/${item.id}${path ?? ""}`;
    }
    case "person": {
      return `/person/${item.id}${path ?? ""}`;
    }
    case "series": {
      return `/series/${item.id}${path ?? ""}`;
    }
    case "studio": {
      return `/studio/${item.id}${path ?? ""}`;
    }
    default: {
      return "/";
    }
  }
}
