import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.BUN_PUBLIC_SUPABASE_URL,
  process.env.BUN_PUBLIC_SUPABASE_KEY
);
