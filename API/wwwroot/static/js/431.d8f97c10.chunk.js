"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[431],{1505:function(e,n,r){r.d(n,{Z:function(){return l}});var i=r(1413),t=r(93006),o=r(61134),s=r(80184);function l(e){var n,r=(0,o.bc)((0,i.Z)((0,i.Z)({},e),{},{defaultValue:""})),l=r.fieldState,c=r.field;return(0,s.jsx)(t.Z,(0,i.Z)((0,i.Z)((0,i.Z)({},e),c),{},{multiline:e.multiline,rows:e.rows,type:e.type,fullWidth:!0,size:"small",variant:"outlined",error:!!l.error,helperText:null===(n=l.error)||void 0===n?void 0:n.message}))}},18431:function(e,n,r){r.r(n),r.d(n,{default:function(){return D}});var i=r(38489),t=r(4708),o=r(68870),s=r(10266),l=r(4841),c=r(4567),a=r(437),d=r(66620),x=r(15861),u=r(1413),h=r(87757),m=r.n(h),p=r(81153),f=r(5849),Z=r(1505),j=r(76106),v=r(45363),g=r(30035),b=r(72791),y=r(18267),w=r(61134),P=r(80184);function C(e){var n,r=(0,w.bc)((0,u.Z)((0,u.Z)({},e),{},{defaultValue:null})),i=r.fieldState,t=r.field,s={display:"flex",border:"dashed 3px #eee",borderColor:"#eee",borderRadius:"5px",paddingTop:"30px",alignItems:"center"},l=(0,b.useCallback)((function(e){e[0]=Object.assign(e[0],{preview:URL.createObjectURL(e[0])}),t.onChange(e[0])}),[t]),a=(0,y.uI)({onDrop:l}),d=a.getRootProps,x=a.getInputProps,h=a.isDragActive;return(0,P.jsx)(o.Z,(0,u.Z)((0,u.Z)({component:"div"},d()),{},{children:(0,P.jsxs)(v.Z,{sx:{p:2,height:"200px",width:"100%"},error:!!i.error,style:h?(0,u.Z)((0,u.Z)({},s),{borderColor:"green"}):s,children:[(0,P.jsx)("input",(0,u.Z)({},x())),(0,P.jsx)(j.Z,{sx:{fontSize:"100px"}}),(0,P.jsx)(c.Z,{variant:"h6",children:"Drop image here"}),(0,P.jsx)(g.Z,{children:null===(n=i.error)||void 0===n?void 0:n.message})]})}))}var R=r(62797),S=R.Ry({firstName:R.Z_().required(),lastName:R.Z_().required(),phone1:R.Z_().required(),phone2:R.Z_(),file:R.nK().when("pictureUrl",{is:function(e){return!e},then:R.nK().required("Please provide an image")})}),k=r(24388),E=r(30260),I=r(94446),N=r(43504),U=r(16871),L=r(84200);function _(){var e=(0,w.cI)({mode:"all",resolver:(0,k.X)(S)}),n=e.control,r=e.reset,i=e.handleSubmit,t=e.watch,s=e.formState,l=s.isDirty,c=s.isSubmitting,a=(0,d.CG)((function(e){return e.account})).profile,h=(0,U.s0)(),j=t("file",null),v=(0,d.TL)();function g(){return(g=(0,x.Z)(m().mark((function e(n){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("submitting");try{E.Z.Profile.updateProfile(n).then((function(e){v((0,L.RG)(e)),h("/profile")})).catch((function(e){return console.log(e)}))}catch(r){console.log(r)}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,b.useEffect)((function(){var e;return!a||j||l||r((0,u.Z)((0,u.Z)({},a),{},{phone2:null!==(e=a.phone2)&&void 0!==e?e:""})),function(){j&&URL.revokeObjectURL(j.preview)}}),[a,r,j,l]),(0,P.jsx)(o.Z,{component:"form",onSubmit:i((function(e){return g.apply(this,arguments)})),children:(0,P.jsxs)(p.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(p.ZP,{item:!0,md:6,xs:12,children:(0,P.jsx)(Z.Z,{control:n,name:"firstName",label:"First Name"})}),(0,P.jsx)(p.ZP,{item:!0,md:6,xs:12,children:(0,P.jsx)(Z.Z,{control:n,name:"lastName",label:"Last Name"})}),(0,P.jsx)(p.ZP,{item:!0,md:6,xs:12,children:(0,P.jsx)(Z.Z,{control:n,name:"phone1",label:"Mobile"})}),(0,P.jsx)(p.ZP,{item:!0,md:6,xs:12,children:(0,P.jsx)(Z.Z,{control:n,name:"phone2",label:"Mobile"})}),(0,P.jsx)(p.ZP,{item:!0,xs:12,children:(0,P.jsxs)(p.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(p.ZP,{item:!0,xs:12,md:6,children:(0,P.jsx)(o.Z,{sx:{width:"100%"},children:(0,P.jsx)(C,{control:n,name:"file"})})}),(0,P.jsx)(p.ZP,{item:!0,xs:12,md:6,children:(0,P.jsx)(o.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"},children:j?(0,P.jsx)(o.Z,{component:"img",sx:{borderRadius:3},src:j.preview,alt:"preview",style:{maxHeight:200}}):(0,P.jsx)(o.Z,{component:"img",sx:{borderRadius:3,objectFit:"cover",objectPosition:"center"},src:null===a||void 0===a?void 0:a.pictureUrl,alt:null===a||void 0===a?void 0:a.firstName,style:{maxHeight:200}})})})]})}),(0,P.jsx)(p.ZP,{item:!0,xs:12,children:(0,P.jsxs)(o.Z,{display:"flex",alignItems:"center",sx:{mt:3,justifyContent:{xs:"space-evenly",md:"flex-end"}},children:[(0,P.jsx)(f.Z,{sx:{mx:1,width:{xs:"100%",md:"95px"}},component:N.rU,to:"/profile",variant:"outlined",color:"inherit",children:"Cancel"}),(0,P.jsx)(I.Z,{sx:{color:"#FFF",fontWeight:"bold",width:{xs:"100%",md:"95px"}},loading:c,type:"submit",variant:"contained",disableElevation:!0,color:"primary",children:"Save"})]})})]})})}function D(){var e=(0,d.CG)((function(e){return e.account})),n=e.user,r=e.profile;return n&&r?(0,P.jsxs)(i.a,{theme:a.ib,children:[(0,P.jsx)(t.ZP,{}),(0,P.jsx)(o.Z,{sx:{pt:{md:"60px",xs:1},pb:{xs:"60px",md:1},display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",width:"100%",backgroundColor:"#EEEEEE"},children:(0,P.jsx)(s.Z,{sx:{px:{xs:0,md:7},display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:(0,P.jsxs)(l.Z,{sx:{p:3,width:"100%",height:"100%",maxWidth:"800px",borderRadius:{xs:0,md:3}},children:[(0,P.jsx)(c.Z,{variant:"h6",sx:{mb:3},children:"Profile Settings"}),(0,P.jsx)(_,{})]})})})]}):(0,P.jsx)("div",{children:"No User"})}}}]);
//# sourceMappingURL=431.d8f97c10.chunk.js.map