import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { Product } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return data as Product;
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data as Product[];
}