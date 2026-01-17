import type { CartItem } from "./cart";

export type OrderStatus = "Pending" | "Completed" | "Cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}
