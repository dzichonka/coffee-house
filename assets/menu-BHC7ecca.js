import"./burger-BrDwwR8E.js";const S=document.querySelector("#modal"),A=document.querySelector("#close"),w=document.querySelector("#modal-price"),L=document.querySelector("#modal-img"),z=document.querySelector("#modal-title"),$=document.querySelector("#modal-description"),o=document.querySelectorAll(".tab-size"),a=document.querySelectorAll(".tab-add");let y=!1,b=!1;A.addEventListener("click",()=>{S.classList.add("closed"),document.body.style.overflow="",o.forEach(e=>e.classList.remove("active")),o[0].classList.add("active"),a.forEach(e=>e.classList.remove("active"))});function C(e,i){let n=Number(e.price),d=0;const s=()=>{const c=n+d;w.textContent=`$${c.toFixed(2)}`};S.classList.remove("closed"),document.body.style.overflow="hidden",L.src=`images/menu/${e.category}/${i}.png`,L.alt=e.name,z.textContent=e.name,$.textContent=e.description;const u=Object.keys(e.sizes);y||(u.forEach((c,t)=>{const r=e.sizes[c],f=o[t].querySelector(".text");o[t].setAttribute("data-size",r["add-price"]),f&&(f.textContent=r.size),o[t].addEventListener("click",()=>{o.forEach(q=>{q.classList.remove("active"),n=Number(e.price)}),o[t].classList.add("active"),n+=Number(o[t].getAttribute("data-size")),s()})}),y=!0),b||(e.additives.forEach((c,t)=>{const r=a[t].querySelector(".text");a[t].setAttribute("data-add",c["add-price"]),r&&(r.textContent=c.name),a[t].addEventListener("click",()=>{a[t].classList.toggle("active"),a[t].classList.contains("active")?d+=Number(a[t].getAttribute("data-add")):d-=Number(a[t].getAttribute("data-add")),s()})}),b=!0),s()}const h=document.querySelector(".cards"),g=document.querySelectorAll(".tab-category"),m=document.querySelector("#refresh");let l="coffee";const v=()=>window.innerWidth<=768;async function k(){return await(await fetch("assets/products.json")).json()}const x=await k();function p(e,i=v()?4:8){h.innerHTML="";const n=x.filter(s=>s.category===e),d=n.slice(0,i);d.forEach((s,u)=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${e}/${u}.png"
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
    `,h.appendChild(c),c.addEventListener("click",()=>{C(s,u)})}),v()&&n.length>d.length?m.classList.remove("hidden"):m.classList.add("hidden")}g.forEach(e=>{e.addEventListener("click",()=>{g.forEach(i=>i.classList.remove("active")),e.classList.add("active"),l=e.getAttribute("data-tab"),p(l)})});m.addEventListener("click",()=>{p(l,8),m.classList.add("hidden")});let E=v();window.addEventListener("resize",()=>{const e=v();e!==E&&(p(l),E=e)});p(l);
//# sourceMappingURL=menu-BHC7ecca.js.map
