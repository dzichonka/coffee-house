import"./burger-Bhj6cZvB.js";const A=document.querySelector("#modal"),q=document.querySelector("#close"),w=document.querySelector("#modal-price"),L=document.querySelector("#modal-img"),i=document.querySelectorAll(".tab-size"),a=document.querySelectorAll(".tab-add");let b=!1,h=!1;q.addEventListener("click",()=>{A.classList.add("closed"),document.body.style.overflow="",i.forEach(e=>e.classList.remove("active")),i[0].classList.add("active"),a.forEach(e=>e.classList.remove("active"))});function z(e,o){let d=Number(e.price),n=0;const s=()=>{const c=d+n;w.textContent=`$${c.toFixed(2)}`};A.classList.remove("closed"),document.body.style.overflow="hidden",L.src=`images/menu/${e.category}/${o}.png`,L.alt=e.name;const u=Object.keys(e.sizes);b||(u.forEach((c,t)=>{const r=e.sizes[c],p=i[t].querySelector(".text");i[t].setAttribute("data-size",r["add-price"]),p&&(p.textContent=r.size),i[t].addEventListener("click",()=>{i.forEach(S=>{S.classList.remove("active"),d=Number(e.price)}),i[t].classList.add("active"),d+=Number(i[t].getAttribute("data-size")),s()})}),b=!0),h||(e.additives.forEach((c,t)=>{const r=a[t].querySelector(".text");a[t].setAttribute("data-add",c["add-price"]),r&&(r.textContent=c.name),a[t].addEventListener("click",()=>{a[t].classList.toggle("active"),a[t].classList.contains("active")?n+=Number(a[t].getAttribute("data-add")):n-=Number(a[t].getAttribute("data-add")),s()})}),h=!0),s()}const y=document.querySelector(".cards"),g=document.querySelectorAll(".tab-category"),m=document.querySelector("#refresh");let l="coffee";const v=()=>window.innerWidth<=768;async function $(){return await(await fetch("assets/products.json")).json()}const C=await $();function f(e,o=v()?4:8){y.innerHTML="";const d=C.filter(s=>s.category===e),n=d.slice(0,o);n.forEach((s,u)=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
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
    `,y.appendChild(c),c.addEventListener("click",()=>{z(s,u)})}),v()&&d.length>n.length?m.classList.remove("hidden"):m.classList.add("hidden")}g.forEach(e=>{e.addEventListener("click",()=>{g.forEach(o=>o.classList.remove("active")),e.classList.add("active"),l=e.getAttribute("data-tab"),f(l)})});m.addEventListener("click",()=>{f(l,8),m.classList.add("hidden")});let E=v();window.addEventListener("resize",()=>{const e=v();e!==E&&(f(l),E=e)});f(l);
//# sourceMappingURL=menu-B2Fzu00p.js.map
