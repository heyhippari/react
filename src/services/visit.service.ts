/**
 * Service to record visits on items.
 */

import { registerItemVisit } from "@/infrastructure/database/repositories/visit.repository";

export const visitService = {
  async registerItemVisit(
    itemType: "label" | "movie" | "person" | "series" | "studio",
    itemId: number,
    clientHash: string,
  ) {
    await registerItemVisit(itemType, itemId, clientHash);
  },
};
