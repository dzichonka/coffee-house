export function isCategoryType(value: string): value is CategoryType {
  return ["coffee", "tea", "dessert"].includes(value);
}

export function isSizesType(value: string): value is SizesType {
  return ["s", "m", "l"].includes(value);
}
