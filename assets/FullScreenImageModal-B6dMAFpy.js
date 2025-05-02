import{j as n,A as w,m as l}from"./motion-vendor-__j0KQe5.js";import{r as i}from"./react-vendor-CLmuL3fg.js";import{f as d}from"./index-BQ74bw_N.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),m=t=>{const e=x(t);return e.charAt(0).toUpperCase()+e.slice(1)},u=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),y=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:a="",children:s,iconNode:f,...c},h)=>i.createElement("svg",{ref:h,...v,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:u("lucide",a),...!s&&!y(c)&&{"aria-hidden":"true"},...c},[...f.map(([p,g])=>i.createElement(p,g)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(t,e)=>{const r=i.forwardRef(({className:o,...a},s)=>i.createElement(k,{ref:s,iconNode:e,className:u(`lucide-${b(m(t))}`,`lucide-${t}`,o),...a}));return r.displayName=m(t),r};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],j=C("x",E);function $({imageUrl:t,onClose:e}){i.useEffect(()=>{const o=a=>{a.key==="Escape"&&e()};return t&&(document.body.style.overflow="hidden"),window.addEventListener("keydown",o),()=>{window.removeEventListener("keydown",o),document.body.style.overflow=""}},[t,e]);const r=(o,a)=>{Math.abs(a.offset.y)>100&&e()};return n.jsx(w,{children:t&&n.jsx(l.div,{variants:d,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:n.jsxs(l.div,{variants:d,className:"relative w-full max-w-4xl mx-4",drag:"y",dragConstraints:{top:0,bottom:0},dragElastic:.7,onDragEnd:r,whileDrag:{scale:.95},transition:{type:"spring",stiffness:300,damping:30},children:[n.jsx(l.img,{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none",drag:"y",dragConstraints:{top:0,bottom:0},dragElastic:.7,onDragEnd:r,whileDrag:{scale:.95},transition:{type:"spring",stiffness:300,damping:30}}),n.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:n.jsx(j,{className:"w-6 h-6"})})]})})})}export{$ as default};
