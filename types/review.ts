export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  content: string;
  rating: number | null;
  created_at: string;
};