import { useEffect, useState, useCallback } from "react";
import type { Food } from "../types/food";
import FoodService from "../services/food.service";

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetchFoods function can be reused for refetch
  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await FoodService.getAll();
      setFoods(res.data);
    } catch {
      setError("Failed to load foods");
    } finally {
      setLoading(false);
    }
  }, []);

  // initial fetch on mount
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return { foods, loading, error, refetch: fetchFoods };
}
