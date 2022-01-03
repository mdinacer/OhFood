"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[672],{91252:function(t,e,n){n.d(e,{Z:function(){return c}});var i=n(29439),r=n(4567),o=n(11703),a=n(52791),s=n(72791),l=n(80184);function c(t){var e=t.metaData,n=t.onPageChange,c=e.currentPage,d=e.totalCount,u=e.totalPages,h=e.pageSize,x=(0,s.useState)(c),f=(0,i.Z)(x,2),p=f[0],m=f[1];return(0,l.jsxs)(a.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",sx:{flexDirection:{xs:"column",md:"row"},my:3},children:[(0,l.jsxs)(r.Z,{variant:"body2",gutterBottom:!0,children:["Showing ",(c-1)*h+1," to ",c*h>d?d:c*h," of ",d," items"]}),e&&e.totalPages>1&&(0,l.jsx)(o.Z,{sx:{flexWrap:"nowrap",mb:{xs:7,md:1},mt:{xs:2,md:0}},color:"primary",size:"medium",count:u,page:p,defaultPage:1,siblingCount:1,onChange:function(t,e){return function(t){m(t),n(t)}(e)}})]})}},73687:function(t,e,n){n.d(e,{Z:function(){return a}});var i=n(36474),r=n(72791),o=n(14230);function a(){var t=(0,i.CG)(o.pV.selectAll),e=(0,i.CG)((function(t){return t.order})),n=e.ordersLoaded,a=e.metaData,s=(0,i.TL)();return(0,r.useEffect)((function(){n||s((0,o.X6)())}),[s,n]),{orders:t,ordersLoaded:n,metaData:a}}},13672:function(t,e,n){n.r(e),n.d(e,{default:function(){return N}});var i=n(11413),r=n(4708),o=n(68870),a=n(10266),s=n(4567),l=n(4841),c=n(81153),d=n(22099),u=n(29439),h=n(53767),x=n(94721),f=n(76090),p=n(43236),m=n(52411),v=n(72791),Z=n(30260),g=n(36474),j=n(73687),w=n(68181),y=n(91252),b=n(14230),S=n(92675),C=n(29834),E=n(95549),P=n(40747),A=n(79384),z=n(94446),I=n(80184);function D(t){var e=t.isAdmin,n=(0,g.TL)(),i=(0,v.useState)(!1),r=(0,u.Z)(i,2),d=(r[0],r[1]),D=(0,v.useState)(0),L=(0,u.Z)(D,2),R=(L[0],L[1]),M=(0,j.Z)(),T=M.orders,N=M.ordersLoaded,W=M.metaData,k=((0,g.CG)((function(t){return t.order})).orderParams,(0,v.useState)({id:null})),B=(0,u.Z)(k,2),V=B[0],H=B[1];var O=function(t){return H({id:V.id===t?null:t})};return N?(0,I.jsxs)(o.Z,{sx:{overflow:"auto",py:3},children:[(0,I.jsx)(s.Z,{variant:"h5",component:"h2",gutterBottom:!0,children:"Orders"}),(0,I.jsxs)(c.ZP,{container:!0,spacing:3,children:[T.map((function(t){return(0,I.jsx)(c.ZP,{item:!0,xs:12,children:(0,I.jsx)(l.Z,{sx:{py:3,height:"100%"},children:(0,I.jsx)(a.Z,{sx:{display:"flex",flexDirection:e?"row":"column"},children:(0,I.jsxs)(c.ZP,{container:!0,spacing:1,children:[(0,I.jsx)(c.ZP,{item:!0,md:3,xs:12,children:(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(s.Z,{variant:"caption",children:"Date"}),(0,I.jsx)(s.Z,{variant:"body1",children:(0,w.Z)(new Date(t.orderDate),"dd/MM/yy HH:mm")})]})}),(0,I.jsx)(c.ZP,{item:!0,md:5,xs:12,children:(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(s.Z,{variant:"caption",children:"Address"}),(0,I.jsxs)(s.Z,{variant:"body1",children:[t.shippingAddress.address1," - ",t.shippingAddress.city]})]})}),(0,I.jsxs)(c.ZP,{item:!0,md:2,xs:6,children:[(0,I.jsx)(s.Z,{variant:"caption",children:"Status"}),(0,I.jsx)(s.Z,{variant:"body1",children:t.status})]}),(0,I.jsxs)(c.ZP,{item:!0,md:2,xs:6,display:"flex",justifyContent:"flex-end",flexDirection:"column",children:[(0,I.jsx)(s.Z,{variant:"caption",textAlign:"right",children:"Total"}),(0,I.jsx)(s.Z,{textAlign:"right",variant:"body1",children:(0,S.O)(t.subtotal,"$")})]}),(0,I.jsxs)(c.ZP,{item:!0,xs:12,children:[(0,I.jsx)(x.Z,{}),e?(0,I.jsxs)(h.Z,{sx:{mt:1},direction:"row",justifyContent:"space-evenly",flexWrap:"wrap",children:[(0,I.jsx)(z.Z,{size:"small",color:"inherit",onClick:function(){return O(t.id)},startIcon:V.id!==t.id?(0,I.jsx)(C.Z,{fontSize:"large",color:"primary"}):(0,I.jsx)(E.Z,{fontSize:"large",color:"inherit"}),children:"View"}),(0,I.jsx)(z.Z,{size:"small",color:"success",startIcon:(0,I.jsx)(P.Z,{}),children:"Confirm"}),"Pending"===t.status&&(0,I.jsx)(z.Z,{size:"small",startIcon:(0,I.jsx)(A.Z,{}),color:"error",children:"Cancel"})]}):(0,I.jsxs)(h.Z,{sx:{mt:1,justifyContent:{xs:"space-evenly",md:"space-between"}},direction:"row",children:[(0,I.jsx)(z.Z,{color:"inherit",startIcon:V.id!==t.id?(0,I.jsx)(C.Z,{fontSize:"large",color:"primary"}):(0,I.jsx)(E.Z,{fontSize:"large",color:"inherit"}),onClick:function(){return O(t.id)},children:"View Items"}),"Pending"===t.status&&(0,I.jsx)(z.Z,{onClick:function(){return e=t.id,i="Cancelled",d(!0),R(e),void Z.Z.Orders.updateStatus(e,i).then((function(t){console.log(t),n((0,b.Cs)({id:e,changes:{status:i}}))})).catch((function(t){return console.log(t)})).finally((function(){return d(!1)}));var e,i},startIcon:(0,I.jsx)(A.Z,{}),color:"error",children:"Cancel"})]})]}),(0,I.jsx)(c.ZP,{item:!0,xs:12,children:(0,I.jsxs)(f.Z,{in:V.id===t.id,children:[(0,I.jsx)(x.Z,{}),(0,I.jsx)(p.Z,{dense:!0,sx:{my:1},children:t.items.map((function(t){return(0,I.jsx)(m.ZP,{children:(0,I.jsxs)(c.ZP,{container:!0,children:[(0,I.jsx)(c.ZP,{item:!0,xs:8,children:(0,I.jsx)(s.Z,{variant:"body1",children:t.name})}),(0,I.jsxs)(c.ZP,{item:!0,xs:2,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",children:[(0,I.jsx)(s.Z,{variant:"body2",children:"x "}),(0,I.jsx)(s.Z,{variant:"body1",children:t.quantity})]}),(0,I.jsx)(c.ZP,{item:!0,xs:2,children:(0,I.jsx)(s.Z,{variant:"body1",textAlign:"right",children:(0,S.O)(t.price*t.quantity,"$")})})]})},t.productId)}))})]})})]})})})})})),(0,I.jsx)(c.ZP,{item:!0,xs:12,children:W&&(0,I.jsx)(y.Z,{metaData:W,onPageChange:function(t){return n((0,b.oW)({pageNumber:t}))}})})]})]}):(0,I.jsx)("div",{children:"Loading Orders"})}var L=n(5849),R=(0,n(74223).Z)((0,I.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");function M(){var t=(0,v.useState)(null),e=(0,u.Z)(t,2),n=e[0],i=e[1],r=(0,v.useState)(!1),l=(0,u.Z)(r,2),c=l[0],d=l[1];return(0,v.useEffect)((function(){d(!0),n||Z.Z.Account.fetchAddress().then((function(t){i(t)})).catch((function(t){return console.log(t)})).finally((function(){d(!1),console.log("finished loading address")}))}),[n]),c&&!n?(0,I.jsx)(s.Z,{children:"Loading default Shipping Address"}):c||n?(0,I.jsx)(o.Z,{children:n&&(0,I.jsxs)(a.Z,{children:[(0,I.jsx)(s.Z,{variant:"h5",component:"h2",gutterBottom:!0,children:"Delivery Address"}),(0,I.jsx)(s.Z,{variant:"caption",children:"Name"}),(0,I.jsx)(s.Z,{variant:"subtitle1",gutterBottom:!0,children:n.fullName}),(0,I.jsx)(s.Z,{variant:"caption",children:"Address"}),(0,I.jsxs)(s.Z,{variant:"body2",children:[n.address1," - ",n.city]}),(0,I.jsx)(L.Z,{size:"small",color:"inherit",variant:"text",startIcon:(0,I.jsx)(R,{}),children:"Edit"})]})}):(0,I.jsx)(s.Z,{children:"Shipping address not set"})}function T(){var t=(0,g.CG)((function(t){return t.account})).user;return(0,I.jsx)(o.Z,{children:t&&(0,I.jsxs)(a.Z,{children:[(0,I.jsx)(s.Z,{variant:"h5",component:"h2",gutterBottom:!0,children:"User Info"}),(0,I.jsx)(s.Z,{variant:"caption",children:"Username"}),(0,I.jsx)(s.Z,{variant:"subtitle1",children:t.username}),(0,I.jsx)(s.Z,{variant:"caption",children:"Email"}),(0,I.jsx)(s.Z,{variant:"subtitle1",children:t.email})]})})}function N(){return(0,I.jsxs)(i.Z,{theme:d.ib,children:[(0,I.jsx)(r.ZP,{}),(0,I.jsx)(o.Z,{sx:{height:"100%",width:"100%",backgroundColor:"#EEEEEE",color:"black"},children:(0,I.jsxs)(a.Z,{sx:{py:{md:5,xs:2},pt:{md:10,xs:2}},children:[(0,I.jsx)(s.Z,{variant:"h4",component:"h1",gutterBottom:!0,children:"Profile"}),(0,I.jsx)(l.Z,{sx:{py:2},children:(0,I.jsx)(a.Z,{children:(0,I.jsxs)(c.ZP,{container:!0,spacing:1,rowGap:1,children:[(0,I.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,I.jsx)(T,{})}),(0,I.jsx)(c.ZP,{item:!0,xs:12,md:6,children:(0,I.jsx)(M,{})})]})})}),(0,I.jsx)(D,{isAdmin:!1})]})})]})}},95549:function(t,e,n){var i=n(74223),r=n(80184);e.Z=(0,i.Z)((0,r.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"}),"ExpandLessOutlined")},29834:function(t,e,n){var i=n(74223),r=n(80184);e.Z=(0,i.Z)((0,r.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"}),"ExpandMoreOutlined")},76090:function(t,e,n){var i=n(4942),r=n(63366),o=n(87462),a=n(72791),s=n(28182),l=(n(52007),n(18875)),c=n(90767),d=n(47630),u=n(31402),h=n(81314),x=n(4999),f=n(13967),p=n(42071),m=n(98751),v=n(80184),Z=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],g=(0,d.ZP)("div",{name:"MuiCollapse",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,e[n.orientation],"entered"===n.state&&e.entered,"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&e.hidden]}})((function(t){var e=t.theme,n=t.ownerState;return(0,o.Z)({height:0,overflow:"hidden",transition:e.transitions.create("height")},"horizontal"===n.orientation&&{height:"auto",width:0,transition:e.transitions.create("width")},"entered"===n.state&&(0,o.Z)({height:"auto",overflow:"visible"},"horizontal"===n.orientation&&{width:"auto"}),"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&{visibility:"hidden"})})),j=(0,d.ZP)("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:function(t,e){return e.wrapper}})((function(t){var e=t.ownerState;return(0,o.Z)({display:"flex",width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"})})),w=(0,d.ZP)("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:function(t,e){return e.wrapperInner}})((function(t){var e=t.ownerState;return(0,o.Z)({width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"})})),y=a.forwardRef((function(t,e){var n=(0,u.Z)({props:t,name:"MuiCollapse"}),d=n.addEndListener,y=n.children,b=n.className,S=n.collapsedSize,C=void 0===S?"0px":S,E=n.component,P=n.easing,A=n.in,z=n.onEnter,I=n.onEntered,D=n.onEntering,L=n.onExit,R=n.onExited,M=n.onExiting,T=n.orientation,N=void 0===T?"vertical":T,W=n.style,k=n.timeout,B=void 0===k?h.x9.standard:k,V=n.TransitionComponent,H=void 0===V?l.ZP:V,O=(0,r.Z)(n,Z),_=(0,o.Z)({},n,{orientation:N,collapsedSize:C}),G=function(t){var e=t.orientation,n=t.classes,i={root:["root","".concat(e)],entered:["entered"],hidden:["hidden"],wrapper:["wrapper","".concat(e)],wrapperInner:["wrapperInner","".concat(e)]};return(0,c.Z)(i,m.d,n)}(_),q=(0,f.Z)(),F=a.useRef(),U=a.useRef(null),X=a.useRef(),$="number"===typeof C?"".concat(C,"px"):C,Y="horizontal"===N,J=Y?"width":"height";a.useEffect((function(){return function(){clearTimeout(F.current)}}),[]);var K=a.useRef(null),Q=(0,p.Z)(e,K),tt=function(t){return function(e){if(t){var n=K.current;void 0===e?t(n):t(n,e)}}},et=function(){return U.current?U.current[Y?"clientWidth":"clientHeight"]:0},nt=tt((function(t,e){U.current&&Y&&(U.current.style.position="absolute"),t.style[J]=$,z&&z(t,e)})),it=tt((function(t,e){var n=et();U.current&&Y&&(U.current.style.position="");var i=(0,x.C)({style:W,timeout:B,easing:P},{mode:"enter"}),r=i.duration,o=i.easing;if("auto"===B){var a=q.transitions.getAutoHeightDuration(n);t.style.transitionDuration="".concat(a,"ms"),X.current=a}else t.style.transitionDuration="string"===typeof r?r:"".concat(r,"ms");t.style[J]="".concat(n,"px"),t.style.transitionTimingFunction=o,D&&D(t,e)})),rt=tt((function(t,e){t.style[J]="auto",I&&I(t,e)})),ot=tt((function(t){t.style[J]="".concat(et(),"px"),L&&L(t)})),at=tt(R),st=tt((function(t){var e=et(),n=(0,x.C)({style:W,timeout:B,easing:P},{mode:"exit"}),i=n.duration,r=n.easing;if("auto"===B){var o=q.transitions.getAutoHeightDuration(e);t.style.transitionDuration="".concat(o,"ms"),X.current=o}else t.style.transitionDuration="string"===typeof i?i:"".concat(i,"ms");t.style[J]=$,t.style.transitionTimingFunction=r,M&&M(t)}));return(0,v.jsx)(H,(0,o.Z)({in:A,onEnter:nt,onEntered:rt,onEntering:it,onExit:ot,onExited:at,onExiting:st,addEndListener:function(t){"auto"===B&&(F.current=setTimeout(t,X.current||0)),d&&d(K.current,t)},nodeRef:K,timeout:"auto"===B?null:B},O,{children:function(t,e){return(0,v.jsx)(g,(0,o.Z)({as:E,className:(0,s.Z)(G.root,b,{entered:G.entered,exited:!A&&"0px"===$&&G.hidden}[t]),style:(0,o.Z)((0,i.Z)({},Y?"minWidth":"minHeight",$),W),ownerState:(0,o.Z)({},_,{state:t}),ref:Q},e,{children:(0,v.jsx)(j,{ownerState:(0,o.Z)({},_,{state:t}),className:G.wrapper,ref:U,children:(0,v.jsx)(w,{ownerState:(0,o.Z)({},_,{state:t}),className:G.wrapperInner,children:y})})}))}}))}));y.muiSupportAuto=!0,e.Z=y},98751:function(t,e,n){n.d(e,{d:function(){return r}});var i=n(95159);function r(t){return(0,i.Z)("MuiCollapse",t)}var o=(0,n(30208).Z)("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);e.Z=o},94721:function(t,e,n){var i=n(63366),r=n(87462),o=n(72791),a=(n(52007),n(28182)),s=n(90767),l=n(12065),c=n(47630),d=n(31402),u=n(90133),h=n(80184),x=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],f=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,n.absolute&&e.absolute,e[n.variant],n.light&&e.light,"vertical"===n.orientation&&e.vertical,n.flexItem&&e.flexItem,n.children&&e.withChildren,n.children&&"vertical"===n.orientation&&e.withChildrenVertical,"right"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignRight,"left"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignLeft]}})((function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:e.palette.divider,borderBottomWidth:"thin"},n.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},n.light&&{borderColor:(0,l.Fq)(e.palette.divider,.08)},"inset"===n.variant&&{marginLeft:72},"middle"===n.variant&&"horizontal"===n.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===n.variant&&"vertical"===n.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===n.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},n.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({},n.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat(e.palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({},n.children&&"vertical"===n.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat(e.palette.divider),transform:"translateX(0%)"}})}),(function(t){var e=t.ownerState;return(0,r.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),p=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(t,e){var n=t.ownerState;return[e.wrapper,"vertical"===n.orientation&&e.wrapperVertical]}})((function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({display:"inline-block",paddingLeft:"calc(".concat(e.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(e.spacing(1)," * 1.2)")},"vertical"===n.orientation&&{paddingTop:"calc(".concat(e.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(e.spacing(1)," * 1.2)")})})),m=o.forwardRef((function(t,e){var n=(0,d.Z)({props:t,name:"MuiDivider"}),o=n.absolute,l=void 0!==o&&o,c=n.children,m=n.className,v=n.component,Z=void 0===v?c?"div":"hr":v,g=n.flexItem,j=void 0!==g&&g,w=n.light,y=void 0!==w&&w,b=n.orientation,S=void 0===b?"horizontal":b,C=n.role,E=void 0===C?"hr"!==Z?"separator":void 0:C,P=n.textAlign,A=void 0===P?"center":P,z=n.variant,I=void 0===z?"fullWidth":z,D=(0,i.Z)(n,x),L=(0,r.Z)({},n,{absolute:l,component:Z,flexItem:j,light:y,orientation:S,role:E,textAlign:A,variant:I}),R=function(t){var e=t.absolute,n=t.children,i=t.classes,r=t.flexItem,o=t.light,a=t.orientation,l=t.textAlign,c={root:["root",e&&"absolute",t.variant,o&&"light","vertical"===a&&"vertical",r&&"flexItem",n&&"withChildren",n&&"vertical"===a&&"withChildrenVertical","right"===l&&"vertical"!==a&&"textAlignRight","left"===l&&"vertical"!==a&&"textAlignLeft"],wrapper:["wrapper","vertical"===a&&"wrapperVertical"]};return(0,s.Z)(c,u.V,i)}(L);return(0,h.jsx)(f,(0,r.Z)({as:Z,className:(0,a.Z)(R.root,m),role:E,ref:e,ownerState:L},D,{children:c?(0,h.jsx)(p,{className:R.wrapper,ownerState:L,children:c}):null}))}));e.Z=m},90861:function(t,e,n){var i=n(87462),r=n(72791),o=(n(52007),n(68023)),a=n(29598),s=n(20919),l=n(80184);e.Z=function(t){var e=t.children,n=t.theme,c=(0,a.Z)(),d=r.useMemo((function(){var t=null===c?n:function(t,e){return"function"===typeof e?e(t):(0,i.Z)({},t,e)}(c,n);return null!=t&&(t[s.Z]=null!==c),t}),[n,c]);return(0,l.jsx)(o.Z.Provider,{value:d,children:e})}},20919:function(t,e){var n="function"===typeof Symbol&&Symbol.for;e.Z=n?Symbol.for("mui.nested"):"__THEME_NESTED__"},11413:function(t,e,n){n(72791),n(52007);var i=n(90861),r=n(38489),o=n(30418),a=n(80184);function s(t){var e=(0,o.Z)();return(0,a.jsx)(r.T.Provider,{value:"object"===typeof e?e:{},children:t.children})}e.Z=function(t){var e=t.children,n=t.theme;return(0,a.jsx)(i.Z,{theme:n,children:(0,a.jsx)(s,{children:e})})}}}]);
//# sourceMappingURL=672.9823ac6a.chunk.js.map