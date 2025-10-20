import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/interface/database";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  "https://vzoqdlkapfzpgyleacha.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6b3FkbGthcGZ6cGd5bGVhY2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDcxNjcsImV4cCI6MjA3NjI4MzE2N30.o_AFjWQS1Ve4pznEKAotsvYO2h7aealplT3YKnt9jrY"
);
