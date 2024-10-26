import type { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";
import "server-only";

import { Database } from "../database.types";

/**
 * Creates a Supabase client for server-side use.
 * @param cookieStore - The cookie store to use for the client.
 * @returns The Supabase client.
 */
export default function createClient(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, options, value }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
