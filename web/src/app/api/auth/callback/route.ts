import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * OAuth callback route handler.
 * After the user authenticates with Google, they're redirected here with a code.
 * We exchange the code for a session and redirect the user back to the home page.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}?error=auth_failed`);
    }
  }

  // Redirect to home page after successful authentication
  return NextResponse.redirect(origin);
}
