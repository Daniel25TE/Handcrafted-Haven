'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/db/supabase-server';

export async function createReview(productId: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const content = formData.get('content') as string;
  const rating = formData.get('rating')
    ? parseInt(formData.get('rating') as string, 10)
    : null;

  const { error } = await supabase.from('reviews').insert({
    product_id: productId,
    user_id: user.id,
    content,
    rating,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/shop/${productId}`);
}

export async function deleteReview(reviewId: string, productId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/shop/${productId}`);
}