import{displayModal as p}from"./modal-B-3Owjd_.js";import{f as v}from"./fetcher-IzjmCLXP.js";import{u as L}from"./userState-C2crR08W.js";import"./addCartIcon-Bo9DjT4J.js";import"./firebase-8-SqUyFW.js";function g(e){return["coffee","tea","dessert"].includes(e)}const{isLoggedIn:y}=L(),s=document.querySelector("#cards"),l=Array.from(document.querySelectorAll(".tab-category")),n=document.querySelector("#refresh");if(!(s instanceof HTMLDivElement)||!(n instanceof HTMLButtonElement)||l.length===0)throw new Error("No cards elements found");let h=[],r="coffee";const a=()=>window.innerWidth<=768;let f=a()?4:8;async function w(){const{data:e,error:i}=await v("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");if(i||!e){s&&(s.innerHTML='<div class="error"></div> <h3>Something went wrong</h3>'),n?.classList.add("hidden");return}h=e?.data??[],d(r)}function d(e){if(!s)return;s.innerHTML="";const i=h.filter(t=>t.category===e),c=i.slice(0,f);c.forEach(t=>{const o=document.createElement("div");o.classList.add("card"),o.innerHTML=`
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
         <div class="price-container">
${y()&&t.discountPrice?`
          <h3 class="price">$${t.discountPrice}</h3>
          <h3 class="price__old">$${t.price}</h3>
`:`
          <h3 class="price">$${t.price}</h3>
`}
        </div>
      </div>
      </div>
    `,s.append(o),o.addEventListener("click",()=>{p(t.id)})});function m(){n&&(i.length>c.length?n.classList.remove("hidden"):n.classList.add("hidden"))}m()}l.forEach(e=>{e.addEventListener("click",()=>{l.forEach(c=>c.classList.remove("active")),e.classList.add("active"),f=a()?4:8;const i=e.dataset.tab;!i||!g(i)||(r=i,d(r))})});n?.addEventListener("click",()=>{f+=4,d(r)});let u=a();window.addEventListener("resize",()=>{const e=a();e!==u&&(d(r),u=e)});w();
//# sourceMappingURL=cards-BLP81F_x.js.map
