import { userService } from "@/services/user.service";
import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handle the OAuth callback from Supabase.
 * @param request The incoming request.
 * @returns The response to send back to the client.
 */
export async function GET(request: NextRequest) {
  // Supabase sends us error messages as query parameters.
  // Check if we have some before we do anything else.
  const searchParameters = request.nextUrl.searchParams;

  if (searchParameters.has("error") || searchParameters.has("error_code")) {
    // Capture the error with Sentry.
    const error = searchParameters.get("error_description") ??
      searchParameters.get("error");
    Sentry.captureException(
      new Error(error ?? "An unknown error occurred during authentication."),
    );

    return NextResponse.redirect("/auth/auth-error");
  }

  const origin = request.nextUrl.origin;
  const code = searchParameters.get("code");
  const next = searchParameters.get("next") ?? "/";

  if (code) {
    try {
      await userService.exchangeCodeForSession(code);
      return NextResponse.redirect(`${origin}${next}`);
    } catch {
      return NextResponse.redirect(`${origin}/auth/auth-error`);
    }
  }
}
