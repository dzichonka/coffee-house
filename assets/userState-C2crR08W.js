const t={token:null};function i(){function o(e){t.token=e,e?sessionStorage.setItem("token",e):sessionStorage.removeItem("token")}function n(){return t.token||sessionStorage.getItem("token")}function s(){return!!n()}function r(){t.token=null,sessionStorage.removeItem("token")}return{getToken:n,setToken:o,isLoggedIn:s,clearToken:r}}export{i as u};
//# sourceMappingURL=userState-C2crR08W.js.map
