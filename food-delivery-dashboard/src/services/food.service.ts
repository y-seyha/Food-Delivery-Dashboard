import type { Food } from "../types/food";
import http from "./http";

const FoodService = {
  getAll: () => http.get<Food[]>("/foods"),
  getById: (id: string) => http.get<Food>(`/foods/${id}`),
};

export default FoodService;
