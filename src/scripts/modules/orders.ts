import { onAuthStateChanged } from "firebase/auth";
import { loadUserData } from "@/scripts/api/user";
import { auth } from "@/firebase";

const wrapper: HTMLTableElement | null = document.querySelector("#orders-list");

if (!(wrapper instanceof HTMLTableElement)) {
  throw new Error("No orders elements found");
}

export const getOrders = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await loadUserData();

      if (!userData) {
        wrapper.innerHTML = "No user data found";
        return;
      }
      const orders = userData.orders;

      if (!orders) {
        wrapper.innerHTML = "No orders found";
        return;
      }

      const header = document.createElement("thead");
      header.innerHTML = `<tr><th>#</th><th>Date</th><th>Items</th><th>Price</th></tr>`;

      const body = document.createElement("tbody");

      wrapper.append(header, body);

      orders.map((order: Order, index) => {
        const orderDiv = document.createElement("tr");
        orderDiv.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.createdAt?.slice(0, 10)}</td>
          <td>${order.items
            .map((item) => {
              return `<p>${item.name} x ${item.quantity}</p>`;
            })
            .join("")}</td>
          <td>$${order.totalPrice.toFixed(2)}</td>
          `;

        body.append(orderDiv);
      });
    }
  });
};

getOrders();
