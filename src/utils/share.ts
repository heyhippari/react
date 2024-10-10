import { Item } from '@/queries/types';
import { isMovie } from './types';

/**
 * Get the title for link sharing based on the item
 * @param item The item to get the title for
 * @returns The title for sharing
 */
export function getShareTitle(item: Item) {
  if (isMovie(item)) {
    return `${item?.dvd_id} (${item?.name ?? item?.original_name})`;
  } else {
    return item?.name ?? item?.original_name;
  }
}

export function getShareText(item: Item) {
  if (isMovie(item)) {
    return `Find out more about ${item?.dvd_id} on Kanojo`;
  } else {
    return `Find out more about ${item?.name ?? item?.original_name} on Kanojo`;
  }
}
