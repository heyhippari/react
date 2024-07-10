import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';
import 'server-only';
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
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // This was called in a server context, so we can't set cookies.
              // Since the middleware will set the cookies for us, we can ignore this error.
            }
          });
        },
      },
    },
  );
}
