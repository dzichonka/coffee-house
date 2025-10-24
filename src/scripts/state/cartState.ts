type CartItem = {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
  priceOld: number;
  priceNew: number;
};

type CartState = {
  items: CartItem[];
  totalPriceOld: number;
  totalPriceNew: number;
};

const STORAGE_KEY = "cartState";

function loadFromLocalStorage(): CartState {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return { items: [], totalPriceOld: 0, totalPriceNew: 0 };
}

function saveToLocalStorage(state: CartState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state: CartState = loadFromLocalStorage();

function recalcTotals() {
  state.totalPriceOld = state.items.reduce(
    (sum, item) => sum + item.priceOld * item.quantity,
    0
  );
  state.totalPriceNew = state.items.reduce(
    (sum, item) => sum + item.priceNew * item.quantity,
    0
  );
}

function addItem(newItem: CartItem) {
  const existing = state.items.find(
    (item) =>
      item.productId === newItem.productId &&
      item.size === newItem.size &&
      JSON.stringify(item.additives) === JSON.stringify(newItem.additives)
  );

  if (existing) {
    existing.quantity += newItem.quantity;
  } else {
    state.items.push(newItem);
  }

  recalcTotals();
  saveToLocalStorage(state);
}

function clear() {
  state = { items: [], totalPriceOld: 0, totalPriceNew: 0 };
  saveToLocalStorage(state);
}

function getItems(): CartItem[] {
  return state.items;
}

function getTotalPriceOld(): number {
  return state.totalPriceOld;
}

function getTotalPriceNew(): number {
  return state.totalPriceNew;
}

export function useCartState() {
  return {
    addItem,
    clear,
    getItems,
    getTotalPriceOld,
    getTotalPriceNew,
  };
}
