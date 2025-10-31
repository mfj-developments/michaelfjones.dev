import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in client components.
 * This client automatically handles cookies for session management.
 * Returns null if credentials are not configured.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // During build time or if env vars are missing, return null
    // This prevents build errors while still allowing the app to build
    console.warn("Supabase credentials not configured. Auth features will be disabled.");
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
