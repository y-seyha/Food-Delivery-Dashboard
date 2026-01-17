import { useState } from "react";
import type { User } from "../types/user";
import { AuthStorageKeys } from "../types/auth";
import UserService from "../services/user.service";

export function useUser() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(AuthStorageKeys.USER);
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await UserService.getProfile();
      setUser(res.data.data);
      localStorage.setItem(
        AuthStorageKeys.USER,
        JSON.stringify(res.data.data),
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AuthStorageKeys.USER);
    localStorage.removeItem(AuthStorageKeys.TOKEN);
    setUser(null);
  };

  return { user, loading, fetchProfile, logout };
}
