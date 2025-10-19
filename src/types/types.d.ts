interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

type SizesType = "s" | "m" | "l";

type VisibleCountType = 4 | 8 | 12;

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
