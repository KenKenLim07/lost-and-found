import{j as n,A as p,m as c}from"./motion-vendor-__j0KQe5.js";import{r as a}from"./react-vendor-CLmuL3fg.js";import{f as d}from"./index-D7QDYClD.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),u=t=>{const e=x(t);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),g=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:l="",children:s,iconNode:f,...i},w)=>a.createElement("svg",{ref:w,...v,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:m("lucide",l),...!s&&!g(i)&&{"aria-hidden":"true"},...i},[...f.map(([y,b])=>a.createElement(y,b)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(t,e)=>{const r=a.forwardRef(({className:o,...l},s)=>a.createElement(k,{ref:s,iconNode:e,className:m(`lucide-${h(u(t))}`,`lucide-${t}`,o),...l}));return r.displayName=u(t),r};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],A=C("x",j);function $({imageUrl:t,onClose:e}){return a.useEffect(()=>{const r=o=>{o.key==="Escape"&&e()};if(t){const o=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${o}px`,document.body.style.left="0",document.body.style.right="0",document.body.style.overflow="hidden",document.body.dataset.scrollY=o}return window.addEventListener("keydown",r),()=>{const o=document.body.dataset.scrollY||"0";document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.right="",document.body.style.overflow="",window.scrollTo(0,parseInt(o)),window.removeEventListener("keydown",r)}},[t,e]),n.jsx(p,{children:t&&n.jsx(c.div,{variants:d,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:n.jsxs(c.div,{variants:d,className:"relative w-full max-w-4xl mx-4",children:[n.jsx("img",{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg"}),n.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:n.jsx(A,{className:"w-6 h-6"})})]})})})}export{$ as default};
