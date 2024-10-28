import { createClient as createBrowserClient } from "@/infrastructure/database/client/client";
import { createClient as createServerClient } from "@/infrastructure/database/client/server";

/**
 * Creates a Supabase client depending on the environment.
 * @param serviceKey Whether to use the service key for server-side requests.
 * @returns A Supabase client for the current environment.
 */
export async function createSupabaseClient(serviceKey = false) {
  // eslint-disable-next-line unicorn/prefer-global-this -- We need to check if we're in the browser
  if (typeof window !== "undefined") {
    // The browser client NEVER uses the service key.
    return createBrowserClient();
  }

  return await createServerClient(serviceKey);
}
