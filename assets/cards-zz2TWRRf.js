import{displayModal as m}from"./modal-BoH5XalJ.js";import{f as h}from"./fetcher-IzjmCLXP.js";import{u as v}from"./userState-BenL3nAi.js";import"./addCartIcon-y838yzLs.js";function L(i){return["coffee","tea","dessert"].includes(i)}const{isLoggedIn:g}=v(),s=document.querySelector(".cards"),p=Array.from(document.querySelectorAll(".tab-category")),o=document.querySelector("#refresh");let r="coffee";const a=()=>window.innerWidth<=768,{data:y,error:$}=await h("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products","#loader");$&&s&&(s.innerHTML="<p>Failed to load products.</p>");const b=y?.data??[];let l=a()?4:8;function d(i){if(!s)return;s.innerHTML="";const t=b.filter(e=>e.category===i),c=t.slice(0,l);c.forEach(e=>{const n=document.createElement("div");n.classList.add("card"),n.innerHTML=`
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
${g()&&e.discountPrice?`
          <h3 class="price">$${e.discountPrice}</h3>
          <h3 class="price__old">$${e.price}</h3>
`:`
          <h3 class="price">$${e.price}</h3>
`}
        </div>
      </div>
      </div>
    `,s.append(n),n.addEventListener("click",()=>{m(e.id)})});function f(){o&&(t.length>c.length?o.classList.remove("hidden"):o.classList.add("hidden"))}f()}p.forEach(i=>{i.addEventListener("click",()=>{p.forEach(c=>c.classList.remove("active")),i.classList.add("active"),l=a()?4:8;const t=i.dataset.tab;!t||!L(t)||(r=t,d(r))})});o?.addEventListener("click",()=>{l+=4,d(r)});let u=a();window.addEventListener("resize",()=>{const i=a();i!==u&&(d(r),u=i)});d(r);
//# sourceMappingURL=cards-zz2TWRRf.js.map
