import { TypedSupabaseClient } from "@/utils/types";

/**
 * Register a view of an item.
 * @param client - Supabase client
 * @param itemType - Type of the item
 * @param itemId - ID of the item
 * @param clientHash - Hash of the client
 * @returns The result of the insert query
 */
export function registerItemView(
  client: TypedSupabaseClient,
  itemType: "label" | "movie" | "person" | "series" | "studio",
  itemId: number,
  clientHash: string,
) {
  return client.from("views").insert({
    client_hash: clientHash,
    item_id: itemId,
    item_type: itemType,
  });
}
