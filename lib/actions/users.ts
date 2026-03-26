'use server';

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { ROUTES } from '@/constants/routes'

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const avatar_url = (formData.get('avatar_url') as string) || null

  if (email !== user.email) {
    const { error: authError } = await supabase.auth.updateUser({ email })
    if (authError) throw new Error(authError.message)
  }

  const { error } = await supabase
    .from('users')
    .update({ name, email, avatar_url })
    .eq('id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath(ROUTES.ACCOUNT)
}
