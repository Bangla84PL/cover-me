import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://api.supabase.smartcamp.ai'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '***REDACTED_SUPABASE_ANON_KEY***'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)