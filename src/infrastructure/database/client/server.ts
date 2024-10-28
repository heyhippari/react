"use server";
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "../models/database.types";

/**
 * Creates a Supabase client for server-side use.
 * @param serviceKey Whether to use the service key for server-side requests.
 * @returns The Supabase client.
 */
export async function createClient(serviceKey = false) {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
      ? process.env.SUPABASE_SERVICE_ROLE_KEY!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (serviceKey) {
            return [];
          }

          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          if (serviceKey) {
            return;
          }

          try {
            for (const { name, options, value } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
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
