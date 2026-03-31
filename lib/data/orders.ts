import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { Order } from '@/types/order';

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data as Order[];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return data as Order;
}