import { createBrowserSupabaseClient } from '@/lib/db/supabase-browser';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
};

export async function getProducts(): Promise<Product[]> {
  const supabase = createBrowserSupabaseClient(); 

  const { data, error } = await supabase
    .from('products') 
    .select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!data) return [];

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    images: item.image_url ? [item.image_url] : [], 
    rating: item.rating ? item.rating / 10 : 0, 
  }));
}