import{displayModal as v}from"./modal-DhJ1xupO.js";import{f as h}from"./fetcher-IzjmCLXP.js";function y(e){return["coffee","tea","dessert"].includes(e)}const s=document.querySelector(".cards"),f=Array.from(document.querySelectorAll(".tab-category")),o=document.querySelector("#refresh");let r="coffee";const a=()=>window.innerWidth<=768,{data:L,error:g}=await h("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");g&&s&&(s.innerHTML="<p>Failed to load products.</p>");const p=L?.data??[];console.log("Products loaded:",p);let l=a()?4:8;function d(e){if(!s)return;s.innerHTML="";const i=p.filter(t=>t.category===e),n=i.slice(0,l);n.forEach(t=>{const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
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
    `,s.append(c),c.addEventListener("click",()=>{v(t.id)})});function m(){o&&(i.length>n.length?o.classList.remove("hidden"):o.classList.add("hidden"))}m()}f.forEach(e=>{e.addEventListener("click",()=>{f.forEach(n=>n.classList.remove("active")),e.classList.add("active"),l=a()?4:8;const i=e.dataset.tab;!i||!y(i)||(r=i,d(r))})});o?.addEventListener("click",()=>{l+=4,d(r)});let u=a();window.addEventListener("resize",()=>{const e=a();e!==u&&(d(r),u=e)});d(r);
//# sourceMappingURL=cards-DcQgJVKD.js.map
