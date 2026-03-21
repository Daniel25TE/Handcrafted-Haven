import type { CartItem } from './cart';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  created_at: string;
};
