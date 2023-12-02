import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zoizyovmigqzyrxttbpr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvaXp5b3ZtaWdxenlyeHR0YnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDAyOTgsImV4cCI6MjAxNDYxNjI5OH0.SDnCQWTa73fETypjQIvEEnWqzxi-07cIZFDWWIiZ_Zs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
