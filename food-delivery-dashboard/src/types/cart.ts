import type { Food } from "./food";

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
