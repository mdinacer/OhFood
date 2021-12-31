"use strict";(self.webpackChunkoh_food=self.webpackChunkoh_food||[]).push([[915],{61915:function(e,r,n){n.r(r),n.d(r,{default:function(){return x}});var a=n(1413),t=n(68870),o=n(10266),s=n(4841),i=n(60220),l=n(4567),c=n(93006),u=n(81153),d=n(61134),m=n(16871),f=n(43504),v=n(56960),h=n(30260),g=n(94446),p=n(7961),Z=(n(30585),n(80184));function x(){var e,r,n,x=(0,m.s0)(),w=(0,d.cI)({mode:"all"}),b=w.register,j=w.handleSubmit,S=w.setError,y=w.formState,k=y.isSubmitting,P=y.errors,z=y.isValid;return(0,Z.jsx)(t.Z,{className:"account",children:(0,Z.jsxs)(o.Z,{className:"login-form",component:s.Z,maxWidth:"sm",sx:{display:"flex",flexDirection:"column",alignItems:"center",p:4},children:[(0,Z.jsx)(i.Z,{sx:{m:1,bgcolor:"primary.main"},children:(0,Z.jsx)(p.Z,{})}),(0,Z.jsx)(l.Z,{component:"h1",variant:"h5",sx:{color:"white"},children:"Enregistrement"}),(0,Z.jsxs)(t.Z,{component:"form",onSubmit:j((function(e){return h.Z.Account.register(e).then((function(){v.Am.success("Registration successful - you can now login"),x("/login")})).catch((function(e){return function(e){e&&e.forEach((function(e){e.includes("Password")?S("password",{message:e}):e.includes("Email")?S("email",{message:e}):e.includes("Username")&&S("username",{message:e})})),console.log(e)}(e)}))})),noValidate:!0,sx:{mt:1},children:[(0,Z.jsx)(c.Z,(0,a.Z)((0,a.Z)({margin:"normal",fullWidth:!0,label:"Username",autoFocus:!0},b("username",{required:"Username is required"})),{},{error:!!P.username,helperText:null===P||void 0===P||null===(e=P.username)||void 0===e?void 0:e.message})),(0,Z.jsx)(c.Z,(0,a.Z)((0,a.Z)({margin:"normal",fullWidth:!0,label:"Email address"},b("email",{required:"Email is required",pattern:{value:/^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,message:"Not a valid email address"}})),{},{error:!!P.email,helperText:null===P||void 0===P||null===(r=P.email)||void 0===r?void 0:r.message})),(0,Z.jsx)(c.Z,(0,a.Z)((0,a.Z)({margin:"normal",fullWidth:!0,label:"Password",type:"password"},b("password",{required:"Password is required",pattern:{value:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,message:"Password is not complex enough"}})),{},{error:!!P.password,helperText:null===P||void 0===P||null===(n=P.password)||void 0===n?void 0:n.message})),(0,Z.jsx)(g.Z,{disabled:!z,loading:k,type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Enregistrer"}),(0,Z.jsx)(u.ZP,{container:!0,children:(0,Z.jsx)(u.ZP,{item:!0,children:(0,Z.jsx)(f.rU,{to:"/login",children:"Connectez vous."})})})]})]})})}},7961:function(e,r,n){var a=n(74223),t=n(80184);r.Z=(0,a.Z)((0,t.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"}),"LockOutlined")},60220:function(e,r,n){n.d(r,{Z:function(){return x}});var a=n(29439),t=n(63366),o=n(87462),s=n(72791),i=(n(52007),n(28182)),l=n(90767),c=n(47630),u=n(31402),d=n(74223),m=n(80184),f=(0,d.Z)((0,m.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),v=n(72800),h=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],g=(0,c.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,r){var n=e.ownerState;return[r.root,r[n.variant],n.colorDefault&&r.colorDefault]}})((function(e){var r=e.theme,n=e.ownerState;return(0,o.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:r.typography.fontFamily,fontSize:r.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===n.variant&&{borderRadius:r.shape.borderRadius},"square"===n.variant&&{borderRadius:0},n.colorDefault&&{color:r.palette.background.default,backgroundColor:"light"===r.palette.mode?r.palette.grey[400]:r.palette.grey[600]})})),p=(0,c.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,r){return r.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Z=(0,c.ZP)(f,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,r){return r.fallback}})({width:"75%",height:"75%"});var x=s.forwardRef((function(e,r){var n=(0,u.Z)({props:e,name:"MuiAvatar"}),c=n.alt,d=n.children,f=n.className,x=n.component,w=void 0===x?"div":x,b=n.imgProps,j=n.sizes,S=n.src,y=n.srcSet,k=n.variant,P=void 0===k?"circular":k,z=(0,t.Z)(n,h),R=null,A=function(e){var r=e.crossOrigin,n=e.referrerPolicy,t=e.src,o=e.srcSet,i=s.useState(!1),l=(0,a.Z)(i,2),c=l[0],u=l[1];return s.useEffect((function(){if(t||o){u(!1);var e=!0,a=new Image;return a.onload=function(){e&&u("loaded")},a.onerror=function(){e&&u("error")},a.crossOrigin=r,a.referrerPolicy=n,a.src=t,o&&(a.srcset=o),function(){e=!1}}}),[r,n,t,o]),c}((0,o.Z)({},b,{src:S,srcSet:y})),q=S||y,M=q&&"error"!==A,D=(0,o.Z)({},n,{colorDefault:!M,component:w,variant:P}),E=function(e){var r=e.classes,n={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,l.Z)(n,v.$,r)}(D);return R=M?(0,m.jsx)(p,(0,o.Z)({alt:c,src:S,srcSet:y,sizes:j,ownerState:D,className:E.img},b)):null!=d?d:q&&c?c[0]:(0,m.jsx)(Z,{className:E.fallback}),(0,m.jsx)(g,(0,o.Z)({as:w,ownerState:D,className:(0,i.Z)(E.root,f),ref:r},z,{children:R}))}))},72800:function(e,r,n){n.d(r,{$:function(){return t}});var a=n(95159);function t(e){return(0,a.Z)("MuiAvatar",e)}var o=(0,n(30208).Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);r.Z=o},30585:function(){}}]);
//# sourceMappingURL=915.c144a4b6.chunk.js.map