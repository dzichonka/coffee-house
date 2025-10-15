type SizesType = "s" | "m" | "l";

type VisibleCountType = 4 | 8;

type CategoryType = "coffee" | "tea" | "dessert";

interface AdditiveType {
  name: string;
  "add-price": string;
}
interface SizeType {
  size: string;
  "add-price": string;
}

interface ProductType {
  name: string;
  description: string;
  price: string;
  category: string;
  sizes: Record<SizesType, SizeType>;
  additives: AdditiveType[];
}

type ProductsType = ProductType[];

interface SliderDataType {
  img: string;
  title: string;
  text: string;
  price: string;
}
