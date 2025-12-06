import { createClient } from "@supabase/supabase-js";
import { Database } from "@/@types/supabase";

// Read from Vite env vars
export const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // biome-ignore lint/suspicious/noConsole: Log a warning if env vars are missing
  console.warn(
    "Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? "",
);

export default supabase;
