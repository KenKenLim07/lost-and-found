import{u as g,a as p,b as x,j as r,A as v,m as u}from"./motion-vendor-CNNKsZeF.js";import{r as i}from"./react-vendor-CLmuL3fg.js";import{f as E}from"./index-DgvAiPGq.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,a)=>a?a.toUpperCase():o.toLowerCase()),w=t=>{const e=A(t);return e.charAt(0).toUpperCase()+e.slice(1)},y=(...t)=>t.filter((e,o,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===o).join(" ").trim(),j=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:l="",children:s,iconNode:m,...d},f)=>i.createElement("svg",{ref:f,...C,width:e,height:e,stroke:t,strokeWidth:a?Number(o)*24/Number(e):o,className:y("lucide",l),...!s&&!j(d)&&{"aria-hidden":"true"},...d},[...m.map(([h,n])=>i.createElement(h,n)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(t,e)=>{const o=i.forwardRef(({className:a,...l},s)=>i.createElement(L,{ref:s,iconNode:e,className:y(`lucide-${k(w(t))}`,`lucide-${t}`,a),...l}));return o.displayName=w(t),o};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],P=D("x",N);function $({imageUrl:t,onClose:e}){const o=g(),[a,l]=i.useState(1),s=p(0),m=x(s,[-300,0,300],[0,1,0]),d=p(0);i.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[t]),i.useEffect(()=>{const n=c=>{c.key==="Escape"&&e()};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]);const f=async(n,c)=>{const b=c.velocity.y;a===1&&(Math.abs(c.offset.y)>100||Math.abs(b)>500)?(await o.start({y:c.offset.y>0?"100%":"-100%",opacity:0}),e()):o.start({y:0,opacity:1})},h=()=>{const n=Date.now();n-d.get()<300&&l(a===1?2:1),d.set(n)};return r.jsx(v,{children:t&&r.jsx(u.div,{variants:E,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:r.jsxs(u.div,{drag:a===1?"y":!1,dragConstraints:{top:0,bottom:0},dragElastic:.7,onDragEnd:f,animate:o,style:{y:s,opacity:m},className:"relative w-full max-w-4xl mx-4",children:[r.jsx(u.div,{className:"relative",animate:{scale:a},transition:{type:"spring",stiffness:300,damping:30},children:r.jsx(u.img,{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none",style:{touchAction:"none"},onTap:h,whileTap:{scale:.95},drag:a>1,dragConstraints:{left:-100,right:100,top:-100,bottom:100},dragElastic:.1,dragMomentum:!1,onPinchStart:()=>{a===1&&l(2)},onPinchEnd:()=>{a>1&&l(1)}})}),r.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:r.jsx(P,{className:"w-6 h-6"})}),a===1&&r.jsx("div",{className:"absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"})]})})})}export{$ as default};
