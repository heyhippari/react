import { Item, MovieWithAll, PersonWithAll, Series } from '@/queries/types';
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

  return 'dvd_id' in item;
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
