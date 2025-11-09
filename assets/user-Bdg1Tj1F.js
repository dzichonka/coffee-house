import{a,d as e,c as n,h as r}from"./firebase-CxVZMhw8.js";async function u(){const s=a.currentUser;if(!s)return null;const t=e(n,"users",s.uid),o=await r(t);return o.exists()?o.data():(console.log("No such document!"),null)}export{u as l};
//# sourceMappingURL=user-Bdg1Tj1F.js.map
