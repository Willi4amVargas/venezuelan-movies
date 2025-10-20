import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";

// dont do this
const SUPABASE_URL = "https://wmuwbxjhyftccvqjpino.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtdXdieGpoeWZ0Y2N2cWpwaW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODk0NTksImV4cCI6MjA3NjQ2NTQ1OX0.nUa9l5fkpeoA6KNN4h1XMBIxLB6nY3PsupQTSgrHHUY";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
