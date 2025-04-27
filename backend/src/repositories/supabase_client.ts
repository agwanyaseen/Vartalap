import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANNON_KEY,SUPABASE_URL } from '../config_values'


export const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANNON_KEY
)
