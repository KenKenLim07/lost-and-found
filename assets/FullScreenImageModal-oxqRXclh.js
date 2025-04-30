import{j as s,A as x,m as c}from"./motion-vendor-__j0KQe5.js";import{r as n}from"./react-vendor-CLmuL3fg.js";import{f as d}from"./index-B46tz_N9.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase()),m=t=>{const e=g(t);return e.charAt(0).toUpperCase()+e.slice(1)},u=(...t)=>t.filter((e,r,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===r).join(" ").trim(),k=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=n.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:i="",children:o,iconNode:f,...l},h)=>n.createElement("svg",{ref:h,...v,width:e,height:e,stroke:t,strokeWidth:a?Number(r)*24/Number(e):r,className:u("lucide",i),...!o&&!k(l)&&{"aria-hidden":"true"},...l},[...f.map(([w,p])=>n.createElement(w,p)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(t,e)=>{const r=n.forwardRef(({className:a,...i},o)=>n.createElement(C,{ref:o,iconNode:e,className:u(`lucide-${b(m(t))}`,`lucide-${t}`,a),...i}));return r.displayName=m(t),r};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],A=j("x",y);function I({imageUrl:t,onClose:e}){return n.useEffect(()=>{const r=a=>{a.key==="Escape"&&e()};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e]),s.jsx(x,{children:t&&s.jsx(c.div,{variants:d,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:s.jsxs(c.div,{variants:d,className:"relative w-full max-w-4xl mx-4",children:[s.jsx("img",{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg"}),s.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:s.jsx(A,{className:"w-6 h-6"})})]})})})}export{I as default};
