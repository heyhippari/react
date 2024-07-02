import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';
import { Database } from '../database.types';

export default function useSupabaseServer(
  cookieStore: ReturnType<typeof cookies>,
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
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Following the Supabase example
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}
