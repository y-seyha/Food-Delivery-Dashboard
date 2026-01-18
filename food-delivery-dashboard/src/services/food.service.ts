import type { Food } from "../types/food";
import http from "./http";

const FoodService = {
  getAll: () => http.get<Food[]>("/foods"),
  getById: (id: string) => http.get<Food>(`/foods/${id}`),

  add: (data: Partial<Food>) => http.post<Food>("/foods", data),
  update: (id: string, data: Partial<Food>) =>
    http.put<Food>(`/foods/${id}`, data),
  delete: (id: string) => http.delete<{ message: string }>(`/foods/${id}`),
};

export default FoodService;
