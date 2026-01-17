import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;

    fetcher()
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch(setError)
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [fetcher]);

  return { data, loading, error };
}
