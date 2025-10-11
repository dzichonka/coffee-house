import"./burger-CI7Zge7n.js";const a=document.querySelector(".cards"),n=document.querySelectorAll(".tab");async function o(){return await(await fetch("/assets/products.json")).json()}const d=await o(),i=e=>{a.innerHTML="",d.filter(s=>s.category===e).forEach((s,r)=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${e}/${r}.png"
          alt="${s.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${s.name}</h3>
          <p>${s.description}</p>
        </div>
        <h3>$${s.price}</h3>
      </div>
    `,a.appendChild(c)})};n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(t=>t.classList.remove("active")),e.classList.add("active"),i(e.getAttribute("data-tab"))})});i("coffee");
//# sourceMappingURL=menu-wYzU8JYL.js.map
