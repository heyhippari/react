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

  return typeof item === "object" && "_type" in item && item._type === "movie";
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

  return typeof item === "object" && "_type" in item && item._type === "person";
}

/**
 * Returns the given item's URL, optionally with a path.
 * @param item The item to get the URL for.
 * @param path The path to append to the URL. Defaults to `/`.
 * @returns A constructed URL for the item, with the path appended.
 */
export function getUrlForItem(
  item?: LabelDto | MovieDto | null | PersonDto | SeriesDto | StudioDto,
  path?: string,
): string {
  if (!item) {
    return "/";
  }

  switch (item._type) {
    case "label": {
      return `/label/${item.id}${path ?? "/"}`;
    }
    case "movie": {
      return `/movie/${item.id}${path ?? "/"}`;
    }
    case "person": {
      return `/person/${item.id}${path ?? "/"}`;
    }
    case "series": {
      return `/series/${item.id}${path ?? "/"}`;
    }
    case "studio": {
      return `/studio/${item.id}${path ?? "/"}`;
    }
    default: {
      return "/";
    }
  }
}
