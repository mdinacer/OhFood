"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[747],{19747:function(e,n,t){t.r(n),t.d(n,{default:function(){return G}});var i=t(15861),r=t(29439),s=t(87757),a=t.n(s),c=t(68870),l=t(4567),d=t(10266),o=t(4841),u=t(99947),x=t(85982),h=t(36053),j=t(5849),Z=t(72791),f=t(53767),p=t(45363),m=t(62861),v=t(84701),b=t(82626),g=t(81153),y=t(59969),w=t(25801),S=t(13034),C=t(68586),k=t(18060),P=t(60627),I=t(30260),A=t(27957),O=t(80184);function W(e){var n=e.onItemSelected,t=e.setSaveDefault,i=(0,Z.useState)([]),s=(0,r.Z)(i,2),a=s[0],u=s[1],x=(0,Z.useState)(""),h=(0,r.Z)(x,2),W=h[0],D=h[1],T=(0,Z.useState)(null),q=(0,r.Z)(T,2),F=q[0],R=q[1],B=(0,Z.useState)(!1),N=(0,r.Z)(B,2),$=(N[0],N[1]),U=(0,Z.useState)(!1),Y=(0,r.Z)(U,2),E=Y[0],G=Y[1],H=(0,Z.useState)(!1),L=(0,r.Z)(H,2),_=(L[0],L[1]),J=(0,Z.useState)(!1),V=(0,r.Z)(J,2),z=V[0],K=V[1];function M(e){D(e);var t=a.find((function(n){return n.title===e}));R(void 0!==t?t:null),n(void 0!==t?t:null)}(0,Z.useEffect)((function(){E||($(!0),I.Z.Profile.fetchAddresses().then((function(e){G(!0),u(e)})).catch((function(e){return console.log(e)})).finally((function(){return $(!1)})))}),[E]);return(0,O.jsxs)(c.Z,{maxWidth:800,sx:{mx:"auto"},children:[(0,O.jsxs)(f.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,O.jsx)(l.Z,{variant:"h6",sx:{mb:3},children:"Shipping address"}),E&&a.length<3&&(0,O.jsx)(j.Z,{onClick:function(){return K(!0)},children:"Add Address"})]}),(0,O.jsx)(d.Z,{children:E&&a.length>0&&(0,O.jsxs)(c.Z,{children:[(0,O.jsxs)(p.Z,{fullWidth:!0,children:[(0,O.jsx)(m.Z,{id:"addresses-label",children:"Addresses"}),(0,O.jsx)(v.Z,{labelId:"addresses-label",id:"addresses-select",value:W,label:"Shipping Address",onChange:function(e){M(e.target.value)},name:"shippingAddress",children:a.map((function(e){return(0,O.jsx)(b.Z,{value:e.title,children:(0,O.jsxs)(c.Z,{sx:{width:"100%"},children:[(0,O.jsx)(l.Z,{sx:{textTransform:"uppercase"},variant:"subtitle1",children:e.title}),(0,O.jsxs)(g.ZP,{container:!0,spacing:1,children:[(0,O.jsx)(g.ZP,{item:!0,xs:12}),(0,O.jsx)(g.ZP,{item:!0,xs:6,children:(0,O.jsxs)(f.Z,{children:[(0,O.jsx)(l.Z,{variant:"caption",children:"Full Name"}),(0,O.jsx)(l.Z,{variant:"caption",children:e.fullName})]})}),(0,O.jsx)(g.ZP,{item:!0,xs:6,children:(0,O.jsxs)(f.Z,{children:[(0,O.jsx)(l.Z,{variant:"caption",children:"Address"}),(0,O.jsx)(l.Z,{variant:"caption",children:e.address1})]})})]})]})},e.id)}))})]}),F&&!F.isDefault&&(0,O.jsx)(y.Z,{children:(0,O.jsx)(w.Z,{onChange:function(e){t(e.target.checked)},control:(0,O.jsx)(S.Z,{}),label:"Set Default"})})]})}),(0,O.jsx)(C.Z,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:z,onClose:function(){return K(!1)},closeAfterTransition:!0,BackdropComponent:k.Z,BackdropProps:{timeout:500},children:(0,O.jsx)(P.Z,{in:z,children:(0,O.jsx)(o.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",maxWidth:900,minWidth:300,borderRadius:3,boxShadow:24,py:2,overflow:"auto",maxHeight:"90vh"},children:(0,O.jsx)(A.Z,{onSubmit:function(e){F&&(_(!0),G(!1),M(e.title),_(!1))},onCancel:function(){return K(!1)}})})})})]})}var D=t(43236),T=t(52411),q=t(94721),F=t(66620),R=t(92675),B=t(51365),N=t(32068);function $(){var e,n=(0,F.CG)((function(e){return e.basket})),t=n.basket,i=n.status,r=null!==(e=null===t||void 0===t?void 0:t.items.reduce((function(e,n){return e+n.quantity*n.price}),0))&&void 0!==e?e:0,s=(0,F.TL)();return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(l.Z,{variant:"h6",gutterBottom:!0,children:"Order summary"}),t&&(0,O.jsx)(D.Z,{children:t.items.map((function(e){return(0,O.jsx)(T.ZP,{sx:{mb:0},children:(0,O.jsxs)(g.ZP,{container:!0,spacing:2,rowSpacing:0,children:[(0,O.jsx)(g.ZP,{md:2,xs:0,item:!0,sx:{overflow:"hidden"},display:"flex",alignItems:"center",justifyContent:"center",children:(0,O.jsx)(c.Z,{component:"img",src:e.pictureUrl,alt:e.name,sx:{height:"50px",width:"50px",objectFit:"contain",objectPosition:"center"}})}),(0,O.jsxs)(g.ZP,{item:!0,md:5,xs:8,display:"flex",alignItems:"flex-start",justifyContent:"center",flexDirection:"column",columnGap:3,children:[(0,O.jsx)(l.Z,{variant:"caption",children:e.category}),(0,O.jsx)(l.Z,{variant:"subtitle1",children:e.name})]}),(0,O.jsx)(g.ZP,{item:!0,md:3,xs:6,display:"flex",alignItems:"center",justifyContent:"center",children:(0,O.jsx)(B.Z,{quantity:e.quantity,increase:function(){return s((0,N.JW)({productId:e.productId}))},decrease:function(){return s((0,N.di)({productId:e.productId,quantity:1,name:"rem"}))},isRow:!0,minValue:1,loading:i.includes("pending")})}),(0,O.jsx)(g.ZP,{item:!0,md:2,xs:6,sx:{overflow:"hidden"},display:"flex",alignItems:"center",justifyContent:"center",children:(0,O.jsx)(l.Z,{textAlign:"center",children:(0,R.O)(e.price*e.quantity,"$")})})]})},e.productId)}))}),(0,O.jsx)(q.Z,{}),(0,O.jsxs)(g.ZP,{container:!0,children:[(0,O.jsx)(g.ZP,{item:!0,md:6,xs:0}),(0,O.jsx)(g.ZP,{item:!0,xs:12,md:6,children:(0,O.jsx)(d.Z,{children:(0,O.jsxs)(D.Z,{dense:!0,children:[(0,O.jsx)(T.ZP,{children:(0,O.jsxs)(f.Z,{width:"100%",direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,O.jsx)(l.Z,{variant:"caption",children:"Subtotal"}),(0,O.jsx)(l.Z,{variant:"subtitle1",children:(0,R.O)(r,"$")})]})}),(0,O.jsx)(T.ZP,{children:(0,O.jsxs)(f.Z,{width:"100%",direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,O.jsx)(l.Z,{variant:"caption",children:"Delivery Cost"}),(0,O.jsx)(l.Z,{variant:"subtitle1",children:(0,R.O)(30,"$")})]})}),(0,O.jsx)(T.ZP,{children:(0,O.jsxs)(f.Z,{width:"100%",direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,O.jsx)(l.Z,{variant:"caption",children:"Total"}),(0,O.jsx)(l.Z,{variant:"subtitle1",children:(0,R.O)(r+30,"$")})]})})]})})})]})]})}var U=t(94446),Y=t(43504),E=["Address","Review","Receipt"];function G(){var e=(0,Z.useState)(0),n=(0,r.Z)(e,2),t=n[0],s=n[1],f=(0,Z.useState)(null),p=(0,r.Z)(f,2),m=p[0],v=p[1],b=(0,Z.useState)(!1),g=(0,r.Z)(b,2),y=g[0],w=g[1],S=(0,Z.useState)(0),C=(0,r.Z)(S,2),k=C[0],P=C[1],A=(0,Z.useState)(!1),D=(0,r.Z)(A,2),T=D[0],q=D[1],R=(0,F.TL)();function B(e){v(e)}function G(){return H.apply(this,arguments)}function H(){return(H=(0,i.Z)(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return q(!0),e.prev=1,e.next=4,I.Z.Orders.create({saveAddress:y,shippingAddress:m});case 4:n=e.sent,P(n),s(t+1),R((0,N.RT)()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0);case 13:return e.prev=13,q(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[1,10,13,16]])})))).apply(this,arguments)}var L=function(){var e=(0,i.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==t){e.next=5;break}return e.next=3,G();case 3:e.next=6;break;case 5:s(t+1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,O.jsx)(c.Z,{className:"payment",sx:{pb:{xs:10,md:1},pt:{xs:1,md:7}},children:(0,O.jsx)(d.Z,{children:(0,O.jsxs)(o.Z,{variant:"outlined",sx:{maxWidth:800,my:{xs:1,md:6},mx:"auto",p:{xs:2,md:3},backgroundColor:"rgba(0,0,0,0.5)"},children:[(0,O.jsx)(l.Z,{component:"h1",variant:"h4",align:"center",children:"Order"}),(0,O.jsx)(u.Z,{activeStep:t,sx:{pt:3,pb:5},children:E.map((function(e){return(0,O.jsx)(x.Z,{children:(0,O.jsx)(h.Z,{children:e})},e)}))}),(0,O.jsx)(O.Fragment,{children:t===E.length?(0,O.jsx)(O.Fragment,{children:(0,O.jsxs)(l.Z,{variant:"subtitle1",children:["Your order number is #",k,". We have emailed your order confirmation, and will not send you an update when your order has shipped!"]})}):(0,O.jsxs)(c.Z,{children:[function(e){switch(e){case 0:return(0,O.jsx)(W,{onItemSelected:B,setSaveDefault:function(e){return w(e)}});case 1:return(0,O.jsx)($,{});case 2:return(0,O.jsx)(c.Z,{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",children:(0,O.jsx)(l.Z,{textAlign:"center",children:"You order has been sent, You will be notified on confirmation and delivery."})});default:throw new Error("Unknown step")}}(t),(0,O.jsxs)(c.Z,{sx:{display:"flex",justifyContent:"flex-end"},children:[0!==t&&(0,O.jsx)(j.Z,{onClick:function(){s(t-1)},sx:{mt:3,ml:1},children:"Back"}),2!==t?(0,O.jsx)(U.Z,{loading:T,disabled:null===m,variant:"contained",onClick:function(){return L()},sx:{mt:3,ml:1},children:1===t?"Place order":"Next"}):(0,O.jsx)(j.Z,{variant:"contained",sx:{mt:3,ml:1},component:Y.rU,to:"/",children:"Home"})]})]})})]})})})}}}]);
//# sourceMappingURL=747.50f9a9ac.chunk.js.map