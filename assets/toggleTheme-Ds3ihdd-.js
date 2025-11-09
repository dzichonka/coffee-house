const t=document.querySelector("#theme"),e="theme";localStorage.getItem(e)==="light"&&document.body.classList.add("light");function o(){t&&(document.body.classList.toggle("light"),localStorage.setItem(e,document.body.classList.contains("light")?"light":"dark"))}t?.addEventListener("click",o);
//# sourceMappingURL=toggleTheme-Ds3ihdd-.js.map
