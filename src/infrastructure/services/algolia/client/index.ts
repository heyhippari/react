import { createClient as createBrowserClient } from "@/infrastructure/services/algolia/client/client";
import { createClient as createServerClient } from "@/infrastructure/services/algolia/client/server";

/**
 * Create an new Algolia client for the current environment.
 * @returns The Algolia client with permissions suitable for the current environment.
 */
export async function createAlgoliaClient() {
  // eslint-disable-next-line unicorn/prefer-global-this -- We need to check if we're in the browser
  if (typeof window !== "undefined") {
    return createBrowserClient();
  }

  return await createServerClient();
}
