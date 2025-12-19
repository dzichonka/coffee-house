let state: ModalItem = {
  productId: 0,
  name: "",
  sizeKey: "",
  sizePrice: "0",
  sizeDiscount: "0",
  addKeys: [],
  addPrice: "0",
  addDiscounts: "0",
  totalPrice: 0,
  totalDiscount: 0,
};
function updateTotals(): void {
  const sizePrice = Number(state.sizePrice) || 0;
  const sizeDiscount = Number(state.sizeDiscount) || 0;
  const addPrice = Number(state.addPrice) || 0;
  const addDiscounts = Number(state.addDiscounts) || 0;

  state.totalPrice = +(sizePrice + addPrice).toFixed(2);
  state.totalDiscount = +(sizeDiscount + addDiscounts).toFixed(2);
}

function getItem(): ModalItem {
  return { ...state };
}

function setItem(updates: Partial<ModalItem>): void {
  state = { ...state, ...updates };
  updateTotals();
}

function setSize(sizeObj: {
  size: string;
  price: string;
  discountPrice?: string;
}): void {
  state.sizeKey = sizeObj.size;
  state.sizePrice = sizeObj.price;
  state.sizeDiscount = sizeObj.discountPrice ?? sizeObj.price;
  updateTotals();
}

function addAdditive(addObj: {
  name: string;
  price: string;
  discountPrice?: string;
}): void {
  const isExist = state.addKeys.includes(addObj.name);

  if (isExist) {
    state.addKeys = state.addKeys.filter((name) => name !== addObj.name);
    state.addPrice = (Number(state.addPrice) - Number(addObj.price)).toFixed(2);
    state.addDiscounts = (
      Number(state.addDiscounts) - Number(addObj.discountPrice ?? addObj.price)
    ).toFixed(2);
  } else {
    state.addKeys.push(addObj.name);
    state.addPrice = (Number(state.addPrice) + Number(addObj.price)).toFixed(2);
    state.addDiscounts = (
      Number(state.addDiscounts) + Number(addObj.discountPrice ?? addObj.price)
    ).toFixed(2);
  }

  updateTotals();
}

function removeAdditive(
  name: string,
  price: string,
  discountPrice?: string
): void {
  if (!state.addKeys.includes(name)) return;
  state.addKeys = state.addKeys.filter((n) => n !== name);
  state.addPrice = (Number(state.addPrice) - Number(price)).toFixed(2);
  state.addDiscounts = (
    Number(state.addDiscounts) - Number(discountPrice ?? price)
  ).toFixed(2);
  updateTotals();
}

function clear(): void {
  state = {
    productId: 0,
    name: "",
    sizeKey: "",
    sizePrice: "0",
    sizeDiscount: "0",
    addKeys: [],
    addPrice: "0",
    addDiscounts: "0",
    totalPrice: 0,
    totalDiscount: 0,
  };
}

export function useModalState() {
  return {
    getItem,
    setItem,
    setSize,
    addAdditive,
    removeAdditive,
    clear,
  };
}
