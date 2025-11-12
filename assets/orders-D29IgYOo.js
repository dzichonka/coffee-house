import{o as m,a as u}from"./firebase-CxVZMhw8.js";import{l as h}from"./user-Bdg1Tj1F.js";const t=document.querySelector("#orders-list");if(!(t instanceof HTMLTableElement))throw new Error("No orders elements found");const p=async()=>{m(u,async c=>{if(c){const r=await h();if(!r){t.innerHTML="No user data found";return}const n=r.orders;if(!n){t.innerHTML="No orders found";return}const o=document.createElement("thead");o.innerHTML="<tr><th>#</th><th>Date</th><th>Items</th><th>Price</th></tr>";const a=document.createElement("tbody");t.append(o,a),n.map((e,i)=>{const d=document.createElement("tr");d.innerHTML=`
          <td>${i+1}</td>
          <td>${e.createdAt?.slice(0,10)}</td>
          <td>${e.items.map(s=>`<p>${s.name} x ${s.quantity}</p>`).join("")}</td>
          <td>$${e.totalPrice.toFixed(2)}</td>
          `,a.append(d)})}})};p();export{p as getOrders};
//# sourceMappingURL=orders-D29IgYOo.js.map
