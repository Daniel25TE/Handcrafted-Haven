import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/login-form';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/account');
  }

  return <LoginForm />;
}