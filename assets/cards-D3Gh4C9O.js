import{displayModal as h}from"./modal-DhJ1xupO.js";import{f as v}from"./fetcher-IzjmCLXP.js";import{u as g}from"./userState-BenL3nAi.js";function L(i){return["coffee","tea","dessert"].includes(i)}const{isLoggedIn:y}=g(),s=document.querySelector(".cards"),u=Array.from(document.querySelectorAll(".tab-category")),o=document.querySelector("#refresh");let r="coffee";const a=()=>window.innerWidth<=768,{data:$,error:b}=await v("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");b&&s&&(s.innerHTML="<p>Failed to load products.</p>");const f=$?.data??[];console.log("Products loaded:",f);let l=a()?4:8;function d(i){if(!s)return;s.innerHTML="";const t=f.filter(e=>e.category===i),c=t.slice(0,l);c.forEach(e=>{const n=document.createElement("div");n.classList.add("card"),n.innerHTML=`
      <div class="image-container">
        <img
          src="images/menu/${e.id}.png"
          alt="${e.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${e.name}</h3>
          <p>${e.description}</p>
        </div>
         <div class="price-container">
${y()&&e.discountPrice?`
          <h3 class="price">$${e.discountPrice}</h3>
          <h3 class="price__old">$${e.price}</h3>
`:`
          <h3 class="price">$${e.price}</h3>
`}
        </div>
      </div>
      </div>
    `,s.append(n),n.addEventListener("click",()=>{h(e.id)})});function m(){o&&(t.length>c.length?o.classList.remove("hidden"):o.classList.add("hidden"))}m()}u.forEach(i=>{i.addEventListener("click",()=>{u.forEach(c=>c.classList.remove("active")),i.classList.add("active"),l=a()?4:8;const t=i.dataset.tab;!t||!L(t)||(r=t,d(r))})});o?.addEventListener("click",()=>{l+=4,d(r)});let p=a();window.addEventListener("resize",()=>{const i=a();i!==p&&(d(r),p=i)});d(r);
//# sourceMappingURL=cards-D3Gh4C9O.js.map
