import { createServerSupabaseClient } from '@/lib/db/supabase-server';
import { Review } from '@/types/review';

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(username, first_name, last_name, avatar_url)')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data as Review[];
}