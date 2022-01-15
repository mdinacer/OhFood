"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[957],{1505:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(1413),r=n(93006),o=n(61134),a=n(80184);function s(e){var t,n=(0,o.bc)((0,i.Z)((0,i.Z)({},e),{},{defaultValue:""})),s=n.fieldState,l=n.field;return(0,a.jsx)(r.Z,(0,i.Z)((0,i.Z)((0,i.Z)({},e),l),{},{multiline:e.multiline,rows:e.rows,type:e.type,fullWidth:!0,size:"small",variant:"outlined",error:!!s.error,helperText:null===(t=s.error)||void 0===t?void 0:t.message}))}},27957:function(e,t,n){n.d(t,{Z:function(){return N}});var i=n(15861),r=n(1413),o=n(45987),a=n(29439),s=n(87757),l=n.n(s),c=n(10266),u=n(53767),d=n(4567),h=n(90977),f=n(63515),m=n(76090),p=n(68870),x=n(81153),v=n(5849),Z=n(72791),g=n(61134),y=n(30260),j=n(74223),w=n(80184),b=(0,j.Z)((0,w.jsx)("path",{d:"M20 1v3h3v2h-3v3h-2V6h-3V4h3V1h2zm-8 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1-9.94v2.02A6.53 6.53 0 0 0 12 5c-3.35 0-6 2.57-6 6.2 0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.79 6-9.14V11h2v.2c0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 6.22 7.8 3 12 3c.34 0 .67.02 1 .06z"}),"AddLocationAltOutlined"),S=(0,j.Z)((0,w.jsx)("path",{d:"m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99 3-1.01v11.7l-3 1.16V6.46zm14 11.08-3 1.01V6.86l3-1.16v11.84z"}),"MapOutlined"),C=n(1505),E=n(94446),P=n(24388),z=n(64777),k=["id","title","fullName","address1","isDefault"];function N(e){var t=e.address,n=e.onCancel,s=e.onSubmit,j=(0,Z.useState)(null),N=(0,a.Z)(j,2),D=N[0],I=N[1],V=(0,Z.useState)(null),A=(0,a.Z)(V,2),M=A[0],R=A[1],_=(0,Z.useState)(!1),L=(0,a.Z)(_,2),q=L[0],T=L[1],F=(0,Z.useState)(null),W=(0,a.Z)(F,2),H=W[0],K=W[1],O=(0,Z.useState)(null),U=(0,a.Z)(O,2),X=U[0],G=U[1],B=(0,g.cI)({mode:"all",resolver:(0,P.X)(z.b)}),J=B.control,Q=B.reset,Y=B.handleSubmit,$=B.setValue,ee=B.formState.isSubmitting;(0,Z.useEffect)((function(){return navigator.permissions.query({name:"geolocation"}).then((function(e){switch(e.state){case"prompt":G({message:"A popup message will ask you to allow geolocation in your browser, click allow to add your actual position",severity:"warning"});break;case"denied":G({message:"Geolocation is disabled, you need to enable it to add an address.",severity:"error"});break;case"granted":G(null)}})),function(){G(null)}}),[G]),(0,Z.useEffect)((function(){if(t){Q(t);t.id,t.title,t.fullName,t.address1,t.isDefault;var e=(0,o.Z)(t,k);I((0,r.Z)({},e)),R({lon:t.longitude,lat:t.latitude})}}),[t,Q]);var te=function(e,t){T(!0),y.Z.Location.getLocation(t,e).then((function(e){var t;K(e.display_name);var n=(0,r.Z)((0,r.Z)({},e.address),{},{longitude:e.lon,latitude:e.lat});I(n),$("county",n.county),$("town",null!==(t=n.town)&&void 0!==t?t:n.suburb),$("neighbourhood",n.neighbourhood),G({message:"If the position is not correct, try again until you get the correct result.",severity:"info"})})).catch((function(e){return console.log(e)})).finally((function(){return T(!1)}))};function ne(){return(ne=(0,i.Z)(l().mark((function e(i){var o,a,c;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,c=(0,r.Z)((0,r.Z)((0,r.Z)({id:null!==(o=null===t||void 0===t?void 0:t.id)&&void 0!==o?o:0},D),i),{},{isDefault:null!==(a=null===t||void 0===t?void 0:t.isDefault)&&void 0!==a&&a}),!t){e.next=7;break}return e.next=5,y.Z.Profile.updateAddress((0,r.Z)({},c));case 5:e.next=9;break;case 7:return e.next=9,y.Z.Profile.createAddress(c);case 9:s(c),Q(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:return e.prev=16,n(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,13,16,19]])})))).apply(this,arguments)}return(0,w.jsxs)(c.Z,{children:[(0,w.jsxs)(u.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,w.jsx)(d.Z,{variant:"h6",children:"Address"}),(0,w.jsx)(h.Z,{color:"primary",disabled:q,onClick:function(){navigator.geolocation.getCurrentPosition((function(e){e?(R({lon:e.coords.longitude.toString(),lat:e.coords.latitude.toString()}),te(e.coords.longitude,e.coords.latitude)):R(null)}))},children:(0,w.jsx)(b,{})})]}),X&&(0,w.jsx)(f.Z,{severity:X.severity,children:X.message}),(0,w.jsx)(m.Z,{in:null!==D,children:D&&(0,w.jsx)(p.Z,{children:(0,w.jsxs)(x.ZP,{container:!0,spacing:2,sx:{my:1},children:[(0,w.jsx)(x.ZP,{item:!0,xs:6,md:6,children:(0,w.jsxs)(u.Z,{children:[(0,w.jsx)(d.Z,{variant:"caption",children:"Country"}),(0,w.jsx)(d.Z,{variant:"subtitle1",children:D.country})]})}),(0,w.jsx)(x.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(u.Z,{sx:{flexDirection:{xs:"row",md:"column"},justifyContent:"space-between",alignItems:{xs:"center",md:"flex-start"}},children:[(0,w.jsx)(d.Z,{variant:"caption",children:"Zip Code"}),(0,w.jsx)(d.Z,{variant:"subtitle1",children:D.postcode})]})}),H&&(0,w.jsx)(x.ZP,{item:!0,xs:12,md:12,children:(0,w.jsxs)(u.Z,{children:[(0,w.jsx)(d.Z,{variant:"caption",children:"Full Address"}),(0,w.jsx)(d.Z,{variant:"body2",children:H})]})}),M&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(x.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(u.Z,{sx:{flexDirection:{xs:"row",md:"column"},justifyContent:"space-between",alignItems:{xs:"center",md:"flex-start"}},children:[(0,w.jsx)(d.Z,{variant:"caption",children:"Latitude"}),(0,w.jsx)(d.Z,{variant:"body2",children:M.lat})]})}),(0,w.jsx)(x.ZP,{item:!0,xs:12,md:6,children:(0,w.jsxs)(u.Z,{sx:{flexDirection:{xs:"row",md:"column"},justifyContent:"space-between",alignItems:{xs:"center",md:"flex-start"}},children:[(0,w.jsx)(d.Z,{variant:"caption",children:"Longitude"}),(0,w.jsx)(d.Z,{variant:"body2",children:null===M||void 0===M?void 0:M.lon})]})}),(0,w.jsx)(x.ZP,{item:!0,xs:12,md:12,sx:{mb:2},children:(0,w.jsx)(u.Z,{children:(0,w.jsx)(v.Z,{variant:"outlined",size:"small",color:"inherit",startIcon:(0,w.jsx)(S,{}),href:"https://maps.google.com/?q=".concat(M.lat,",").concat(M.lon),target:"_blank",children:"Check on Maps"})})})]})]})})}),(0,w.jsx)(m.Z,{in:null!==D||null!=t,children:(D||t)&&(0,w.jsx)(p.Z,{component:"form",onSubmit:Y((function(e){return ne.apply(this,arguments)})),sx:{color:"black"},children:(0,w.jsxs)(x.ZP,{container:!0,spacing:2,children:[(0,w.jsx)(x.ZP,{item:!0,md:12,xs:12,children:(0,w.jsx)(C.Z,{control:J,name:"title",label:"Title"})}),(0,w.jsx)(x.ZP,{item:!0,md:12,xs:12,children:(0,w.jsx)(C.Z,{control:J,name:"fullName",label:"Full Name"})}),(0,w.jsx)(x.ZP,{item:!0,md:12,xs:12,children:(0,w.jsx)(C.Z,{control:J,name:"address1",label:"Full Address"})}),(0,w.jsx)(x.ZP,{item:!0,md:12,xs:12,children:(0,w.jsxs)(u.Z,{direction:"row",justifyContent:"flex-end",sx:{mt:3},children:[(0,w.jsx)(v.Z,{sx:{mx:2},variant:"outlined",onClick:function(){Q(),n(!1)},children:"Cancel"}),(0,w.jsx)(E.Z,{loading:ee,type:"submit",variant:"contained",disableElevation:!0,children:"Submit"})]})})]})})})]})}},64777:function(e,t,n){n.d(t,{F:function(){return r},b:function(){return o}});var i=n(32292),r=i.Ry({firstName:i.Z_().required(),lastName:i.Z_().required(),phone1:i.Z_().required(),phone2:i.Z_(),file:i.nK().when("pictureUrl",{is:function(e){return!e},then:i.nK().required("Please provide an image")})}),o=i.Ry({fullName:i.Z_().required(),title:i.Z_().required(),address1:i.Z_().required()})},24388:function(e,t,n){n.d(t,{X:function(){return o}});var i=n(41768),r=n(61134),o=function(e,t,n){return void 0===t&&(t={}),void 0===n&&(n={}),function(o,a,s){try{return Promise.resolve(function(r,l){try{var c=(t.context,Promise.resolve(e["sync"===n.mode?"validateSync":"validate"](o,Object.assign({abortEarly:!1},t,{context:a}))).then((function(e){return s.shouldUseNativeValidation&&(0,i.M)({},s),{values:e,errors:{}}})))}catch(u){return l(u)}return c&&c.then?c.then(void 0,l):c}(0,(function(e){return{values:{},errors:(0,i.D)((t=e,n=!s.shouldUseNativeValidation&&"all"===s.criteriaMode,(t.inner||[]).reduce((function(e,t){if(e[t.path]||(e[t.path]={message:t.message,type:t.type}),n){var i=e[t.path].types,o=i&&i[t.type];e[t.path]=(0,r.KN)(t.path,n,e,t.type,o?[].concat(o,t.message):t.message)}return e}),{})),s)};var t,n})))}catch(l){return Promise.reject(l)}}}},76090:function(e,t,n){var i=n(4942),r=n(63366),o=n(87462),a=n(72791),s=n(28182),l=(n(52007),n(18875)),c=n(90767),u=n(47630),d=n(31402),h=n(81314),f=n(4999),m=n(13967),p=n(42071),x=n(98751),v=n(80184),Z=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],g=(0,u.ZP)("div",{name:"MuiCollapse",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.orientation],"entered"===n.state&&t.entered,"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&t.hidden]}})((function(e){var t=e.theme,n=e.ownerState;return(0,o.Z)({height:0,overflow:"hidden",transition:t.transitions.create("height")},"horizontal"===n.orientation&&{height:"auto",width:0,transition:t.transitions.create("width")},"entered"===n.state&&(0,o.Z)({height:"auto",overflow:"visible"},"horizontal"===n.orientation&&{width:"auto"}),"exited"===n.state&&!n.in&&"0px"===n.collapsedSize&&{visibility:"hidden"})})),y=(0,u.ZP)("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:function(e,t){return t.wrapper}})((function(e){var t=e.ownerState;return(0,o.Z)({display:"flex",width:"100%"},"horizontal"===t.orientation&&{width:"auto",height:"100%"})})),j=(0,u.ZP)("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:function(e,t){return t.wrapperInner}})((function(e){var t=e.ownerState;return(0,o.Z)({width:"100%"},"horizontal"===t.orientation&&{width:"auto",height:"100%"})})),w=a.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiCollapse"}),u=n.addEndListener,w=n.children,b=n.className,S=n.collapsedSize,C=void 0===S?"0px":S,E=n.component,P=n.easing,z=n.in,k=n.onEnter,N=n.onEntered,D=n.onEntering,I=n.onExit,V=n.onExited,A=n.onExiting,M=n.orientation,R=void 0===M?"vertical":M,_=n.style,L=n.timeout,q=void 0===L?h.x9.standard:L,T=n.TransitionComponent,F=void 0===T?l.ZP:T,W=(0,r.Z)(n,Z),H=(0,o.Z)({},n,{orientation:R,collapsedSize:C}),K=function(e){var t=e.orientation,n=e.classes,i={root:["root","".concat(t)],entered:["entered"],hidden:["hidden"],wrapper:["wrapper","".concat(t)],wrapperInner:["wrapperInner","".concat(t)]};return(0,c.Z)(i,x.d,n)}(H),O=(0,m.Z)(),U=a.useRef(),X=a.useRef(null),G=a.useRef(),B="number"===typeof C?"".concat(C,"px"):C,J="horizontal"===R,Q=J?"width":"height";a.useEffect((function(){return function(){clearTimeout(U.current)}}),[]);var Y=a.useRef(null),$=(0,p.Z)(t,Y),ee=function(e){return function(t){if(e){var n=Y.current;void 0===t?e(n):e(n,t)}}},te=function(){return X.current?X.current[J?"clientWidth":"clientHeight"]:0},ne=ee((function(e,t){X.current&&J&&(X.current.style.position="absolute"),e.style[Q]=B,k&&k(e,t)})),ie=ee((function(e,t){var n=te();X.current&&J&&(X.current.style.position="");var i=(0,f.C)({style:_,timeout:q,easing:P},{mode:"enter"}),r=i.duration,o=i.easing;if("auto"===q){var a=O.transitions.getAutoHeightDuration(n);e.style.transitionDuration="".concat(a,"ms"),G.current=a}else e.style.transitionDuration="string"===typeof r?r:"".concat(r,"ms");e.style[Q]="".concat(n,"px"),e.style.transitionTimingFunction=o,D&&D(e,t)})),re=ee((function(e,t){e.style[Q]="auto",N&&N(e,t)})),oe=ee((function(e){e.style[Q]="".concat(te(),"px"),I&&I(e)})),ae=ee(V),se=ee((function(e){var t=te(),n=(0,f.C)({style:_,timeout:q,easing:P},{mode:"exit"}),i=n.duration,r=n.easing;if("auto"===q){var o=O.transitions.getAutoHeightDuration(t);e.style.transitionDuration="".concat(o,"ms"),G.current=o}else e.style.transitionDuration="string"===typeof i?i:"".concat(i,"ms");e.style[Q]=B,e.style.transitionTimingFunction=r,A&&A(e)}));return(0,v.jsx)(F,(0,o.Z)({in:z,onEnter:ne,onEntered:re,onEntering:ie,onExit:oe,onExited:ae,onExiting:se,addEndListener:function(e){"auto"===q&&(U.current=setTimeout(e,G.current||0)),u&&u(Y.current,e)},nodeRef:Y,timeout:"auto"===q?null:q},W,{children:function(e,t){return(0,v.jsx)(g,(0,o.Z)({as:E,className:(0,s.Z)(K.root,b,{entered:K.entered,exited:!z&&"0px"===B&&K.hidden}[e]),style:(0,o.Z)((0,i.Z)({},J?"minWidth":"minHeight",B),_),ownerState:(0,o.Z)({},H,{state:e}),ref:$},t,{children:(0,v.jsx)(y,{ownerState:(0,o.Z)({},H,{state:e}),className:K.wrapper,ref:X,children:(0,v.jsx)(j,{ownerState:(0,o.Z)({},H,{state:e}),className:K.wrapperInner,children:w})})}))}}))}));w.muiSupportAuto=!0,t.Z=w},98751:function(e,t,n){n.d(t,{d:function(){return r}});var i=n(95159);function r(e){return(0,i.Z)("MuiCollapse",e)}var o=(0,n(30208).Z)("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);t.Z=o}}]);
//# sourceMappingURL=957.661f7270.chunk.js.map