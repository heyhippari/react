import {
  Item,
  Label,
  MediaFormat,
  MovieWithAll,
  PersonWithAll,
  Series,
  Studio,
} from '@/queries/types';
import type { Database } from '@/utils/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseClient = SupabaseClient<Database>;

export interface ImageUploadUrl {
  id: string;
  uploadUrl: string;
}

/**
 * Check if the item is a movie
 * @param item The item to check
 * @returns True if the item is a movie
 */
export function isMovie(item: Item): item is MovieWithAll {
  if (!item) {
    return false;
  }

  return 'dvd_id' in item || 'barcode' in item;
}

/**
 * Check if the item is a person
 * @param item The item to check
 * @returns True if the item is a person
 */
export function isPerson(item: Item): item is PersonWithAll {
  if (!item) {
    return false;
  }

  return 'birth_date' in item || 'profile_url' in item;
}

/**
 * Check if the item is a series
 * @param item The item to check
 * @returns True if the item is a series
 */
export function isSeries(item: Item): item is Series {
  if (!item) {
    return false;
  }

  return !('dvd_id' in item) && !('birth_date' in item);
}

export function isMediaFormat(format: unknown): format is MediaFormat {
  return (
    typeof format === 'string' &&
    Object.values([
      'DVD',
      'Blu-ray',
      'Blu-ray 4K',
      'Digital',
      'VHS',
      'LaserDisc',
      'UMD Video',
      'Video CD',
    ]).includes(format as MediaFormat)
  );
}

/**
 * Returns the given item's URL, optionally with a path.
 * 
 * @param item The item to get the URL for.
 * @param path The path to append to the URL. Defaults to `/`.
 * @param differenciator The differenciator to use for the URL.
 * @returns The URL for the item.
 **/
export function getUrlForItem(item: Item, path = '/', differenciator?: 'series' | 'label' | 'studio'): string {
  if (!item) {
    return '/';
  }

  if (isMovie(item)) {
    return `/movie/${item.id}${path ? `/${path}` : ''}`;
  } else if (isPerson(item)) {
    return `/person/${item.id}${path ? `/${path}` : ''}`;
  } else if (differenciator === 'series') {
    return `/series/${(item as Series).id}${path ? `/${path}` : ''}`;
  } else if (differenciator === 'label') {
    return `/label/${(item as Label).id}${path ? `/${path}` : ''}`;
  } else if (differenciator === 'studio') {
    return `/studio/${(item as Studio).id}${path ? `/${path}` : ''}`;
  }

  return '/';
}