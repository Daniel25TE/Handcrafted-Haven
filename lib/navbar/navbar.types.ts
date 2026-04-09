export interface CartItem {
  id: string;
  quantity: number;
}

export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: "buyer" | "artisan" | "admin";
}