import { createClient as createBrowserClient } from "@/infrastructure/database/client/client";
import { createClient as createServerClient } from "@/infrastructure/database/client/server";

/**
 * Creates a Supabase client depending on the environment.
 * @returns A Supabase client for the current environment.
 */
export async function createSupabaseClient() {
  // eslint-disable-next-line unicorn/prefer-global-this -- We need to check if we're in the browser
  if (typeof window !== "undefined") {
    return createBrowserClient();
  }

  return await createServerClient();
}
