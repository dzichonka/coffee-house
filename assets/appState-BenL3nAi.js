const n={token:null};function r(){function o(e){n.token=e,e?sessionStorage.setItem("token",e):sessionStorage.removeItem("token")}function t(){return n.token||sessionStorage.getItem("token")}function s(){return!!t()}return{getToken:t,setToken:o,isLoggedIn:s}}export{r as u};
//# sourceMappingURL=appState-BenL3nAi.js.map
