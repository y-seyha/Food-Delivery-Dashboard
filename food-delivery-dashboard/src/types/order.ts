import type { CartItem } from "./cart";

export type OrderStatus = "pending" | "delivered" | "canceled";

export interface Order {
  _id: string;
  user: string | { _id: string; name: string };
  items: CartItem[];
  status: OrderStatus;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}
