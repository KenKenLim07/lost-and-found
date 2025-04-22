import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llwermzozuxdjtboiiws.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsd2VybXpvenV4ZGp0Ym9paXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzI5NzEsImV4cCI6MjA2MDcwODk3MX0.VRq3NgFiB4JBnjUTi7CzANgXswFjI7tw-QSG3I7TP0Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
