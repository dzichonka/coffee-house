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

interface Size {
  size: string;
  price: string;
  discountPrice?: string;
}

interface Additive {
  name: string;
  price: string;
  discountPrice?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
  sizes: Record<string, Size>;
  additives: Additive[];
}

interface Item {
  productId: number;
  name: string;
  size: string;
  additives: string[];
  quantity: number;
}

interface Order {
  items: Item[];
  totalPrice: number;
  createdAt?: string;
}

interface OrderResponse {
  message: string;
  orderID: string;
}

interface User {
  uid: string;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
  createdAt: string;
  orders?: Order[];
}

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

interface RegistrationResponse {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

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
type CartItem = {
  productId: number;
  name: string;
  size: string;
  additives: string[];
  quantity: number;
  priceOld: number;
  priceNew: number;
};

interface ModalItem {
  productId: number;
  name: string;
  sizeKey: string;
  sizePrice: string;
  sizeDiscount: string;
  addKeys: string[];
  addPrice: string;
  addDiscounts: string;
  totalPrice: number;
  totalDiscount: number;
}

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
}
