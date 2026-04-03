'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { ROUTES } from '@/constants/routes';

export async function createProduct(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const name = formData.get('name') as string;
  const description = (formData.get('description') as string) || null;
  const price = parseFloat(formData.get('price') as string);
  const category = (formData.get('category') as string) || null;
  const image_url = (formData.get('image_url') as string) || null;
  const stock_count = parseInt(formData.get('stock_count') as string) || 0;

  const { error } = await supabase
    .from('products')
    .insert({ seller_id: user.id, name, description, price, category, image_url, stock_count });

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.ACCOUNT);
  revalidatePath(ROUTES.ARTISANS);
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const name = formData.get('name') as string;
  const description = (formData.get('description') as string) || null;
  const price = parseFloat(formData.get('price') as string);
  const category = (formData.get('category') as string) || null;
  const image_url = (formData.get('image_url') as string) || null;
  const stock_count = parseInt(formData.get('stock_count') as string) || 0;

  const { error } = await supabase
    .from('products')
    .update({ name, description, price, category, image_url, stock_count })
    .eq('id', productId)
    .eq('seller_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.ACCOUNT);
  revalidatePath(ROUTES.ARTISANS);
}

export async function deleteProduct(productId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('seller_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath(ROUTES.ACCOUNT);
  revalidatePath(ROUTES.ARTISANS);
}