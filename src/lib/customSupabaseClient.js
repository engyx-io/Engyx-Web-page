import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hhoyatmfelywylbpeylz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhob3lhdG1mZWx5d3lsYnBleWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTAxOTcsImV4cCI6MjA2NjU4NjE5N30.zznV3GegSkY0-FfDMakXdytbhwTdhe1ykm5Egf_0vvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);