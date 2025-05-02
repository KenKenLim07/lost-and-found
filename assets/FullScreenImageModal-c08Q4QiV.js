import{j as l,A as C,m as x}from"./motion-vendor-__j0KQe5.js";import{r as s}from"./react-vendor-CLmuL3fg.js";import{f as v}from"./index-RbukiteK.js";import"./supabase-vendor-D0Ix_FYp.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),D=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,a)=>a?a.toUpperCase():o.toLowerCase()),y=e=>{const t=D(e);return t.charAt(0).toUpperCase()+t.slice(1)},k=(...e)=>e.filter((t,o,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===o).join(" ").trim(),E=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var M={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=s.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:d="",children:c,iconNode:u,...i},m)=>s.createElement("svg",{ref:m,...M,width:t,height:t,stroke:e,strokeWidth:a?Number(o)*24/Number(t):o,className:k("lucide",d),...!c&&!E(i)&&{"aria-hidden":"true"},...i},[...u.map(([g,p])=>s.createElement(g,p)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(e,t)=>{const o=s.forwardRef(({className:a,...d},c)=>s.createElement(S,{ref:c,iconNode:t,className:k(`lucide-${j(y(e))}`,`lucide-${e}`,a),...d}));return o.displayName=y(e),o};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],N=A("x",L);function Y({imageUrl:e,onClose:t}){const[o,a]=s.useState(1),[d,c]=s.useState(!1),u=s.useRef(null),i=s.useRef(null),m=()=>{if(!u.current||!i.current)return{top:0,bottom:0,left:0,right:0};const n=u.current,r=i.current,f=n.offsetWidth*o,w=n.offsetHeight*o,h=Math.max(0,(f-r.offsetWidth)/2),b=Math.max(0,(w-r.offsetHeight)/2);return{top:-b,bottom:b,left:-h,right:h}};s.useEffect(()=>{const n=r=>{r.key==="Escape"&&t()};return e&&(document.body.style.overflow="hidden"),window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n),document.body.style.overflow=""}},[e,t]);const g=(n,r)=>{o===1&&Math.abs(r.offset.y)>100&&t(),c(!1)},p=()=>{c(!0)};return l.jsx(C,{children:e&&l.jsx(x.div,{variants:v,initial:"hidden",animate:"visible",exit:"exit",className:"fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-hidden","aria-modal":"true",role:"dialog",ref:i,children:l.jsxs(x.div,{variants:v,className:"relative w-full max-w-4xl mx-4",children:[l.jsx(x.img,{ref:u,src:e,alt:"Zoomed item",className:"w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none touch-none",drag:o===1?"y":!0,dragConstraints:o===1?{top:0,bottom:0}:m,dragElastic:.7,onDragEnd:g,onDragStart:p,whileDrag:{scale:d&&o===1?.95:o},transition:{type:"spring",stiffness:300,damping:30},style:{scale:o,cursor:o>1?"grab":"default"},onWheel:n=>{if(n.ctrlKey){n.preventDefault();const r=Math.min(Math.max(o-n.deltaY*.01,1),3);a(r)}},onTouchStart:n=>{n.touches.length===2&&n.preventDefault()},onTouchMove:n=>{if(n.touches.length===2){n.preventDefault();const r=n.touches[0],f=n.touches[1],w=Math.hypot(f.clientX-r.clientX,f.clientY-r.clientY),h=Math.min(Math.max(w/200,1),3);a(h)}}}),l.jsx("button",{onClick:t,"aria-label":"Close full screen image",className:"absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white",children:l.jsx(N,{className:"w-6 h-6"})})]})})})}export{Y as default};
