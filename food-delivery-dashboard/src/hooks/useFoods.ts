import { useEffect, useState } from "react";
import type { Food } from "../types/food";
import FoodService from "../services/food.service";

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await FoodService.getAll();
        setFoods(res.data.data);
      } catch {
        setError("Failed to load foods");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return { foods, loading, error };
}
