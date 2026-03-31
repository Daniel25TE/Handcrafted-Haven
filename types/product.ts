export type Product = {
  id: string;
  seller_id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  rating: number | null;
  stock_count: number;
  created_at: string;
  updated_at: string;
};
