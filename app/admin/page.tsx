import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/login')
  }

  if (profile.role !== 'admin') {
    redirect('/account')
  }

    return (
    <section className="section">
        <div className="container">
        <h1>Admin</h1>
        <Link href="/admin/messages" style={{ textDecoration: "underline" }}>
            View Messages
        </Link>
        </div>
    </section>
    );
}