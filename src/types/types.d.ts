interface ApiResponse<T> {
  data?: T | null;
  message?: string | null;
  error?: string | null;
}
interface FetchOptions<B = undefined> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | string;
  body?: B;
  headers?: Record<string, string>;
}

interface User {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
  createdAt: string;
}

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

type SizesType = "s" | "m" | "l";

type CategoryType = "coffee" | "tea" | "dessert";

interface FavoriteProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
}

interface FavoritesResponse {
  data?: FavoriteProduct[];
  message?: string;
  error?: string;
}

interface AdditiveType {
  name: string;
  "add-price": string;
}
interface SizeType {
  size: string;
  "add-price": string;
}

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
  // sizes: Record<SizesType, SizeType>;
  // additives: AdditiveType[];
}

type ProductsType = ProductType[];
