export type UserRole = 'buyer' | 'artisan';

export type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  address: string | null;
  description: string | null;
  avatar_url: string | null;
  role: UserRole;
  shop_name: string | null;
  created_at: string;
  updated_at: string;
};
