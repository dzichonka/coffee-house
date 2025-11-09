import{o as c,a as v}from"./firebase-CxVZMhw8.js";import{l as u}from"./user-Bdg1Tj1F.js";const d=document.querySelector("#orders-list");if(!(d instanceof HTMLDivElement))throw new Error("No orders elements found");const m=async()=>{c(v,async a=>{if(a){const o=await u();if(!o){console.error("No user data found in Firestore");return}const i=o.orders;if(!i){console.error("No orders found in user data");return}const e=document.createElement("div");e.classList.add("order"),e.innerHTML=`
          <div>#</div>
          <div>Date of order</div>
          <div>Items</div>
          <div>Price</div>
          `,d.append(e),i.map((r,s)=>{const t=document.createElement("div");t.classList.add("order"),t.innerHTML=`
          <div>${s+1}</div>
          <div>${r.createdAt?.slice(0,10)}</div>
          <div>${r.items.map(n=>`<p>${n.name} x ${n.quantity}</p>`).join("")}</div>
          <div>$${r.totalPrice.toFixed(2)}</div>

          `,d.append(t)})}})};m();export{m as getOrders};
//# sourceMappingURL=orders-BfPLVoA3.js.map
