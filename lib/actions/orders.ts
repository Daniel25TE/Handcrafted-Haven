'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { CartItem } from '@/types/cart';
import { ROUTES } from '@/constants/routes';

export async function createOrder(items: CartItem[], total: number) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  if (!items || items.length === 0) throw new Error('Cart is empty');

  const { error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      items,
      total,
      status: 'pending',
    });

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.ACCOUNT);
}