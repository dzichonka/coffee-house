import{f as S}from"./fetcher-Dk3Y2AE_.js";const l=document.querySelector("#modal"),q=document.querySelector(".window"),C=document.querySelector("#close"),v=document.querySelector("#modal-price"),p=document.querySelector("#modal-img"),b=document.querySelector("#modal-title"),g=document.querySelector("#modal-description"),r=Array.from(document.querySelectorAll(".tab-size")),M=Array.from(document.querySelectorAll(".tab-add"));let w=!1;function $(){l?.classList.add("closed"),document.body.style.overflow="auto",r.forEach(e=>e.classList.remove("active")),r[0].classList.add("active"),M.forEach(e=>e.classList.remove("active"))}C?.addEventListener("click",()=>{$()});window.addEventListener("click",e=>{e.target===l&&e.target!==q&&$()});async function x(e){const{data:c,error:i}=await S(`https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${e}`,"#loader");if(i||!c?.data||c.data.length===0)return;const s=c.data[0];let t=Number(s.price),o=0;const h=()=>{const L=t+o;v&&(v.textContent=`$${L.toFixed(2)}`)};if(!l||!q||!v)return;l.classList.remove("closed"),document.body.style.overflow="hidden",p&&(p.src=`images/menu/${s.category}/${s.id}.png`,p.alt=s.name),b&&(b.textContent=s.name),g&&(g.textContent=s.description),w||(["s","m","l"].forEach((L,f)=>{r[f].addEventListener("click",()=>{r.forEach(A=>{A.classList.remove("active"),t=Number(s.price)}),r[f].classList.add("active"),t+=Number(r[f].getAttribute("data-size")),h()})}),w=!0),h()}function P(e){return["coffee","tea","dessert"].includes(e)}const a=document.querySelector(".cards"),E=Array.from(document.querySelectorAll(".tab-category")),d=document.querySelector("#refresh");let n="coffee";const u=()=>window.innerWidth<=768,{data:T,error:H}=await S("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");H&&a&&(a.innerHTML="<p>Failed to load products.</p>");const z=T?.data??[];console.log("Products loaded:",z);let y=u()?4:8;function m(e){if(!a)return;a.innerHTML="";const c=z.filter(t=>t.category===e),i=c.slice(0,y);i.forEach(t=>{const o=document.createElement("div");o.classList.add("card"),o.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${t.id}.png"
          alt="${t.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${t.name}</h3>
          <p>${t.description}</p>
        </div>
      </div>
        <div class="price-container">
          <h3>$${t.price}</h3>
        </div>
      </div>
    `,a.append(o),o.addEventListener("click",()=>{x(t.id)})});function s(){d&&(c.length>i.length?d.classList.remove("hidden"):d.classList.add("hidden"))}s()}E.forEach(e=>{e.addEventListener("click",()=>{E.forEach(i=>i.classList.remove("active")),e.classList.add("active"),y=u()?4:8;const c=e.dataset.tab;!c||!P(c)||(n=c,m(n))})});d?.addEventListener("click",()=>{y+=4,m(n)});let k=u();window.addEventListener("resize",()=>{const e=u();e!==k&&(m(n),k=e)});m(n);
//# sourceMappingURL=menu-C9K76aWW.js.map
