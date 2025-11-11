import { createClient } from "@supabase/supabase-js";
import type { Database } from "db";
import { env } from "@/lib/config";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_KEY
);
