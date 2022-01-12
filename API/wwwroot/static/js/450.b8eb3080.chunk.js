"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[450],{91252:function(e,t,n){n.d(t,{Z:function(){return l}});var i=n(29439),r=n(4567),a=n(11703),o=n(52791),s=n(72791),c=n(80184);function l(e){var t=e.metaData,n=e.onPageChange,l=t.currentPage,u=t.totalCount,d=t.totalPages,x=t.pageSize,h=(0,s.useState)(l),p=(0,i.Z)(h,2),f=p[0],m=p[1];return(0,c.jsxs)(o.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",sx:{flexDirection:{xs:"column",md:"row"},my:3},children:[(0,c.jsxs)(r.Z,{variant:"body2",gutterBottom:!0,children:["Showing ",(l-1)*x+1," to ",l*x>u?u:l*x," of ",u," items"]}),t&&t.totalPages>1&&(0,c.jsx)(a.Z,{sx:{flexWrap:"nowrap",mb:{xs:7,md:1},mt:{xs:2,md:0}},color:"primary",size:"medium",count:d,page:f,defaultPage:1,siblingCount:1,onChange:function(e,t){return function(e){m(e),n(e)}(t)}})]})}},98450:function(e,t,n){n.r(t),n.d(t,{default:function(){return K}});var i=n(93433),r=n(1413),a=n(29439),o=n(68870),s=n(10266),c=n(4567),l=n(76090),u=n(81153),d=n(90977),x=n(88654),h=n(5849),p=n(72791),f=n(66620),m=n(60990);var v=n(48129),Z=n(88588),g=n(1867),j=n(22492),y=n(77234),w=n(74223),C=n(80184),b=(0,w.Z)((0,C.jsx)("path",{d:"M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"}),"AspectRatio"),z=n(1040),D=n(94446),S=n(32068),E=n(43504),H=n(92675);function k(e){var t=e.product,n=(0,f.CG)((function(e){return e.basket})).status,i=(0,f.TL)();return(0,C.jsxs)(Z.Z,{sx:{maxHeight:"350px",height:"100%",display:"flex",flexDirection:"column",pt:1},children:[(0,C.jsx)(g.Z,{sx:{flex:"0 1 140px",objectFit:"contain"},component:"img",height:"140",image:t.pictureUrl,alt:t.name}),(0,C.jsxs)(j.Z,{sx:{flex:"1 1 auto",display:"flex",flexDirection:"column",py:1},children:[(0,C.jsx)(c.Z,{variant:"caption",color:"text.secondary",sx:{flex:"0 1 auto"},children:t.category}),(0,C.jsx)(c.Z,{gutterBottom:!0,variant:"subtitle1",sx:{flex:"1 1 auto"},children:t.name}),(0,C.jsx)(c.Z,{variant:"body1",color:"text.secondary",sx:{flex:"0 1 auto"},children:(0,H.O)(t.price,"$")})]}),(0,C.jsxs)(y.Z,{sx:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-evenly",flex:"0 1 auto",py:0,pb:1},children:[(0,C.jsx)(h.Z,{component:E.rU,to:"/menu/".concat(t.id),size:"small",children:(0,C.jsx)(b,{sx:{color:"white"}})}),(0,C.jsx)(D.Z,{size:"small",loading:n.includes("pendingAddItem"+t.id),onClick:function(){return i((0,S.JW)({productId:t.id}))},children:(0,C.jsx)(z.Z,{})})]})]})}var P=n(91252),L=n(85239);function I(){return(0,C.jsxs)(Z.Z,{sx:{maxHeight:"350px",height:"100%",display:"flex",flexDirection:"column",pt:2},children:[(0,C.jsx)(L.Z,{animation:"wave",sx:{flex:"0 1 140px"},variant:"rectangular",width:"100%",height:140}),(0,C.jsxs)(j.Z,{sx:{flex:"1 1 auto",display:"flex",flexDirection:"column"},children:[(0,C.jsx)(L.Z,{animation:"wave",sx:{flex:"0 1 auto"}}),(0,C.jsx)(L.Z,{animation:"wave",sx:{flex:"1 1 auto"}}),(0,C.jsx)(L.Z,{animation:"wave",sx:{flex:"0 1 auto"}})]}),(0,C.jsxs)(y.Z,{sx:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-evenly",flex:"0 1 auto"},children:[(0,C.jsx)(L.Z,{width:"100%",animation:"wave"}),(0,C.jsx)(L.Z,{width:"100%",animation:"wave"})]})]})}function V(e){var t=e.products,n=e.metaData,i=e.itemView,r=(0,f.CG)((function(e){return e.catalog})).productsLoaded,a=(0,f.TL)();return(0,C.jsxs)(o.Z,{sx:{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"},children:[(0,C.jsx)(u.ZP,{container:!0,spacing:2,sx:{height:"100% !important"},children:t.map((function(e){return(0,C.jsx)(u.ZP,{item:!0,xs:i,md:4,lg:3,children:r?(0,C.jsx)(k,{product:e}):(0,C.jsx)(I,{})},e.id)}))}),(0,C.jsx)(o.Z,{sx:{my:2},width:"100%",children:n&&(0,C.jsx)(P.Z,{metaData:n,onPageChange:function(e){return a((0,m.oW)({pageNumber:e}))}})})]})}var T=(0,w.Z)((0,C.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu"),M=(0,w.Z)((0,C.jsx)("path",{d:"M19 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0-10H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"ViewAgenda"),R=(0,w.Z)((0,C.jsx)("path",{fillRule:"evenodd",d:"M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"}),"GridView"),A=(0,w.Z)((0,C.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search"),W=n(43236),N=n(19795),X=n(76278),G=n(49900),_=[{value:"name",label:"Alphabetical"},{value:"priceDesc",label:"Price: Descending"},{value:"price",label:"Price: Ascending"}];function F(e){var t=e.categories,n=e.handleCategoryChanged,i=e.handleSortChanged,o=e.selectedCategoryId,l=void 0===o?0:o,u=(0,p.useState)({type:l,sort:"name"}),d=(0,a.Z)(u,2),x=d[0],h=d[1];return(0,C.jsxs)(s.Z,{className:"filters-list",children:[(0,C.jsxs)(W.Z,{dense:!0,subheader:(0,C.jsx)("li",{}),children:[(0,C.jsx)(N.Z,{children:(0,C.jsx)(c.Z,{variant:"subtitle1",children:"Categories"})}),t.map((function(e){return(0,C.jsx)(X.Z,{selected:x.type===e.id,onClick:function(){return t=e.id,n(t),void h((0,r.Z)((0,r.Z)({},x),{},{type:t}));var t},children:(0,C.jsx)(G.Z,{primary:(0,C.jsx)(c.Z,{variant:"subtitle2",children:e.name})})},e.id)}))]}),(0,C.jsxs)(W.Z,{dense:!0,subheader:(0,C.jsx)("li",{}),children:[(0,C.jsx)(N.Z,{children:(0,C.jsx)(c.Z,{variant:"subtitle1",children:"Sort"})}),_.map((function(e){return(0,C.jsx)(X.Z,{selected:x.sort===e.value,onClick:function(){return t=e.value,i(t),void h((0,r.Z)((0,r.Z)({},x),{},{sort:t}));var t},children:(0,C.jsx)(G.Z,{primary:e.label})},e.value)}))]})]})}var U=n(83199),B=n(40139),$=n(96739);function J(){var e=(0,f.TL)(),t=(0,f.CG)((function(e){return e.catalog})).productParams,n=(0,p.useState)(t.searchTerm),i=(0,a.Z)(n,2),r=i[0],o=i[1],c=(0,U.Z)((function(t){e((0,m.X3)({searchTerm:t.target.value}))}),1e3);return(0,C.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgba(183,183,183,0.1)",borderRadius:2,maxWidth:"400px"},children:[(0,C.jsx)(B.ZP,{value:r||"",sx:{ml:1,flex:1},placeholder:"Find an item",inputProps:{"aria-label":"recherche"},onChange:function(e){o(e.target.value),c(e)}}),(0,C.jsx)(d.Z,{type:"submit",sx:{p:"10px"},"aria-label":"search",onClick:function(){return e((0,m.X3)({searchTerm:r}))},children:(0,C.jsx)(A,{})}),(0,C.jsx)(d.Z,{type:"submit",sx:{p:"10px"},"aria-label":"search",onClick:function(){o(void 0),e((0,m.X3)({searchTerm:null}))},children:(0,C.jsx)($.Z,{})})]})}var O=n(16871),q={name:"All",id:0,pictureUrl:"/images/backgrounds/product_details_bg.webp"};function K(){var e=(0,f.TL)(),t=(0,O.TH)().state,n=function(){var e=(0,f.CG)(m.g0.selectAll),t=(0,f.CG)((function(e){return e.catalog})),n=t.productsLoaded,i=t.categoriesLoaded,r=t.categories,a=t.metaData,o=(0,f.TL)();return(0,p.useEffect)((function(){n||o((0,m.$$)())}),[o,n]),(0,p.useEffect)((function(){i||o((0,m.uw)())}),[o,i]),{products:e,productsLoaded:n,categoriesLoaded:i,categories:r,metaData:a}}(),Z=n.products,g=n.categories,j=n.categoriesLoaded,y=n.metaData,w=(0,p.useState)([]),b=(0,a.Z)(w,2),z=b[0],D=b[1],S=(0,p.useState)(null),E=(0,a.Z)(S,2),H=E[0],k=E[1],P=(0,p.useState)(6),L=(0,a.Z)(P,2),I=L[0],W=L[1],N=(0,p.useState)({searchCollapse:!1,filtersDrawer:!1}),X=(0,a.Z)(N,2),G=X[0],_=X[1],U=function(e){return _((0,r.Z)((0,r.Z)({},G),{},{filtersDrawer:e}))};function B(t){var n=g.find((function(e){return e.id===t}));n?(k(n),K(),e((0,m.X3)({type:n.id>0?n.id:null}))):e((0,m.X3)({type:null}))}function $(t){e((0,m.X3)({orderBy:t})),K()}function K(){G.filtersDrawer&&U(!1)}(0,p.useEffect)((function(){if(j){var e=[q].concat((0,i.Z)(g));D(e),k(q)}}),[g,j]),(0,p.useEffect)((function(){if(j&&t&&t.categoryId){var n=g.find((function(e){return e.id===parseInt(t.categoryId)}));n&&(e((0,m.X3)({type:n.id})),k(n))}}),[g,j,e,t]);var Q=function(){return(0,C.jsx)(J,{})},Y=function(){return(0,C.jsx)(F,{categories:z,handleCategoryChanged:B,handleSortChanged:$,selectedCategoryId:null===H||void 0===H?void 0:H.id})};return!j||!j&&t&&t.categoryId?(0,C.jsx)(v.Z,{fullScreen:!0,message:"Loading menu data"}):(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)(o.Z,{className:"menu",sx:{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url(".concat(H&&H.pictureUrl?H.pictureUrl:"/images/backgrounds/product_details_bg.webp",");"),pt:{md:10,xs:3},pb:{md:2,xs:7}},children:[(0,C.jsxs)(s.Z,{sx:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,C.jsxs)(o.Z,{sx:{flex:"0 1 auto"},children:[(0,C.jsx)(c.Z,{variant:"h4",component:"h1",children:"Menu"}),(0,C.jsx)(o.Z,{sx:{pb:3,width:"400px",ml:"auto",mr:3,display:{xs:"none",md:"block"}},children:Q()}),(0,C.jsx)(l.Z,{in:G.searchCollapse,children:Q()})]}),(0,C.jsxs)(u.ZP,{container:!0,sx:{height:"100%",flex:"1 1 auto"},children:[(0,C.jsx)(u.ZP,{item:!0,md:3,sx:{display:{xs:"none",md:"block"}},children:Y()}),(0,C.jsx)(u.ZP,{item:!0,xs:12,sx:{display:{xs:"block",md:"none"},py:3},children:(0,C.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[(0,C.jsx)(d.Z,{onClick:function(){return U(!0)},children:(0,C.jsx)(T,{})}),(0,C.jsx)(d.Z,{disabled:12===I,onClick:function(){return W(12)},children:(0,C.jsx)(M,{})}),(0,C.jsx)(d.Z,{disabled:6===I,onClick:function(){return W(6)},children:(0,C.jsx)(R,{})}),(0,C.jsx)(d.Z,{onClick:function(){return function(e){return _((0,r.Z)((0,r.Z)({},G),{},{searchCollapse:e}))}(!G.searchCollapse)},children:(0,C.jsx)(A,{})})]})}),(0,C.jsx)(u.ZP,{item:!0,xs:12,md:9,children:(0,C.jsx)(o.Z,{sx:{height:"100%"},children:(0,C.jsx)(V,{itemView:I,products:Z,metaData:y})})})]})]}),(0,C.jsx)(x.ZP,{anchor:"left",open:G.filtersDrawer,onClose:function(){return U(!1)},children:(0,C.jsxs)(o.Z,{display:"flex",flexDirection:"column",justifyContent:"space-between",sx:{my:3,height:"100%"},children:[Y(),(0,C.jsx)(h.Z,{onClick:function(){return U(!1)},variant:"text",children:"Close"})]})})]})})}},1040:function(e,t,n){var i=n(74223),r=n(80184);t.Z=(0,i.Z)((0,r.jsx)("path",{d:"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"}),"AddShoppingCart")},76090:function(e,t,n){var i=n(4942),r=n(63366),a=n(87462),o=n(72791),s=n(28182),c=(n(52007),n(18875)),l=n(90767),u=n(47630),d=n(31402),x=n(81314),h=n(4999),p=n(13967),f=n(42071),m=n(98751),v=n(80184),Z=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],g=(0,u.ZP)("div",{name:"MuiCollapse",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.orientation],"entered"===n.state&&t.entered,"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&t.hidden]}})((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({height:0,overflow:"hidden",transition:t.transitions.create("height")},"horizontal"===n.orientation&&{height:"auto",width:0,transition:t.transitions.create("width")},"entered"===n.state&&(0,a.Z)({height:"auto",overflow:"visible"},"horizontal"===n.orientation&&{width:"auto"}),"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&{visibility:"hidden"})})),j=(0,u.ZP)("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:function(e,t){return t.wrapper}})((function(e){var t=e.ownerState;return(0,a.Z)({display:"flex",width:"100%"},"horizontal"===t.orientation&&{width:"auto",height:"100%"})})),y=(0,u.ZP)("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:function(e,t){return t.wrapperInner}})((function(e){var t=e.ownerState;return(0,a.Z)({width:"100%"},"horizontal"===t.orientation&&{width:"auto",height:"100%"})})),w=o.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiCollapse"}),u=n.addEndListener,w=n.children,C=n.className,b=n.collapsedSize,z=void 0===b?"0px":b,D=n.component,S=n.easing,E=n.in,H=n.onEnter,k=n.onEntered,P=n.onEntering,L=n.onExit,I=n.onExited,V=n.onExiting,T=n.orientation,M=void 0===T?"vertical":T,R=n.style,A=n.timeout,W=void 0===A?x.x9.standard:A,N=n.TransitionComponent,X=void 0===N?c.ZP:N,G=(0,r.Z)(n,Z),_=(0,a.Z)({},n,{orientation:M,collapsedSize:z}),F=function(e){var t=e.orientation,n=e.classes,i={root:["root","".concat(t)],entered:["entered"],hidden:["hidden"],wrapper:["wrapper","".concat(t)],wrapperInner:["wrapperInner","".concat(t)]};return(0,l.Z)(i,m.d,n)}(_),U=(0,p.Z)(),B=o.useRef(),$=o.useRef(null),J=o.useRef(),O="number"===typeof z?"".concat(z,"px"):z,q="horizontal"===M,K=q?"width":"height";o.useEffect((function(){return function(){clearTimeout(B.current)}}),[]);var Q=o.useRef(null),Y=(0,f.Z)(t,Q),ee=function(e){return function(t){if(e){var n=Q.current;void 0===t?e(n):e(n,t)}}},te=function(){return $.current?$.current[q?"clientWidth":"clientHeight"]:0},ne=ee((function(e,t){$.current&&q&&($.current.style.position="absolute"),e.style[K]=O,H&&H(e,t)})),ie=ee((function(e,t){var n=te();$.current&&q&&($.current.style.position="");var i=(0,h.C)({style:R,timeout:W,easing:S},{mode:"enter"}),r=i.duration,a=i.easing;if("auto"===W){var o=U.transitions.getAutoHeightDuration(n);e.style.transitionDuration="".concat(o,"ms"),J.current=o}else e.style.transitionDuration="string"===typeof r?r:"".concat(r,"ms");e.style[K]="".concat(n,"px"),e.style.transitionTimingFunction=a,P&&P(e,t)})),re=ee((function(e,t){e.style[K]="auto",k&&k(e,t)})),ae=ee((function(e){e.style[K]="".concat(te(),"px"),L&&L(e)})),oe=ee(I),se=ee((function(e){var t=te(),n=(0,h.C)({style:R,timeout:W,easing:S},{mode:"exit"}),i=n.duration,r=n.easing;if("auto"===W){var a=U.transitions.getAutoHeightDuration(t);e.style.transitionDuration="".concat(a,"ms"),J.current=a}else e.style.transitionDuration="string"===typeof i?i:"".concat(i,"ms");e.style[K]=O,e.style.transitionTimingFunction=r,V&&V(e)}));return(0,v.jsx)(X,(0,a.Z)({in:E,onEnter:ne,onEntered:re,onEntering:ie,onExit:ae,onExited:oe,onExiting:se,addEndListener:function(e){"auto"===W&&(B.current=setTimeout(e,J.current||0)),u&&u(Q.current,e)},nodeRef:Q,timeout:"auto"===W?null:W},G,{children:function(e,t){return(0,v.jsx)(g,(0,a.Z)({as:D,className:(0,s.Z)(F.root,C,{entered:F.entered,exited:!E&&"0px"===O&&F.hidden}[e]),style:(0,a.Z)((0,i.Z)({},q?"minWidth":"minHeight",O),R),ownerState:(0,a.Z)({},_,{state:e}),ref:Y},t,{children:(0,v.jsx)(j,{ownerState:(0,a.Z)({},_,{state:e}),className:F.wrapper,ref:$,children:(0,v.jsx)(y,{ownerState:(0,a.Z)({},_,{state:e}),className:F.wrapperInner,children:w})})}))}}))}));w.muiSupportAuto=!0,t.Z=w},98751:function(e,t,n){n.d(t,{d:function(){return r}});var i=n(95159);function r(e){return(0,i.Z)("MuiCollapse",e)}var a=(0,n(30208).Z)("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);t.Z=a}}]);
//# sourceMappingURL=450.b8eb3080.chunk.js.map