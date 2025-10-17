import"./burger-Hh14-O_p.js";const u=document.querySelector("#modal"),z=document.querySelector(".window"),k=document.querySelector("#close"),y=document.querySelector("#modal-price"),L=document.querySelector("#modal-img"),g=document.querySelector("#modal-title"),E=document.querySelector("#modal-description"),a=Array.from(document.querySelectorAll(".tab-size")),o=Array.from(document.querySelectorAll(".tab-add"));let w=!1,S=!1;function C(){u?.classList.add("closed"),document.body.style.overflow="auto",a.forEach(e=>e.classList.remove("active")),a[0].classList.add("active"),o.forEach(e=>e.classList.remove("active"))}k?.addEventListener("click",()=>{C()});window.addEventListener("click",e=>{e.target===u&&e.target!==z&&C()});function x(e,r){let n=Number(e.price),i=0;const s=()=>{const c=n+i;y&&(y.textContent=`$${c.toFixed(2)}`)};if(!u||!z||!y)return;u.classList.remove("closed"),document.body.style.overflow="hidden",L&&(L.src=`images/menu/${e.category}/${r}.png`,L.alt=e.name),g&&(g.textContent=e.name),E&&(E.textContent=e.description),w||(["s","m","l"].forEach((c,t)=>{const d=e.sizes[c],b=a[t].querySelector(".text");a[t].setAttribute("data-size",d["add-price"]),b&&(b.textContent=d.size),a[t].addEventListener("click",()=>{a.forEach($=>{$.classList.remove("active"),n=Number(e.price)}),a[t].classList.add("active"),n+=Number(a[t].getAttribute("data-size")),s()})}),w=!0),S||(e.additives.forEach((c,t)=>{const d=o[t].querySelector(".text");o[t].setAttribute("data-add",c["add-price"]),d&&(d.textContent=c.name),o[t].addEventListener("click",()=>{o[t].classList.toggle("active"),o[t].classList.contains("active")?i+=Number(o[t].getAttribute("data-add")):i-=Number(o[t].getAttribute("data-add")),s()})}),S=!0),s()}function M(e){return["coffee","tea","dessert"].includes(e)}const h=document.querySelector(".cards"),q=Array.from(document.querySelectorAll(".tab-category")),m=document.querySelector("#refresh");let l="coffee";const f=()=>window.innerWidth<=768;async function N(){return await(await fetch("assets/products.json")).json()}const P=await N();function v(e,r=f()?4:8){if(!h)return;h.innerHTML="";const n=P.filter(s=>s.category===e),i=n.slice(0,r);i.forEach((s,p)=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${e}/${p}.png"
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
    `,h.appendChild(c),c.addEventListener("click",()=>{x(s,p)})}),f()&&n.length>i.length?m?.classList.remove("hidden"):m?.classList.add("hidden")}q.forEach(e=>{e.addEventListener("click",()=>{q.forEach(n=>n.classList.remove("active")),e.classList.add("active");const r=e.dataset.tab;!r||!M(r)||(l=r,v(l))})});m?.addEventListener("click",()=>{v(l,8),m.classList.add("hidden")});let A=f();window.addEventListener("resize",()=>{const e=f();e!==A&&(v(l),A=e)});v(l);
//# sourceMappingURL=menu-B0TkoUnn.js.map
