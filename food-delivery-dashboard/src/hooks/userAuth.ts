import { useState } from "react";
import type { User } from "../types/user";
import { AuthStorageKeys } from "../types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(AuthStorageKeys.USER);
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(AuthStorageKeys.USER, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AuthStorageKeys.USER);
    localStorage.removeItem(AuthStorageKeys.TOKEN);
  };

  return { user, login, logout };
}
