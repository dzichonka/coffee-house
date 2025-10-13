import"./burger-DVIBmiN3.js";const p=document.querySelector("#modal"),A=document.querySelector(".window"),z=document.querySelector("#close"),$=document.querySelector("#modal-price"),y=document.querySelector("#modal-img"),C=document.querySelector("#modal-title"),k=document.querySelector("#modal-description"),o=document.querySelectorAll(".tab-size"),n=document.querySelectorAll(".tab-add");let b=!1,h=!1;function S(){p.classList.add("closed"),document.body.style.overflow="",o.forEach(e=>e.classList.remove("active")),o[0].classList.add("active"),n.forEach(e=>e.classList.remove("active"))}z.addEventListener("click",()=>{S()});window.addEventListener("click",e=>{e.target===p&&e.target!==A&&S()});function x(e,i){let a=Number(e.price),d=0;const s=()=>{const c=a+d;$.textContent=`$${c.toFixed(2)}`};p.classList.remove("closed"),document.body.style.overflow="hidden",y.src=`images/menu/${e.category}/${i}.png`,y.alt=e.name,C.textContent=e.name,k.textContent=e.description;const u=Object.keys(e.sizes);b||(u.forEach((c,t)=>{const r=e.sizes[c],L=o[t].querySelector(".text");o[t].setAttribute("data-size",r["add-price"]),L&&(L.textContent=r.size),o[t].addEventListener("click",()=>{o.forEach(q=>{q.classList.remove("active"),a=Number(e.price)}),o[t].classList.add("active"),a+=Number(o[t].getAttribute("data-size")),s()})}),b=!0),h||(e.additives.forEach((c,t)=>{const r=n[t].querySelector(".text");n[t].setAttribute("data-add",c["add-price"]),r&&(r.textContent=c.name),n[t].addEventListener("click",()=>{n[t].classList.toggle("active"),n[t].classList.contains("active")?d+=Number(n[t].getAttribute("data-add")):d-=Number(n[t].getAttribute("data-add")),s()})}),h=!0),s()}const g=document.querySelector(".cards"),E=document.querySelectorAll(".tab-category"),m=document.querySelector("#refresh");let l="coffee";const v=()=>window.innerWidth<=768;async function M(){return await(await fetch("assets/products.json")).json()}const N=await M();function f(e,i=v()?4:8){g.innerHTML="";const a=N.filter(s=>s.category===e),d=a.slice(0,i);d.forEach((s,u)=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
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
    `,g.appendChild(c),c.addEventListener("click",()=>{x(s,u)})}),v()&&a.length>d.length?m.classList.remove("hidden"):m.classList.add("hidden")}E.forEach(e=>{e.addEventListener("click",()=>{E.forEach(i=>i.classList.remove("active")),e.classList.add("active"),l=e.getAttribute("data-tab"),f(l)})});m.addEventListener("click",()=>{f(l,8),m.classList.add("hidden")});let w=v();window.addEventListener("resize",()=>{const e=v();e!==w&&(f(l),w=e)});f(l);
//# sourceMappingURL=menu-D87ENGKW.js.map
