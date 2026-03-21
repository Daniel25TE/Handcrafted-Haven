export type UserRole = 'client' | 'seller';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
};
