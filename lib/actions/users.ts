'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { ROUTES } from '@/constants/routes';

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const email = formData.get('email') as string;
  const address = (formData.get('address') as string) || null;
  const description = (formData.get('description') as string) || null;
  const avatar_url = (formData.get('avatar_url') as string) || null;
  const shop_name = (formData.get('shop_name') as string) || null;

  if (email !== user.email) {
    const { error: authError } = await supabase.auth.updateUser({ email });
    if (authError) throw new Error(authError.message);
  }

  const { error } = await supabase
    .from('profiles')
    .update({ first_name, last_name, email, address, description, avatar_url, shop_name })
    .eq('id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.ACCOUNT);
}