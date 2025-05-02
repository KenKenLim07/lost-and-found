import{j as n,A as x,m as c}from"./motion-vendor-__j0KQe5.js";import{r as s}from"./react-vendor-CLmuL3fg.js";import{f as d}from"./index-BjFw_ngq.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),m=t=>{const e=g(t);return e.charAt(0).toUpperCase()+e.slice(1)},u=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),v=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:i="",children:a,iconNode:f,...l},h)=>s.createElement("svg",{ref:h,...k,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:u("lucide",i),...!a&&!v(l)&&{"aria-hidden":"true"},...l},[...f.map(([w,p])=>s.createElement(w,p)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(t,e)=>{const r=s.forwardRef(({className:o,...i},a)=>s.createElement(y,{ref:a,iconNode:e,className:u(`lucide-${b(m(t))}`,`lucide-${t}`,o),...i}));return r.displayName=m(t),r};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],E=C("x",j);function B({imageUrl:t,onClose:e}){const r=o=>{o.target===o.currentTarget&&e()};return s.useEffect(()=>{const o=i=>{i.key==="Escape"&&e()};return document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",window.addEventListener("keydown",o),()=>{window.removeEventListener("keydown",o),document.body.style.overflow="",document.documentElement.style.overflow=""}},[e]),n.jsx(x,{children:t&&n.jsx(c.div,{variants:d,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",onClick:r,children:n.jsxs(c.div,{variants:d,className:"relative w-full max-w-4xl mx-4",children:[n.jsx("img",{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg"}),n.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white sm:top-2 sm:right-2",children:n.jsx(E,{className:"w-6 h-6"})})]})})})}export{B as default};
