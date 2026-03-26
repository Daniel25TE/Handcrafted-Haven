import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { getUserById } from '@/lib/data/users'
import { ROUTES } from '@/constants/routes'
import EditProfileForm from '@/components/account/EditProfileForm'

export default async function AccountEditPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(ROUTES.LOGIN)

  const profile = await getUserById(user.id)

  if (!profile) redirect(ROUTES.LOGIN)

  return <EditProfileForm user={profile} />
}
