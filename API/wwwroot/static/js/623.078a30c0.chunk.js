"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[623],{18009:function(e,n,t){t.d(n,{Z:function(){return Z}});var i=t(1413),r=t(72791),s=t(5849),a=t(5574),o=t(77386),d=t(4899),c=t(31701),l=t(65661),x=t(55931),u=t(80184),h=r.forwardRef((function(e,n){return(0,u.jsx)(x.Z,(0,i.Z)({direction:"up",ref:n},e))}));function Z(e){var n=e.open,t=e.title,i=e.body,r=e.okText,x=void 0===r?"Ok":r,Z=e.cancelText,j=void 0===Z?"Cancel":Z,f=e.onClose;return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(a.Z,{open:n,TransitionComponent:h,keepMounted:!0,onClose:f,"aria-describedby":"alert-dialog-slide-description",children:[(0,u.jsx)(l.Z,{children:t}),(0,u.jsx)(d.Z,{children:(0,u.jsx)(c.Z,{id:"alert-dialog-slide-description",children:i})}),(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(s.Z,{size:"small",variant:"outlined",onClick:function(){return f(!1)},children:j}),(0,u.jsx)(s.Z,{size:"small",variant:"contained",onClick:function(){return f(!0)},children:x})]})]})})}},91252:function(e,n,t){t.d(n,{Z:function(){return c}});var i=t(29439),r=t(4567),s=t(11703),a=t(52791),o=t(72791),d=t(80184);function c(e){var n=e.metaData,t=e.onPageChange,c=n.currentPage,l=n.totalCount,x=n.totalPages,u=n.pageSize,h=(0,o.useState)(c),Z=(0,i.Z)(h,2),j=Z[0],f=Z[1];return(0,d.jsxs)(a.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",sx:{flexDirection:{xs:"column",md:"row"},my:3},children:[(0,d.jsxs)(r.Z,{variant:"body2",gutterBottom:!0,children:["Showing ",(c-1)*u+1," to ",c*u>l?l:c*u," of ",l," items"]}),n&&n.totalPages>1&&(0,d.jsx)(s.Z,{sx:{flexWrap:"nowrap",mb:{xs:7,md:1},mt:{xs:2,md:0}},color:"primary",size:"medium",count:x,page:j,defaultPage:1,siblingCount:1,onChange:function(e,n){return function(e){f(e),t(e)}(n)}})]})}},8623:function(e,n,t){t.r(n),t.d(n,{default:function(){return S}});var i=t(68870),r=t(10266),s=t(53767),a=t(4567),o=t(5849),d=t(43504),c=t(29439),l=t(81153),x=t(4841),u=t(94721),h=t(76090),Z=t(43236),j=t(52411),f=t(72791),m=t(30260),p=t(66620),g=t(14230);var v=t(68181),y=t(91252),C=t(92675),b=t(29834),P=t(74223),w=t(80184),D=(0,P.Z)((0,w.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"}),"ExpandLessOutlined"),z=(0,P.Z)((0,w.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12zm8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8z"}),"DoDisturb"),k=t(94446),L=t(18009);function O(){var e=(0,p.TL)(),n=(0,f.useState)(!1),t=(0,c.Z)(n,2),o=t[0],d=t[1],P=(0,f.useState)(0),O=(0,c.Z)(P,2),S=O[0],A=O[1],I=function(){var e=(0,p.CG)(g.pV.selectAll),n=(0,p.CG)((function(e){return e.order})),t=n.ordersLoaded,i=n.metaData,r=(0,p.TL)();return(0,f.useEffect)((function(){t||r((0,g.X6)())}),[r,t]),{orders:e,ordersLoaded:t,metaData:i}}(),M=I.orders,T=I.ordersLoaded,E=I.metaData,H=(0,f.useState)({id:null}),V=(0,c.Z)(H,2),q=V[0],B=V[1],G=(0,f.useState)(!1),W=(0,c.Z)(G,2),$=W[0],_=W[1],F=(0,f.useState)(0),N=(0,c.Z)(F,2),R=N[0],U=N[1];var X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Loading";return(0,w.jsx)(i.Z,{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",children:(0,w.jsx)(a.Z,{variant:"caption",children:e})})};return(0,w.jsxs)(i.Z,{sx:{overflow:"auto",py:3},children:[!T&&X("Loading Orders"),T&&0===M.length&&X("Your orders list is empty."),M.length>0&&(0,w.jsxs)(l.ZP,{container:!0,spacing:3,children:[M.map((function(e){var n;return(0,w.jsx)(l.ZP,{item:!0,xs:12,children:(0,w.jsx)(x.Z,{sx:{py:3,height:"100%"},children:(0,w.jsx)(r.Z,{children:(0,w.jsxs)(l.ZP,{container:!0,spacing:1,children:[(0,w.jsx)(l.ZP,{item:!0,md:3,xs:12,children:(0,w.jsxs)(s.Z,{children:[(0,w.jsx)(a.Z,{variant:"caption",children:"Order Date"}),(0,w.jsx)(a.Z,{variant:"body1",children:(0,v.Z)(new Date(e.orderDate),"dd/MM/yy HH:mm")})]})}),(0,w.jsx)(l.ZP,{item:!0,md:5,xs:12,children:(0,w.jsxs)(s.Z,{children:[(0,w.jsx)(a.Z,{variant:"caption",children:"Delivery Address"}),(0,w.jsxs)(a.Z,{variant:"body1",children:[e.shippingAddress.address1," - ",null!==(n=e.shippingAddress.town)&&void 0!==n?n:e.shippingAddress.suburb]})]})}),(0,w.jsxs)(l.ZP,{item:!0,md:2,xs:6,children:[(0,w.jsx)(a.Z,{variant:"caption",children:"Order Status"}),(0,w.jsx)(a.Z,{variant:"body1",children:e.status})]}),(0,w.jsxs)(l.ZP,{item:!0,md:2,xs:6,display:"flex",justifyContent:"flex-end",flexDirection:"column",children:[(0,w.jsx)(a.Z,{variant:"caption",textAlign:"right",children:"Total"}),(0,w.jsx)(a.Z,{textAlign:"right",variant:"body1",children:(0,C.O)(e.subtotal,"$")})]}),(0,w.jsxs)(l.ZP,{item:!0,xs:12,children:[(0,w.jsx)(u.Z,{}),(0,w.jsxs)(s.Z,{sx:{mt:1,justifyContent:"space-between"},direction:"row",children:[(0,w.jsx)(k.Z,{size:"small",color:"inherit",startIcon:q.id!==e.id?(0,w.jsx)(b.Z,{fontSize:"large",color:"primary"}):(0,w.jsx)(D,{fontSize:"large",color:"inherit"}),onClick:function(){return n=e.id,B({id:q.id===n?null:n});var n},children:"View Items"}),"Pending"===e.status&&(0,w.jsx)(k.Z,{onClick:function(){return n=e.id,U(n),void _(!0);var n},loading:o&&S===e.id,startIcon:(0,w.jsx)(z,{}),color:"error",children:"Cancel"})]})]}),(0,w.jsx)(l.ZP,{item:!0,xs:12,children:(0,w.jsxs)(h.Z,{in:q.id===e.id,children:[(0,w.jsx)(u.Z,{}),(0,w.jsx)(Z.Z,{dense:!0,sx:{my:1},children:e.items.map((function(e){return(0,w.jsx)(j.ZP,{children:(0,w.jsxs)(l.ZP,{container:!0,children:[(0,w.jsx)(l.ZP,{item:!0,xs:8,children:(0,w.jsx)(a.Z,{variant:"body1",children:e.name})}),(0,w.jsxs)(l.ZP,{item:!0,xs:2,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",children:[(0,w.jsx)(a.Z,{variant:"body2",children:"x "}),(0,w.jsx)(a.Z,{variant:"body1",children:e.quantity})]}),(0,w.jsx)(l.ZP,{item:!0,xs:2,children:(0,w.jsx)(a.Z,{variant:"body1",textAlign:"right",children:(0,C.O)(e.price*e.quantity,"$")})})]})},e.productId)}))})]})})]})})})},e.id)})),(0,w.jsx)(l.ZP,{item:!0,xs:12,children:E&&(0,w.jsx)(y.Z,{metaData:E,onPageChange:function(n){return e((0,g.oW)({pageNumber:n}))}})})]}),(0,w.jsx)(L.Z,{open:$,title:"Cancel Order",onClose:function(n){var t;n&&R>0&&(t=R,d(!0),A(t),m.Z.Orders.cancelOrder(t).then((function(n){e((0,g.Cs)({id:t,changes:{status:"cancelled"}}))})).catch((function(e){return console.log(e)})).finally((function(){return d(!1)}))),_(!1)},body:"Are you sure you want to cancel this order?"})]})}function S(){return(0,w.jsx)(i.Z,{sx:{height:"100%",width:"100%",minHeight:"100Vh"},children:(0,w.jsxs)(r.Z,{sx:{py:{md:5,xs:2},pt:{md:10,xs:2}},children:[(0,w.jsxs)(s.Z,{sx:{width:"100%",pb:4},display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",children:[(0,w.jsx)(a.Z,{variant:"h4",component:"h1",sx:{textTransform:"uppercase"},children:"Orders"}),(0,w.jsx)(o.Z,{variant:"text",color:"inherit",size:"small",component:d.rU,to:"/profile",children:"Back to profile"})]}),(0,w.jsx)(O,{})]})})}},29834:function(e,n,t){var i=t(74223),r=t(80184);n.Z=(0,i.Z)((0,r.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"}),"ExpandMoreOutlined")}}]);
//# sourceMappingURL=623.078a30c0.chunk.js.map