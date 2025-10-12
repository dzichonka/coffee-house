import"./burger-C7yoA1f2.js";const g=document.querySelector("#modal"),$=document.querySelector("#close"),v=document.querySelector("#modal-price"),y=document.querySelector("#modal-img"),i=document.querySelectorAll(".tab-size"),o=document.querySelectorAll(".tab-add");$.addEventListener("click",()=>{g.classList.add("closed"),document.body.style.overflow=""});function S(e,d){let s=Number(e.price),c=0;g.classList.remove("closed"),document.body.style.overflow="hidden",y.src=`images/menu/${e.category}/${d}.png`,y.alt=e.name,Object.keys(e.sizes).forEach((n,t)=>{const r=e.sizes[n],b=i[t].querySelector("span");i[t].setAttribute("data-size",r["add-price"]),b&&(b.textContent=r.size),i[t].addEventListener("click",()=>{i.forEach(E=>{E.classList.remove("active"),s=Number(e.price)}),i[t].classList.add("active"),s+=Number(i[t].getAttribute("data-size")),v.textContent=`$${(s+c).toFixed(2)}`})}),e.additives.forEach((n,t)=>{const r=o[t].querySelector("span");o[t].setAttribute("data-add",n["add-price"]),r&&(r.textContent=n.name),o[t].addEventListener("click",()=>{o[t].classList.toggle("active"),o[t].classList.contains("active")?c+=Number(o[t].getAttribute("data-add")):c-=Number(o[t].getAttribute("data-add")),v.textContent=`$${(s+c).toFixed(2)}`})}),v.textContent=`$${(s+c).toFixed(2)}`}const f=document.querySelector(".cards"),h=document.querySelectorAll(".tab-category"),u=document.querySelector("#refresh");let l="coffee";const m=()=>window.innerWidth<=768;async function q(){return await(await fetch("assets/products.json")).json()}const w=await q();function p(e,d=m()?4:8){f.innerHTML="";const s=w.filter(a=>a.category===e),c=s.slice(0,d);c.forEach((a,n)=>{const t=document.createElement("div");t.classList.add("card"),t.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${e}/${n}.png"
          alt="${a.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${a.name}</h3>
          <p>${a.description}</p>
        </div>
        <h3>$${a.price}</h3>
      </div>
    `,f.appendChild(t),t.addEventListener("click",()=>{S(a,n)})}),m()&&s.length>c.length?u.classList.remove("hidden"):u.classList.add("hidden")}h.forEach(e=>{e.addEventListener("click",()=>{h.forEach(d=>d.classList.remove("active")),e.classList.add("active"),l=e.getAttribute("data-tab"),p(l)})});u.addEventListener("click",()=>{p(l,8),u.classList.add("hidden")});let L=m();window.addEventListener("resize",()=>{const e=m();e!==L&&(p(l),L=e)});p(l);
//# sourceMappingURL=menu-BduSgx1r.js.map
