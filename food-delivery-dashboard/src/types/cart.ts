import type { Food } from "./food";

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
