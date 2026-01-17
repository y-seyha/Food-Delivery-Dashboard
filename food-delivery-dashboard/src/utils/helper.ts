import type { CartItem } from "../types/cart";

//format Currency
export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

//Format Date
export const formatDate = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

//Calculate Cart Total
export const calcCartTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0,
  );
};

//Save to Local Storage
export const saveToLocalStorage =<T> (key: string, value: T) : void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

//remove from localStorage
export const removeFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};

//Get Order Status
export const getOrderStatusLabel = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Pending";
    case "Completed":
      return "Complete";
    case "Cancelled":
      return "Cancelled";
    default:
      return status;
  }
};
