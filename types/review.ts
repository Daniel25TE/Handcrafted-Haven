export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  content: string;
  rating: number | null;
  created_at: string;
  profiles?: {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
};