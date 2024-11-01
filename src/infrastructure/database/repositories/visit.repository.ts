/**
 * Repository for visit tracking.
 */

import { createSupabaseClient } from "../client";

/**
 * Register a visit to an item.
 * This does not throw an error if the visit is not registered.
 * @param itemType The type of the item to register a visit for.
 * @param itemId The ID of the item to register a visit for.
 * @param clientHash A unique hash for the client.
 */
export async function registerItemVisit(
  itemType: "label" | "movie" | "person" | "series" | "studio",
  itemId: number,
  clientHash: string,
) {
  const client = await createSupabaseClient();

  await client.from("views").insert({
    client_hash: clientHash,
    item_id: itemId,
    item_type: itemType,
  });
}
