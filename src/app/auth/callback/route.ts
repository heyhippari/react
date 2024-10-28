import { userService } from "@/services/user.service";
import { NextResponse } from "next/server";

/**
 * Handle the OAuth callback from Supabase.
 * @param request The incoming request.
 * @returns The response to send back to the client.
 */
export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    try {
      await userService.exchangeCodeForSession(code);
      return NextResponse.redirect(`${origin}${next}`);
    } catch {
      return NextResponse.redirect(`${origin}/auth/auth-error`);
    }
  }
}
