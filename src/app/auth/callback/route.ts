import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // Redirect to the URL specified in the `next` query parameter if successful
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there was an error, redirect to the auth error page
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
