import { LabelDto } from "@/data/label.dto";
import { MovieDto } from "@/data/movie.dto";
import { PersonDto } from "@/data/person.dto";
import { SeriesDto } from "@/data/series.dto";
import { StudioDto } from "@/data/studio.dto";

import { isMovie } from "../types";

/**
 * Get the title for link sharing based on the item.
 * @param item The item to get the title for.
 * @returns The title for sharing.
 */
export function getShareTitle(
  item: LabelDto | MovieDto | PersonDto | SeriesDto | StudioDto,
) {
  return isMovie(item)
    ? `[${item?.dvd_id}] ${item?.display_name}`
    : item?.display_name;
}

/**
 * Get the text for link sharing based on the item.
 * @param item The item to get the text for.
 * @returns The text for sharing.
 */
export function getShareText(
  item: LabelDto | MovieDto | PersonDto | SeriesDto | StudioDto,
) {
  return `Find out more about ${item?.display_name} on Kanojo`;
}
