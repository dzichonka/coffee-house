import{displayModal as h}from"./modal-DhJ1xupO.js";import{f as v}from"./fetcher-IzjmCLXP.js";import{u as g}from"./appState-BenL3nAi.js";function L(i){return["coffee","tea","dessert"].includes(i)}const{isLoggedIn:y}=g(),s=document.querySelector(".cards"),p=Array.from(document.querySelectorAll(".tab-category")),o=document.querySelector("#refresh");let c="coffee";const a=()=>window.innerWidth<=768,{data:$,error:b}=await v("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");b&&s&&(s.innerHTML="<p>Failed to load products.</p>");const f=$?.data??[];console.log("Products loaded:",f);let l=a()?4:8;function d(i){if(!s)return;s.innerHTML="";const t=f.filter(e=>e.category===i),r=t.slice(0,l);r.forEach(e=>{const n=document.createElement("div");n.classList.add("card"),n.innerHTML=`
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
    `,s.append(n),n.addEventListener("click",()=>{h(e.id)})});function m(){o&&(t.length>r.length?o.classList.remove("hidden"):o.classList.add("hidden"))}m()}p.forEach(i=>{i.addEventListener("click",()=>{p.forEach(r=>r.classList.remove("active")),i.classList.add("active"),l=a()?4:8;const t=i.dataset.tab;!t||!L(t)||(c=t,d(c))})});o?.addEventListener("click",()=>{l+=4,d(c)});let u=a();window.addEventListener("resize",()=>{const i=a();i!==u&&(d(c),u=i)});d(c);
//# sourceMappingURL=cards-Dmota9S5.js.map
