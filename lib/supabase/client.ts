import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://api.supabase.smartcamp.ai'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzUxNzk0MzAwLCJleHAiOjIwNjcxNTQzMDB9.OuEL1wHusMc323PhIe_pjbme3DSstlWn5DB0m9uorTc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)