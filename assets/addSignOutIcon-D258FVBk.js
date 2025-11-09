import{o,a as r}from"./firebase-CxVZMhw8.js";import{l as i}from"./auth-DGodpPl6.js";import{u as s}from"./userState-Ciub17Fa.js";const{clearToken:a}=s();function l(){const e=document.querySelector("#nav-right");e&&o(r,n=>{if(n){const t=document.createElement("button");t.classList.add("btn-icon"),t.type="button",t.id="sign-out",t.innerHTML=`
<i class="fa-solid fa-right-from-bracket"></i>
      `,t.addEventListener("click",()=>{i(),a(),window.location.href="index"}),e.append(t)}else document.querySelector("#sign-out")?.remove()})}export{l as addSignOutIcon};
//# sourceMappingURL=addSignOutIcon-D258FVBk.js.map
