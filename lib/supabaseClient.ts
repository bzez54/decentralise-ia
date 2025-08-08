import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SupabaseClient } from '@supabase/supabase-js';

export const supabase: SupabaseClient = createPagesBrowserClient();
