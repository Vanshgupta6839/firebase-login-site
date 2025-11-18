import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfrjavvcaeuadoplkbom.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmphdnZjYWV1YWRvcGxrYm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzI0NTQsImV4cCI6MjA3ODk0ODQ1NH0.TQV9ix14TMQ7vrxLz-bdBKGc5KJKkEDl5roxVr_-F5U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);