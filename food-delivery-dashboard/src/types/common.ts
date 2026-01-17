//localStorage Keys for any global data
export const LocalStorageKeys = {
  TOKEN  : "token",
  USER  :  "user",
  CART :  "cart",
} as const;

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type LocalStorageKeys =
  (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];
