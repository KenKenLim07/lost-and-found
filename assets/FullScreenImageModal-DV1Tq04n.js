import{j as c,A as b,m as f}from"./motion-vendor-__j0KQe5.js";import{r as i}from"./react-vendor-CLmuL3fg.js";import{f as m}from"./index-DTREBmy9.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,n)=>n?n.toUpperCase():o.toLowerCase()),g=t=>{const e=y(t);return e.charAt(0).toUpperCase()+e.slice(1)},p=(...t)=>t.filter((e,o,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===o).join(" ").trim(),k=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:n,className:l="",children:s,iconNode:h,...u},a)=>i.createElement("svg",{ref:a,...C,width:e,height:e,stroke:t,strokeWidth:n?Number(o)*24/Number(e):o,className:p("lucide",l),...!s&&!k(u)&&{"aria-hidden":"true"},...u},[...h.map(([r,d])=>i.createElement(r,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(t,e)=>{const o=i.forwardRef(({className:n,...l},s)=>i.createElement(j,{ref:s,iconNode:e,className:p(`lucide-${v(g(t))}`,`lucide-${t}`,n),...l}));return o.displayName=g(t),o};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],S=E("x",D);function I({imageUrl:t,onClose:e}){const[o,n]=i.useState(1),[l,s]=i.useState(!1);i.useEffect(()=>{const a=r=>{r.key==="Escape"&&e()};return t&&(document.body.style.overflow="hidden"),window.addEventListener("keydown",a),()=>{window.removeEventListener("keydown",a),document.body.style.overflow=""}},[t,e]);const h=(a,r)=>{o===1&&Math.abs(r.offset.y)>100&&e(),s(!1)},u=()=>{s(!0)};return c.jsx(b,{children:t&&c.jsx(f.div,{variants:m,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm","aria-modal":"true",role:"dialog",children:c.jsxs(f.div,{variants:m,className:"relative w-full max-w-4xl mx-4",children:[c.jsx(f.img,{src:t,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none touch-none",drag:o===1?"y":!0,dragConstraints:o===1?{top:0,bottom:0}:void 0,dragElastic:.7,onDragEnd:h,onDragStart:u,whileDrag:{scale:l&&o===1?.95:o},transition:{type:"spring",stiffness:300,damping:30},style:{scale:o,cursor:o>1?"grab":"default"},onWheel:a=>{if(a.ctrlKey){a.preventDefault();const r=Math.min(Math.max(o-a.deltaY*.01,1),3);n(r)}},onTouchStart:a=>{a.touches.length===2&&a.preventDefault()},onTouchMove:a=>{if(a.touches.length===2){a.preventDefault();const r=a.touches[0],d=a.touches[1],w=Math.hypot(d.clientX-r.clientX,d.clientY-r.clientY),x=Math.min(Math.max(w/200,1),3);n(x)}}}),c.jsx("button",{onClick:e,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:c.jsx(S,{className:"w-6 h-6"})})]})})})}export{I as default};
