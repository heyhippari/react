import { TypedSupabaseClient } from '@/utils/types';

/**
 * Search for studios by name or original name.
 * Limits the results to 15.
 *
 * @param client - The Supabase client.
 * @param searchValue - The search value.
 * @returns The studios that match the search value.
 * @throws If an error occurs.
 * @example
 * ```ts
 * const studios = await searchStudioByName(supabase, 'Idol One');
 * ```
 */
export function searchStudioByName(
  client: TypedSupabaseClient,
  searchValue: string,
) {
  return client
    .from('studios')
    .select('id, name, original_name')
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();
}

/**
 * Search for labels by name or original name.
 * Limits the results to 15.
 *
 * @param client - The Supabase client.
 * @param searchValue - The search value.
 * @returns The labels that match the search value.
 * @throws If an error occurs.
 * @example
 * ```ts
 * const labels = await searchLabelByName(supabase, 'Cutie Mermaid');
 * ```
 */
export function searchLabelByName(
  client: TypedSupabaseClient,
  searchValue: string,
) {
  return client
    .from('labels')
    .select('id, name, original_name')
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();
}

/**
 * Search for series by name or original name.
 * Limits the results to 15.
 *
 * @param client - The Supabase client.
 * @param searchValue - The search value.
 * @returns The series that match the search value.
 * @throws If an error occurs.
 * @example
 * ```ts
 * const series = await searchSeriesByName(supabase, 'Love Live');
 * ```
 */
export function searchSeriesByName(
  client: TypedSupabaseClient,
  searchValue: string,
) {
  return client
    .from('series')
    .select('id, name, original_name')
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(15)
    .throwOnError();
}
