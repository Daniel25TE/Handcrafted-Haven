// Read queries for users

import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { User } from '@/types/user'

export async function getUserById(id: string): Promise<User | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return data as User
}