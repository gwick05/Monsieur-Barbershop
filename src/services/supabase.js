import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jskcbqksicmlmfeynhon.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impza2NicWtzaWNtbG1mZXluaG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MjQ4NDYsImV4cCI6MjAyNDAwMDg0Nn0.MCUXUqJ57xYG8RNTS-lPJQ9ja4xWERaUpco9y_sXDfs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
