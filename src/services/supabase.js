import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hqzgzyuwuaxoprpbrzqp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxemd6eXV3dWF4b3BycGJyenFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNjc4MDgsImV4cCI6MjA0NTc0MzgwOH0.3zxvgHnzNEcgpgI8QOIWfxVC2d05Q2ROtPphUkzc2Bc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
