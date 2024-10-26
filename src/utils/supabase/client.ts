import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

import { Database } from "../database.types";
import { TypedSupabaseClient } from "../types";

let client: TypedSupabaseClient | undefined;

/**
 * Creates a Supabase client for browser-side use.
 * @returns The Supabase client.
 */
export function createClient() {
  if (client) {
    return client;
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return client;
}

/**
 * Hook to use a Supabase client in the browser.
 * @returns The Supabase client.
 */
function useSupabaseBrowser() {
  return useMemo(createClient, []);
}

export default useSupabaseBrowser;
