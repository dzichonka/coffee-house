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

      const header = document.createElement("div");
      header.classList.add("order");
      header.innerHTML = `
          <div>#</div>
          <div>Date of order</div>
          <div>Items</div>
          <div>Price</div>
          `;

      wrapper.append(header);

      orders.map((order: Order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order");
        orderDiv.innerHTML = `
          <div>${index + 1}</div>
          <div>${order.createdAt?.slice(0, 10)}</div>
          <div>${order.items
            .map((item) => {
              return `<p>${item.name} x ${item.quantity}</p>`;
            })
            .join("")}</div>
          <div>$${order.totalPrice.toFixed(2)}</div>

          `;

        wrapper.append(orderDiv);
      });
    }
  });
};

getOrders();
