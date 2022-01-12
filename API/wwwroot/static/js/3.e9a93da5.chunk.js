"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[3],{3:function(t,e,i){i.r(e),i.d(e,{default:function(){return L}});var n=i(29439),r=i(68870),o=i(81153),a=i(10266),l=i(53767),c=i(4567),s=i(5849),d=i(16871),h=i(66620),x=i(60990),u=i(72791),p=i(48129),v=i(4841),m=i(94721),g=i(43504),f=i(80184);function j(){return(0,f.jsxs)(a.Z,{component:v.Z,sx:{height:400},children:[(0,f.jsx)(c.Z,{gutterBottom:!0,variant:"h3",children:"Oops - we could not find what you are looking for"}),(0,f.jsx)(m.Z,{}),(0,f.jsx)(s.Z,{fullWidth:!0,component:g.rU,to:"/catalog",children:"Go back to shop"})]})}var Z=i(74223),b=(0,Z.Z)((0,f.jsx)("path",{d:"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft"),w=(0,Z.Z)((0,f.jsx)("path",{d:"M1.41 1.13 0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.41-1.41L1.41 1.13zM7 15l1.1-2h2.36l2 2H7zM20 4H7.12l2 2h9.19l-2.76 5h-1.44l1.94 1.94c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"}),"RemoveShoppingCartOutlined"),y=(0,Z.Z)((0,f.jsx)("path",{d:"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"}),"AddShoppingCartOutlined"),C=(0,Z.Z)((0,f.jsx)("path",{d:"M22.73 22.73 2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"}),"RemoveShoppingCart"),I=i(1040),S=i(51365),z=i(32068),k=i(94446),A=i(92675);function L(){var t=(0,d.UO)().id,e=(0,h.CG)((function(t){return t.basket})),i=e.basket,v=e.status,m=(0,h.TL)(),g=(0,h.CG)((function(e){return t?x.g0.selectById(e,parseInt(t)):null})),Z=(0,h.CG)((function(t){return t.catalog})).status,L=(0,u.useState)(1),M=(0,n.Z)(L,2),R=M[0],B=M[1],q=null===i||void 0===i?void 0:i.items.find((function(t){return t.productId===(null===g||void 0===g?void 0:g.id)}));(0,u.useEffect)((function(){q&&B(q.quantity),t&&!g&&m((0,x.vO)(parseInt(t)))}),[t,q,m,g]);var H=function(){B(R+1)},P=function(){R>1&&B(R-1)};function V(){if(!q||R>q.quantity){var t=q?R-q.quantity:R;m((0,z.JW)({productId:null===g||void 0===g?void 0:g.id,quantity:t}))}else{var e=q.quantity-R;m((0,z.di)({productId:null===g||void 0===g?void 0:g.id,quantity:e}))}}function T(){m((0,z.di)({productId:null===g||void 0===g?void 0:g.id,quantity:q.quantity})),B(1)}return Z.includes("pending")?(0,f.jsx)(p.Z,{fullScreen:!0,message:"Loading product..."}):g?(0,f.jsxs)(r.Z,{sx:{width:"100%",minHeight:"100vh",display:"flex",backgroundImage:{md:"linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url('/images/backgrounds/product_details_bg.webp')",xs:"none"},backgroundColor:"#000",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"top",px:{xs:0,md:7},alignItems:{xs:"stretch",md:"center"}},justifyContent:"center",children:[(0,f.jsx)(r.Z,{sx:{root:{bgcolor:"#000"},bgcolor:{xs:"#000",md:"rgba(0,0,0,.7)"},borderRadius:{xs:0,md:3},height:"100%",maxWidth:"900px"},children:(0,f.jsxs)(o.ZP,{container:!0,children:[(0,f.jsx)(o.ZP,{item:!0,xs:12,md:6,sx:{py:{xs:0,md:2},px:{xs:3,md:3},display:"flex",alignItems:"center",justifyContent:"center"},children:(0,f.jsx)(r.Z,{sx:{position:"relative",height:{xs:"200px",md:"300px"},width:{xs:"200px",md:"300px"},overflow:"hidden",my:{md:3,xs:2}},children:(0,f.jsx)(r.Z,{sx:{objectFit:"contain",objectPosition:"center",height:"100%",width:"100%",zIndex:"3"},component:"img",src:null===g||void 0===g?void 0:g.pictureUrl,alt:g.name})})}),(0,f.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,f.jsxs)(r.Z,{component:a.Z,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",sx:{py:{md:3,xs:0}},children:[(0,f.jsxs)(l.Z,{sx:{alignItems:{xs:"flex-end",md:"flex-start"},width:"100%",flex:"0 1 auto"},direction:"column",children:[(0,f.jsx)(c.Z,{sx:{textTransform:"uppercase"},variant:"caption",children:g.category}),(0,f.jsx)(c.Z,{color:"primary",variant:"h6",gutterBottom:!0,children:g.name})]}),(0,f.jsx)(c.Z,{gutterBottom:!0,sx:{textAlign:{md:"left",xs:"right"},flex:"1 1 auto"},variant:"body2",children:g.description}),(0,f.jsxs)(l.Z,{component:a.Z,sx:{width:"100%",my:1,justifyContent:{xs:"space-between",md:"space-around"},flex:"0 1 auto"},direction:"row",children:[(0,f.jsxs)(l.Z,{children:[(0,f.jsx)(c.Z,{sx:{textTransform:"uppercase"},variant:"caption",children:"Quantity"}),(0,f.jsx)(S.Z,{minValue:1,isRow:!0,quantity:R,increase:H,decrease:P,loading:v.includes("pending")})]}),(0,f.jsxs)(l.Z,{children:[(0,f.jsx)(c.Z,{sx:{textTransform:"uppercase"},textAlign:"right",variant:"caption",children:R>1?"Total Price":"Unit Price"}),(0,f.jsx)(c.Z,{textAlign:"center",color:"inherit",variant:"h5",gutterBottom:!0,children:(0,A.O)(g.price*R,"$")})]})]}),(0,f.jsxs)(l.Z,{sx:{width:"100%",my:1,flex:"0 1 auto"},direction:"row",justifyContent:"space-between",children:[(0,f.jsx)(s.Z,{href:"/menu",color:"inherit",startIcon:(0,f.jsx)(b,{}),children:"Back"}),q&&(0,f.jsx)(k.Z,{disableElevation:!0,sx:{ml:"auto",mr:1},loading:v.includes("pending"),color:"error",variant:"text",onClick:T,children:(0,f.jsx)(w,{})}),(0,f.jsx)(k.Z,{disabled:(null===q||void 0===q?void 0:q.quantity)===R,loading:v.includes("pending"),onClick:V,disableElevation:!0,color:"primary",size:"small",variant:"text",children:(0,f.jsx)(y,{})})]}),(0,f.jsx)(a.Z,{})]})})]})}),(0,f.jsx)(r.Z,{hidden:!0,children:(0,f.jsxs)(o.ZP,{container:!0,children:[(0,f.jsx)(o.ZP,{item:!0,xs:12,md:6,sx:{overflow:"hidden",py:{xs:2,md:"auto"}},children:(0,f.jsx)(r.Z,{sx:{height:"100%"},display:"flex",alignItems:"center",justifyContent:"center",children:(0,f.jsx)(r.Z,{sx:{objectFit:"cover",objectPosition:"center",height:"300px"},component:"img",src:null===g||void 0===g?void 0:g.pictureUrl,alt:g.name})})}),(0,f.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,f.jsxs)(a.Z,{color:"inherit",sx:{pb:2},children:[(0,f.jsx)(c.Z,{variant:"h4",gutterBottom:!0,children:g.name}),(0,f.jsx)(c.Z,{variant:"body2",gutterBottom:!0,children:g.description}),(0,f.jsx)(c.Z,{sx:{textTransform:"uppercase"},variant:"caption",children:"Ingredients:"}),(0,f.jsx)(c.Z,{variant:"body2",gutterBottom:!0,children:g.ingredients||"French Fries - Cheese - Minced Meat - Salad"}),(0,f.jsxs)(r.Z,{display:"flex",alignItems:"center",justifyContent:"space-around",sx:{py:3},children:[(0,f.jsx)(c.Z,{textAlign:"center",variant:"h5",children:(0,A.O)(g.price*R,"$")}),(0,f.jsx)(S.Z,{minValue:1,isRow:!0,quantity:R,increase:H,decrease:P,loading:v.includes("pending")})]}),(0,f.jsxs)(l.Z,{direction:"row",justifyContent:"space-between",children:[(0,f.jsx)(s.Z,{href:"/menu",color:"inherit",startIcon:(0,f.jsx)(b,{}),children:"Back"}),q&&(0,f.jsx)(k.Z,{disableElevation:!0,sx:{ml:"auto",mr:1},loading:v.includes("pending"),color:"error",variant:"outlined",onClick:T,children:(0,f.jsx)(C,{})}),(0,f.jsx)(k.Z,{disabled:(null===q||void 0===q?void 0:q.quantity)===R,loading:v.includes("pending"),onClick:V,disableElevation:!0,color:"primary",size:"small",variant:"contained",sx:{color:"white"},children:(0,f.jsx)(I.Z,{})})]})]})})]})})]}):(0,f.jsx)(j,{})}},1040:function(t,e,i){var n=i(74223),r=i(80184);e.Z=(0,n.Z)((0,r.jsx)("path",{d:"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"}),"AddShoppingCart")},94721:function(t,e,i){var n=i(63366),r=i(87462),o=i(72791),a=(i(52007),i(28182)),l=i(90767),c=i(12065),s=i(47630),d=i(31402),h=i(90133),x=i(80184),u=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],p=(0,s.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(t,e){var i=t.ownerState;return[e.root,i.absolute&&e.absolute,e[i.variant],i.light&&e.light,"vertical"===i.orientation&&e.vertical,i.flexItem&&e.flexItem,i.children&&e.withChildren,i.children&&"vertical"===i.orientation&&e.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&e.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&e.textAlignLeft]}})((function(t){var e=t.theme,i=t.ownerState;return(0,r.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:e.palette.divider,borderBottomWidth:"thin"},i.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},i.light&&{borderColor:(0,c.Fq)(e.palette.divider,.08)},"inset"===i.variant&&{marginLeft:72},"middle"===i.variant&&"horizontal"===i.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===i.variant&&"vertical"===i.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===i.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},i.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(t){var e=t.theme,i=t.ownerState;return(0,r.Z)({},i.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat(e.palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(t){var e=t.theme,i=t.ownerState;return(0,r.Z)({},i.children&&"vertical"===i.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat(e.palette.divider),transform:"translateX(0%)"}})}),(function(t){var e=t.ownerState;return(0,r.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),v=(0,s.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(t,e){var i=t.ownerState;return[e.wrapper,"vertical"===i.orientation&&e.wrapperVertical]}})((function(t){var e=t.theme,i=t.ownerState;return(0,r.Z)({display:"inline-block",paddingLeft:"calc(".concat(e.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(e.spacing(1)," * 1.2)")},"vertical"===i.orientation&&{paddingTop:"calc(".concat(e.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(e.spacing(1)," * 1.2)")})})),m=o.forwardRef((function(t,e){var i=(0,d.Z)({props:t,name:"MuiDivider"}),o=i.absolute,c=void 0!==o&&o,s=i.children,m=i.className,g=i.component,f=void 0===g?s?"div":"hr":g,j=i.flexItem,Z=void 0!==j&&j,b=i.light,w=void 0!==b&&b,y=i.orientation,C=void 0===y?"horizontal":y,I=i.role,S=void 0===I?"hr"!==f?"separator":void 0:I,z=i.textAlign,k=void 0===z?"center":z,A=i.variant,L=void 0===A?"fullWidth":A,M=(0,n.Z)(i,u),R=(0,r.Z)({},i,{absolute:c,component:f,flexItem:Z,light:w,orientation:C,role:S,textAlign:k,variant:L}),B=function(t){var e=t.absolute,i=t.children,n=t.classes,r=t.flexItem,o=t.light,a=t.orientation,c=t.textAlign,s={root:["root",e&&"absolute",t.variant,o&&"light","vertical"===a&&"vertical",r&&"flexItem",i&&"withChildren",i&&"vertical"===a&&"withChildrenVertical","right"===c&&"vertical"!==a&&"textAlignRight","left"===c&&"vertical"!==a&&"textAlignLeft"],wrapper:["wrapper","vertical"===a&&"wrapperVertical"]};return(0,l.Z)(s,h.V,n)}(R);return(0,x.jsx)(p,(0,r.Z)({as:f,className:(0,a.Z)(B.root,m),role:S,ref:e,ownerState:R},M,{children:s?(0,x.jsx)(v,{className:B.wrapper,ownerState:R,children:s}):null}))}));e.Z=m}}]);
//# sourceMappingURL=3.e9a93da5.chunk.js.map