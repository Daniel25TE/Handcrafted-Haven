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
    .select('*, reviews(rating)');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!data) return [];

  return data.map((item: any) => {
    const ratings = (item.reviews ?? [])
      .map((r: any) => r.rating)
      .filter((r: any) => typeof r === 'number');
    const avgRating =
      ratings.length > 0
        ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
        : 0;

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      images: item.image_url ? [item.image_url] : [],
      rating: avgRating,
    };
  });
}