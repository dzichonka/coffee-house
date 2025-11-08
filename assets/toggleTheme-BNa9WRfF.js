const t=document.querySelector("#theme"),e="theme";localStorage.getItem(e)==="dark"&&document.body.classList.add("dark");function o(){t&&(document.body.classList.toggle("dark"),localStorage.setItem(e,document.body.classList.contains("dark")?"dark":"light"))}t?.addEventListener("click",o);
//# sourceMappingURL=toggleTheme-BNa9WRfF.js.map
