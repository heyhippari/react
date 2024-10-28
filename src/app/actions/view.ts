"use server";

import { sha256 } from "@/core/utils/hash";
import { visitService } from "@/services/visit.service";
import { headers } from "next/headers";

/**
 * Register a view for an item.
 * @param itemId - The ID of the item to register a view for.
 * @param itemType - The type of item to register a view for.
 * @returns True if the view was registered successfully.
 */
export async function registerViewAction(
  itemId: number | string,
  itemType: "label" | "movie" | "person" | "series" | "studio",
) {
  const requestHeaders = await headers();
  // If this is a development environment, we don't want to register views
  // since it will mess up production data.
  if (process.env.NODE_ENV === "development") {
    console.log("Fake view registered for", itemType, itemId);

    return true;
  }

  if (!itemId) {
    throw new Error("No item ID provided");
  }

  if (!["label", "movie", "person", "series", "studio"].includes(itemType)) {
    throw new Error("Invalid item type");
  }

  // Just make sure we get SOMETHING, no matter which header it is
  // NEVER store this as-is, since it's PII. Always hash it with other data
  // before storing it.
  const clientIp = requestHeaders.get("x-forwarded-for") ??
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-host");
  const userAgent = requestHeaders.get("user-agent");
  const currentDate = new Date().toISOString().split("T")[0];

  // We hash the client IP, user agent, and current date to create a unique
  // identifier for the client. This is to prevent duplicate views from the
  // same client, but also to prevent storing PII directly.
  const clientHash = await sha256(`${clientIp}-${userAgent}-${currentDate}`);

  await visitService.registerItemVisit(itemType, Number(itemId), clientHash);

  return true;
}
