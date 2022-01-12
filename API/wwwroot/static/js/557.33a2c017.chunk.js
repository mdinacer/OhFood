"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[557],{18009:function(e,n,i){i.d(n,{Z:function(){return j}});var t=i(1413),r=i(72791),s=i(5849),o=i(5574),a=i(77386),d=i(4899),c=i(31701),l=i(65661),x=i(55931),u=i(80184),h=r.forwardRef((function(e,n){return(0,u.jsx)(x.Z,(0,t.Z)({direction:"up",ref:n},e))}));function j(e){var n=e.open,i=e.title,t=e.body,r=e.okText,x=void 0===r?"Ok":r,j=e.cancelText,Z=void 0===j?"Cancel":j,f=e.onClose;return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(o.Z,{open:n,TransitionComponent:h,keepMounted:!0,onClose:f,"aria-describedby":"alert-dialog-slide-description",children:[(0,u.jsx)(l.Z,{children:i}),(0,u.jsx)(d.Z,{children:(0,u.jsx)(c.Z,{id:"alert-dialog-slide-description",children:t})}),(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(s.Z,{size:"small",variant:"outlined",onClick:function(){return f(!1)},children:Z}),(0,u.jsx)(s.Z,{size:"small",variant:"contained",onClick:function(){return f(!0)},children:x})]})]})})}},91252:function(e,n,i){i.d(n,{Z:function(){return c}});var t=i(29439),r=i(4567),s=i(11703),o=i(52791),a=i(72791),d=i(80184);function c(e){var n=e.metaData,i=e.onPageChange,c=n.currentPage,l=n.totalCount,x=n.totalPages,u=n.pageSize,h=(0,a.useState)(c),j=(0,t.Z)(h,2),Z=j[0],f=j[1];return(0,d.jsxs)(o.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",sx:{flexDirection:{xs:"column",md:"row"},my:3},children:[(0,d.jsxs)(r.Z,{variant:"body2",gutterBottom:!0,children:["Showing ",(c-1)*u+1," to ",c*u>l?l:c*u," of ",l," items"]}),n&&n.totalPages>1&&(0,d.jsx)(s.Z,{sx:{flexWrap:"nowrap",mb:{xs:7,md:1},mt:{xs:2,md:0}},color:"primary",size:"medium",count:x,page:Z,defaultPage:1,siblingCount:1,onChange:function(e,n){return function(e){f(e),i(e)}(n)}})]})}},23557:function(e,n,i){i.r(n),i.d(n,{default:function(){return M}});var t=i(11413),r=i(4708),s=i(68870),o=i(10266),a=i(53767),d=i(4567),c=i(5849),l=i(43504),x=i(437),u=i(29439),h=i(81153),j=i(4841),Z=i(94721),f=i(76090),m=i(43236),p=i(52411),g=i(72791),y=i(30260),v=i(66620),C=i(14230);var b=i(68181),w=i(91252),P=i(92675),z=i(29834),k=i(74223),D=i(80184),S=(0,k.Z)((0,D.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"}),"ExpandLessOutlined"),L=(0,k.Z)((0,D.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6 9.8a.9.9 0 0 1-.1.5l-2.1 4.9a1.34 1.34 0 0 1-1.3.8H9a2 2 0 0 1-2-2v-5a1.28 1.28 0 0 1 .4-1L12 5l.69.69a1.08 1.08 0 0 1 .3.7v.2L12.41 10H17a1 1 0 0 1 1 1z"}),"Recommend"),A=(0,k.Z)((0,D.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12zm8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8z"}),"DoDisturb"),I=i(94446),O=i(18009);function E(e){var n=e.isAdmin,i=(0,v.TL)(),t=(0,g.useState)(!1),r=(0,u.Z)(t,2),c=r[0],l=r[1],x=(0,g.useState)(0),k=(0,u.Z)(x,2),E=k[0],M=k[1],T=function(){var e=(0,v.CG)(C.pV.selectAll),n=(0,v.CG)((function(e){return e.order})),i=n.ordersLoaded,t=n.metaData,r=(0,v.TL)();return(0,g.useEffect)((function(){i||r((0,C.X6)())}),[r,i]),{orders:e,ordersLoaded:i,metaData:t}}(),H=T.orders,V=T.ordersLoaded,W=T.metaData,q=(0,g.useState)({id:null}),B=(0,u.Z)(q,2),G=B[0],R=B[1],$=(0,g.useState)(!1),_=(0,u.Z)($,2),F=_[0],N=_[1],U=(0,g.useState)(null),X=(0,u.Z)(U,2),Y=X[0],J=X[1],K=function(e){J({id:e,action:"Cancelled"}),N(!0)};function Q(e,n){l(!0),M(e),y.Z.Orders.updateStatus(e,n).then((function(t){i((0,C.Cs)({id:e,changes:{status:n}}))})).catch((function(e){return console.log(e)})).finally((function(){return l(!1)}))}var ee=function(e){return R({id:G.id===e?null:e})},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Loading";return(0,D.jsx)(s.Z,{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",children:(0,D.jsx)(d.Z,{variant:"caption",children:e})})};return(0,D.jsxs)(s.Z,{sx:{overflow:"auto",py:3},children:[!V&&ne("Loading Orders"),V&&0===H.length&&ne("Your orders list is empty."),H.length>0&&(0,D.jsxs)(h.ZP,{container:!0,spacing:3,children:[H.map((function(e){var i;return(0,D.jsx)(h.ZP,{item:!0,xs:12,children:(0,D.jsx)(j.Z,{sx:{py:3,height:"100%"},children:(0,D.jsx)(o.Z,{children:(0,D.jsxs)(h.ZP,{container:!0,spacing:1,children:[(0,D.jsx)(h.ZP,{item:!0,md:3,xs:12,children:(0,D.jsxs)(a.Z,{children:[(0,D.jsx)(d.Z,{variant:"caption",children:"Order Date"}),(0,D.jsx)(d.Z,{variant:"body1",children:(0,b.Z)(new Date(e.orderDate),"dd/MM/yy HH:mm")})]})}),(0,D.jsx)(h.ZP,{item:!0,md:5,xs:12,children:(0,D.jsxs)(a.Z,{children:[(0,D.jsx)(d.Z,{variant:"caption",children:"Delivery Address"}),(0,D.jsxs)(d.Z,{variant:"body1",children:[e.shippingAddress.address1," - ",null!==(i=e.shippingAddress.town)&&void 0!==i?i:e.shippingAddress.suburb]})]})}),(0,D.jsxs)(h.ZP,{item:!0,md:2,xs:6,children:[(0,D.jsx)(d.Z,{variant:"caption",children:"Order Status"}),(0,D.jsx)(d.Z,{variant:"body1",children:e.status})]}),(0,D.jsxs)(h.ZP,{item:!0,md:2,xs:6,display:"flex",justifyContent:"flex-end",flexDirection:"column",children:[(0,D.jsx)(d.Z,{variant:"caption",textAlign:"right",children:"Total"}),(0,D.jsx)(d.Z,{textAlign:"right",variant:"body1",children:(0,P.O)(e.subtotal,"$")})]}),(0,D.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,D.jsx)(Z.Z,{}),n?(0,D.jsxs)(a.Z,{sx:{mt:1},direction:"row",justifyContent:"space-evenly",flexWrap:"wrap",children:[(0,D.jsx)(I.Z,{size:"small",color:"inherit",onClick:function(){return ee(e.id)},startIcon:G.id!==e.id?(0,D.jsx)(z.Z,{fontSize:"large",color:"primary"}):(0,D.jsx)(S,{fontSize:"large",color:"inherit"}),children:"View"}),(0,D.jsx)(I.Z,{onClick:function(){return Q(e.id,"Confirmed")},loading:c&&E===e.id,size:"small",color:"success",startIcon:(0,D.jsx)(L,{}),children:"Confirm"}),"Pending"===e.status&&(0,D.jsx)(I.Z,{onClick:function(){return K(e.id)},loading:c&&E===e.id,size:"small",startIcon:(0,D.jsx)(A,{}),color:"error",children:"Cancel"})]}):(0,D.jsxs)(a.Z,{sx:{mt:1,justifyContent:{xs:"space-evenly",md:"space-between"}},direction:"row",children:[(0,D.jsx)(I.Z,{color:"inherit",startIcon:G.id!==e.id?(0,D.jsx)(z.Z,{fontSize:"large",color:"primary"}):(0,D.jsx)(S,{fontSize:"large",color:"inherit"}),onClick:function(){return ee(e.id)},children:"View Items"}),"Pending"===e.status&&(0,D.jsx)(I.Z,{onClick:function(){return K(e.id)},loading:c&&E===e.id,startIcon:(0,D.jsx)(A,{}),color:"error",children:"Cancel"})]})]}),(0,D.jsx)(h.ZP,{item:!0,xs:12,children:(0,D.jsxs)(f.Z,{in:G.id===e.id,children:[(0,D.jsx)(Z.Z,{}),(0,D.jsx)(m.Z,{dense:!0,sx:{my:1},children:e.items.map((function(e){return(0,D.jsx)(p.ZP,{children:(0,D.jsxs)(h.ZP,{container:!0,children:[(0,D.jsx)(h.ZP,{item:!0,xs:8,children:(0,D.jsx)(d.Z,{variant:"body1",children:e.name})}),(0,D.jsxs)(h.ZP,{item:!0,xs:2,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",children:[(0,D.jsx)(d.Z,{variant:"body2",children:"x "}),(0,D.jsx)(d.Z,{variant:"body1",children:e.quantity})]}),(0,D.jsx)(h.ZP,{item:!0,xs:2,children:(0,D.jsx)(d.Z,{variant:"body1",textAlign:"right",children:(0,P.O)(e.price*e.quantity,"$")})})]})},e.productId)}))})]})})]})})})},e.id)})),(0,D.jsx)(h.ZP,{item:!0,xs:12,children:W&&(0,D.jsx)(w.Z,{metaData:W,onPageChange:function(e){return i((0,C.oW)({pageNumber:e}))}})})]}),(0,D.jsx)(O.Z,{open:F,title:"Cancel Order",onClose:function(e){e&&Y&&Q(Y.id,Y.action),N(!1)},body:"Are you sure you want to cancel this order?"})]})}function M(){return(0,D.jsxs)(t.Z,{theme:x.ib,children:[(0,D.jsx)(r.ZP,{}),(0,D.jsx)(s.Z,{sx:{height:"100%",width:"100%",backgroundColor:"#EEEEEE",minHeight:"100Vh",color:"black"},children:(0,D.jsxs)(o.Z,{sx:{py:{md:5,xs:2},pt:{md:10,xs:2}},children:[(0,D.jsxs)(a.Z,{sx:{width:"100%",pb:4},display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",children:[(0,D.jsx)(d.Z,{variant:"h4",component:"h1",sx:{textTransform:"uppercase"},children:"Orders"}),(0,D.jsx)(c.Z,{variant:"text",color:"inherit",size:"small",component:l.rU,to:"/profile",children:"Back to profile"})]}),(0,D.jsx)(E,{isAdmin:!1})]})})]})}},29834:function(e,n,i){var t=i(74223),r=i(80184);n.Z=(0,t.Z)((0,r.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"}),"ExpandMoreOutlined")}}]);
//# sourceMappingURL=557.33a2c017.chunk.js.map