import{o as i,a as d}from"./firebase-8-SqUyFW.js";import{l as c}from"./user-CjhoEeDW.js";const s=document.querySelector("#orders-list");if(!(s instanceof HTMLDivElement))throw new Error("No orders elements found");const u=async()=>{i(d,async n=>{if(n){const t=await c();if(!t){console.error("No user data found in Firestore");return}const o=t.orders;if(!o){console.error("No orders found in user data");return}return o.map((e,a)=>{const r=document.createElement("div");r.classList.add("order"),r.innerHTML=`
          <div>#${a+1}</div>
          <div>Number of items: ${e.items.length}</div>
          <div>Price: ${e.totalPrice}</div>
          <div>Date: ${e.createdAt?.slice(0,10)}</div>
          `,s.append(r)})}})};u();export{u as getOrders};
//# sourceMappingURL=orders-D2tqiNRA.js.map
