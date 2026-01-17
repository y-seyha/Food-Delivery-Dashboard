import type { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// LocalStorage keys for auth
export const AuthStorageKeys = {
  TOKEN: "token",
  USER: "user",
};

export type AuthStorageKey =
  (typeof AuthStorageKeys)[keyof typeof AuthStorageKeys];
