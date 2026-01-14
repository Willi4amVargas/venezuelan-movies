import { createClient } from "@supabase/supabase-js";
import type { Database } from "db";
import { env } from "@/lib/config";
// Esto es para decirle a typescript que el UserMetadata puede tener un campo username
declare module '@supabase/supabase-js' {
  export interface UserMetadata {
    username?: string;
  }
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_KEY
);
