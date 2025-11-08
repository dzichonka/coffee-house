import { onAuthStateChanged } from "firebase/auth";
import { loadUserData } from "../api/user";
import { auth } from "@/firebase";

const wrapper: HTMLDivElement | null = document.querySelector("#orders-list");

if (!(wrapper instanceof HTMLDivElement)) {
  throw new Error("No orders elements found");
}

export const getOrders = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await loadUserData();

      if (!userData) {
        console.error("No user data found in Firestore");
        return;
      }
      const orders = userData.orders;

      if (!orders) {
        console.error("No orders found in user data");
        return;
      }

      return orders.map((order: Order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order");
        orderDiv.innerHTML = `
          <div>#${index + 1}</div>
          <div>Number of items: ${order.items.length}</div>
          <div>Price: ${order.totalPrice}</div>
          <div>Date: ${order.createdAt?.slice(0, 10)}</div>
          `;

        wrapper.append(orderDiv);
      });
    }
  });
};

getOrders();
