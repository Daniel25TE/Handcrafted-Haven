import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { User } from '@/types/user';

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) return null;

  return data as User;
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return data as User;
}