import{u as b,j as n,A as p,m as c}from"./motion-vendor-Bh6Ps0D2.js";import{r as i}from"./react-vendor-CLmuL3fg.js";import{f as y}from"./index-WYF15Azn.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,a)=>a?a.toUpperCase():o.toLowerCase()),u=t=>{const e=g(t);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...t)=>t.filter((e,o,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===o).join(" ").trim(),v=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:s="",children:r,iconNode:d,...l},f)=>i.createElement("svg",{ref:f,...k,width:e,height:e,stroke:t,strokeWidth:a?Number(o)*24/Number(e):o,className:m("lucide",s),...!r&&!v(l)&&{"aria-hidden":"true"},...l},[...d.map(([h,w])=>i.createElement(h,w)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(t,e)=>{const o=i.forwardRef(({className:a,...s},r)=>i.createElement(j,{ref:r,iconNode:e,className:m(`lucide-${x(u(t))}`,`lucide-${t}`,a),...s}));return o.displayName=u(t),o};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],A=C("x",E);function D({imageUrl:t,onClose:e}){const o=b();i.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[t]),i.useEffect(()=>{const s=r=>{r.key==="Escape"&&e()};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e]);const a=async(s,r)=>{const l=r.velocity.y;Math.abs(r.offset.y)>100||Math.abs(l)>500?(await o.start({y:r.offset.y>0?"100%":"-100%",opacity:0}),e()):o.start({y:0,opacity:1})};return n.jsx(p,{children:t&&n.jsx(c.div,{variants:y,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:n.jsxs(c.div,{drag:"y",dragConstraints:{top:0,bottom:0},dragElastic:.7,onDragEnd:a,animate:o,className:"relative w-full max-w-4xl mx-4 cursor-grab active:cursor-grabbing",children:[n.jsx(c.img,{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none",style:{touchAction:"none"}}),n.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:n.jsx(A,{className:"w-6 h-6"})}),n.jsx("div",{className:"absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"})]})})})}export{D as default};
