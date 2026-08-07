(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.PlumberViewer={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},l=(e,r,i)=>(i=e==null?{}:t(a(e)),c(r||!e||!e.__esModule?n(i,`default`,{value:e,enumerable:!0}):i,e)),u=s(((e,t)=>{(function(){var n,r=`Expected a function`,i=`__lodash_hash_undefined__`,a=`__lodash_placeholder__`,o=1,s=2,c=8,l=16,u=32,d=64,f=128,p=256,m=512,h=1/0,g=9007199254740991,_=NaN,v=4294967295,y=v-1,b=v>>>1,x=[[`ary`,f],[`bind`,o],[`bindKey`,s],[`curry`,c],[`curryRight`,l],[`flip`,m],[`partial`,u],[`partialRight`,d],[`rearg`,p]],ee=`[object Arguments]`,te=`[object Array]`,ne=`[object AsyncFunction]`,re=`[object Boolean]`,ie=`[object Date]`,ae=`[object DOMException]`,oe=`[object Error]`,se=`[object Function]`,ce=`[object GeneratorFunction]`,le=`[object Map]`,ue=`[object Number]`,de=`[object Null]`,fe=`[object Object]`,pe=`[object Promise]`,me=`[object Proxy]`,he=`[object RegExp]`,ge=`[object Set]`,_e=`[object String]`,ve=`[object Symbol]`,ye=`[object Undefined]`,be=`[object WeakMap]`,xe=`[object WeakSet]`,Se=`[object ArrayBuffer]`,Ce=`[object DataView]`,we=`[object Float32Array]`,S=`[object Float64Array]`,Te=`[object Int8Array]`,Ee=`[object Int16Array]`,De=`[object Int32Array]`,C=`[object Uint8Array]`,Oe=`[object Uint8ClampedArray]`,ke=`[object Uint16Array]`,Ae=`[object Uint32Array]`,je=/\b__p \+= '';/g,Me=/\b(__p \+=) '' \+/g,Ne=/(__e\(.*?\)|\b__t\)) \+\n'';/g,Pe=/&(?:amp|lt|gt|quot|#39);/g,Fe=/[&<>"']/g,Ie=RegExp(Pe.source),Le=RegExp(Fe.source),Re=/<%-([\s\S]+?)%>/g,ze=/<%([\s\S]+?)%>/g,Be=/<%=([\s\S]+?)%>/g,Ve=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,He=/^\w*$/,Ue=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,We=/[\\^$.*+?()[\]{}|]/g,Ge=RegExp(We.source),Ke=/^\s+/,w=/\s/,qe=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Je=/\{\n\/\* \[wrapped with (.+)\] \*/,Ye=/,? & /,Xe=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,T=/[()=,{}\[\]\/\s]/,Ze=/\\(\\)?/g,Qe=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,E=/\w*$/,$e=/^[-+]0x[0-9a-f]+$/i,et=/^0b[01]+$/i,tt=/^\[object .+?Constructor\]$/,nt=/^0o[0-7]+$/i,rt=/^(?:0|[1-9]\d*)$/,it=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,at=/($^)/,ot=/['\n\r\u2028\u2029\\]/g,st=`\\ud800-\\udfff`,ct=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,lt=`\\u2700-\\u27bf`,D=`a-z\\xdf-\\xf6\\xf8-\\xff`,ut=`\\xac\\xb1\\xd7\\xf7`,dt=`\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf`,O=`\\u2000-\\u206f`,ft=` \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000`,pt=`A-Z\\xc0-\\xd6\\xd8-\\xde`,mt=`\\ufe0e\\ufe0f`,ht=ut+dt+O+ft,k=`['’]`,A=`[`+st+`]`,j=`[`+ht+`]`,gt=`[`+ct+`]`,_t=`\\d+`,vt=`[`+lt+`]`,yt=`[`+D+`]`,bt=`[^`+st+ht+_t+lt+D+pt+`]`,xt=`\\ud83c[\\udffb-\\udfff]`,St=`(?:`+gt+`|`+xt+`)`,Ct=`[^`+st+`]`,wt=`(?:\\ud83c[\\udde6-\\uddff]){2}`,Tt=`[\\ud800-\\udbff][\\udc00-\\udfff]`,Et=`[`+pt+`]`,Dt=`\\u200d`,Ot=`(?:`+yt+`|`+bt+`)`,kt=`(?:`+Et+`|`+bt+`)`,At=`(?:`+k+`(?:d|ll|m|re|s|t|ve))?`,jt=`(?:`+k+`(?:D|LL|M|RE|S|T|VE))?`,Mt=St+`?`,Nt=`[`+mt+`]?`,Pt=`(?:`+Dt+`(?:`+[Ct,wt,Tt].join(`|`)+`)`+Nt+Mt+`)*`,Ft=`\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])`,It=`\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])`,Lt=Nt+Mt+Pt,Rt=`(?:`+[vt,wt,Tt].join(`|`)+`)`+Lt,zt=`(?:`+[Ct+gt+`?`,gt,wt,Tt,A].join(`|`)+`)`,Bt=RegExp(k,`g`),Vt=RegExp(gt,`g`),Ht=RegExp(xt+`(?=`+xt+`)|`+zt+Lt,`g`),Ut=RegExp([Et+`?`+yt+`+`+At+`(?=`+[j,Et,`$`].join(`|`)+`)`,kt+`+`+jt+`(?=`+[j,Et+Ot,`$`].join(`|`)+`)`,Et+`?`+Ot+`+`+At,Et+`+`+jt,It,Ft,_t,Rt].join(`|`),`g`),Wt=RegExp(`[`+Dt+st+ct+mt+`]`),M=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Gt=`Array.Buffer.DataView.Date.Error.Float32Array.Float64Array.Function.Int8Array.Int16Array.Int32Array.Map.Math.Object.Promise.RegExp.Set.String.Symbol.TypeError.Uint8Array.Uint8ClampedArray.Uint16Array.Uint32Array.WeakMap._.clearTimeout.isFinite.parseInt.setTimeout`.split(`.`),Kt=-1,N={};N[we]=N[S]=N[Te]=N[Ee]=N[De]=N[C]=N[Oe]=N[ke]=N[Ae]=!0,N[ee]=N[te]=N[Se]=N[re]=N[Ce]=N[ie]=N[oe]=N[se]=N[le]=N[ue]=N[fe]=N[he]=N[ge]=N[_e]=N[be]=!1;var P={};P[ee]=P[te]=P[Se]=P[Ce]=P[re]=P[ie]=P[we]=P[S]=P[Te]=P[Ee]=P[De]=P[le]=P[ue]=P[fe]=P[he]=P[ge]=P[_e]=P[ve]=P[C]=P[Oe]=P[ke]=P[Ae]=!0,P[oe]=P[se]=P[be]=!1;var F={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,Ç:`C`,ç:`c`,Ð:`D`,ð:`d`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,è:`e`,é:`e`,ê:`e`,ë:`e`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,ì:`i`,í:`i`,î:`i`,ï:`i`,Ñ:`N`,ñ:`n`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,ù:`u`,ú:`u`,û:`u`,ü:`u`,Ý:`Y`,ý:`y`,ÿ:`y`,Æ:`Ae`,æ:`ae`,Þ:`Th`,þ:`th`,ß:`ss`,Ā:`A`,Ă:`A`,Ą:`A`,ā:`a`,ă:`a`,ą:`a`,Ć:`C`,Ĉ:`C`,Ċ:`C`,Č:`C`,ć:`c`,ĉ:`c`,ċ:`c`,č:`c`,Ď:`D`,Đ:`D`,ď:`d`,đ:`d`,Ē:`E`,Ĕ:`E`,Ė:`E`,Ę:`E`,Ě:`E`,ē:`e`,ĕ:`e`,ė:`e`,ę:`e`,ě:`e`,Ĝ:`G`,Ğ:`G`,Ġ:`G`,Ģ:`G`,ĝ:`g`,ğ:`g`,ġ:`g`,ģ:`g`,Ĥ:`H`,Ħ:`H`,ĥ:`h`,ħ:`h`,Ĩ:`I`,Ī:`I`,Ĭ:`I`,Į:`I`,İ:`I`,ĩ:`i`,ī:`i`,ĭ:`i`,į:`i`,ı:`i`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,ĸ:`k`,Ĺ:`L`,Ļ:`L`,Ľ:`L`,Ŀ:`L`,Ł:`L`,ĺ:`l`,ļ:`l`,ľ:`l`,ŀ:`l`,ł:`l`,Ń:`N`,Ņ:`N`,Ň:`N`,Ŋ:`N`,ń:`n`,ņ:`n`,ň:`n`,ŋ:`n`,Ō:`O`,Ŏ:`O`,Ő:`O`,ō:`o`,ŏ:`o`,ő:`o`,Ŕ:`R`,Ŗ:`R`,Ř:`R`,ŕ:`r`,ŗ:`r`,ř:`r`,Ś:`S`,Ŝ:`S`,Ş:`S`,Š:`S`,ś:`s`,ŝ:`s`,ş:`s`,š:`s`,Ţ:`T`,Ť:`T`,Ŧ:`T`,ţ:`t`,ť:`t`,ŧ:`t`,Ũ:`U`,Ū:`U`,Ŭ:`U`,Ů:`U`,Ű:`U`,Ų:`U`,ũ:`u`,ū:`u`,ŭ:`u`,ů:`u`,ű:`u`,ų:`u`,Ŵ:`W`,ŵ:`w`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Ź:`Z`,Ż:`Z`,Ž:`Z`,ź:`z`,ż:`z`,ž:`z`,Ĳ:`IJ`,ĳ:`ij`,Œ:`Oe`,œ:`oe`,ŉ:`'n`,ſ:`s`},qt={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Jt={"&amp;":`&`,"&lt;":`<`,"&gt;":`>`,"&quot;":`"`,"&#39;":`'`},Yt={"\\":`\\`,"'":`'`,"\n":`n`,"\r":`r`,"\u2028":`u2028`,"\u2029":`u2029`},Xt=parseFloat,Zt=parseInt,Qt=typeof global==`object`&&global&&global.Object===Object&&global,$t=typeof self==`object`&&self&&self.Object===Object&&self,I=Qt||$t||Function(`return this`)(),en=typeof e==`object`&&e&&!e.nodeType&&e,tn=en&&typeof t==`object`&&t&&!t.nodeType&&t,nn=tn&&tn.exports===en,rn=nn&&Qt.process,L=function(){try{return tn&&tn.require&&tn.require(`util`).types||rn&&rn.binding&&rn.binding(`util`)}catch{}}(),an=L&&L.isArrayBuffer,on=L&&L.isDate,sn=L&&L.isMap,cn=L&&L.isRegExp,ln=L&&L.isSet,un=L&&L.isTypedArray;function dn(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function fn(e,t,n,r){for(var i=-1,a=e==null?0:e.length;++i<a;){var o=e[i];t(r,o,n(o),e)}return r}function pn(e,t){for(var n=-1,r=e==null?0:e.length;++n<r&&t(e[n],n,e)!==!1;);return e}function mn(e,t){for(var n=e==null?0:e.length;n--&&t(e[n],n,e)!==!1;);return e}function hn(e,t){for(var n=-1,r=e==null?0:e.length;++n<r;)if(!t(e[n],n,e))return!1;return!0}function gn(e,t){for(var n=-1,r=e==null?0:e.length,i=0,a=[];++n<r;){var o=e[n];t(o,n,e)&&(a[i++]=o)}return a}function _n(e,t){return!!(e!=null&&e.length)&&Dn(e,t,0)>-1}function vn(e,t,n){for(var r=-1,i=e==null?0:e.length;++r<i;)if(n(t,e[r]))return!0;return!1}function R(e,t){for(var n=-1,r=e==null?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}function z(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}function yn(e,t,n,r){var i=-1,a=e==null?0:e.length;for(r&&a&&(n=e[++i]);++i<a;)n=t(n,e[i],i,e);return n}function bn(e,t,n,r){var i=e==null?0:e.length;for(r&&i&&(n=e[--i]);i--;)n=t(n,e[i],i,e);return n}function xn(e,t){for(var n=-1,r=e==null?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}var Sn=jn(`length`);function Cn(e){return e.split(``)}function wn(e){return e.match(Xe)||[]}function Tn(e,t,n){var r;return n(e,function(e,n,i){if(t(e,n,i))return r=n,!1}),r}function En(e,t,n,r){for(var i=e.length,a=n+(r?1:-1);r?a--:++a<i;)if(t(e[a],a,e))return a;return-1}function Dn(e,t,n){return t===t?nr(e,t,n):En(e,kn,n)}function On(e,t,n,r){for(var i=n-1,a=e.length;++i<a;)if(r(e[i],t))return i;return-1}function kn(e){return e!==e}function An(e,t){var n=e==null?0:e.length;return n?Pn(e,t)/n:_}function jn(e){return function(t){return t==null?n:t[e]}}function Mn(e){return function(t){return e==null?n:e[t]}}function Nn(e,t,n,r,i){return i(e,function(e,i,a){n=r?(r=!1,e):t(n,e,i,a)}),n}function B(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}function Pn(e,t){for(var r,i=-1,a=e.length;++i<a;){var o=t(e[i]);o!==n&&(r=r===n?o:r+o)}return r}function Fn(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}function In(e,t){return R(t,function(t){return[t,e[t]]})}function Ln(e){return e&&e.slice(0,or(e)+1).replace(Ke,``)}function Rn(e){return function(t){return e(t)}}function zn(e,t){return R(t,function(t){return e[t]})}function Bn(e,t){return e.has(t)}function Vn(e,t){for(var n=-1,r=e.length;++n<r&&Dn(t,e[n],0)>-1;);return n}function Hn(e,t){for(var n=e.length;n--&&Dn(t,e[n],0)>-1;);return n}function Un(e,t){for(var n=e.length,r=0;n--;)e[n]===t&&++r;return r}var Wn=Mn(F),Gn=Mn(qt);function Kn(e){return`\\`+Yt[e]}function qn(e,t){return e==null?n:e[t]}function Jn(e){return Wt.test(e)}function Yn(e){return M.test(e)}function Xn(e){for(var t,n=[];!(t=e.next()).done;)n.push(t.value);return n}function Zn(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}function Qn(e,t){return function(n){return e(t(n))}}function $n(e,t){for(var n=-1,r=e.length,i=0,o=[];++n<r;){var s=e[n];(s===t||s===a)&&(e[n]=a,o[i++]=n)}return o}function er(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}function tr(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=[e,e]}),n}function nr(e,t,n){for(var r=n-1,i=e.length;++r<i;)if(e[r]===t)return r;return-1}function rr(e,t,n){for(var r=n+1;r--;)if(e[r]===t)return r;return r}function ir(e){return Jn(e)?cr(e):Sn(e)}function ar(e){return Jn(e)?lr(e):Cn(e)}function or(e){for(var t=e.length;t--&&w.test(e.charAt(t)););return t}var sr=Mn(Jt);function cr(e){for(var t=Ht.lastIndex=0;Ht.test(e);)++t;return t}function lr(e){return e.match(Ht)||[]}function ur(e){return e.match(Ut)||[]}var dr=(function e(t){t=t==null?I:dr.defaults(I.Object(),t,dr.pick(I,Gt));var w=t.Array,Xe=t.Date,st=t.Error,ct=t.Function,lt=t.Math,D=t.Object,ut=t.RegExp,dt=t.String,O=t.TypeError,ft=w.prototype,pt=ct.prototype,mt=D.prototype,ht=t[`__core-js_shared__`],k=pt.toString,A=mt.hasOwnProperty,j=0,gt=function(){var e=/[^.]+$/.exec(ht&&ht.keys&&ht.keys.IE_PROTO||``);return e?`Symbol(src)_1.`+e:``}(),_t=mt.toString,vt=k.call(D),yt=I._,bt=ut(`^`+k.call(A).replace(We,`\\$&`).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,`$1.*?`)+`$`),xt=nn?t.Buffer:n,St=t.Symbol,Ct=t.Uint8Array,wt=xt?xt.allocUnsafe:n,Tt=Qn(D.getPrototypeOf,D),Et=D.create,Dt=mt.propertyIsEnumerable,Ot=ft.splice,kt=St?St.isConcatSpreadable:n,At=St?St.iterator:n,jt=St?St.toStringTag:n,Mt=function(){try{var e=Io(D,`defineProperty`);return e({},``,{}),e}catch{}}(),Nt=t.clearTimeout!==I.clearTimeout&&t.clearTimeout,Pt=Xe&&Xe.now!==I.Date.now&&Xe.now,Ft=t.setTimeout!==I.setTimeout&&t.setTimeout,It=lt.ceil,Lt=lt.floor,Rt=D.getOwnPropertySymbols,zt=xt?xt.isBuffer:n,Ht=t.isFinite,Ut=ft.join,Wt=Qn(D.keys,D),M=lt.max,F=lt.min,qt=Xe.now,Jt=t.parseInt,Yt=lt.random,Qt=ft.reverse,$t=Io(t,`DataView`),en=Io(t,`Map`),tn=Io(t,`Promise`),rn=Io(t,`Set`),L=Io(t,`WeakMap`),Sn=Io(D,`create`),Cn=L&&new L,Mn={},nr=bs($t),cr=bs(en),lr=bs(tn),fr=bs(rn),pr=bs(L),mr=St?St.prototype:n,hr=mr?mr.valueOf:n,gr=mr?mr.toString:n;function V(e){if(X(e)&&!q(e)&&!(e instanceof H)){if(e instanceof yr)return e;if(A.call(e,`__wrapped__`))return Ss(e)}return new yr(e)}var _r=function(){function e(){}return function(t){if(!Y(t))return{};if(Et)return Et(t);e.prototype=t;var r=new e;return e.prototype=n,r}}();function vr(){}function yr(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=n}V.templateSettings={escape:Re,evaluate:ze,interpolate:Be,variable:``,imports:{_:V}},V.prototype=vr.prototype,V.prototype.constructor=V,yr.prototype=_r(vr.prototype),yr.prototype.constructor=yr;function H(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=v,this.__views__=[]}function br(){var e=new H(this.__wrapped__);return e.__actions__=qa(this.__actions__),e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=qa(this.__iteratees__),e.__takeCount__=this.__takeCount__,e.__views__=qa(this.__views__),e}function xr(){if(this.__filtered__){var e=new H(this);e.__dir__=-1,e.__filtered__=!0}else e=this.clone(),e.__dir__*=-1;return e}function Sr(){var e=this.__wrapped__.value(),t=this.__dir__,n=q(e),r=t<0,i=n?e.length:0,a=Bo(0,i,this.__views__),o=a.start,s=a.end,c=s-o,l=r?s:o-1,u=this.__iteratees__,d=u.length,f=0,p=F(c,this.__takeCount__);if(!n||!r&&i==c&&p==c)return Oa(e,this.__actions__);var m=[];outer:for(;c--&&f<p;){l+=t;for(var h=-1,g=e[l];++h<d;){var _=u[h],v=_.iteratee,y=_.type,b=v(g);if(y==2)g=b;else if(!b){if(y==1)continue outer;break outer}}m[f++]=g}return m}H.prototype=_r(vr.prototype),H.prototype.constructor=H;function Cr(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function wr(){this.__data__=Sn?Sn(null):{},this.size=0}function Tr(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=+!!t,t}function Er(e){var t=this.__data__;if(Sn){var r=t[e];return r===i?n:r}return A.call(t,e)?t[e]:n}function Dr(e){var t=this.__data__;return Sn?t[e]!==n:A.call(t,e)}function Or(e,t){var r=this.__data__;return this.size+=+!this.has(e),r[e]=Sn&&t===n?i:t,this}Cr.prototype.clear=wr,Cr.prototype.delete=Tr,Cr.prototype.get=Er,Cr.prototype.has=Dr,Cr.prototype.set=Or;function kr(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function Ar(){this.__data__=[],this.size=0}function jr(e){var t=this.__data__,n=ni(t,e);return n<0?!1:(n==t.length-1?t.pop():Ot.call(t,n,1),--this.size,!0)}function Mr(e){var t=this.__data__,r=ni(t,e);return r<0?n:t[r][1]}function Nr(e){return ni(this.__data__,e)>-1}function Pr(e,t){var n=this.__data__,r=ni(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}kr.prototype.clear=Ar,kr.prototype.delete=jr,kr.prototype.get=Mr,kr.prototype.has=Nr,kr.prototype.set=Pr;function Fr(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function Ir(){this.size=0,this.__data__={hash:new Cr,map:new(en||kr),string:new Cr}}function Lr(e){var t=Po(this,e).delete(e);return this.size-=+!!t,t}function Rr(e){return Po(this,e).get(e)}function zr(e){return Po(this,e).has(e)}function Br(e,t){var n=Po(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}Fr.prototype.clear=Ir,Fr.prototype.delete=Lr,Fr.prototype.get=Rr,Fr.prototype.has=zr,Fr.prototype.set=Br;function Vr(e){var t=-1,n=e==null?0:e.length;for(this.__data__=new Fr;++t<n;)this.add(e[t])}function Hr(e){return this.__data__.set(e,i),this}function Ur(e){return this.__data__.has(e)}Vr.prototype.add=Vr.prototype.push=Hr,Vr.prototype.has=Ur;function Wr(e){var t=this.__data__=new kr(e);this.size=t.size}function Gr(){this.__data__=new kr,this.size=0}function Kr(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}function qr(e){return this.__data__.get(e)}function Jr(e){return this.__data__.has(e)}function Yr(e,t){var n=this.__data__;if(n instanceof kr){var r=n.__data__;if(!en||r.length<199)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new Fr(r)}return n.set(e,t),this.size=n.size,this}Wr.prototype.clear=Gr,Wr.prototype.delete=Kr,Wr.prototype.get=qr,Wr.prototype.has=Jr,Wr.prototype.set=Yr;function Xr(e,t){var n=q(e),r=!n&&Yl(e),i=!n&&!r&&$l(e),a=!n&&!r&&!i&&wu(e),o=n||r||i||a,s=o?Fn(e.length,dt):[],c=s.length;for(var l in e)(t||A.call(e,l))&&!(o&&(l==`length`||i&&(l==`offset`||l==`parent`)||a&&(l==`buffer`||l==`byteLength`||l==`byteOffset`)||Jo(l,c)))&&s.push(l);return s}function Zr(e){var t=e.length;return t?e[ca(0,t-1)]:n}function Qr(e,t){return _s(qa(e),ci(t,0,e.length))}function $r(e){return _s(qa(e))}function ei(e,t,r){(r!==n&&!Kl(e[t],r)||r===n&&!(t in e))&&oi(e,t,r)}function ti(e,t,r){var i=e[t];(!(A.call(e,t)&&Kl(i,r))||r===n&&!(t in e))&&oi(e,t,r)}function ni(e,t){for(var n=e.length;n--;)if(Kl(e[n][0],t))return n;return-1}function ri(e,t,n,r){return mi(e,function(e,i,a){t(r,e,n(e),a)}),r}function ii(e,t){return e&&Ja(t,$(t),e)}function ai(e,t){return e&&Ja(t,id(t),e)}function oi(e,t,n){t==`__proto__`&&Mt?Mt(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}function si(e,t){for(var r=-1,i=t.length,a=w(i),o=e==null;++r<i;)a[r]=o?n:Qu(e,t[r]);return a}function ci(e,t,r){return e===e&&(r!==n&&(e=e<=r?e:r),t!==n&&(e=e>=t?e:t)),e}function li(e,t,r,i,a,o){var s,c=t&1,l=t&2,u=t&4;if(r&&(s=a?r(e,i,a,o):r(e)),s!==n)return s;if(!Y(e))return e;var d=q(e);if(d){if(s=Uo(e),!c)return qa(e,s)}else{var f=K(e),p=f==se||f==ce;if($l(e))return La(e,c);if(f==fe||f==ee||p&&!a){if(s=l||p?{}:Wo(e),!c)return l?Xa(e,ai(s,e)):Ya(e,ii(s,e))}else{if(!P[f])return a?e:{};s=Go(e,f,c)}}o||=new Wr;var m=o.get(e);if(m)return m;o.set(e,s),xu(e)?e.forEach(function(n){s.add(li(n,t,r,n,e,o))}):uu(e)&&e.forEach(function(n,i){s.set(i,li(n,t,r,i,e,o))});var h=d?n:(u?l?Ao:ko:l?id:$)(e);return pn(h||e,function(n,i){h&&(i=n,n=e[i]),ti(s,i,li(n,t,r,i,e,o))}),s}function ui(e){var t=$(e);return function(n){return di(n,e,t)}}function di(e,t,r){var i=r.length;if(e==null)return!i;for(e=D(e);i--;){var a=r[i],o=t[a],s=e[a];if(s===n&&!(a in e)||!o(s))return!1}return!0}function fi(e,t,i){if(typeof e!=`function`)throw new O(r);return ps(function(){e.apply(n,i)},t)}function pi(e,t,n,r){var i=-1,a=_n,o=!0,s=e.length,c=[],l=t.length;if(!s)return c;n&&(t=R(t,Rn(n))),r?(a=vn,o=!1):t.length>=200&&(a=Bn,o=!1,t=new Vr(t));outer:for(;++i<s;){var u=e[i],d=n==null?u:n(u);if(u=r||u!==0?u:0,o&&d===d){for(var f=l;f--;)if(t[f]===d)continue outer;c.push(u)}else a(t,d,r)||c.push(u)}return c}var mi=$a(Si),hi=$a(Ci,!0);function gi(e,t){var n=!0;return mi(e,function(e,r,i){return n=!!t(e,r,i),n}),n}function _i(e,t,r){for(var i=-1,a=e.length;++i<a;){var o=e[i],s=t(o);if(s!=null&&(c===n?s===s&&!Cu(s):r(s,c)))var c=s,l=o}return l}function vi(e,t,r,i){var a=e.length;for(r=Z(r),r<0&&(r=-r>a?0:a+r),i=i===n||i>a?a:Z(i),i<0&&(i+=a),i=r>i?0:Mu(i);r<i;)e[r++]=t;return e}function yi(e,t){var n=[];return mi(e,function(e,r,i){t(e,r,i)&&n.push(e)}),n}function U(e,t,n,r,i){var a=-1,o=e.length;for(n||=qo,i||=[];++a<o;){var s=e[a];t>0&&n(s)?t>1?U(s,t-1,n,r,i):z(i,s):r||(i[i.length]=s)}return i}var bi=eo(),xi=eo(!0);function Si(e,t){return e&&bi(e,t,$)}function Ci(e,t){return e&&xi(e,t,$)}function wi(e,t){return gn(t,function(t){return su(e[t])})}function Ti(e,t){t=Na(t,e);for(var r=0,i=t.length;e!=null&&r<i;)e=e[ys(t[r++])];return r&&r==i?e:n}function Ei(e,t,n){var r=t(e);return q(e)?r:z(r,n(e))}function Di(e){return e==null?e===n?ye:de:jt&&jt in D(e)?Lo(e):ss(e)}function Oi(e,t){return e>t}function ki(e,t){return e!=null&&A.call(e,t)}function Ai(e,t){return e!=null&&t in D(e)}function ji(e,t,n){return e>=F(t,n)&&e<M(t,n)}function Mi(e,t,r){for(var i=r?vn:_n,a=e[0].length,o=e.length,s=o,c=w(o),l=1/0,u=[];s--;){var d=e[s];s&&t&&(d=R(d,Rn(t))),l=F(d.length,l),c[s]=!r&&(t||a>=120&&d.length>=120)?new Vr(s&&d):n}d=e[0];var f=-1,p=c[0];outer:for(;++f<a&&u.length<l;){var m=d[f],h=t?t(m):m;if(m=r||m!==0?m:0,!(p?Bn(p,h):i(u,h,r))){for(s=o;--s;){var g=c[s];if(!(g?Bn(g,h):i(e[s],h,r)))continue outer}p&&p.push(h),u.push(m)}}return u}function Ni(e,t,n,r){return Si(e,function(e,i,a){t(r,n(e),i,a)}),r}function Pi(e,t,r){t=Na(t,e),e=ls(e,t);var i=e==null?e:e[ys(qs(t))];return i==null?n:dn(i,e,r)}function Fi(e){return X(e)&&Di(e)==ee}function Ii(e){return X(e)&&Di(e)==Se}function Li(e){return X(e)&&Di(e)==ie}function Ri(e,t,n,r,i){return e===t?!0:e==null||t==null||!X(e)&&!X(t)?e!==e&&t!==t:zi(e,t,n,r,Ri,i)}function zi(e,t,n,r,i,a){var o=q(e),s=q(t),c=o?te:K(e),l=s?te:K(t);c=c==ee?fe:c,l=l==ee?fe:l;var u=c==fe,d=l==fe,f=c==l;if(f&&$l(e)){if(!$l(t))return!1;o=!0,u=!1}if(f&&!u)return a||=new Wr,o||wu(e)?To(e,t,n,r,i,a):Eo(e,t,c,n,r,i,a);if(!(n&1)){var p=u&&A.call(e,`__wrapped__`),m=d&&A.call(t,`__wrapped__`);if(p||m){var h=p?e.value():e,g=m?t.value():t;return a||=new Wr,i(h,g,n,r,a)}}return f?(a||=new Wr,Do(e,t,n,r,i,a)):!1}function Bi(e){return X(e)&&K(e)==le}function Vi(e,t,r,i){var a=r.length,o=a,s=!i;if(e==null)return!o;for(e=D(e);a--;){var c=r[a];if(s&&c[2]?c[1]!==e[c[0]]:!(c[0]in e))return!1}for(;++a<o;){c=r[a];var l=c[0],u=e[l],d=c[1];if(s&&c[2]){if(u===n&&!(l in e))return!1}else{var f=new Wr;if(i)var p=i(u,d,l,e,t,f);if(!(p===n?Ri(d,u,3,i,f):p))return!1}}return!0}function Hi(e){return!Y(e)||$o(e)?!1:(su(e)?bt:tt).test(bs(e))}function Ui(e){return X(e)&&Di(e)==he}function Wi(e){return X(e)&&K(e)==ge}function Gi(e){return X(e)&&lu(e.length)&&!!N[Di(e)]}function Ki(e){return typeof e==`function`?e:e==null?ff:typeof e==`object`?q(e)?Qi(e[0],e[1]):Zi(e):Tf(e)}function qi(e){if(!ts(e))return Wt(e);var t=[];for(var n in D(e))A.call(e,n)&&n!=`constructor`&&t.push(n);return t}function Ji(e){if(!Y(e))return os(e);var t=ts(e),n=[];for(var r in e)r==`constructor`&&(t||!A.call(e,r))||n.push(r);return n}function Yi(e,t){return e<t}function Xi(e,t){var n=-1,r=Zl(e)?w(e.length):[];return mi(e,function(e,i,a){r[++n]=t(e,i,a)}),r}function Zi(e){var t=Fo(e);return t.length==1&&t[0][2]?rs(t[0][0],t[0][1]):function(n){return n===e||Vi(n,e,t)}}function Qi(e,t){return Xo(e)&&ns(t)?rs(ys(e),t):function(r){var i=Qu(r,e);return i===n&&i===t?ed(r,e):Ri(t,i,3)}}function $i(e,t,r,i,a){e!==t&&bi(t,function(o,s){if(a||=new Wr,Y(o))ea(e,t,s,r,$i,i,a);else{var c=i?i(ds(e,s),o,s+``,e,t,a):n;c===n&&(c=o),ei(e,s,c)}},id)}function ea(e,t,r,i,a,o,s){var c=ds(e,r),l=ds(t,r),u=s.get(l);if(u){ei(e,r,u);return}var d=o?o(c,l,r+``,e,t,s):n,f=d===n;if(f){var p=q(l),m=!p&&$l(l),h=!p&&!m&&wu(l);d=l,p||m||h?q(c)?d=c:J(c)?d=qa(c):m?(f=!1,d=La(l,!0)):h?(f=!1,d=Ha(l,!0)):d=[]:vu(l)||Yl(l)?(d=c,Yl(c)?d=Pu(c):(!Y(c)||su(c))&&(d=Wo(l))):f=!1}f&&(s.set(l,d),a(d,l,i,o,s),s.delete(l)),ei(e,r,d)}function ta(e,t){var r=e.length;if(r)return t+=t<0?r:0,Jo(t,r)?e[t]:n}function na(e,t,n){t=t.length?R(t,function(e){return q(e)?function(t){return Ti(t,e.length===1?e[0]:e)}:e}):[ff];var r=-1;return t=R(t,Rn(G())),B(Xi(e,function(e,n,i){return{criteria:R(t,function(t){return t(e)}),index:++r,value:e}}),function(e,t){return Wa(e,t,n)})}function ra(e,t){return ia(e,t,function(t,n){return ed(e,n)})}function ia(e,t,n){for(var r=-1,i=t.length,a={};++r<i;){var o=t[r],s=Ti(e,o);n(s,o)&&pa(a,Na(o,e),s)}return a}function aa(e){return function(t){return Ti(t,e)}}function oa(e,t,n,r){var i=r?On:Dn,a=-1,o=t.length,s=e;for(e===t&&(t=qa(t)),n&&(s=R(e,Rn(n)));++a<o;)for(var c=0,l=t[a],u=n?n(l):l;(c=i(s,u,c,r))>-1;)s!==e&&Ot.call(s,c,1),Ot.call(e,c,1);return e}function sa(e,t){for(var n=e?t.length:0,r=n-1;n--;){var i=t[n];if(n==r||i!==a){var a=i;Jo(i)?Ot.call(e,i,1):Ta(e,i)}}return e}function ca(e,t){return e+Lt(Yt()*(t-e+1))}function la(e,t,n,r){for(var i=-1,a=M(It((t-e)/(n||1)),0),o=w(a);a--;)o[r?a:++i]=e,e+=n;return o}function ua(e,t){var n=``;if(!e||t<1||t>g)return n;do t%2&&(n+=e),t=Lt(t/2),t&&(e+=e);while(t);return n}function W(e,t){return ms(cs(e,t,ff),e+``)}function da(e){return Zr(Sd(e))}function fa(e,t){var n=Sd(e);return _s(n,ci(t,0,n.length))}function pa(e,t,r,i){if(!Y(e))return e;t=Na(t,e);for(var a=-1,o=t.length,s=o-1,c=e;c!=null&&++a<o;){var l=ys(t[a]),u=r;if(l===`__proto__`||l===`constructor`||l===`prototype`)return e;if(a!=s){var d=c[l];u=i?i(d,l,c):n,u===n&&(u=Y(d)?d:Jo(t[a+1])?[]:{})}ti(c,l,u),c=c[l]}return e}var ma=Cn?function(e,t){return Cn.set(e,t),e}:ff,ha=Mt?function(e,t){return Mt(e,`toString`,{configurable:!0,enumerable:!1,value:cf(t),writable:!0})}:ff;function ga(e){return _s(Sd(e))}function _a(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),n=n>i?i:n,n<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=w(i);++r<i;)a[r]=e[r+t];return a}function va(e,t){var n;return mi(e,function(e,r,i){return n=t(e,r,i),!n}),!!n}function ya(e,t,n){var r=0,i=e==null?r:e.length;if(typeof t==`number`&&t===t&&i<=b){for(;r<i;){var a=r+i>>>1,o=e[a];o!==null&&!Cu(o)&&(n?o<=t:o<t)?r=a+1:i=a}return i}return ba(e,t,ff,n)}function ba(e,t,r,i){var a=0,o=e==null?0:e.length;if(o===0)return 0;t=r(t);for(var s=t!==t,c=t===null,l=Cu(t),u=t===n;a<o;){var d=Lt((a+o)/2),f=r(e[d]),p=f!==n,m=f===null,h=f===f,g=Cu(f);if(s)var _=i||h;else _=u?h&&(i||p):c?h&&p&&(i||!m):l?h&&p&&!m&&(i||!g):m||g?!1:i?f<=t:f<t;_?a=d+1:o=d}return F(o,y)}function xa(e,t){for(var n=-1,r=e.length,i=0,a=[];++n<r;){var o=e[n],s=t?t(o):o;if(!n||!Kl(s,c)){var c=s;a[i++]=o===0?0:o}}return a}function Sa(e){return typeof e==`number`?e:Cu(e)?_:+e}function Ca(e){if(typeof e==`string`)return e;if(q(e))return R(e,Ca)+``;if(Cu(e))return gr?gr.call(e):``;var t=e+``;return t==`0`&&1/e==-1/0?`-0`:t}function wa(e,t,n){var r=-1,i=_n,a=e.length,o=!0,s=[],c=s;if(n)o=!1,i=vn;else if(a>=200){var l=t?null:yo(e);if(l)return er(l);o=!1,i=Bn,c=new Vr}else c=t?[]:s;outer:for(;++r<a;){var u=e[r],d=t?t(u):u;if(u=n||u!==0?u:0,o&&d===d){for(var f=c.length;f--;)if(c[f]===d)continue outer;t&&c.push(d),s.push(u)}else i(c,d,n)||(c!==s&&c.push(d),s.push(u))}return s}function Ta(e,t){t=Na(t,e);var n=-1,r=t.length;if(!r)return!0;for(;++n<r;){var i=ys(t[n]);if(i===`__proto__`&&!A.call(e,`__proto__`)||(i===`constructor`||i===`prototype`)&&n<r-1)return!1}var a=ls(e,t);return a==null||delete a[ys(qs(t))]}function Ea(e,t,n,r){return pa(e,t,n(Ti(e,t)),r)}function Da(e,t,n,r){for(var i=e.length,a=r?i:-1;(r?a--:++a<i)&&t(e[a],a,e););return n?_a(e,r?0:a,r?a+1:i):_a(e,r?a+1:0,r?i:a)}function Oa(e,t){var n=e;return n instanceof H&&(n=n.value()),yn(t,function(e,t){return t.func.apply(t.thisArg,z([e],t.args))},n)}function ka(e,t,n){var r=e.length;if(r<2)return r?wa(e[0]):[];for(var i=-1,a=w(r);++i<r;)for(var o=e[i],s=-1;++s<r;)s!=i&&(a[i]=pi(a[i]||o,e[s],t,n));return wa(U(a,1),t,n)}function Aa(e,t,r){for(var i=-1,a=e.length,o=t.length,s={};++i<a;){var c=i<o?t[i]:n;r(s,e[i],c)}return s}function ja(e){return J(e)?e:[]}function Ma(e){return typeof e==`function`?e:ff}function Na(e,t){return q(e)?e:Xo(e,t)?[e]:vs(Q(e))}var Pa=W;function Fa(e,t,r){var i=e.length;return r=r===n?i:r,!t&&r>=i?e:_a(e,t,r)}var Ia=Nt||function(e){return I.clearTimeout(e)};function La(e,t){if(t)return e.slice();var n=e.length,r=wt?wt(n):new e.constructor(n);return e.copy(r),r}function Ra(e){var t=new e.constructor(e.byteLength);return new Ct(t).set(new Ct(e)),t}function za(e,t){var n=t?Ra(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}function Ba(e){var t=new e.constructor(e.source,E.exec(e));return t.lastIndex=e.lastIndex,t}function Va(e){return hr?D(hr.call(e)):{}}function Ha(e,t){var n=t?Ra(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}function Ua(e,t){if(e!==t){var r=e!==n,i=e===null,a=e===e,o=Cu(e),s=t!==n,c=t===null,l=t===t,u=Cu(t);if(!c&&!u&&!o&&e>t||o&&s&&l&&!c&&!u||i&&s&&l||!r&&l||!a)return 1;if(!i&&!o&&!u&&e<t||u&&r&&a&&!i&&!o||c&&r&&a||!s&&a||!l)return-1}return 0}function Wa(e,t,n){for(var r=-1,i=e.criteria,a=t.criteria,o=i.length,s=n.length;++r<o;){var c=Ua(i[r],a[r]);if(c)return r>=s?c:c*(n[r]==`desc`?-1:1)}return e.index-t.index}function Ga(e,t,n,r){for(var i=-1,a=e.length,o=n.length,s=-1,c=t.length,l=M(a-o,0),u=w(c+l),d=!r;++s<c;)u[s]=t[s];for(;++i<o;)(d||i<a)&&(u[n[i]]=e[i]);for(;l--;)u[s++]=e[i++];return u}function Ka(e,t,n,r){for(var i=-1,a=e.length,o=-1,s=n.length,c=-1,l=t.length,u=M(a-s,0),d=w(u+l),f=!r;++i<u;)d[i]=e[i];for(var p=i;++c<l;)d[p+c]=t[c];for(;++o<s;)(f||i<a)&&(d[p+n[o]]=e[i++]);return d}function qa(e,t){var n=-1,r=e.length;for(t||=w(r);++n<r;)t[n]=e[n];return t}function Ja(e,t,r,i){var a=!r;r||={};for(var o=-1,s=t.length;++o<s;){var c=t[o],l=i?i(r[c],e[c],c,r,e):n;l===n&&(l=e[c]),a?oi(r,c,l):ti(r,c,l)}return r}function Ya(e,t){return Ja(e,Ro(e),t)}function Xa(e,t){return Ja(e,zo(e),t)}function Za(e,t){return function(n,r){var i=q(n)?fn:ri,a=t?t():{};return i(n,e,G(r,2),a)}}function Qa(e){return W(function(t,r){var i=-1,a=r.length,o=a>1?r[a-1]:n,s=a>2?r[2]:n;for(o=e.length>3&&typeof o==`function`?(a--,o):n,s&&Yo(r[0],r[1],s)&&(o=a<3?n:o,a=1),t=D(t);++i<a;){var c=r[i];c&&e(t,c,i,o)}return t})}function $a(e,t){return function(n,r){if(n==null)return n;if(!Zl(n))return e(n,r);for(var i=n.length,a=t?i:-1,o=D(n);(t?a--:++a<i)&&r(o[a],a,o)!==!1;);return n}}function eo(e){return function(t,n,r){for(var i=-1,a=D(t),o=r(t),s=o.length;s--;){var c=o[e?s:++i];if(n(a[c],c,a)===!1)break}return t}}function to(e,t,n){var r=t&o,i=io(e);function a(){return(this&&this!==I&&this instanceof a?i:e).apply(r?n:this,arguments)}return a}function no(e){return function(t){t=Q(t);var r=Jn(t)?ar(t):n,i=r?r[0]:t.charAt(0),a=r?Fa(r,1).join(``):t.slice(1);return i[e]()+a}}function ro(e){return function(t){return yn(nf(kd(t).replace(Bt,``)),e,``)}}function io(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=_r(e.prototype),r=e.apply(n,t);return Y(r)?r:n}}function ao(e,t,r){var i=io(e);function a(){for(var o=arguments.length,s=w(o),c=o,l=No(a);c--;)s[c]=arguments[c];var u=o<3&&s[0]!==l&&s[o-1]!==l?[]:$n(s,l);return o-=u.length,o<r?_o(e,t,co,a.placeholder,n,s,u,n,n,r-o):dn(this&&this!==I&&this instanceof a?i:e,this,s)}return a}function oo(e){return function(t,r,i){var a=D(t);if(!Zl(t)){var o=G(r,3);t=$(t),r=function(e){return o(a[e],e,a)}}var s=e(t,r,i);return s>-1?a[o?t[s]:s]:n}}function so(e){return Oo(function(t){var i=t.length,a=i,o=yr.prototype.thru;for(e&&t.reverse();a--;){var s=t[a];if(typeof s!=`function`)throw new O(r);if(o&&!l&&Mo(s)==`wrapper`)var l=new yr([],!0)}for(a=l?a:i;++a<i;){s=t[a];var d=Mo(s),m=d==`wrapper`?jo(s):n;l=m&&Qo(m[0])&&m[1]==(f|c|u|p)&&!m[4].length&&m[9]==1?l[Mo(m[0])].apply(l,m[3]):s.length==1&&Qo(s)?l[d]():l.thru(s)}return function(){var e=arguments,n=e[0];if(l&&e.length==1&&q(n))return l.plant(n).value();for(var r=0,a=i?t[r].apply(this,e):n;++r<i;)a=t[r].call(this,a);return a}})}function co(e,t,r,i,a,u,d,p,h,g){var _=t&f,v=t&o,y=t&s,b=t&(c|l),x=t&m,ee=y?n:io(e);function te(){for(var n=arguments.length,o=w(n),s=n;s--;)o[s]=arguments[s];if(b)var c=No(te),l=Un(o,c);if(i&&(o=Ga(o,i,a,b)),u&&(o=Ka(o,u,d,b)),n-=l,b&&n<g){var f=$n(o,c);return _o(e,t,co,te.placeholder,r,o,f,p,h,g-n)}var m=v?r:this,ne=y?m[e]:e;return n=o.length,p?o=us(o,p):x&&n>1&&o.reverse(),_&&h<n&&(o.length=h),this&&this!==I&&this instanceof te&&(ne=ee||io(ne)),ne.apply(m,o)}return te}function lo(e,t){return function(n,r){return Ni(n,e,t(r),{})}}function uo(e,t){return function(r,i){var a;if(r===n&&i===n)return t;if(r!==n&&(a=r),i!==n){if(a===n)return i;typeof r==`string`||typeof i==`string`?(r=Ca(r),i=Ca(i)):(r=Sa(r),i=Sa(i)),a=e(r,i)}return a}}function fo(e){return Oo(function(t){return t=R(t,Rn(G())),W(function(n){var r=this;return e(t,function(e){return dn(e,r,n)})})})}function po(e,t){t=t===n?` `:Ca(t);var r=t.length;if(r<2)return r?ua(t,e):t;var i=ua(t,It(e/ir(t)));return Jn(t)?Fa(ar(i),0,e).join(``):i.slice(0,e)}function mo(e,t,n,r){var i=t&o,a=io(e);function s(){for(var t=-1,o=arguments.length,c=-1,l=r.length,u=w(l+o),d=this&&this!==I&&this instanceof s?a:e;++c<l;)u[c]=r[c];for(;o--;)u[c++]=arguments[++t];return dn(d,i?n:this,u)}return s}function ho(e){return function(t,r,i){return i&&typeof i!=`number`&&Yo(t,r,i)&&(r=i=n),t=ju(t),r===n?(r=t,t=0):r=ju(r),i=i===n?t<r?1:-1:ju(i),la(t,r,i,e)}}function go(e){return function(t,n){return typeof t==`string`&&typeof n==`string`||(t=Nu(t),n=Nu(n)),e(t,n)}}function _o(e,t,r,i,a,l,f,p,m,h){var g=t&c,_=g?f:n,v=g?n:f,y=g?l:n,b=g?n:l;t|=g?u:d,t&=~(g?d:u),t&4||(t&=~(o|s));var x=[e,t,a,y,_,b,v,p,m,h],ee=r.apply(n,x);return Qo(e)&&fs(ee,x),ee.placeholder=i,hs(ee,e,t)}function vo(e){var t=lt[e];return function(e,n){if(e=Nu(e),n=n==null?0:F(Z(n),292),n&&Ht(e)){var r=(Q(e)+`e`).split(`e`);return r=(Q(t(r[0]+`e`+(+r[1]+n)))+`e`).split(`e`),+(r[0]+`e`+(+r[1]-n))}return t(e)}}var yo=rn&&1/er(new rn([,-0]))[1]==h?function(e){return new rn(e)}:bf;function bo(e){return function(t){var n=K(t);return n==le?Zn(t):n==ge?tr(t):In(t,e(t))}}function xo(e,t,i,a,f,p,m,h){var g=t&s;if(!g&&typeof e!=`function`)throw new O(r);var _=a?a.length:0;if(_||(t&=~(u|d),a=f=n),m=m===n?m:M(Z(m),0),h=h===n?h:Z(h),_-=f?f.length:0,t&d){var v=a,y=f;a=f=n}var b=g?n:jo(e),x=[e,t,i,a,f,v,y,p,m,h];if(b&&as(x,b),e=x[0],t=x[1],i=x[2],a=x[3],f=x[4],h=x[9]=x[9]===n?g?0:e.length:M(x[9]-_,0),!h&&t&(c|l)&&(t&=~(c|l)),!t||t==o)var ee=to(e,t,i);else ee=t==c||t==l?ao(e,t,h):(t==u||t==(o|u))&&!f.length?mo(e,t,i,a):co.apply(n,x);return hs((b?ma:fs)(ee,x),e,t)}function So(e,t,r,i){return e===n||Kl(e,mt[r])&&!A.call(i,r)?t:e}function Co(e,t,r,i,a,o){return Y(e)&&Y(t)&&(o.set(t,e),$i(e,t,n,Co,o),o.delete(t)),e}function wo(e){return vu(e)?n:e}function To(e,t,r,i,a,o){var s=r&1,c=e.length,l=t.length;if(c!=l&&!(s&&l>c))return!1;var u=o.get(e),d=o.get(t);if(u&&d)return u==t&&d==e;var f=-1,p=!0,m=r&2?new Vr:n;for(o.set(e,t),o.set(t,e);++f<c;){var h=e[f],g=t[f];if(i)var _=s?i(g,h,f,t,e,o):i(h,g,f,e,t,o);if(_!==n){if(_)continue;p=!1;break}if(m){if(!xn(t,function(e,t){if(!Bn(m,t)&&(h===e||a(h,e,r,i,o)))return m.push(t)})){p=!1;break}}else if(!(h===g||a(h,g,r,i,o))){p=!1;break}}return o.delete(e),o.delete(t),p}function Eo(e,t,n,r,i,a,o){switch(n){case Ce:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Se:return!(e.byteLength!=t.byteLength||!a(new Ct(e),new Ct(t)));case re:case ie:case ue:return Kl(+e,+t);case oe:return e.name==t.name&&e.message==t.message;case he:case _e:return e==t+``;case le:var s=Zn;case ge:var c=r&1;if(s||=er,e.size!=t.size&&!c)return!1;var l=o.get(e);if(l)return l==t;r|=2,o.set(e,t);var u=To(s(e),s(t),r,i,a,o);return o.delete(e),u;case ve:if(hr)return hr.call(e)==hr.call(t)}return!1}function Do(e,t,r,i,a,o){var s=r&1,c=ko(e),l=c.length;if(l!=ko(t).length&&!s)return!1;for(var u=l;u--;){var d=c[u];if(!(s?d in t:A.call(t,d)))return!1}var f=o.get(e),p=o.get(t);if(f&&p)return f==t&&p==e;var m=!0;o.set(e,t),o.set(t,e);for(var h=s;++u<l;){d=c[u];var g=e[d],_=t[d];if(i)var v=s?i(_,g,d,t,e,o):i(g,_,d,e,t,o);if(!(v===n?g===_||a(g,_,r,i,o):v)){m=!1;break}h||=d==`constructor`}if(m&&!h){var y=e.constructor,b=t.constructor;y!=b&&`constructor`in e&&`constructor`in t&&!(typeof y==`function`&&y instanceof y&&typeof b==`function`&&b instanceof b)&&(m=!1)}return o.delete(e),o.delete(t),m}function Oo(e){return ms(cs(e,n,Is),e+``)}function ko(e){return Ei(e,$,Ro)}function Ao(e){return Ei(e,id,zo)}var jo=Cn?function(e){return Cn.get(e)}:bf;function Mo(e){for(var t=e.name+``,n=Mn[t],r=A.call(Mn,t)?n.length:0;r--;){var i=n[r],a=i.func;if(a==null||a==e)return i.name}return t}function No(e){return(A.call(V,`placeholder`)?V:e).placeholder}function G(){var e=V.iteratee||pf;return e=e===pf?Ki:e,arguments.length?e(arguments[0],arguments[1]):e}function Po(e,t){var n=e.__data__;return Zo(t)?n[typeof t==`string`?`string`:`hash`]:n.map}function Fo(e){for(var t=$(e),n=t.length;n--;){var r=t[n],i=e[r];t[n]=[r,i,ns(i)]}return t}function Io(e,t){var r=qn(e,t);return Hi(r)?r:n}function Lo(e){var t=A.call(e,jt),r=e[jt];try{e[jt]=n;var i=!0}catch{}var a=_t.call(e);return i&&(t?e[jt]=r:delete e[jt]),a}var Ro=Rt?function(e){return e==null?[]:(e=D(e),gn(Rt(e),function(t){return Dt.call(e,t)}))}:kf,zo=Rt?function(e){for(var t=[];e;)z(t,Ro(e)),e=Tt(e);return t}:kf,K=Di;($t&&K(new $t(new ArrayBuffer(1)))!=Ce||en&&K(new en)!=le||tn&&K(tn.resolve())!=pe||rn&&K(new rn)!=ge||L&&K(new L)!=be)&&(K=function(e){var t=Di(e),r=t==fe?e.constructor:n,i=r?bs(r):``;if(i)switch(i){case nr:return Ce;case cr:return le;case lr:return pe;case fr:return ge;case pr:return be}return t});function Bo(e,t,n){for(var r=-1,i=n.length;++r<i;){var a=n[r],o=a.size;switch(a.type){case`drop`:e+=o;break;case`dropRight`:t-=o;break;case`take`:t=F(t,e+o);break;case`takeRight`:e=M(e,t-o);break}}return{start:e,end:t}}function Vo(e){var t=e.match(Je);return t?t[1].split(Ye):[]}function Ho(e,t,n){t=Na(t,e);for(var r=-1,i=t.length,a=!1;++r<i;){var o=ys(t[r]);if(!(a=e!=null&&n(e,o)))break;e=e[o]}return a||++r!=i?a:(i=e==null?0:e.length,!!i&&lu(i)&&Jo(o,i)&&(q(e)||Yl(e)))}function Uo(e){var t=e.length,n=new e.constructor(t);return t&&typeof e[0]==`string`&&A.call(e,`index`)&&(n.index=e.index,n.input=e.input),n}function Wo(e){return typeof e.constructor==`function`&&!ts(e)?_r(Tt(e)):{}}function Go(e,t,n){var r=e.constructor;switch(t){case Se:return Ra(e);case re:case ie:return new r(+e);case Ce:return za(e,n);case we:case S:case Te:case Ee:case De:case C:case Oe:case ke:case Ae:return Ha(e,n);case le:return new r;case ue:case _e:return new r(e);case he:return Ba(e);case ge:return new r;case ve:return Va(e)}}function Ko(e,t){var n=t.length;if(!n)return e;var r=n-1;return t[r]=(n>1?`& `:``)+t[r],t=t.join(n>2?`, `:` `),e.replace(qe,`{
/* [wrapped with `+t+`] */
`)}function qo(e){return q(e)||Yl(e)||!!(kt&&e&&e[kt])}function Jo(e,t){var n=typeof e;return t??=g,!!t&&(n==`number`||n!=`symbol`&&rt.test(e))&&e>-1&&e%1==0&&e<t}function Yo(e,t,n){if(!Y(n))return!1;var r=typeof t;return(r==`number`?Zl(n)&&Jo(t,n.length):r==`string`&&t in n)?Kl(n[t],e):!1}function Xo(e,t){if(q(e))return!1;var n=typeof e;return n==`number`||n==`symbol`||n==`boolean`||e==null||Cu(e)?!0:He.test(e)||!Ve.test(e)||t!=null&&e in D(t)}function Zo(e){var t=typeof e;return t==`string`||t==`number`||t==`symbol`||t==`boolean`?e!==`__proto__`:e===null}function Qo(e){var t=Mo(e),n=V[t];if(typeof n!=`function`||!(t in H.prototype))return!1;if(e===n)return!0;var r=jo(n);return!!r&&e===r[0]}function $o(e){return!!gt&&gt in e}var es=ht?su:Af;function ts(e){var t=e&&e.constructor;return e===(typeof t==`function`&&t.prototype||mt)}function ns(e){return e===e&&!Y(e)}function rs(e,t){return function(r){return r!=null&&r[e]===t&&(t!==n||e in D(r))}}function is(e){var t=Ol(e,function(e){return n.size===500&&n.clear(),e}),n=t.cache;return t}function as(e,t){var n=e[1],r=t[1],i=n|r,l=i<(o|s|f),u=r==f&&n==c||r==f&&n==p&&e[7].length<=t[8]||r==(f|p)&&t[7].length<=t[8]&&n==c;if(!(l||u))return e;r&o&&(e[2]=t[2],i|=n&o?0:4);var d=t[3];if(d){var m=e[3];e[3]=m?Ga(m,d,t[4]):d,e[4]=m?$n(e[3],a):t[4]}return d=t[5],d&&(m=e[5],e[5]=m?Ka(m,d,t[6]):d,e[6]=m?$n(e[5],a):t[6]),d=t[7],d&&(e[7]=d),r&f&&(e[8]=e[8]==null?t[8]:F(e[8],t[8])),e[9]??=t[9],e[0]=t[0],e[1]=i,e}function os(e){var t=[];if(e!=null)for(var n in D(e))t.push(n);return t}function ss(e){return _t.call(e)}function cs(e,t,r){return t=M(t===n?e.length-1:t,0),function(){for(var n=arguments,i=-1,a=M(n.length-t,0),o=w(a);++i<a;)o[i]=n[t+i];i=-1;for(var s=w(t+1);++i<t;)s[i]=n[i];return s[t]=r(o),dn(e,this,s)}}function ls(e,t){return t.length<2?e:Ti(e,_a(t,0,-1))}function us(e,t){for(var r=e.length,i=F(t.length,r),a=qa(e);i--;){var o=t[i];e[i]=Jo(o,r)?a[o]:n}return e}function ds(e,t){if(!(t===`constructor`&&typeof e[t]==`function`)&&t!=`__proto__`)return e[t]}var fs=gs(ma),ps=Ft||function(e,t){return I.setTimeout(e,t)},ms=gs(ha);function hs(e,t,n){var r=t+``;return ms(e,Ko(r,xs(Vo(r),n)))}function gs(e){var t=0,r=0;return function(){var i=qt(),a=16-(i-r);if(r=i,a>0){if(++t>=800)return arguments[0]}else t=0;return e.apply(n,arguments)}}function _s(e,t){var r=-1,i=e.length,a=i-1;for(t=t===n?i:t;++r<t;){var o=ca(r,a),s=e[o];e[o]=e[r],e[r]=s}return e.length=t,e}var vs=is(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(``),e.replace(Ue,function(e,n,r,i){t.push(r?i.replace(Ze,`$1`):n||e)}),t});function ys(e){if(typeof e==`string`||Cu(e))return e;var t=e+``;return t==`0`&&1/e==-1/0?`-0`:t}function bs(e){if(e!=null){try{return k.call(e)}catch{}try{return e+``}catch{}}return``}function xs(e,t){return pn(x,function(n){var r=`_.`+n[0];t&n[1]&&!_n(e,r)&&e.push(r)}),e.sort()}function Ss(e){if(e instanceof H)return e.clone();var t=new yr(e.__wrapped__,e.__chain__);return t.__actions__=qa(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}function Cs(e,t,r){t=(r?Yo(e,t,r):t===n)?1:M(Z(t),0);var i=e==null?0:e.length;if(!i||t<1)return[];for(var a=0,o=0,s=w(It(i/t));a<i;)s[o++]=_a(e,a,a+=t);return s}function ws(e){for(var t=-1,n=e==null?0:e.length,r=0,i=[];++t<n;){var a=e[t];a&&(i[r++]=a)}return i}function Ts(){var e=arguments.length;if(!e)return[];for(var t=w(e-1),n=arguments[0],r=e;r--;)t[r-1]=arguments[r];return z(q(n)?qa(n):[n],U(t,1))}var Es=W(function(e,t){return J(e)?pi(e,U(t,1,J,!0)):[]}),Ds=W(function(e,t){var r=qs(t);return J(r)&&(r=n),J(e)?pi(e,U(t,1,J,!0),G(r,2)):[]}),Os=W(function(e,t){var r=qs(t);return J(r)&&(r=n),J(e)?pi(e,U(t,1,J,!0),n,r):[]});function ks(e,t,r){var i=e==null?0:e.length;return i?(t=r||t===n?1:Z(t),_a(e,t<0?0:t,i)):[]}function As(e,t,r){var i=e==null?0:e.length;return i?(t=r||t===n?1:Z(t),t=i-t,_a(e,0,t<0?0:t)):[]}function js(e,t){return e&&e.length?Da(e,G(t,3),!0,!0):[]}function Ms(e,t){return e&&e.length?Da(e,G(t,3),!0):[]}function Ns(e,t,n,r){var i=e==null?0:e.length;return i?(n&&typeof n!=`number`&&Yo(e,t,n)&&(n=0,r=i),vi(e,t,n,r)):[]}function Ps(e,t,n){var r=e==null?0:e.length;if(!r)return-1;var i=n==null?0:Z(n);return i<0&&(i=M(r+i,0)),En(e,G(t,3),i)}function Fs(e,t,r){var i=e==null?0:e.length;if(!i)return-1;var a=i-1;return r!==n&&(a=Z(r),a=r<0?M(i+a,0):F(a,i-1)),En(e,G(t,3),a,!0)}function Is(e){return e!=null&&e.length?U(e,1):[]}function Ls(e){return e!=null&&e.length?U(e,h):[]}function Rs(e,t){return e!=null&&e.length?(t=t===n?1:Z(t),U(e,t)):[]}function zs(e){for(var t=-1,n=e==null?0:e.length,r={};++t<n;){var i=e[t];oi(r,i[0],i[1])}return r}function Bs(e){return e&&e.length?e[0]:n}function Vs(e,t,n){var r=e==null?0:e.length;if(!r)return-1;var i=n==null?0:Z(n);return i<0&&(i=M(r+i,0)),Dn(e,t,i)}function Hs(e){return e!=null&&e.length?_a(e,0,-1):[]}var Us=W(function(e){var t=R(e,ja);return t.length&&t[0]===e[0]?Mi(t):[]}),Ws=W(function(e){var t=qs(e),r=R(e,ja);return t===qs(r)?t=n:r.pop(),r.length&&r[0]===e[0]?Mi(r,G(t,2)):[]}),Gs=W(function(e){var t=qs(e),r=R(e,ja);return t=typeof t==`function`?t:n,t&&r.pop(),r.length&&r[0]===e[0]?Mi(r,n,t):[]});function Ks(e,t){return e==null?``:Ut.call(e,t)}function qs(e){var t=e==null?0:e.length;return t?e[t-1]:n}function Js(e,t,r){var i=e==null?0:e.length;if(!i)return-1;var a=i;return r!==n&&(a=Z(r),a=a<0?M(i+a,0):F(a,i-1)),t===t?rr(e,t,a):En(e,kn,a,!0)}function Ys(e,t){return e&&e.length?ta(e,Z(t)):n}var Xs=W(Zs);function Zs(e,t){return e&&e.length&&t&&t.length?oa(e,t):e}function Qs(e,t,n){return e&&e.length&&t&&t.length?oa(e,t,G(n,2)):e}function $s(e,t,r){return e&&e.length&&t&&t.length?oa(e,t,n,r):e}var ec=Oo(function(e,t){var n=e==null?0:e.length,r=si(e,t);return sa(e,R(t,function(e){return Jo(e,n)?+e:e}).sort(Ua)),r});function tc(e,t){var n=[];if(!(e&&e.length))return n;var r=-1,i=[],a=e.length;for(t=G(t,3);++r<a;){var o=e[r];t(o,r,e)&&(n.push(o),i.push(r))}return sa(e,i),n}function nc(e){return e==null?e:Qt.call(e)}function rc(e,t,r){var i=e==null?0:e.length;return i?(r&&typeof r!=`number`&&Yo(e,t,r)?(t=0,r=i):(t=t==null?0:Z(t),r=r===n?i:Z(r)),_a(e,t,r)):[]}function ic(e,t){return ya(e,t)}function ac(e,t,n){return ba(e,t,G(n,2))}function oc(e,t){var n=e==null?0:e.length;if(n){var r=ya(e,t);if(r<n&&Kl(e[r],t))return r}return-1}function sc(e,t){return ya(e,t,!0)}function cc(e,t,n){return ba(e,t,G(n,2),!0)}function lc(e,t){if(e!=null&&e.length){var n=ya(e,t,!0)-1;if(Kl(e[n],t))return n}return-1}function uc(e){return e&&e.length?xa(e):[]}function dc(e,t){return e&&e.length?xa(e,G(t,2)):[]}function fc(e){var t=e==null?0:e.length;return t?_a(e,1,t):[]}function pc(e,t,r){return e&&e.length?(t=r||t===n?1:Z(t),_a(e,0,t<0?0:t)):[]}function mc(e,t,r){var i=e==null?0:e.length;return i?(t=r||t===n?1:Z(t),t=i-t,_a(e,t<0?0:t,i)):[]}function hc(e,t){return e&&e.length?Da(e,G(t,3),!1,!0):[]}function gc(e,t){return e&&e.length?Da(e,G(t,3)):[]}var _c=W(function(e){return wa(U(e,1,J,!0))}),vc=W(function(e){var t=qs(e);return J(t)&&(t=n),wa(U(e,1,J,!0),G(t,2))}),yc=W(function(e){var t=qs(e);return t=typeof t==`function`?t:n,wa(U(e,1,J,!0),n,t)});function bc(e){return e&&e.length?wa(e):[]}function xc(e,t){return e&&e.length?wa(e,G(t,2)):[]}function Sc(e,t){return t=typeof t==`function`?t:n,e&&e.length?wa(e,n,t):[]}function Cc(e){if(!(e&&e.length))return[];var t=0;return e=gn(e,function(e){if(J(e))return t=M(e.length,t),!0}),Fn(t,function(t){return R(e,jn(t))})}function wc(e,t){if(!(e&&e.length))return[];var r=Cc(e);return t==null?r:R(r,function(e){return dn(t,n,e)})}var Tc=W(function(e,t){return J(e)?pi(e,t):[]}),Ec=W(function(e){return ka(gn(e,J))}),Dc=W(function(e){var t=qs(e);return J(t)&&(t=n),ka(gn(e,J),G(t,2))}),Oc=W(function(e){var t=qs(e);return t=typeof t==`function`?t:n,ka(gn(e,J),n,t)}),kc=W(Cc);function Ac(e,t){return Aa(e||[],t||[],ti)}function jc(e,t){return Aa(e||[],t||[],pa)}var Mc=W(function(e){var t=e.length,r=t>1?e[t-1]:n;return r=typeof r==`function`?(e.pop(),r):n,wc(e,r)});function Nc(e){var t=V(e);return t.__chain__=!0,t}function Pc(e,t){return t(e),e}function Fc(e,t){return t(e)}var Ic=Oo(function(e){var t=e.length,r=t?e[0]:0,i=this.__wrapped__,a=function(t){return si(t,e)};return t>1||this.__actions__.length||!(i instanceof H)||!Jo(r)?this.thru(a):(i=i.slice(r,+r+ +!!t),i.__actions__.push({func:Fc,args:[a],thisArg:n}),new yr(i,this.__chain__).thru(function(e){return t&&!e.length&&e.push(n),e}))});function Lc(){return Nc(this)}function Rc(){return new yr(this.value(),this.__chain__)}function zc(){this.__values__===n&&(this.__values__=Au(this.value()));var e=this.__index__>=this.__values__.length;return{done:e,value:e?n:this.__values__[this.__index__++]}}function Bc(){return this}function Vc(e){for(var t,r=this;r instanceof vr;){var i=Ss(r);i.__index__=0,i.__values__=n,t?a.__wrapped__=i:t=i;var a=i;r=r.__wrapped__}return a.__wrapped__=e,t}function Hc(){var e=this.__wrapped__;if(e instanceof H){var t=e;return this.__actions__.length&&(t=new H(this)),t=t.reverse(),t.__actions__.push({func:Fc,args:[nc],thisArg:n}),new yr(t,this.__chain__)}return this.thru(nc)}function Uc(){return Oa(this.__wrapped__,this.__actions__)}var Wc=Za(function(e,t,n){A.call(e,n)?++e[n]:oi(e,n,1)});function Gc(e,t,r){var i=q(e)?hn:gi;return r&&Yo(e,t,r)&&(t=n),i(e,G(t,3))}function Kc(e,t){return(q(e)?gn:yi)(e,G(t,3))}var qc=oo(Ps),Jc=oo(Fs);function Yc(e,t){return U(il(e,t),1)}function Xc(e,t){return U(il(e,t),h)}function Zc(e,t,r){return r=r===n?1:Z(r),U(il(e,t),r)}function Qc(e,t){return(q(e)?pn:mi)(e,G(t,3))}function $c(e,t){return(q(e)?mn:hi)(e,G(t,3))}var el=Za(function(e,t,n){A.call(e,n)?e[n].push(t):oi(e,n,[t])});function tl(e,t,n,r){e=Zl(e)?e:Sd(e),n=n&&!r?Z(n):0;var i=e.length;return n<0&&(n=M(i+n,0)),Su(e)?n<=i&&e.indexOf(t,n)>-1:!!i&&Dn(e,t,n)>-1}var nl=W(function(e,t,n){var r=-1,i=typeof t==`function`,a=Zl(e)?w(e.length):[];return mi(e,function(e){a[++r]=i?dn(t,e,n):Pi(e,t,n)}),a}),rl=Za(function(e,t,n){oi(e,n,t)});function il(e,t){return(q(e)?R:Xi)(e,G(t,3))}function al(e,t,r,i){return e==null?[]:(q(t)||(t=t==null?[]:[t]),r=i?n:r,q(r)||(r=r==null?[]:[r]),na(e,t,r))}var ol=Za(function(e,t,n){e[+!n].push(t)},function(){return[[],[]]});function sl(e,t,n){var r=q(e)?yn:Nn,i=arguments.length<3;return r(e,G(t,4),n,i,mi)}function cl(e,t,n){var r=q(e)?bn:Nn,i=arguments.length<3;return r(e,G(t,4),n,i,hi)}function ll(e,t){return(q(e)?gn:yi)(e,kl(G(t,3)))}function ul(e){return(q(e)?Zr:da)(e)}function dl(e,t,r){return t=(r?Yo(e,t,r):t===n)?1:Z(t),(q(e)?Qr:fa)(e,t)}function fl(e){return(q(e)?$r:ga)(e)}function pl(e){if(e==null)return 0;if(Zl(e))return Su(e)?ir(e):e.length;var t=K(e);return t==le||t==ge?e.size:qi(e).length}function ml(e,t,r){var i=q(e)?xn:va;return r&&Yo(e,t,r)&&(t=n),i(e,G(t,3))}var hl=W(function(e,t){if(e==null)return[];var n=t.length;return n>1&&Yo(e,t[0],t[1])?t=[]:n>2&&Yo(t[0],t[1],t[2])&&(t=[t[0]]),na(e,U(t,1),[])}),gl=Pt||function(){return I.Date.now()};function _l(e,t){if(typeof t!=`function`)throw new O(r);return e=Z(e),function(){if(--e<1)return t.apply(this,arguments)}}function vl(e,t,r){return t=r?n:t,t=e&&t==null?e.length:t,xo(e,f,n,n,n,n,t)}function yl(e,t){var i;if(typeof t!=`function`)throw new O(r);return e=Z(e),function(){return--e>0&&(i=t.apply(this,arguments)),e<=1&&(t=n),i}}var bl=W(function(e,t,n){var r=o;if(n.length){var i=$n(n,No(bl));r|=u}return xo(e,r,t,n,i)}),xl=W(function(e,t,n){var r=o|s;if(n.length){var i=$n(n,No(xl));r|=u}return xo(t,r,e,n,i)});function Sl(e,t,r){t=r?n:t;var i=xo(e,c,n,n,n,n,n,t);return i.placeholder=Sl.placeholder,i}function Cl(e,t,r){t=r?n:t;var i=xo(e,l,n,n,n,n,n,t);return i.placeholder=Cl.placeholder,i}function wl(e,t,i){var a,o,s,c,l,u,d=0,f=!1,p=!1,m=!0;if(typeof e!=`function`)throw new O(r);t=Nu(t)||0,Y(i)&&(f=!!i.leading,p=`maxWait`in i,s=p?M(Nu(i.maxWait)||0,t):s,m=`trailing`in i?!!i.trailing:m);function h(t){var r=a,i=o;return a=o=n,d=t,c=e.apply(i,r),c}function g(e){return d=e,l=ps(y,t),f?h(e):c}function _(e){var n=e-u,r=e-d,i=t-n;return p?F(i,s-r):i}function v(e){var r=e-u,i=e-d;return u===n||r>=t||r<0||p&&i>=s}function y(){var e=gl();if(v(e))return b(e);l=ps(y,_(e))}function b(e){return l=n,m&&a?h(e):(a=o=n,c)}function x(){l!==n&&Ia(l),d=0,a=u=o=l=n}function ee(){return l===n?c:b(gl())}function te(){var e=gl(),r=v(e);if(a=arguments,o=this,u=e,r){if(l===n)return g(u);if(p)return Ia(l),l=ps(y,t),h(u)}return l===n&&(l=ps(y,t)),c}return te.cancel=x,te.flush=ee,te}var Tl=W(function(e,t){return fi(e,1,t)}),El=W(function(e,t,n){return fi(e,Nu(t)||0,n)});function Dl(e){return xo(e,m)}function Ol(e,t){if(typeof e!=`function`||t!=null&&typeof t!=`function`)throw new O(r);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],a=n.cache;if(a.has(i))return a.get(i);var o=e.apply(this,r);return n.cache=a.set(i,o)||a,o};return n.cache=new(Ol.Cache||Fr),n}Ol.Cache=Fr;function kl(e){if(typeof e!=`function`)throw new O(r);return function(){var t=arguments;switch(t.length){case 0:return!e.call(this);case 1:return!e.call(this,t[0]);case 2:return!e.call(this,t[0],t[1]);case 3:return!e.call(this,t[0],t[1],t[2])}return!e.apply(this,t)}}function Al(e){return yl(2,e)}var jl=Pa(function(e,t){t=t.length==1&&q(t[0])?R(t[0],Rn(G())):R(U(t,1),Rn(G()));var n=t.length;return W(function(r){for(var i=-1,a=F(r.length,n);++i<a;)r[i]=t[i].call(this,r[i]);return dn(e,this,r)})}),Ml=W(function(e,t){return xo(e,u,n,t,$n(t,No(Ml)))}),Nl=W(function(e,t){return xo(e,d,n,t,$n(t,No(Nl)))}),Pl=Oo(function(e,t){return xo(e,p,n,n,n,t)});function Fl(e,t){if(typeof e!=`function`)throw new O(r);return t=t===n?t:Z(t),W(e,t)}function Il(e,t){if(typeof e!=`function`)throw new O(r);return t=t==null?0:M(Z(t),0),W(function(n){var r=n[t],i=Fa(n,0,t);return r&&z(i,r),dn(e,this,i)})}function Ll(e,t,n){var i=!0,a=!0;if(typeof e!=`function`)throw new O(r);return Y(n)&&(i=`leading`in n?!!n.leading:i,a=`trailing`in n?!!n.trailing:a),wl(e,t,{leading:i,maxWait:t,trailing:a})}function Rl(e){return vl(e,1)}function zl(e,t){return Ml(Ma(t),e)}function Bl(){if(!arguments.length)return[];var e=arguments[0];return q(e)?e:[e]}function Vl(e){return li(e,4)}function Hl(e,t){return t=typeof t==`function`?t:n,li(e,4,t)}function Ul(e){return li(e,5)}function Wl(e,t){return t=typeof t==`function`?t:n,li(e,5,t)}function Gl(e,t){return t==null||di(e,t,$(t))}function Kl(e,t){return e===t||e!==e&&t!==t}var ql=go(Oi),Jl=go(function(e,t){return e>=t}),Yl=Fi(function(){return arguments}())?Fi:function(e){return X(e)&&A.call(e,`callee`)&&!Dt.call(e,`callee`)},q=w.isArray,Xl=an?Rn(an):Ii;function Zl(e){return e!=null&&lu(e.length)&&!su(e)}function J(e){return X(e)&&Zl(e)}function Ql(e){return e===!0||e===!1||X(e)&&Di(e)==re}var $l=zt||Af,eu=on?Rn(on):Li;function tu(e){return X(e)&&e.nodeType===1&&!vu(e)}function nu(e){if(e==null)return!0;if(Zl(e)&&(q(e)||typeof e==`string`||typeof e.splice==`function`||$l(e)||wu(e)||Yl(e)))return!e.length;var t=K(e);if(t==le||t==ge)return!e.size;if(ts(e))return!qi(e).length;for(var n in e)if(A.call(e,n))return!1;return!0}function ru(e,t){return Ri(e,t)}function iu(e,t,r){r=typeof r==`function`?r:n;var i=r?r(e,t):n;return i===n?Ri(e,t,n,r):!!i}function au(e){if(!X(e))return!1;var t=Di(e);return t==oe||t==ae||typeof e.message==`string`&&typeof e.name==`string`&&!vu(e)}function ou(e){return typeof e==`number`&&Ht(e)}function su(e){if(!Y(e))return!1;var t=Di(e);return t==se||t==ce||t==ne||t==me}function cu(e){return typeof e==`number`&&e==Z(e)}function lu(e){return typeof e==`number`&&e>-1&&e%1==0&&e<=g}function Y(e){var t=typeof e;return e!=null&&(t==`object`||t==`function`)}function X(e){return typeof e==`object`&&!!e}var uu=sn?Rn(sn):Bi;function du(e,t){return e===t||Vi(e,t,Fo(t))}function fu(e,t,r){return r=typeof r==`function`?r:n,Vi(e,t,Fo(t),r)}function pu(e){return _u(e)&&e!=+e}function mu(e){if(es(e))throw new st(`Unsupported core-js use. Try https://npms.io/search?q=ponyfill.`);return Hi(e)}function hu(e){return e===null}function gu(e){return e==null}function _u(e){return typeof e==`number`||X(e)&&Di(e)==ue}function vu(e){if(!X(e)||Di(e)!=fe)return!1;var t=Tt(e);if(t===null)return!0;var n=A.call(t,`constructor`)&&t.constructor;return typeof n==`function`&&n instanceof n&&k.call(n)==vt}var yu=cn?Rn(cn):Ui;function bu(e){return cu(e)&&e>=-9007199254740991&&e<=g}var xu=ln?Rn(ln):Wi;function Su(e){return typeof e==`string`||!q(e)&&X(e)&&Di(e)==_e}function Cu(e){return typeof e==`symbol`||X(e)&&Di(e)==ve}var wu=un?Rn(un):Gi;function Tu(e){return e===n}function Eu(e){return X(e)&&K(e)==be}function Du(e){return X(e)&&Di(e)==xe}var Ou=go(Yi),ku=go(function(e,t){return e<=t});function Au(e){if(!e)return[];if(Zl(e))return Su(e)?ar(e):qa(e);if(At&&e[At])return Xn(e[At]());var t=K(e);return(t==le?Zn:t==ge?er:Sd)(e)}function ju(e){return e?(e=Nu(e),e===h||e===-1/0?(e<0?-1:1)*17976931348623157e292:e===e?e:0):e===0?e:0}function Z(e){var t=ju(e),n=t%1;return t===t?n?t-n:t:0}function Mu(e){return e?ci(Z(e),0,v):0}function Nu(e){if(typeof e==`number`)return e;if(Cu(e))return _;if(Y(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=Y(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ln(e);var n=et.test(e);return n||nt.test(e)?Zt(e.slice(2),n?2:8):$e.test(e)?_:+e}function Pu(e){return Ja(e,id(e))}function Fu(e){return e?ci(Z(e),-9007199254740991,g):e===0?e:0}function Q(e){return e==null?``:Ca(e)}var Iu=Qa(function(e,t){if(ts(t)||Zl(t)){Ja(t,$(t),e);return}for(var n in t)A.call(t,n)&&ti(e,n,t[n])}),Lu=Qa(function(e,t){Ja(t,id(t),e)}),Ru=Qa(function(e,t,n,r){Ja(t,id(t),e,r)}),zu=Qa(function(e,t,n,r){Ja(t,$(t),e,r)}),Bu=Oo(si);function Vu(e,t){var n=_r(e);return t==null?n:ii(n,t)}var Hu=W(function(e,t){e=D(e);var r=-1,i=t.length,a=i>2?t[2]:n;for(a&&Yo(t[0],t[1],a)&&(i=1);++r<i;)for(var o=t[r],s=id(o),c=-1,l=s.length;++c<l;){var u=s[c],d=e[u];(d===n||Kl(d,mt[u])&&!A.call(e,u))&&(e[u]=o[u])}return e}),Uu=W(function(e){return e.push(n,Co),dn(cd,n,e)});function Wu(e,t){return Tn(e,G(t,3),Si)}function Gu(e,t){return Tn(e,G(t,3),Ci)}function Ku(e,t){return e==null?e:bi(e,G(t,3),id)}function qu(e,t){return e==null?e:xi(e,G(t,3),id)}function Ju(e,t){return e&&Si(e,G(t,3))}function Yu(e,t){return e&&Ci(e,G(t,3))}function Xu(e){return e==null?[]:wi(e,$(e))}function Zu(e){return e==null?[]:wi(e,id(e))}function Qu(e,t,r){var i=e==null?n:Ti(e,t);return i===n?r:i}function $u(e,t){return e!=null&&Ho(e,t,ki)}function ed(e,t){return e!=null&&Ho(e,t,Ai)}var td=lo(function(e,t,n){t!=null&&typeof t.toString!=`function`&&(t=_t.call(t)),e[t]=n},cf(ff)),nd=lo(function(e,t,n){t!=null&&typeof t.toString!=`function`&&(t=_t.call(t)),A.call(e,t)?e[t].push(n):e[t]=[n]},G),rd=W(Pi);function $(e){return Zl(e)?Xr(e):qi(e)}function id(e){return Zl(e)?Xr(e,!0):Ji(e)}function ad(e,t){var n={};return t=G(t,3),Si(e,function(e,r,i){oi(n,t(e,r,i),e)}),n}function od(e,t){var n={};return t=G(t,3),Si(e,function(e,r,i){oi(n,r,t(e,r,i))}),n}var sd=Qa(function(e,t,n){$i(e,t,n)}),cd=Qa(function(e,t,n,r){$i(e,t,n,r)}),ld=Oo(function(e,t){var n={};if(e==null)return n;var r=!1;t=R(t,function(t){return t=Na(t,e),r||=t.length>1,t}),Ja(e,Ao(e),n),r&&(n=li(n,7,wo));for(var i=t.length;i--;)Ta(n,t[i]);return n});function ud(e,t){return fd(e,kl(G(t)))}var dd=Oo(function(e,t){return e==null?{}:ra(e,t)});function fd(e,t){if(e==null)return{};var n=R(Ao(e),function(e){return[e]});return t=G(t),ia(e,n,function(e,n){return t(e,n[0])})}function pd(e,t,r){t=Na(t,e);var i=-1,a=t.length;for(a||(a=1,e=n);++i<a;){var o=e==null?n:e[ys(t[i])];o===n&&(i=a,o=r),e=su(o)?o.call(e):o}return e}function md(e,t,n){return e==null?e:pa(e,t,n)}function hd(e,t,r,i){return i=typeof i==`function`?i:n,e==null?e:pa(e,t,r,i)}var gd=bo($),_d=bo(id);function vd(e,t,n){var r=q(e),i=r||$l(e)||wu(e);if(t=G(t,4),n==null){var a=e&&e.constructor;n=i?r?new a:[]:Y(e)&&su(a)?_r(Tt(e)):{}}return(i?pn:Si)(e,function(e,r,i){return t(n,e,r,i)}),n}function yd(e,t){return e==null||Ta(e,t)}function bd(e,t,n){return e==null?e:Ea(e,t,Ma(n))}function xd(e,t,r,i){return i=typeof i==`function`?i:n,e==null?e:Ea(e,t,Ma(r),i)}function Sd(e){return e==null?[]:zn(e,$(e))}function Cd(e){return e==null?[]:zn(e,id(e))}function wd(e,t,r){return r===n&&(r=t,t=n),r!==n&&(r=Nu(r),r=r===r?r:0),t!==n&&(t=Nu(t),t=t===t?t:0),ci(Nu(e),t,r)}function Td(e,t,r){return t=ju(t),r===n?(r=t,t=0):r=ju(r),e=Nu(e),ji(e,t,r)}function Ed(e,t,r){if(r&&typeof r!=`boolean`&&Yo(e,t,r)&&(t=r=n),r===n&&(typeof t==`boolean`?(r=t,t=n):typeof e==`boolean`&&(r=e,e=n)),e===n&&t===n?(e=0,t=1):(e=ju(e),t===n?(t=e,e=0):t=ju(t)),e>t){var i=e;e=t,t=i}if(r||e%1||t%1){var a=Yt();return F(e+a*(t-e+Xt(`1e-`+((a+``).length-1))),t)}return ca(e,t)}var Dd=ro(function(e,t,n){return t=t.toLowerCase(),e+(n?Od(t):t)});function Od(e){return tf(Q(e).toLowerCase())}function kd(e){return e=Q(e),e&&e.replace(it,Wn).replace(Vt,``)}function Ad(e,t,r){e=Q(e),t=Ca(t);var i=e.length;r=r===n?i:ci(Z(r),0,i);var a=r;return r-=t.length,r>=0&&e.slice(r,a)==t}function jd(e){return e=Q(e),e&&Le.test(e)?e.replace(Fe,Gn):e}function Md(e){return e=Q(e),e&&Ge.test(e)?e.replace(We,`\\$&`):e}var Nd=ro(function(e,t,n){return e+(n?`-`:``)+t.toLowerCase()}),Pd=ro(function(e,t,n){return e+(n?` `:``)+t.toLowerCase()}),Fd=no(`toLowerCase`);function Id(e,t,n){e=Q(e),t=Z(t);var r=t?ir(e):0;if(!t||r>=t)return e;var i=(t-r)/2;return po(Lt(i),n)+e+po(It(i),n)}function Ld(e,t,n){e=Q(e),t=Z(t);var r=t?ir(e):0;return t&&r<t?e+po(t-r,n):e}function Rd(e,t,n){e=Q(e),t=Z(t);var r=t?ir(e):0;return t&&r<t?po(t-r,n)+e:e}function zd(e,t,n){return n||t==null?t=0:t&&=+t,Jt(Q(e).replace(Ke,``),t||0)}function Bd(e,t,r){return t=(r?Yo(e,t,r):t===n)?1:Z(t),ua(Q(e),t)}function Vd(){var e=arguments,t=Q(e[0]);return e.length<3?t:t.replace(e[1],e[2])}var Hd=ro(function(e,t,n){return e+(n?`_`:``)+t.toLowerCase()});function Ud(e,t,r){return r&&typeof r!=`number`&&Yo(e,t,r)&&(t=r=n),r=r===n?v:r>>>0,r?(e=Q(e),e&&(typeof t==`string`||t!=null&&!yu(t))&&(t=Ca(t),!t&&Jn(e))?Fa(ar(e),0,r):e.split(t,r)):[]}var Wd=ro(function(e,t,n){return e+(n?` `:``)+tf(t)});function Gd(e,t,n){return e=Q(e),n=n==null?0:ci(Z(n),0,e.length),t=Ca(t),e.slice(n,n+t.length)==t}function Kd(e,t,r){var i=V.templateSettings;r&&Yo(e,t,r)&&(t=n),e=Q(e),t=zu({},t,i,So);var a=zu({},t.imports,i.imports,So),o=$(a),s=zn(a,o);pn(o,function(e){if(T.test(e))throw new st("Invalid `imports` option passed into `_.template`")});var c,l,u=0,d=t.interpolate||at,f=`__p += '`,p=ut((t.escape||at).source+`|`+d.source+`|`+(d===Be?Qe:at).source+`|`+(t.evaluate||at).source+`|$`,`g`),m=`//# sourceURL=`+(A.call(t,`sourceURL`)?(t.sourceURL+``).replace(/\s/g,` `):`lodash.templateSources[`+ ++Kt+`]`)+`
`;e.replace(p,function(t,n,r,i,a,o){return r||=i,f+=e.slice(u,o).replace(ot,Kn),n&&(c=!0,f+=`' +
__e(`+n+`) +
'`),a&&(l=!0,f+=`';
`+a+`;
__p += '`),r&&(f+=`' +
((__t = (`+r+`)) == null ? '' : __t) +
'`),u=o+t.length,t}),f+=`';
`;var h=A.call(t,`variable`)&&t.variable;if(!h)f=`with (obj) {
`+f+`
}
`;else if(T.test(h))throw new st("Invalid `variable` option passed into `_.template`");f=(l?f.replace(je,``):f).replace(Me,`$1`).replace(Ne,`$1;`),f=`function(`+(h||`obj`)+`) {
`+(h?``:`obj || (obj = {});
`)+`var __t, __p = ''`+(c?`, __e = _.escape`:``)+(l?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+f+`return __p
}`;var g=rf(function(){return ct(o,m+`return `+f).apply(n,s)});if(g.source=f,au(g))throw g;return g}function qd(e){return Q(e).toLowerCase()}function Jd(e){return Q(e).toUpperCase()}function Yd(e,t,r){if(e=Q(e),e&&(r||t===n))return Ln(e);if(!e||!(t=Ca(t)))return e;var i=ar(e),a=ar(t);return Fa(i,Vn(i,a),Hn(i,a)+1).join(``)}function Xd(e,t,r){if(e=Q(e),e&&(r||t===n))return e.slice(0,or(e)+1);if(!e||!(t=Ca(t)))return e;var i=ar(e);return Fa(i,0,Hn(i,ar(t))+1).join(``)}function Zd(e,t,r){if(e=Q(e),e&&(r||t===n))return e.replace(Ke,``);if(!e||!(t=Ca(t)))return e;var i=ar(e);return Fa(i,Vn(i,ar(t))).join(``)}function Qd(e,t){var r=30,i=`...`;if(Y(t)){var a=`separator`in t?t.separator:a;r=`length`in t?Z(t.length):r,i=`omission`in t?Ca(t.omission):i}e=Q(e);var o=e.length;if(Jn(e)){var s=ar(e);o=s.length}if(r>=o)return e;var c=r-ir(i);if(c<1)return i;var l=s?Fa(s,0,c).join(``):e.slice(0,c);if(a===n)return l+i;if(s&&(c+=l.length-c),yu(a)){if(e.slice(c).search(a)){var u,d=l;for(a.global||(a=ut(a.source,Q(E.exec(a))+`g`)),a.lastIndex=0;u=a.exec(d);)var f=u.index;l=l.slice(0,f===n?c:f)}}else if(e.indexOf(Ca(a),c)!=c){var p=l.lastIndexOf(a);p>-1&&(l=l.slice(0,p))}return l+i}function $d(e){return e=Q(e),e&&Ie.test(e)?e.replace(Pe,sr):e}var ef=ro(function(e,t,n){return e+(n?` `:``)+t.toUpperCase()}),tf=no(`toUpperCase`);function nf(e,t,r){return e=Q(e),t=r?n:t,t===n?Yn(e)?ur(e):wn(e):e.match(t)||[]}var rf=W(function(e,t){try{return dn(e,n,t)}catch(e){return au(e)?e:new st(e)}}),af=Oo(function(e,t){return pn(t,function(t){t=ys(t),oi(e,t,bl(e[t],e))}),e});function of(e){var t=e==null?0:e.length,n=G();return e=t?R(e,function(e){if(typeof e[1]!=`function`)throw new O(r);return[n(e[0]),e[1]]}):[],W(function(n){for(var r=-1;++r<t;){var i=e[r];if(dn(i[0],this,n))return dn(i[1],this,n)}})}function sf(e){return ui(li(e,1))}function cf(e){return function(){return e}}function lf(e,t){return e==null||e!==e?t:e}var uf=so(),df=so(!0);function ff(e){return e}function pf(e){return Ki(typeof e==`function`?e:li(e,1))}function mf(e){return Zi(li(e,1))}function hf(e,t){return Qi(e,li(t,1))}var gf=W(function(e,t){return function(n){return Pi(n,e,t)}}),_f=W(function(e,t){return function(n){return Pi(e,n,t)}});function vf(e,t,n){var r=$(t),i=wi(t,r);n==null&&!(Y(t)&&(i.length||!r.length))&&(n=t,t=e,e=this,i=wi(t,$(t)));var a=!(Y(n)&&`chain`in n)||!!n.chain,o=su(e);return pn(i,function(n){var r=t[n];e[n]=r,o&&(e.prototype[n]=function(){var t=this.__chain__;if(a||t){var n=e(this.__wrapped__);return(n.__actions__=qa(this.__actions__)).push({func:r,args:arguments,thisArg:e}),n.__chain__=t,n}return r.apply(e,z([this.value()],arguments))})}),e}function yf(){return I._===this&&(I._=yt),this}function bf(){}function xf(e){return e=Z(e),W(function(t){return ta(t,e)})}var Sf=fo(R),Cf=fo(hn),wf=fo(xn);function Tf(e){return Xo(e)?jn(ys(e)):aa(e)}function Ef(e){return function(t){return e==null?n:Ti(e,t)}}var Df=ho(),Of=ho(!0);function kf(){return[]}function Af(){return!1}function jf(){return{}}function Mf(){return``}function Nf(){return!0}function Pf(e,t){if(e=Z(e),e<1||e>g)return[];var n=v,r=F(e,v);t=G(t),e-=v;for(var i=Fn(r,t);++n<e;)t(n);return i}function Ff(e){return q(e)?R(e,ys):Cu(e)?[e]:qa(vs(Q(e)))}function If(e){var t=++j;return Q(e)+t}var Lf=uo(function(e,t){return e+t},0),Rf=vo(`ceil`),zf=uo(function(e,t){return e/t},1),Bf=vo(`floor`);function Vf(e){return e&&e.length?_i(e,ff,Oi):n}function Hf(e,t){return e&&e.length?_i(e,G(t,2),Oi):n}function Uf(e){return An(e,ff)}function Wf(e,t){return An(e,G(t,2))}function Gf(e){return e&&e.length?_i(e,ff,Yi):n}function Kf(e,t){return e&&e.length?_i(e,G(t,2),Yi):n}var qf=uo(function(e,t){return e*t},1),Jf=vo(`round`),Yf=uo(function(e,t){return e-t},0);function Xf(e){return e&&e.length?Pn(e,ff):0}function Zf(e,t){return e&&e.length?Pn(e,G(t,2)):0}return V.after=_l,V.ary=vl,V.assign=Iu,V.assignIn=Lu,V.assignInWith=Ru,V.assignWith=zu,V.at=Bu,V.before=yl,V.bind=bl,V.bindAll=af,V.bindKey=xl,V.castArray=Bl,V.chain=Nc,V.chunk=Cs,V.compact=ws,V.concat=Ts,V.cond=of,V.conforms=sf,V.constant=cf,V.countBy=Wc,V.create=Vu,V.curry=Sl,V.curryRight=Cl,V.debounce=wl,V.defaults=Hu,V.defaultsDeep=Uu,V.defer=Tl,V.delay=El,V.difference=Es,V.differenceBy=Ds,V.differenceWith=Os,V.drop=ks,V.dropRight=As,V.dropRightWhile=js,V.dropWhile=Ms,V.fill=Ns,V.filter=Kc,V.flatMap=Yc,V.flatMapDeep=Xc,V.flatMapDepth=Zc,V.flatten=Is,V.flattenDeep=Ls,V.flattenDepth=Rs,V.flip=Dl,V.flow=uf,V.flowRight=df,V.fromPairs=zs,V.functions=Xu,V.functionsIn=Zu,V.groupBy=el,V.initial=Hs,V.intersection=Us,V.intersectionBy=Ws,V.intersectionWith=Gs,V.invert=td,V.invertBy=nd,V.invokeMap=nl,V.iteratee=pf,V.keyBy=rl,V.keys=$,V.keysIn=id,V.map=il,V.mapKeys=ad,V.mapValues=od,V.matches=mf,V.matchesProperty=hf,V.memoize=Ol,V.merge=sd,V.mergeWith=cd,V.method=gf,V.methodOf=_f,V.mixin=vf,V.negate=kl,V.nthArg=xf,V.omit=ld,V.omitBy=ud,V.once=Al,V.orderBy=al,V.over=Sf,V.overArgs=jl,V.overEvery=Cf,V.overSome=wf,V.partial=Ml,V.partialRight=Nl,V.partition=ol,V.pick=dd,V.pickBy=fd,V.property=Tf,V.propertyOf=Ef,V.pull=Xs,V.pullAll=Zs,V.pullAllBy=Qs,V.pullAllWith=$s,V.pullAt=ec,V.range=Df,V.rangeRight=Of,V.rearg=Pl,V.reject=ll,V.remove=tc,V.rest=Fl,V.reverse=nc,V.sampleSize=dl,V.set=md,V.setWith=hd,V.shuffle=fl,V.slice=rc,V.sortBy=hl,V.sortedUniq=uc,V.sortedUniqBy=dc,V.split=Ud,V.spread=Il,V.tail=fc,V.take=pc,V.takeRight=mc,V.takeRightWhile=hc,V.takeWhile=gc,V.tap=Pc,V.throttle=Ll,V.thru=Fc,V.toArray=Au,V.toPairs=gd,V.toPairsIn=_d,V.toPath=Ff,V.toPlainObject=Pu,V.transform=vd,V.unary=Rl,V.union=_c,V.unionBy=vc,V.unionWith=yc,V.uniq=bc,V.uniqBy=xc,V.uniqWith=Sc,V.unset=yd,V.unzip=Cc,V.unzipWith=wc,V.update=bd,V.updateWith=xd,V.values=Sd,V.valuesIn=Cd,V.without=Tc,V.words=nf,V.wrap=zl,V.xor=Ec,V.xorBy=Dc,V.xorWith=Oc,V.zip=kc,V.zipObject=Ac,V.zipObjectDeep=jc,V.zipWith=Mc,V.entries=gd,V.entriesIn=_d,V.extend=Lu,V.extendWith=Ru,vf(V,V),V.add=Lf,V.attempt=rf,V.camelCase=Dd,V.capitalize=Od,V.ceil=Rf,V.clamp=wd,V.clone=Vl,V.cloneDeep=Ul,V.cloneDeepWith=Wl,V.cloneWith=Hl,V.conformsTo=Gl,V.deburr=kd,V.defaultTo=lf,V.divide=zf,V.endsWith=Ad,V.eq=Kl,V.escape=jd,V.escapeRegExp=Md,V.every=Gc,V.find=qc,V.findIndex=Ps,V.findKey=Wu,V.findLast=Jc,V.findLastIndex=Fs,V.findLastKey=Gu,V.floor=Bf,V.forEach=Qc,V.forEachRight=$c,V.forIn=Ku,V.forInRight=qu,V.forOwn=Ju,V.forOwnRight=Yu,V.get=Qu,V.gt=ql,V.gte=Jl,V.has=$u,V.hasIn=ed,V.head=Bs,V.identity=ff,V.includes=tl,V.indexOf=Vs,V.inRange=Td,V.invoke=rd,V.isArguments=Yl,V.isArray=q,V.isArrayBuffer=Xl,V.isArrayLike=Zl,V.isArrayLikeObject=J,V.isBoolean=Ql,V.isBuffer=$l,V.isDate=eu,V.isElement=tu,V.isEmpty=nu,V.isEqual=ru,V.isEqualWith=iu,V.isError=au,V.isFinite=ou,V.isFunction=su,V.isInteger=cu,V.isLength=lu,V.isMap=uu,V.isMatch=du,V.isMatchWith=fu,V.isNaN=pu,V.isNative=mu,V.isNil=gu,V.isNull=hu,V.isNumber=_u,V.isObject=Y,V.isObjectLike=X,V.isPlainObject=vu,V.isRegExp=yu,V.isSafeInteger=bu,V.isSet=xu,V.isString=Su,V.isSymbol=Cu,V.isTypedArray=wu,V.isUndefined=Tu,V.isWeakMap=Eu,V.isWeakSet=Du,V.join=Ks,V.kebabCase=Nd,V.last=qs,V.lastIndexOf=Js,V.lowerCase=Pd,V.lowerFirst=Fd,V.lt=Ou,V.lte=ku,V.max=Vf,V.maxBy=Hf,V.mean=Uf,V.meanBy=Wf,V.min=Gf,V.minBy=Kf,V.stubArray=kf,V.stubFalse=Af,V.stubObject=jf,V.stubString=Mf,V.stubTrue=Nf,V.multiply=qf,V.nth=Ys,V.noConflict=yf,V.noop=bf,V.now=gl,V.pad=Id,V.padEnd=Ld,V.padStart=Rd,V.parseInt=zd,V.random=Ed,V.reduce=sl,V.reduceRight=cl,V.repeat=Bd,V.replace=Vd,V.result=pd,V.round=Jf,V.runInContext=e,V.sample=ul,V.size=pl,V.snakeCase=Hd,V.some=ml,V.sortedIndex=ic,V.sortedIndexBy=ac,V.sortedIndexOf=oc,V.sortedLastIndex=sc,V.sortedLastIndexBy=cc,V.sortedLastIndexOf=lc,V.startCase=Wd,V.startsWith=Gd,V.subtract=Yf,V.sum=Xf,V.sumBy=Zf,V.template=Kd,V.times=Pf,V.toFinite=ju,V.toInteger=Z,V.toLength=Mu,V.toLower=qd,V.toNumber=Nu,V.toSafeInteger=Fu,V.toString=Q,V.toUpper=Jd,V.trim=Yd,V.trimEnd=Xd,V.trimStart=Zd,V.truncate=Qd,V.unescape=$d,V.uniqueId=If,V.upperCase=ef,V.upperFirst=tf,V.each=Qc,V.eachRight=$c,V.first=Bs,vf(V,function(){var e={};return Si(V,function(t,n){A.call(V.prototype,n)||(e[n]=t)}),e}(),{chain:!1}),V.VERSION=`4.18.1`,pn([`bind`,`bindKey`,`curry`,`curryRight`,`partial`,`partialRight`],function(e){V[e].placeholder=V}),pn([`drop`,`take`],function(e,t){H.prototype[e]=function(r){r=r===n?1:M(Z(r),0);var i=this.__filtered__&&!t?new H(this):this.clone();return i.__filtered__?i.__takeCount__=F(r,i.__takeCount__):i.__views__.push({size:F(r,v),type:e+(i.__dir__<0?`Right`:``)}),i},H.prototype[e+`Right`]=function(t){return this.reverse()[e](t).reverse()}}),pn([`filter`,`map`,`takeWhile`],function(e,t){var n=t+1,r=n==1||n==3;H.prototype[e]=function(e){var t=this.clone();return t.__iteratees__.push({iteratee:G(e,3),type:n}),t.__filtered__=t.__filtered__||r,t}}),pn([`head`,`last`],function(e,t){var n=`take`+(t?`Right`:``);H.prototype[e]=function(){return this[n](1).value()[0]}}),pn([`initial`,`tail`],function(e,t){var n=`drop`+(t?``:`Right`);H.prototype[e]=function(){return this.__filtered__?new H(this):this[n](1)}}),H.prototype.compact=function(){return this.filter(ff)},H.prototype.find=function(e){return this.filter(e).head()},H.prototype.findLast=function(e){return this.reverse().find(e)},H.prototype.invokeMap=W(function(e,t){return typeof e==`function`?new H(this):this.map(function(n){return Pi(n,e,t)})}),H.prototype.reject=function(e){return this.filter(kl(G(e)))},H.prototype.slice=function(e,t){e=Z(e);var r=this;return r.__filtered__&&(e>0||t<0)?new H(r):(e<0?r=r.takeRight(-e):e&&(r=r.drop(e)),t!==n&&(t=Z(t),r=t<0?r.dropRight(-t):r.take(t-e)),r)},H.prototype.takeRightWhile=function(e){return this.reverse().takeWhile(e).reverse()},H.prototype.toArray=function(){return this.take(v)},Si(H.prototype,function(e,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),i=/^(?:head|last)$/.test(t),a=V[i?`take`+(t==`last`?`Right`:``):t],o=i||/^find/.test(t);a&&(V.prototype[t]=function(){var t=this.__wrapped__,s=i?[1]:arguments,c=t instanceof H,l=s[0],u=c||q(t),d=function(e){var t=a.apply(V,z([e],s));return i&&f?t[0]:t};u&&r&&typeof l==`function`&&l.length!=1&&(c=u=!1);var f=this.__chain__,p=!!this.__actions__.length,m=o&&!f,h=c&&!p;if(!o&&u){t=h?t:new H(this);var g=e.apply(t,s);return g.__actions__.push({func:Fc,args:[d],thisArg:n}),new yr(g,f)}return m&&h?e.apply(this,s):(g=this.thru(d),m?i?g.value()[0]:g.value():g)})}),pn([`pop`,`push`,`shift`,`sort`,`splice`,`unshift`],function(e){var t=ft[e],n=/^(?:push|sort|unshift)$/.test(e)?`tap`:`thru`,r=/^(?:pop|shift)$/.test(e);V.prototype[e]=function(){var e=arguments;if(r&&!this.__chain__){var i=this.value();return t.apply(q(i)?i:[],e)}return this[n](function(n){return t.apply(q(n)?n:[],e)})}}),Si(H.prototype,function(e,t){var n=V[t];if(n){var r=n.name+``;A.call(Mn,r)||(Mn[r]=[]),Mn[r].push({name:t,func:n})}}),Mn[co(n,s).name]=[{name:`wrapper`,func:n}],H.prototype.clone=br,H.prototype.reverse=xr,H.prototype.value=Sr,V.prototype.at=Ic,V.prototype.chain=Lc,V.prototype.commit=Rc,V.prototype.next=zc,V.prototype.plant=Vc,V.prototype.reverse=Hc,V.prototype.toJSON=V.prototype.valueOf=V.prototype.value=Uc,V.prototype.first=V.prototype.head,At&&(V.prototype[At]=Bc),V})();typeof define==`function`&&typeof define.amd==`object`&&define.amd?(I._=dr,define(function(){return dr})):tn?((tn.exports=dr)._=dr,en._=dr):I._=dr}).call(e)})),d=s(((e,t)=>{var n=l(u()).default;t.exports={clone:n.clone,constant:n.constant,each:n.each,filter:n.filter,has:n.has,isArray:n.isArray,isEmpty:n.isEmpty,isFunction:n.isFunction,isUndefined:n.isUndefined,keys:n.keys,map:n.map,reduce:n.reduce,size:n.size,transform:n.transform,union:n.union,values:n.values}})),f=s(((e,t)=>{var n=d();t.exports=o;var r=`\0`,i=`\0`,a=``;function o(e){this._isDirected=!n.has(e,`directed`)||e.directed,this._isMultigraph=n.has(e,`multigraph`)?e.multigraph:!1,this._isCompound=n.has(e,`compound`)?e.compound:!1,this._label=void 0,this._defaultNodeLabelFn=n.constant(void 0),this._defaultEdgeLabelFn=n.constant(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[i]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}o.prototype._nodeCount=0,o.prototype._edgeCount=0,o.prototype.isDirected=function(){return this._isDirected},o.prototype.isMultigraph=function(){return this._isMultigraph},o.prototype.isCompound=function(){return this._isCompound},o.prototype.setGraph=function(e){return this._label=e,this},o.prototype.graph=function(){return this._label},o.prototype.setDefaultNodeLabel=function(e){return n.isFunction(e)||(e=n.constant(e)),this._defaultNodeLabelFn=e,this},o.prototype.nodeCount=function(){return this._nodeCount},o.prototype.nodes=function(){return n.keys(this._nodes)},o.prototype.sources=function(){var e=this;return n.filter(this.nodes(),function(t){return n.isEmpty(e._in[t])})},o.prototype.sinks=function(){var e=this;return n.filter(this.nodes(),function(t){return n.isEmpty(e._out[t])})},o.prototype.setNodes=function(e,t){var r=arguments,i=this;return n.each(e,function(e){r.length>1?i.setNode(e,t):i.setNode(e)}),this},o.prototype.setNode=function(e,t){return n.has(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=i,this._children[e]={},this._children[i][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)},o.prototype.node=function(e){return this._nodes[e]},o.prototype.hasNode=function(e){return n.has(this._nodes,e)},o.prototype.removeNode=function(e){var t=this;if(n.has(this._nodes,e)){var r=function(e){t.removeEdge(t._edgeObjs[e])};delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],n.each(this.children(e),function(e){t.setParent(e)}),delete this._children[e]),n.each(n.keys(this._in[e]),r),delete this._in[e],delete this._preds[e],n.each(n.keys(this._out[e]),r),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this},o.prototype.setParent=function(e,t){if(!this._isCompound)throw Error(`Cannot set parent in a non-compound graph`);if(n.isUndefined(t))t=i;else{t+=``;for(var r=t;!n.isUndefined(r);r=this.parent(r))if(r===e)throw Error(`Setting `+t+` as parent of `+e+` would create a cycle`);this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this},o.prototype._removeFromParentsChildList=function(e){delete this._children[this._parent[e]][e]},o.prototype.parent=function(e){if(this._isCompound){var t=this._parent[e];if(t!==i)return t}},o.prototype.children=function(e){if(n.isUndefined(e)&&(e=i),this._isCompound){var t=this._children[e];if(t)return n.keys(t)}else if(e===i)return this.nodes();else if(this.hasNode(e))return[]},o.prototype.predecessors=function(e){var t=this._preds[e];if(t)return n.keys(t)},o.prototype.successors=function(e){var t=this._sucs[e];if(t)return n.keys(t)},o.prototype.neighbors=function(e){var t=this.predecessors(e);if(t)return n.union(t,this.successors(e))},o.prototype.isLeaf=function(e){return(this.isDirected()?this.successors(e):this.neighbors(e)).length===0},o.prototype.filterNodes=function(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var r=this;n.each(this._nodes,function(n,r){e(r)&&t.setNode(r,n)}),n.each(this._edgeObjs,function(e){t.hasNode(e.v)&&t.hasNode(e.w)&&t.setEdge(e,r.edge(e))});var i={};function a(e){var n=r.parent(e);return n===void 0||t.hasNode(n)?(i[e]=n,n):n in i?i[n]:a(n)}return this._isCompound&&n.each(t.nodes(),function(e){t.setParent(e,a(e))}),t},o.prototype.setDefaultEdgeLabel=function(e){return n.isFunction(e)||(e=n.constant(e)),this._defaultEdgeLabelFn=e,this},o.prototype.edgeCount=function(){return this._edgeCount},o.prototype.edges=function(){return n.values(this._edgeObjs)},o.prototype.setPath=function(e,t){var r=this,i=arguments;return n.reduce(e,function(e,n){return i.length>1?r.setEdge(e,n,t):r.setEdge(e,n),n}),this},o.prototype.setEdge=function(){var e,t,r,i,a=!1,o=arguments[0];typeof o==`object`&&o&&`v`in o?(e=o.v,t=o.w,r=o.name,arguments.length===2&&(i=arguments[1],a=!0)):(e=o,t=arguments[1],r=arguments[3],arguments.length>2&&(i=arguments[2],a=!0)),e=``+e,t=``+t,n.isUndefined(r)||(r=``+r);var c=l(this._isDirected,e,t,r);if(n.has(this._edgeLabels,c))return a&&(this._edgeLabels[c]=i),this;if(!n.isUndefined(r)&&!this._isMultigraph)throw Error(`Cannot set a named edge when isMultigraph = false`);this.setNode(e),this.setNode(t),this._edgeLabels[c]=a?i:this._defaultEdgeLabelFn(e,t,r);var d=u(this._isDirected,e,t,r);return e=d.v,t=d.w,Object.freeze(d),this._edgeObjs[c]=d,s(this._preds[t],e),s(this._sucs[e],t),this._in[t][c]=d,this._out[e][c]=d,this._edgeCount++,this},o.prototype.edge=function(e,t,n){var r=arguments.length===1?f(this._isDirected,arguments[0]):l(this._isDirected,e,t,n);return this._edgeLabels[r]},o.prototype.hasEdge=function(e,t,r){var i=arguments.length===1?f(this._isDirected,arguments[0]):l(this._isDirected,e,t,r);return n.has(this._edgeLabels,i)},o.prototype.removeEdge=function(e,t,n){var r=arguments.length===1?f(this._isDirected,arguments[0]):l(this._isDirected,e,t,n),i=this._edgeObjs[r];return i&&(e=i.v,t=i.w,delete this._edgeLabels[r],delete this._edgeObjs[r],c(this._preds[t],e),c(this._sucs[e],t),delete this._in[t][r],delete this._out[e][r],this._edgeCount--),this},o.prototype.inEdges=function(e,t){var r=this._in[e];if(r){var i=n.values(r);return t?n.filter(i,function(e){return e.v===t}):i}},o.prototype.outEdges=function(e,t){var r=this._out[e];if(r){var i=n.values(r);return t?n.filter(i,function(e){return e.w===t}):i}},o.prototype.nodeEdges=function(e,t){var n=this.inEdges(e,t);if(n)return n.concat(this.outEdges(e,t))};function s(e,t){e[t]?e[t]++:e[t]=1}function c(e,t){--e[t]||delete e[t]}function l(e,t,i,o){var s=``+t,c=``+i;if(!e&&s>c){var l=s;s=c,c=l}return s+a+c+a+(n.isUndefined(o)?r:o)}function u(e,t,n,r){var i=``+t,a=``+n;if(!e&&i>a){var o=i;i=a,a=o}var s={v:i,w:a};return r&&(s.name=r),s}function f(e,t){return l(e,t.v,t.w,t.name)}})),p=s(((e,t)=>{t.exports=`2.1.8`})),m=s(((e,t)=>{t.exports={Graph:f(),version:p()}})),h=s(((e,t)=>{var n=d(),r=f();t.exports={write:i,read:s};function i(e){var t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:a(e),edges:o(e)};return n.isUndefined(e.graph())||(t.value=n.clone(e.graph())),t}function a(e){return n.map(e.nodes(),function(t){var r=e.node(t),i=e.parent(t),a={v:t};return n.isUndefined(r)||(a.value=r),n.isUndefined(i)||(a.parent=i),a})}function o(e){return n.map(e.edges(),function(t){var r=e.edge(t),i={v:t.v,w:t.w};return n.isUndefined(t.name)||(i.name=t.name),n.isUndefined(r)||(i.value=r),i})}function s(e){var t=new r(e.options).setGraph(e.value);return n.each(e.nodes,function(e){t.setNode(e.v,e.value),e.parent&&t.setParent(e.v,e.parent)}),n.each(e.edges,function(e){t.setEdge({v:e.v,w:e.w,name:e.name},e.value)}),t}})),g=s(((e,t)=>{var n=d();t.exports=r;function r(e){var t={},r=[],i;function a(r){n.has(t,r)||(t[r]=!0,i.push(r),n.each(e.successors(r),a),n.each(e.predecessors(r),a))}return n.each(e.nodes(),function(e){i=[],a(e),i.length&&r.push(i)}),r}})),_=s(((e,t)=>{var n=d();t.exports=r;function r(){this._arr=[],this._keyIndices={}}r.prototype.size=function(){return this._arr.length},r.prototype.keys=function(){return this._arr.map(function(e){return e.key})},r.prototype.has=function(e){return n.has(this._keyIndices,e)},r.prototype.priority=function(e){var t=this._keyIndices[e];if(t!==void 0)return this._arr[t].priority},r.prototype.min=function(){if(this.size()===0)throw Error(`Queue underflow`);return this._arr[0].key},r.prototype.add=function(e,t){var r=this._keyIndices;if(e=String(e),!n.has(r,e)){var i=this._arr,a=i.length;return r[e]=a,i.push({key:e,priority:t}),this._decrease(a),!0}return!1},r.prototype.removeMin=function(){this._swap(0,this._arr.length-1);var e=this._arr.pop();return delete this._keyIndices[e.key],this._heapify(0),e.key},r.prototype.decrease=function(e,t){var n=this._keyIndices[e];if(t>this._arr[n].priority)throw Error(`New priority is greater than current priority. Key: `+e+` Old: `+this._arr[n].priority+` New: `+t);this._arr[n].priority=t,this._decrease(n)},r.prototype._heapify=function(e){var t=this._arr,n=2*e,r=n+1,i=e;n<t.length&&(i=t[n].priority<t[i].priority?n:i,r<t.length&&(i=t[r].priority<t[i].priority?r:i),i!==e&&(this._swap(e,i),this._heapify(i)))},r.prototype._decrease=function(e){for(var t=this._arr,n=t[e].priority,r;e!==0&&(r=e>>1,!(t[r].priority<n));)this._swap(e,r),e=r},r.prototype._swap=function(e,t){var n=this._arr,r=this._keyIndices,i=n[e],a=n[t];n[e]=a,n[t]=i,r[a.key]=e,r[i.key]=t}})),v=s(((e,t)=>{var n=d(),r=_();t.exports=a;var i=n.constant(1);function a(e,t,n,r){return o(e,String(t),n||i,r||function(t){return e.outEdges(t)})}function o(e,t,n,i){var a={},o=new r,s,c,l=function(e){var t=e.v===s?e.w:e.v,r=a[t],i=n(e),l=c.distance+i;if(i<0)throw Error(`dijkstra does not allow negative edge weights. Bad edge: `+e+` Weight: `+i);l<r.distance&&(r.distance=l,r.predecessor=s,o.decrease(t,l))};for(e.nodes().forEach(function(e){var n=e===t?0:1/0;a[e]={distance:n},o.add(e,n)});o.size()>0&&(s=o.removeMin(),c=a[s],c.distance!==1/0);)i(s).forEach(l);return a}})),y=s(((e,t)=>{var n=v(),r=d();t.exports=i;function i(e,t,i){return r.transform(e.nodes(),function(r,a){r[a]=n(e,a,t,i)},{})}})),b=s(((e,t)=>{var n=d();t.exports=r;function r(e){var t=0,r=[],i={},a=[];function o(s){var c=i[s]={onStack:!0,lowlink:t,index:t++};if(r.push(s),e.successors(s).forEach(function(e){n.has(i,e)?i[e].onStack&&(c.lowlink=Math.min(c.lowlink,i[e].index)):(o(e),c.lowlink=Math.min(c.lowlink,i[e].lowlink))}),c.lowlink===c.index){var l=[],u;do u=r.pop(),i[u].onStack=!1,l.push(u);while(s!==u);a.push(l)}}return e.nodes().forEach(function(e){n.has(i,e)||o(e)}),a}})),x=s(((e,t)=>{var n=d(),r=b();t.exports=i;function i(e){return n.filter(r(e),function(t){return t.length>1||t.length===1&&e.hasEdge(t[0],t[0])})}})),ee=s(((e,t)=>{var n=d();t.exports=i;var r=n.constant(1);function i(e,t,n){return a(e,t||r,n||function(t){return e.outEdges(t)})}function a(e,t,n){var r={},i=e.nodes();return i.forEach(function(e){r[e]={},r[e][e]={distance:0},i.forEach(function(t){e!==t&&(r[e][t]={distance:1/0})}),n(e).forEach(function(n){var i=n.v===e?n.w:n.v,a=t(n);r[e][i]={distance:a,predecessor:e}})}),i.forEach(function(e){var t=r[e];i.forEach(function(n){var a=r[n];i.forEach(function(n){var r=a[e],i=t[n],o=a[n],s=r.distance+i.distance;s<o.distance&&(o.distance=s,o.predecessor=i.predecessor)})})}),r}})),te=s(((e,t)=>{var n=d();t.exports=r,r.CycleException=i;function r(e){var t={},r={},a=[];function o(s){if(n.has(r,s))throw new i;n.has(t,s)||(r[s]=!0,t[s]=!0,n.each(e.predecessors(s),o),delete r[s],a.push(s))}if(n.each(e.sinks(),o),n.size(t)!==e.nodeCount())throw new i;return a}function i(){}i.prototype=Error()})),ne=s(((e,t)=>{var n=te();t.exports=r;function r(e){try{n(e)}catch(e){if(e instanceof n.CycleException)return!1;throw e}return!0}})),re=s(((e,t)=>{var n=d();t.exports=r;function r(e,t,r){n.isArray(t)||(t=[t]);var a=(e.isDirected()?e.successors:e.neighbors).bind(e),o=[],s={};return n.each(t,function(t){if(!e.hasNode(t))throw Error(`Graph does not have node: `+t);i(e,t,r===`post`,s,a,o)}),o}function i(e,t,r,a,o,s){n.has(a,t)||(a[t]=!0,r||s.push(t),n.each(o(t),function(t){i(e,t,r,a,o,s)}),r&&s.push(t))}})),ie=s(((e,t)=>{var n=re();t.exports=r;function r(e,t){return n(e,t,`post`)}})),ae=s(((e,t)=>{var n=re();t.exports=r;function r(e,t){return n(e,t,`pre`)}})),oe=s(((e,t)=>{var n=d(),r=f(),i=_();t.exports=a;function a(e,t){var a=new r,o={},s=new i,c;function l(e){var n=e.v===c?e.w:e.v,r=s.priority(n);if(r!==void 0){var i=t(e);i<r&&(o[n]=c,s.decrease(n,i))}}if(e.nodeCount()===0)return a;n.each(e.nodes(),function(e){s.add(e,1/0),a.setNode(e)}),s.decrease(e.nodes()[0],0);for(var u=!1;s.size()>0;){if(c=s.removeMin(),n.has(o,c))a.setEdge(c,o[c]);else if(u)throw Error(`Input graph is not connected: `+e);else u=!0;e.nodeEdges(c).forEach(l)}return a}})),se=s(((e,t)=>{t.exports={components:g(),dijkstra:v(),dijkstraAll:y(),findCycles:x(),floydWarshall:ee(),isAcyclic:ne(),postorder:ie(),preorder:ae(),prim:oe(),tarjan:b(),topsort:te()}})),ce=s(((e,t)=>{var n=m();t.exports={Graph:n.Graph,json:h(),alg:se(),version:n.version}})),le=l(u(),1),ue=l(ce(),1);function de(){return typeof window<`u`&&(window._||(window._=le.default),window.graphlib||(window.graphlib=ue.default)),{_:le.default,graphlib:ue.default}}de();var fe=new class{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){this.listeners.has(e)&&(this.listeners.get(e).delete(t),this.listeners.get(e).size===0&&this.listeners.delete(e))}emit(e,t){if(this.listeners.has(e))for(let n of this.listeners.get(e))try{n(t)}catch(t){console.error(`Error in event listener for ${e}:`,t)}if(this.listeners.has(`*`))for(let n of this.listeners.get(`*`))try{n({event:e,payload:t})}catch(e){console.error(`Error in wildcard listener:`,e)}}},pe=class{constructor(){this.nodes=new Map,this.connections=[],this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){this.listeners.has(e)&&this.listeners.get(e).delete(t)}emit(e,t){if(this.listeners.has(e))for(let n of this.listeners.get(e))n(t);fe.emit(e,{graph:this,...t})}clear(){this.nodes.clear(),this.connections=[],this.emit(`graph:cleared`,{})}createNode(e,t={x:100,y:100},n=`node_preset_1`){if(this.nodes.has(e))return console.warn(`A node named "${e}" already exists.`),null;let r={name:e,position:t,preset:n,alternate:!0,attributes:[],metadata:{process_details:``}};return this.nodes.set(e,r),this.emit(`node:created`,{nodeName:e,node:r}),r}deleteNode(e){if(!this.nodes.has(e))return;this.connections=this.connections.filter(t=>{let n=t.sourceNode===e||t.targetNode===e;return n&&this.emit(`connection:deleted`,{connection:t}),!n});let t=this.nodes.get(e);this.nodes.delete(e),this.emit(`node:deleted`,{nodeName:e,node:t})}renameNode(e,t){if(!this.nodes.has(e))return!1;if(this.nodes.has(t))return console.warn(`Node named "${t}" already exists.`),!1;let n=this.nodes.get(e);return n.name=t,this.nodes.set(t,n),this.nodes.delete(e),this.connections.forEach(n=>{n.sourceNode===e&&(n.sourceNode=t),n.targetNode===e&&(n.targetNode=t)}),this.emit(`node:renamed`,{oldName:e,newName:t,node:n}),!0}moveNode(e,t){if(!this.nodes.has(e))return;let n=this.nodes.get(e);n.position=t,this.emit(`node:moved`,{nodeName:e,position:t})}updateNodeMetadata(e,t,n){if(!this.nodes.has(e))return;let r=this.nodes.get(e);r.metadata[t]=n,this.emit(`node:metadata_updated`,{nodeName:e,key:t,value:n})}createAttribute(e,t){let n=this.nodes.get(e);if(!n)return null;let{name:r,plug:i=!1,socket:a=!1,preset:o=i?`attr_preset_2`:`attr_preset_1`,dataType:s=`Unknown`,connectionIcon:c=null,connectionLabel:l=null,plugMaxConnections:u=-1,socketMaxConnections:d=1}=t;if(n.attributes.some(e=>e.name===r))return console.warn(`Attribute "${r}" already exists on node "${e}".`),null;let f={name:r,plug:i,socket:a,preset:o,dataType:s,connectionIcon:c,connectionLabel:l,plugMaxConnections:u,socketMaxConnections:d};n.attributes.push(f);let p=n.attributes.length-1;return this.emit(`attribute:created`,{nodeName:e,attribute:f,index:p}),f}deleteAttribute(e,t){let n=this.nodes.get(e);if(!n)return;let r=n.attributes.findIndex(e=>e.name===t);if(r===-1)return;this.connections=this.connections.filter(n=>{let r=n.sourceNode===e&&n.sourceAttr===t||n.targetNode===e&&n.targetAttr===t;return r&&this.emit(`connection:deleted`,{connection:n}),!r});let i=n.attributes[r];n.attributes.splice(r,1),this.emit(`attribute:deleted`,{nodeName:e,attribute:i,index:r})}editAttribute(e,t,n){let r=this.nodes.get(e);if(!r||!r.attributes[t])return;let i=r.attributes[t],a=i.name,o=n.name||a;r.attributes[t]={...i,...n},o!==a&&this.connections.forEach(t=>{t.sourceNode===e&&t.sourceAttr===a&&(t.sourceAttr=o),t.targetNode===e&&t.targetAttr===a&&(t.targetAttr=o)}),this.emit(`attribute:edited`,{nodeName:e,index:t,oldAttr:i,newAttr:r.attributes[t]})}reorderAttribute(e,t,n){let r=this.nodes.get(e);if(!r)return;let i=t+n;if(i<0||i>=r.attributes.length)return;let a=r.attributes[t];r.attributes[t]=r.attributes[i],r.attributes[i]=a,this.emit(`attribute:reordered`,{nodeName:e,fromIndex:t,toIndex:i})}createConnection(e,t,n,r){if(this.connections.some(i=>i.sourceNode===e&&i.sourceAttr===t&&i.targetNode===n&&i.targetAttr===r))return null;let i=this.nodes.get(e),a=this.nodes.get(n);if(!i||!a)return null;let o={sourceNode:e,sourceAttr:t,targetNode:n,targetAttr:r};return this.connections.push(o),this.emit(`connection:created`,{connection:o}),o}deleteConnection(e,t,n,r){let i=this.connections.length;return this.connections=this.connections.filter(i=>{let a=i.sourceNode===e&&i.sourceAttr===t&&i.targetNode===n&&i.targetAttr===r;return a&&this.emit(`connection:deleted`,{connection:i}),!a}),this.connections.length<i}evaluateGraph(){return this.connections.map(e=>[`${e.sourceNode}.${e.sourceAttr}`,`${e.targetNode}.${e.targetAttr}`])}getIsolatedData(e){let t=this.nodes.get(e);if(!t)return null;let n={node:e,inputs:{},outputs:{}},r=this.connections.filter(t=>t.sourceNode===e||t.targetNode===e);return t.attributes.forEach(t=>{if(t.socket){let i=r.filter(n=>n.targetNode===e&&n.targetAttr===t.name).map(e=>[e.sourceNode,e.sourceAttr]);n.inputs[t.name]={dataType:t.dataType,connectionIcon:t.connectionIcon,connections:i}}if(t.plug){let i=r.filter(n=>n.sourceNode===e&&n.sourceAttr===t.name).map(e=>[e.targetNode,e.targetAttr]);n.outputs[t.name]={dataType:t.dataType,connectionIcon:t.connectionIcon,connections:i}}}),n}},me=[{code:`aaf`,type:`AAF`,extensions:[`aaf`],description:`Avid Advanced Authoring Format edit decision list`,path:`/data_type_icons/aaf.svg`},{code:`alembic`,type:`Alembic`,extensions:[`abc`],description:`Alembic computer graphics interchange framework`,path:`/data_type_icons/alembic.svg`},{code:`ale`,type:`ALE`,extensions:[`ale`],description:`Avid Log Exchange metadata format`,path:`/data_type_icons/ale.svg`},{code:`atom`,type:`Atom`,extensions:[`atom`],description:`Atom parameter mapping format`,path:`/data_type_icons/atom.svg`},{code:`blend`,type:`BLEND`,extensions:[`blend`],description:`Blender project file`,path:`/data_type_icons/blend.svg`},{code:`bvh`,type:`BVH`,extensions:[`bvh`],description:`Biovision Hierarchy character animation format`,path:`/data_type_icons/bvh.svg`},{code:`csv`,type:`CSV`,extensions:[`csv`],description:`Comma-Separated Values`,path:`/data_type_icons/csv.svg`},{code:`exr`,type:`EXR`,extensions:[`exr`],description:`OpenEXR high dynamic-range image file format`,path:`/data_type_icons/exr.svg`},{code:`fbx`,type:`FBX`,extensions:[`fbx`],description:`Autodesk Filmbox interchange format`,path:`/data_type_icons/fbx.svg`},{code:`fdx`,type:`FDX`,extensions:[`fdx`],description:`Final Draft XML screenplay document`,path:`/data_type_icons/fdx.svg`},{code:`fountain`,type:`FOUNTAIN`,extensions:[`fountain`],description:`Fountain plain text screenplay markup format`,path:`/data_type_icons/fountain.svg`},{code:`gizmo`,type:`GIZMO`,extensions:[`gizmo`,`nk`],description:`Foundry Nuke Gizmo node script macro`,path:`/data_type_icons/gizmo.svg`},{code:`gltf`,type:`GLTF`,extensions:[`gltf`,`glb`],description:`GL Transmission Format`,path:`/data_type_icons/gltf.svg`},{code:`grm`,type:`GRM`,extensions:[`grm`],description:`Yeti Groom hair and fur description file`,path:`/data_type_icons/grm.svg`},{code:`gto`,type:`GTO`,extensions:[`gto`],description:`Production Kitchen Sink Computer Graphics File Format, OpenGTO`,path:`/data_type_icons/gto.svg`},{code:`hda`,type:`HDA`,extensions:[`hda`,`hdanc`,`otl`],description:`SideFX Houdini Digital Asset`,path:`/data_type_icons/hda.svg`},{code:`hdr`,type:`HDR`,extensions:[`hdr`,`pic`],description:`Radiance High Dynamic Range image format`,path:`/data_type_icons/hdr.svg`},{code:`jpg`,type:`JPG`,extensions:[`jpg`,`jpeg`],description:`Joint Photographic Experts Group image format`,path:`/data_type_icons/jpg.svg`},{code:`json`,type:`JSON`,extensions:[`json`],description:`JavaScript Object Notation`,path:`/data_type_icons/json.svg`},{code:`kiko`,type:`KIKO`,extensions:[`kiko`],description:`Kiko animation curves format`,path:`/data_type_icons/kiko.svg`},{code:`materialx`,type:`MaterialX`,extensions:[`mtlx`],description:`Open standard for transfer of rich material and look-development content`,path:`/data_type_icons/materialx.svg`},{code:`mayaascii`,type:`MAYAASCII`,extensions:[`ma`],description:`Autodesk Maya ASCII file format`,path:`/data_type_icons/mayaascii.svg`},{code:`mayabin`,type:`MAYABIN`,extensions:[`mb`],description:`Autodesk Maya Binary file format`,path:`/data_type_icons/mayabin.svg`},{code:`obj`,type:`OBJ`,extensions:[`obj`],description:`Wavefront 3D geometry definition file`,path:`/data_type_icons/obj.svg`},{code:`openvdb`,type:`OpenVDB`,extensions:[`vdb`],description:`Sparse volume data representation`,path:`/data_type_icons/openvdb.svg`},{code:`osl`,type:`OSL`,extensions:[`osl`,`oso`],description:`Open Shading Language shader specification format`,path:`/data_type_icons/osl.svg`},{code:`otio`,type:`OTIO`,extensions:[`otio`,`otioz`,`otiod`],description:`OpenTimelineIO API and interchange format`,path:`/data_type_icons/otio.svg`},{code:`partio`,type:`PARTIO`,extensions:[`ptc`,`pdg`,`bgeo`,`pda`,`partio`],description:`Disney Partio particle cache format`,path:`/data_type_icons/partio.svg`},{code:`pdf`,type:`PDF`,extensions:[`pdf`],description:`Portable Document Format`,path:`/data_type_icons/pdf.svg`},{code:`ply`,type:`PLY`,extensions:[`ply`],description:`Polygon File Format 3D mesh and point cloud`,path:`/data_type_icons/ply.svg`},{code:`psd`,type:`PSD`,extensions:[`psd`,`psb`],description:`Adobe Photoshop Document`,path:`/data_type_icons/psd.svg`},{code:`ptex`,type:`PTEX`,extensions:[`ptx`,`ptex`],description:`Per-Face Texture Mapping format`,path:`/data_type_icons/ptex.svg`},{code:`review`,type:`REVIEW`,extensions:[`mov`,`mp4`],description:`Pipeline movie review file`,path:`/data_type_icons/review.svg`},{code:`rumba`,type:`RUMBA`,extensions:[`rumba`],description:`Rumba animation tool format`,path:`/data_type_icons/rumba.svg`},{code:`screenjson`,type:`SCREENJSON`,extensions:[`screenjson`],description:`ScreenJson screenplay data format (screenjson.com)`,path:`/data_type_icons/screenjson.svg`},{code:`splat`,type:`SPLAT`,extensions:[`splat`],description:`3D Gaussian Splatting point cloud format`,path:`/data_type_icons/splat.svg`},{code:`uasset`,type:`UASSET`,extensions:[`uasset`],description:`Unreal Engine Asset binary package`,path:`/data_type_icons/uasset.svg`},{code:`umap`,type:`UMAP`,extensions:[`umap`],description:`Unreal Engine Map level package`,path:`/data_type_icons/umap.svg`},{code:`usd`,type:`USD`,extensions:[`usd`,`usda`,`usdc`,`usdz`],description:`Universal Scene Description`,path:`/data_type_icons/usd.svg`},{code:`wav`,type:`WAV`,extensions:[`wav`],description:`Waveform Audio File Format`,path:`/data_type_icons/wav.svg`},{code:`xgen`,type:`XGEN`,extensions:[`xgen`],description:`Autodesk Maya XGen description file`,path:`/data_type_icons/xgen.svg`},{code:`xml`,type:`XML`,extensions:[`xml`],description:`Extensible Markup Language`,path:`/data_type_icons/xml.svg`}];function he(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return(t>>>0).toString(16).padStart(8,`0`)}function ge({code:e=`custom`,label:t=``,color:n=`#38BDF8`,logoXml:r=``}){let i=(e||`custom`).toLowerCase().replace(/[^a-z0-9-_]/g,`_`),a=(t||e||`FORMAT`).toUpperCase(),o=`7.2`,s=`0.5`;a.length<=3?(o=`9.0`,s=`0.4`):a.length===4?(o=`8.2`,s=`0.5`):a.length<=7?(o=`7.2`,s=`0.5`):(o=`6.5`,s=`0.6`);let c=(r||``).trim(),l=``;if(!c)l=`<circle cx="32" cy="25.5" r="7" fill="${n}" fill-opacity="0.25" stroke="${n}" stroke-width="1.8"/>`;else{let e=0,t=0,r=24,i=24,a=c,o=c.match(/<svg([^>]*)>(.*)<\/svg>/is);if(o){let n=o[1];a=o[2];let s=n.match(/viewBox=["']([^"']+)["']/i);if(s){let n=s[1].trim().split(/[\s,]+/).map(Number);n.length===4&&!n.some(isNaN)&&([e,t,r,i]=n)}else{let e=n.match(/width=["']([^"']+)["']/i),t=n.match(/height=["']([^"']+)["']/i);e&&t&&(r=parseFloat(e[1])||24,i=parseFloat(t[1])||24)}}else c.startsWith(`<`)||(a=`<path d="${c}"/>`);let s=r>0?r:24,u=i>0?i:24,d=Math.min(23/s,22/u),f=32-s*d/2-e*d,p=25.5-u*d/2-t*d;a=a.replace(/stroke=["']currentColor["']/gi,`stroke="${n}"`).replace(/fill=["']currentColor["']/gi,`fill="${n}"`);let m=c.includes(`stroke=`),h=m&&!c.includes(`fill="`)?`fill="none"`:``,g=m?`stroke="${n}"`:``;l=`<g transform="translate(${f.toFixed(2)}, ${p.toFixed(2)}) scale(${d.toFixed(4)})" ${h} ${g}>${a}</g>`}return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-${i}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-${i}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-${i})" 
    stroke="${n}" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-${i})"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  ${l}

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="${o}" 
    font-weight="700" 
    letter-spacing="${s}"
  >${a}</text>
</svg>`}var _e=`plumber:custom-types`;function ve(e){if(!e)return``;if(e.startsWith(`data:image/svg+xml;base64,`))return e;if(e.startsWith(`data:image/svg+xml`))try{let t=decodeURIComponent(e.split(`,`)[1]||``);if(t)return`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`}catch{}return`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(e)))}`}var ye=new class{constructor(){this.customTypes=[],this.load()}load(){try{let e=localStorage.getItem(_e);if(e){let t=JSON.parse(e);Array.isArray(t)?this.customTypes=t.map(e=>{let t=e.iconPath||``;return t.startsWith(`data:image/svg+xml`)?t.startsWith(`data:image/svg+xml;utf8,`)&&(t=ve(t)):t=ve(e.icon||ge({code:e.code||`custom`,label:(e.code||`CUSTOM`).toUpperCase(),color:`#10B981`})),{...e,code:(e.code||``).toLowerCase(),extensions:Array.isArray(e.extensions)?e.extensions:[],iconPath:t}}):this.customTypes=[]}else this.customTypes=[]}catch(e){console.warn(`Recovering from invalid custom data types in localStorage:`,e),this.customTypes=[]}}save(){try{localStorage.setItem(_e,JSON.stringify(this.customTypes))}catch(e){console.error(`Failed to save custom data types to localStorage:`,e)}}getTypes(){return this.customTypes}getType(e){return e?this.customTypes.find(t=>t.code.toLowerCase()===e.toLowerCase()):null}addType(e){let{code:t,type:n,extensions:r=[],description:i=``,icon:a=``,iconPath:o=``}=e,s=t.toLowerCase(),c=Array.isArray(r)?r:[],l=ve(o||a||ge({code:s,label:s.toUpperCase(),color:`#38BDF8`})),u=`sha256:${he(`${s}:${n}:${c.join(`,`)}:${l}`)}`,d=this.customTypes.findIndex(e=>e.code.toLowerCase()===s),f={code:s,type:n,extensions:c,description:i,icon:a,iconPath:l,hash:u};return d===-1?this.customTypes.push(f):this.customTypes[d]=f,this.save(),u}removeType(e){let t=e?.toLowerCase();t&&(this.customTypes=this.customTypes.filter(e=>e.code.toLowerCase()!==t),this.save())}importTypes(e){let t={added:0,skipped:0,conflicts:0};return Array.isArray(e)&&e.forEach(e=>{if(!e.code||!e.type){t.skipped++;return}let n=e.code.toLowerCase(),r=this.getType(n);r?r.hash===e.hash?t.skipped++:(this.addType(e),t.conflicts++):(this.addType(e),t.added++)}),t}};function be(e){if(!e)return``;if(e.startsWith(`data:`)||e.startsWith(`http:`)||e.startsWith(`https:`))return e;let t=e.startsWith(`/`)?e.slice(1):e;return`/`.endsWith(`/`)?`/${t}`:`//${t}`}var xe={aaf:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-aaf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-aaf" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-aaf)" 
    stroke="#A855F7" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-aaf)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#A855F7" stroke-width="1.8" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="21" rx="3" fill="#A855F7" fill-opacity="0.2"/>
  <path d="M 20 22 H 44 M 20 28 H 44" stroke-width="1.2"/>
  <path d="M 25 33 L 32 17 L 39 33 M 27.5 28 H 36.5" stroke="#F8FAFC" stroke-width="2" stroke-linecap="round"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >AAF</text>
</svg>`,ale:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-ale" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-ale" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-ale)" 
    stroke="#8B5CF6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-ale)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#8B5CF6" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="21" rx="3" fill="#8B5CF6" fill-opacity="0.2"/>
  <path d="M 19.5 21 H 44.5 M 19.5 28 H 44.5 M 28 14 V 35 M 36 14 V 35" stroke-width="1.2"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >ALE</text>
</svg>`,alembic:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-alembic" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-alembic" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-alembic)" 
    stroke="#0096D6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-alembic)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(19.5, 12) scale(0.125)">
  <path fill="#0096D6" d="m99.383 5.022c-21.76 0-37.434 5.251-53.289 17.744-6.529 5.142-14.443 16.223-16.619 24.734-3 11.719-7.123 49.464 39.176 60.149 33.238 5.937 35.349-22.289 70.83-20.182 21.369 3.166 30.8 19.586 27.156 38.241-6.6 27.556-35.807 26.711-46.742 15.774-5.539-5.54-7.377-16.827.261-25.522 5.737-6.529 13.651-7.16 19.786-3.958 4.55 2.375 6.2 6.578 5.146 10.289-1.586 5.54-7.98 6.6-16.424 2.77 5.28 9.366 20.447 10.684 24.93-.395 2.375-8.112-.385-17.288-10.354-23.151-6.728-3.957-19.326-3.757-30.009 4.419-10.936 8.371-16.287 22.687-9.955 36.734 4.624 10.267 14.52 20.773 34.435 20.263a85.554 85.554 0 0 1 -14.133 7.339c-48.968 11.242-64.917-14.591-63.633-28.194.92-8.574 9.364-13.057 15.827-12.4 8.937.91 11.923 11.341 10.021 17.149 11.082-7.916 3.942-26.292-12.139-26.606-12.833-.25-23.222 7.814-25.32 20.01-1.626 9.47 1.543 17.8 7.12 24.6a82.945 82.945 0 0 1 -10.094-6.212c-9.809-7.9-20.384-22.71-18.657-36.725 1.254-10.179 7.158-15.366 15.692-12.842-7.973-8.922-19.209-2.657-22.2 6.542a29.385 29.385 0 0 0 -1.344 9.883 89.116 89.116 0 0 1 -6.781-28.315c-.8-11.673 1.772-27.3 8.563-35.812-7.582 5.736-13.584 21.352-13.584 36.007a92.333 92.333 0 1 0 92.334-92.333zm41.978 58.158c-5.232-.745-9.595-4.405-9.08-8.041a7.873 7.873 0 0 1 5.729-6.939c6.4-2.06 18.494 1.308 24.619 18.916-6.248-8.401-13.416-2.816-21.268-3.936z"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >ABC</text>
</svg>`,atom:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-atom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-atom" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-atom)" 
    stroke="#0284C7" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-atom)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#0284C7" stroke-width="1.6" fill="none"><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(-30 32 25.5)"/><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(30 32 25.5)"/><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(90 32 25.5)"/><circle cx="32" cy="25.5" r="3.2" fill="#0284C7" stroke="none"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >ATOM</text>
</svg>`,blend:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-blend" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-blend" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-blend)" 
    stroke="#EA7600" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-blend)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(18.25, 13.26) scale(0.1519)">
    <title>Blender logo (without text)</title>
    <g transform="matrix(.281 0 0 .281 -41.8 -43.7)">
        <g transform="matrix(21.6 0 0 21.6 -4857 7665)">
            <path d="m243-334c0.106-1.89 1.03-3.56 2.43-4.74 1.37-1.16 3.21-1.87 5.23-1.87 2.01 0 3.85 0.709 5.22 1.87 1.4 1.18 2.32 2.85 2.43 4.74 0.106 1.94-0.675 3.75-2.04 5.09-1.4 1.36-3.38 2.22-5.61 2.22s-4.22-0.854-5.61-2.22c-1.37-1.34-2.15-3.14-2.04-5.08z" style="fill-rule:nonzero;fill:#fff"/>
        </g>
        <g transform="matrix(11.1 0 0 11.1 -2215 4153)">
            <path d="m243-334c0.106-1.89 1.03-3.56 2.43-4.74 1.37-1.16 3.21-1.87 5.23-1.87 2.01 0 3.85 0.709 5.22 1.87 1.4 1.18 2.32 2.85 2.43 4.74 0.106 1.94-0.675 3.75-2.04 5.09-1.4 1.36-3.38 2.22-5.61 2.22s-4.22-0.854-5.61-2.22c-1.37-1.34-2.15-3.14-2.04-5.08z" style="fill-rule:nonzero;fill:#265787"/>
            <path d="m231-330c0.013 0.74 0.249 2.18 0.603 3.3 0.744 2.38 2.01 4.58 3.76 6.51 1.8 1.99 4.02 3.59 6.58 4.73 2.69 1.19 5.61 1.8 8.64 1.8 3.03-4e-3 5.95-0.624 8.64-1.83 2.56-1.15 4.78-2.75 6.58-4.75 1.76-1.95 3.02-4.15 3.76-6.53 0.375-1.2 0.612-2.42 0.707-3.64 0.093-1.2 0.054-2.41-0.117-3.62-0.334-2.35-1.15-4.56-2.4-6.56-1.14-1.85-2.62-3.46-4.38-4.82l4e-3 -3e-3 -17.7-13.6c-0.016-0.012-0.029-0.025-0.046-0.036-1.16-0.892-3.12-0.889-4.39 5e-3 -1.29 0.904-1.44 2.4-0.29 3.34l-5e-3 5e-3 7.39 6.01-22.5 0.024h-0.03c-1.86 2e-3 -3.65 1.22-4 2.77-0.364 1.57 0.9 2.88 2.84 2.88l-3e-3 7e-3 11.4-0.022-20.4 15.6c-0.026 0.019-0.054 0.039-0.078 0.058-1.92 1.47-2.54 3.92-1.33 5.46 1.23 1.57 3.84 1.58 5.78 9e-3l11.1-9.1s-0.162 1.23-0.149 1.96zm28.6 4.11c-2.29 2.33-5.5 3.66-8.96 3.66-3.47 6e-3 -6.68-1.3-8.97-3.63-1.12-1.14-1.94-2.44-2.45-3.83-0.497-1.37-0.69-2.82-0.562-4.28 0.121-1.43 0.547-2.8 1.23-4.03 0.668-1.21 1.59-2.31 2.72-3.24 2.23-1.81 5.06-2.8 8.02-2.8 2.97-4e-3 5.8 0.969 8.03 2.78 1.13 0.924 2.05 2.02 2.72 3.23 0.683 1.23 1.11 2.59 1.23 4.03 0.126 1.46-0.067 2.91-0.564 4.28-0.508 1.4-1.33 2.7-2.45 3.84z" style="fill-rule:nonzero;fill:#ea7600"/>
        </g>
    </g>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >BLEND</text>
</svg>`,bvh:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-bvh" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-bvh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-bvh)" 
    stroke="#F97316" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-bvh)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#F97316" stroke-width="1.8" fill="#F97316" stroke-linecap="round"><circle cx="32" cy="14.5" r="2.8"/><line x1="32" y1="17.5" x2="32" y2="27.5"/><line x1="23.5" y1="20.5" x2="40.5" y2="20.5"/><line x1="32" y1="27.5" x2="24.5" y2="36"/><line x1="32" y1="27.5" x2="39.5" y2="36"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >BVH</text>
</svg>`,csv:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-csv" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-csv" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-csv)" 
    stroke="#10B981" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-csv)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#10B981" stroke-width="1.8" fill="none"><rect x="19.5" y="15" width="25" height="21" rx="3" fill="#10B981" fill-opacity="0.2"/><path d="M 19.5 22 H 44.5 M 19.5 29 H 44.5 M 28 15 V 36 M 36 15 V 36" stroke-width="1.2"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >CSV</text>
</svg>`,exr:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-exr" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-exr" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-exr)" 
    stroke="#F59E0B" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-exr)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(18.88, 12.56) scale(0.0263)"><g>
	<path fill="none" d="M500.6,252.7c-1,0.9-2.1,1.9-3.2,2.8h0C498.4,254.5,499.5,253.6,500.6,252.7z"/>
	<path fill="none" d="M698.8,143.4c-62.6,11.1-129.4,35.2-175,84.9C569.4,178.6,636.1,154.5,698.8,143.4z"/>
	<polygon fill="#541431" points="511.5,658.3 851.8,598.3 511.5,658.3 	"/>
	<path fill="#541431" d="M478.5,686.7c-70.2,50.2-178.3,79.2-265.4,95.4c-4.3,0.8-8.6,1.6-12.8,2.3h0c-2,0.4-4,0.7-5.9,1l94.4,117.6
		l707.5-124.8L867.6,618.1L478.5,686.7z"/>
	<polygon fill="#891720" points="194.4,580 148.2,522.5 148.2,522.5 196.9,583.1 196.9,583.1 	"/>
	<path fill="#891720" d="M487.8,474.2c-69.6,54.6-183.7,85.5-274.7,102.4C304.2,559.7,418.2,528.8,487.8,474.2z"/>
	<path fill="#891720" d="M200.3,784.4c4.2-0.7,8.5-1.5,12.8-2.3c87.1-16.2,195.2-45.2,265.3-95.4l-185.8,32.8l-12.9,2.3l-8.2-10.2
		l-21-26.1c-29-5.1-57.6-19.7-73.4-39.4c-15.9-19.8-14.9-39.5-0.3-52.3l-53.5-66.7L3.7,548l190.6,237.5
		C196.3,785.1,198.3,784.8,200.3,784.4L200.3,784.4z"/>
	<polygon fill="#891720" points="288.8,697.6 280.3,687 288.8,697.6 511.5,658.3 511.5,658.3 	"/>
	<polygon fill="#541431" points="196.9,583.1 280.3,687 196.9,583.1 	"/>
	<path fill="#541431" d="M177.1,645.9c15.9,19.8,44.4,34.3,73.4,39.4l-73.7-91.8C162.2,606.4,161.2,626.2,177.1,645.9z"/>
	<polygon fill="#891720" points="517.2,446.5 848,388.2 848,388.2 517.2,446.5 	"/>
	<path fill="#891720" d="M487.8,474.2c-69.6,54.6-183.7,85.5-274.7,102.4c-4.3,0.8-8.6,1.6-12.8,2.3h0c-2,0.4-4,0.7-5.9,1l2.5,3.1
		L280.3,687l8.5,10.6l222.7-39.3l340.3-60l144.5-25.5l-132.4-165L487.8,474.2z"/>
	<path fill="#C92F3B" d="M497.4,255.5C429,315,308.5,348,213.1,365.8C308.5,348,429,315,497.4,255.5L497.4,255.5z"/>
	<polygon fill="#C92F3B" points="196.1,371.3 200.4,376.7 200.4,376.7 	"/>
	<polygon fill="#C92F3B" points="288.8,486.8 288.8,486.8 517.2,446.5 517.2,446.5 	"/>
	<path fill="#C92F3B" d="M200.3,578.9L200.3,578.9c4.2-0.7,8.5-1.5,12.8-2.3c91-16.9,205.1-47.9,274.7-102.4l-195.2,34.4l-12.9,2.3
		l-8.2-10.2l-16.1-20c-30.6-4.2-61.6-19.3-78.3-40.2c-16.8-20.9-14.7-41.8,2.4-54.4l-2.4-3l-50-62.3L3.7,342.5l101.7,126.7
		l42.8,53.3l46.1,57.5C196.3,579.6,198.3,579.3,200.3,578.9z"/>
	<path fill="#891720" d="M177.1,440.4c16.8,20.9,47.7,36,78.3,40.2l-76-94.6C162.4,398.6,160.3,419.6,177.1,440.4z"/>
	<polygon fill="#891720" points="200.4,376.7 224,406 200.4,376.7 	"/>
	<path fill="#C92F3B" d="M700.2,143.1c-0.2,0-0.4,0.1-0.7,0.1c-0.3,0-0.5,0.1-0.8,0.1c-62.6,11.1-129.4,35.2-175,84.9
		c-1.8,2-3.7,4-5.4,6.1c-1.5,1.8-3,3.5-4.6,5.2c-3.4,3.7-6.9,7.2-10.6,10.7c-0.8,0.8-1.7,1.6-2.5,2.3c-1,0.9-2.1,1.9-3.2,2.8
		C429,315,308.5,348,213.1,365.8c-4.3,0.8-8.6,1.6-12.8,2.3h0c-2,0.4-4,0.7-5.9,1l1.7,2.2l4.3,5.4L224,406l64.8,80.7l228.5-40.3
		L848,388.2l24.9-4.4L996.3,362L813.7,134.6c-1.9,0-3.9,0-5.9-0.1C778,134.4,740,136.1,700.2,143.1z"/>
	<path fill="#DD8799" d="M152,316.4l42.4,52.8c2-0.3,3.9-0.7,5.9-1h0c4.2-0.7,8.5-1.5,12.8-2.3C308.5,348,429,315,497.4,255.5
		c1.1-0.9,2.2-1.9,3.2-2.8c0.8-0.8,1.7-1.5,2.5-2.3c3.7-3.5,7.3-7.1,10.6-10.7c1.6-1.7,3.1-3.5,4.6-5.2c1.8-2.1,3.6-4.1,5.4-6.1
		c45.6-49.7,112.3-73.8,175-84.9c0.3,0,0.5-0.1,0.8-0.1c0.2,0,0.4-0.1,0.7-0.1c39.8-7,77.9-8.7,107.7-8.6c2,0,3.9,0,5.9,0.1
		L723.8,22.6L711.2,6.9L328.8,74.3L3.7,131.7l132.4,165L152,316.4z M205.9,164.7c39.1-6.9,89.7,11,112.9,39.9
		c23.2,29,10.4,58-28.8,64.9c-39.1,6.9-89.7-11-112.9-39.9C153.8,200.6,166.7,171.6,205.9,164.7z"/>
	<ellipse transform="matrix(0.294 -0.9558 0.9558 0.294 -32.4725 390.2338)" fill="#C92F3B" cx="247.9" cy="217.1" rx="50" ry="84.8"/>
</g>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >EXR</text>
</svg>`,fbx:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-fbx" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-fbx" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-fbx)" 
    stroke="#8B5CF6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-fbx)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#8B5CF6" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <path d="M 32 14 L 44 21 L 44 33 L 32 40 L 20 33 L 20 21 Z" fill="#8B5CF6" fill-opacity="0.25"/>
  <path d="M 32 14 V 40 M 20 21 L 32 27.5 L 44 21" stroke-width="1.6"/>
  <circle cx="32" cy="14" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="44" cy="21" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="20" cy="21" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="32" cy="27.5" r="2.2" fill="#8B5CF6" stroke="none"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >FBX</text>
</svg>`,fdx:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-fdx" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-fdx" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-fdx)" 
    stroke="#2BB673" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-fdx)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#2BB673">
  <!-- White circular emblem background behind script 'f' -->
  <circle cx="32" cy="24.5" r="11" fill="#F8FAFC" fill-opacity="0.9" stroke="#2BB673" stroke-width="1.6"/>
  <!-- Official Final Draft script 'f' ribbon shape -->
  <path d="M 33 16 C 37 16 38.5 18 36 20 C 33.5 22 31 24.5 31 27.5 C 31 31 31.5 33 28.5 33 C 27 33 26 32 27 30.5 C 28.5 28 29.5 25 29.5 22.5 C 29.5 19 31 16 33 16 Z"/>
  <!-- Horizontal pen/quill crossing the script 'f' -->
  <path d="M 23 23 L 39 21.5 L 41 23.5 L 38.5 25 L 23 25 Z"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >FDX</text>
</svg>`,fountain:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-fountain" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-fountain" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-fountain)" 
    stroke="#10B981" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-fountain)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#10B981" stroke="#10B981" stroke-width="1.6" stroke-linejoin="round">
  <path d="M 32 14 L 39 26 L 35 36 H 29 L 25 26 Z" fill-opacity="0.25"/>
  <line x1="32" y1="14" x2="32" y2="28" stroke-linecap="round"/>
  <circle cx="32" cy="28" r="1.5"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="6.5" 
    font-weight="700" 
    letter-spacing="0.6"
  >FOUNTAIN</text>
</svg>`,gizmo:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-gizmo" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-gizmo" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-gizmo)" 
    stroke="#F59E0B" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-gizmo)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(20.50, 13.00) scale(0.9583)" fill="#F59E0B"><title>Nuke</title><path d="M12.293.004c6.625.162 11.865 5.664 11.703 12.29-.162 6.625-5.664 11.865-12.29 11.703C5.081 23.835-.159 18.333.003 11.707l.001-.025C.18 5.066 5.678-.158 12.293.004zm0 1.238c-5.941-.164-10.89 4.52-11.054 10.461s4.52 10.89 10.461 11.054c5.941.164 10.89-4.52 11.054-10.461l.001-.025c.15-5.932-4.53-10.866-10.462-11.029zm5.842 8.302h2.4c.976 0 .682-.873.682-.873a9.587 9.587 0 0 0-2.111-3.431l-.005.011a10.052 10.052 0 0 0-3.355-2.329.612.612 0 0 0-.894.622c-.044.802-.142 2.395-.142 2.395s.016.769-.627.769c-.813.011-1.489-.044-1.489-.044a2.314 2.314 0 0 1-1.255-.545L8.868 3.511a1.09 1.09 0 0 0-1.407-.196 9.758 9.758 0 0 0-4.713 5.384c-.256.714.333.806.731.806h6a2.086 2.086 0 0 1 1.68.627c.785.824 1.331 1.369 1.331 1.369s.48.54 1.26 1.358c.431.459.632 1.089.545 1.713 0 0-.295 5.744-.295 6-.027.398.038.993.769.775a9.756 9.756 0 0 0 5.618-4.424 1.091 1.091 0 0 0-.12-1.418l-2.471-2.607a2.303 2.303 0 0 1-.496-1.282s-.022-.682.033-1.489c.044-.643.802-.583.802-.583zm-2.362 1.374c-.475.469-1.484.229-2.22-.545-.736-.775-.924-1.801-.45-2.254.475-.453 1.502-.239 2.239.536.737.774.906 1.794.431 2.263z"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >GIZMO</text>
</svg>`,gltf:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-gltf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-gltf" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-gltf)" 
    stroke="#FF0055" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-gltf)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#FF0055">
  <path d="M 19.5 14 H 44.5 V 19 H 26.5 V 36 H 19.5 Z" />
  <path d="M 31.5 23 H 44.5 V 36 H 37.5 V 29 H 31.5 Z" />
  <polygon points="37.5,23 44.5,19 44.5,23" fill="#E11D48"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >GLTF</text>
</svg>`,grm:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-grm" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-grm" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-grm)" 
    stroke="#EAB308" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-grm)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#EAB308" stroke-width="2" stroke-linecap="round" fill="none">
  <path d="M 21 35 C 21 24 25 18 25 14"/>
  <path d="M 27 35 C 27 22 31 17 31 13"/>
  <path d="M 33 35 C 33 23 37 18 37 14"/>
  <path d="M 39 35 C 39 25 43 20 43 15"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >GRM</text>
</svg>`,gto:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-gto" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-gto" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-gto)" 
    stroke="#0284C7" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-gto)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#0284C7" stroke-width="1.6" fill="none" stroke-linejoin="round">
  <path d="M 32 14 L 42 20 L 42 32 L 32 38 L 22 32 L 22 20 Z" fill="#0284C7" fill-opacity="0.25"/>
  <line x1="32" y1="14" x2="32" y2="38"/>
  <line x1="22" y1="20" x2="42" y2="32"/>
  <line x1="42" y1="20" x2="22" y2="32"/>
  <rect x="30" y="12" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="40" y="18" width="4" height="4" fill="#0284C7" stroke="none"/>
  <rect x="40" y="30" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="30" y="36" width="4" height="4" fill="#0284C7" stroke="none"/>
  <rect x="20" y="30" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="20" y="18" width="4" height="4" fill="#0284C7" stroke="none"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >GTO</text>
</svg>`,hda:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-hda" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-hda" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-hda)" 
    stroke="#FF6600" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-hda)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <path fill="#FF6600" d="M 21.5 15.5 H 26.5 V 23.5 H 37.5 V 15.5 H 42.5 V 35.5 H 37.5 V 27.5 H 26.5 V 35.5 H 21.5 Z" />

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >HDA</text>
</svg>`,hdr:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-hdr" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-hdr" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-hdr)" 
    stroke="#EAB308" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-hdr)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#EAB308" stroke-width="1.8">
  <circle cx="32" cy="25" r="7" fill="#EAB308" fill-opacity="0.25"/>
  <line x1="32" y1="13" x2="32" y2="16" stroke-linecap="round" stroke-width="2"/>
  <line x1="32" y1="34" x2="32" y2="37" stroke-linecap="round" stroke-width="2"/>
  <line x1="20" y1="25" x2="23" y2="25" stroke-linecap="round" stroke-width="2"/>
  <line x1="41" y1="25" x2="44" y2="25" stroke-linecap="round" stroke-width="2"/>
  <line x1="23.5" y1="16.5" x2="25.6" y2="18.6" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="38.4" y1="31.4" x2="40.5" y2="33.5" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="23.5" y1="33.5" x2="25.6" y2="31.4" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="38.4" y1="18.6" x2="40.5" y2="16.5" stroke-linecap="round" stroke-width="1.8"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >HDR</text>
</svg>`,jpg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-jpg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-jpg" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-jpg)" 
    stroke="#3B82F6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-jpg)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#3B82F6" stroke-width="1.8" fill="none" stroke-linejoin="round"><rect x="19.5" y="15" width="25" height="20" rx="3" fill="#3B82F6" fill-opacity="0.2"/><circle cx="25.5" cy="20" r="2.2" fill="#3B82F6" stroke="none"/><path d="M 21.5 31 L 27.5 23 L 33 28.5 L 37.5 24.5 L 42.5 31" stroke-linecap="round"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >JPG</text>
</svg>`,json:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-json" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-json" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-json)" 
    stroke="#F59E0B" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-json)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M 25 15 C 21 15 21 18.5 21 21.5 C 21 23.5 19 24.5 17 24.5 C 19 24.5 21 25.5 21 27.5 C 21 30.5 21 34 25 34" /><path d="M 39 15 C 43 15 43 18.5 43 21.5 C 43 23.5 45 24.5 47 24.5 C 45 24.5 43 25.5 43 27.5 C 43 30.5 43 34 39 34" /></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >JSON</text>
</svg>`,kiko:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-kiko" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-kiko" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-kiko)" 
    stroke="#E11D48" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-kiko)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#E11D48" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M 19 33.5 Q 28 11.5 35 26 T 45 14.5"/><circle cx="45" cy="14.5" r="2.5" fill="#E11D48" stroke="none"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >KIKO</text>
</svg>`,materialx:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-materialx" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-materialx" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-materialx)" 
    stroke="#E63946" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-materialx)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(18.88, 16.90) scale(0.0462)">
  
  <defs
     id="defs12"><linearGradient
       id="linear-gradient"
       x1="166.21"
       y1="369.24"
       x2="402.46"
       y2="-39.96"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#025361"
         id="stop1" />
      <stop
         offset="0.38"
         stop-color="#0b7a90"
         id="stop2" />
      <stop
         offset="0.42"
         stop-color="#406185"
         id="stop3" />
      <stop
         offset="0.58"
         stop-color="#406185"
         id="stop4" />
      <stop
         offset="0.62"
         stop-color="#0b7a90"
         id="stop5" />
      <stop
         offset="1"
         stop-color="#025361"
         id="stop6" />
    </linearGradient>
    <linearGradient
       id="linear-gradient-2"
       x1="567.8"
       y1="55.5"
       x2="426.1"
       y2="300.93"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#16a9c4"
         id="stop7" />
      <stop
         offset="0.05"
         stop-color="#8ad4ec"
         id="stop8" />
      <stop
         offset="0.08"
         stop-color="#8ad4e2"
         id="stop9" />
      <stop
         offset="0.2"
         stop-color="#1facc5"
         id="stop10" />
      <stop
         offset="0.5"
         stop-color="#0190a9"
         id="stop11" />
      <stop
         offset="1"
         stop-color="#025361"
         id="stop12" />
    </linearGradient>
  </defs>
  <title
     id="title12">mtlx.glyph</title>
  <g
     id="Layer_2"
     data-name="Layer 2">
    <g
       id="Glyph">
      <polygon
         fill="#306384"
         points="284.33 219.08 378.83 164.52 378.83 273.64 284.33 219.08"
         id="polygon12" />
      <polygon
         fill="#276d88"
         points="473.33 219.08 378.83 273.64 378.83 164.52 473.33 219.08"
         id="polygon13" />
      <polygon
         fill="#0b7a90"
         points="378.83 273.64 473.33 219.08 473.33 328.2 378.83 273.64"
         id="polygon14" />
      <polygon
         fill="#0b7a90"
         points="567.83 273.64 473.33 328.2 473.33 219.08 567.83 273.64"
         id="polygon15" />
      <polygon
         fill="#0b7a90"
         points="567.83 55.52 473.33 110.08 473.33 0.96 567.83 55.52"
         id="polygon16" />
      <polygon
         fill="#bd295b"
         points="284.33 110.08 189.83 164.64 189.83 55.52 284.33 110.08"
         id="polygon17" />
      <path
         fill="#fcc"
         d="M189,166.07v-112l97,56ZM190.66,57V163.2l92-53.12Z"
         id="path17" />
      <polygon
         fill="#bd295b"
         points="95.33 110.08 189.83 55.52 189.83 164.64 95.33 110.08"
         id="polygon18" />
      <polygon
         fill="#d64274"
         points="0.83 55.52 95.33 0.96 95.33 110.08 0.83 55.52"
         id="polygon19" />
      <polygon
         fill="#bd295b"
         points="189.83 55.52 95.33 110.08 95.33 0.96 189.83 55.52"
         id="polygon20" />
      <polygon
         fill="none"
         points="96.16 2.4 96.16 108.64 188.17 55.52 96.16 2.4"
         id="polygon21" />
      <polygon
         fill="none"
         points="96.99 110.08 189 163.2 189 56.96 143 83.52 96.99 110.08"
         id="polygon22" />
      <polygon
         fill="#fcc"
         points="93.67 110.08 94.5 110.56 94.5 109.6 93.67 110.08"
         id="polygon23" />
      <polygon
         fill="#fcc"
         points="96.16 108.64 142.16 82.08 95.33 109.12 96.16 109.6 96.16 108.64"
         id="polygon24" />
      <polygon
         fill="#fcc"
         points="190.66 56 189 56.96 189 163.2 96.99 110.08 143 83.52 95.33 111.04 190.66 166.07 190.66 56"
         id="polygon25" />
      <polygon
         fill="#fcc"
         points="143 83.52 189 56.96 189 56.95 143 83.52"
         id="polygon26" />
      <polygon
         fill="#fcc"
         points="94.5 108.64 94.5 109.6 95.33 109.12 94.5 108.64"
         id="polygon27" />
      <polygon
         fill="#fcc"
         points="94.5 111.52 95.33 111.04 94.5 110.56 94.5 111.52"
         id="polygon28" />
      <polygon
         fill="#fcc"
         points="96.16 0.48 96.16 2.4 188.17 55.52 142.16 82.08 189.83 54.56 96.16 0.48"
         id="polygon29" />
      <polygon
         fill="#fcc"
         points="191.49 55.52 190.66 55.04 190.66 56 191.49 55.52"
         id="polygon30" />
      <polygon
         fill="#fcc"
         points="189 56.95 189 56.96 190.66 56 190.66 55.04 189.83 54.56 142.16 82.08 96.16 108.64 96.16 109.6 95.33 109.12 94.5 109.6 94.5 110.56 95.33 111.04 143 83.52 189 56.95"
         id="polygon31" />
      <polygon
         fill="#fcc"
         points="0.83 54.56 48.49 82.08 2.49 55.52 94.5 2.4 94.5 0.48 0.83 54.56"
         id="polygon32" />
      <polygon
         fill="#fcc"
         points="96.16 109.6 96.16 108.64 96.16 2.4 96.16 0.48 95.33 0 94.5 0.48 94.5 2.4 94.5 108.64 96.16 109.6"
         id="polygon33" />
      <polygon
         fill="url(#linear-gradient)"
         points="473.33 110.08 95.33 328.32 95.33 219.2 473.33 0.96 473.33 110.08"
         id="polygon34" />
      <polygon
         fill="#d64274"
         points="95.33 219.2 0.83 273.76 0.83 164.64 95.33 219.2"
         id="polygon35" />
      <polygon
         fill="#d64274"
         points="0.83 164.64 95.33 110.08 95.33 219.2 0.83 164.64"
         id="polygon36" />
      <polygon
         fill="#d64274"
         points="95.33 110.08 0.83 164.64 0.83 55.52 95.33 110.08"
         id="polygon37" />
      <polygon
         fill="none"
         points="93.67 110.08 47.66 83.52 1.66 56.96 1.66 163.2 93.67 110.08"
         id="polygon38" />
      <polygon
         fill="none"
         points="2.49 55.52 48.49 82.08 94.5 108.64 94.5 2.4 2.49 55.52"
         id="polygon39" />
      <polygon
         fill="#fcc"
         points="96.99 110.08 96.16 109.6 96.16 110.56 96.99 110.08"
         id="polygon40" />
      <polygon
         fill="#fcc"
         points="94.5 108.64 94.5 108.64 48.49 82.08 94.5 108.64"
         id="polygon41" />
      <polygon
         fill="#fcc"
         points="93.67 110.08 1.66 163.2 1.66 56.96 0 56 0 166.07 95.33 111.04 47.66 83.52 93.67 110.08"
         id="polygon42" />
      <polygon
         fill="#fcc"
         points="96.16 110.56 95.33 111.04 96.16 111.52 96.16 110.56"
         id="polygon43" />
      <polygon
         fill="#fcc"
         points="1.66 56.95 1.66 56.96 47.66 83.52 1.66 56.95"
         id="polygon44" />
      <polygon
         fill="#fcc"
         points="96.16 109.6 94.5 108.64 94.5 108.64 48.49 82.08 0.83 54.56 0 55.04 0 56 1.66 56.96 1.66 56.95 47.66 83.52 95.33 111.04 96.16 110.56 96.16 109.6"
         id="polygon45" />
      <polygon
         fill="#d64274"
         points="0.83 273.76 95.33 219.2 95.33 328.32 0.83 273.76"
         id="polygon46" />
      <polygon
         fill="none"
         points="94.5 326.88 94.5 220.63 2.49 273.76 94.5 326.88"
         id="polygon47" />
      <polygon
         fill="#b3e0df"
         points="284.33 220.16 282.67 219.2 96.16 326.88 96.16 328.8 284.33 220.16"
         id="polygon48" />
      <polygon
         fill="#b3e0df"
         points="96.16 219.68 189.83 165.59 188.17 164.64 94.92 218.48 94.5 218.72 94.5 218.72 96.16 217.76 96.16 219.68"
         id="polygon49" />
      <polygon
         fill="none"
         points="1.66 166.07 1.66 272.32 46.77 246.28 93.67 219.2 1.66 166.07"
         id="polygon50" />
      <polygon
         fill="none"
         points="2.49 164.64 48.49 191.2 94.5 217.76 94.5 111.52 2.49 164.64"
         id="polygon51" />
      <polygon
         fill="#fcc"
         points="1.66 166.07 47.66 192.64 1.66 166.07 1.66 166.07"
         id="polygon52" />
      <polygon
         fill="#fcc"
         points="2.49 164.64 94.5 111.52 94.5 217.76 96.16 218.72 96.16 108.64 0.83 163.68 48.49 191.2 2.49 164.64"
         id="polygon53" />
      <polygon
         fill="#fcc"
         points="96.16 219.68 95.33 220.16 96.16 220.63 96.16 219.68"
         id="polygon54" />
      <polygon
         fill="#fcc"
         points="93.67 219.2 94.5 219.68 94.5 218.72 93.67 219.2"
         id="polygon55" />
      <polygon
         fill="#fcc"
         points="0 273.28 1.66 272.32 1.66 166.07 0 165.12 0 273.28"
         id="polygon56" />
      <polygon
         fill="#fcc"
         points="93.67 219.2 46.77 246.28 93.67 219.2 47.66 192.64 93.67 219.2"
         id="polygon57" />
      <polygon
         fill="#fcc"
         points="94.5 220.63 48.49 247.2 95.33 220.16 94.5 219.68 94.5 220.63"
         id="polygon58" />
      <polygon
         fill="#fcc"
         points="94.5 217.76 94.5 217.76 48.49 191.2 94.5 217.76"
         id="polygon59" />
      <polygon
         fill="#fcc"
         points="0 163.2 0 164.16 0.83 163.68 0 163.2"
         id="polygon60" />
      <polygon
         fill="#fcc"
         points="96.16 218.72 94.5 217.76 94.5 217.76 48.49 191.2 0.83 163.68 0 164.16 0 165.12 1.66 166.07 1.66 166.07 47.66 192.64 93.67 219.2 94.5 218.72 94.5 219.68 95.33 220.16 96.16 219.68 96.16 218.72"
         id="polygon61" />
      <polygon
         fill="#fcc"
         points="48.49 247.2 0.83 274.71 94.5 328.8 94.5 326.88 2.49 273.76 48.49 247.2"
         id="polygon62" />
      <polygon
         fill="#fcc"
         points="1.66 272.32 46.77 246.28 1.66 272.32 1.66 272.32"
         id="polygon63" />
      <polygon
         fill="#fcc"
         points="94.5 220.63 94.5 218.72 46.77 246.28 1.66 272.32 1.66 272.32 0 273.28 0 274.24 0.83 274.71 48.49 247.2 94.5 220.63"
         id="polygon64" />
      <polygon
         fill="#fcc"
         points="96.16 326.88 96.16 219.68 96.16 217.76 94.5 218.72 94.5 220.63 94.5 326.88 94.5 328.8 95.33 329.27 96.16 328.8 96.16 326.88"
         id="polygon65" />
      <polygon
         fill="url(#linear-gradient-2)"
         points="567.83 273.64 473.33 328.2 473.33 0.96 567.83 55.52 567.83 273.64"
         id="polygon66" />
      <polygon
         fill="none"
         points="96.16 326.88 472.5 109.6 472.5 2.4 96.16 219.68 96.16 326.88"
         id="polygon67" />
      <polygon
         fill="none"
         points="474.16 110.56 474.16 326.76 567 273.16 567 56 474.16 2.4 474.16 110.56 474.16 110.56"
         id="polygon68" />
      <polygon
         fill="#b3e0df"
         points="474.16 110.56 474.16 110.56 474.16 2.4 474.16 2.4 474.16 110.56"
         id="polygon69" />
      <polygon
         fill="none"
         points="96.16 109.6 472.5 326.88 472.5 219.67 96.16 2.4 96.16 109.6"
         id="polygon70" />
      <polygon
         fill="#b3e0df"
         points="474.16 326.76 474.16 218.72 474.16 218.72 474.16 326.76 474.16 326.76"
         id="polygon71" />
      <polygon
         fill="none"
         points="96.16 2.4 96.16 109.6 189.83 163.68 282.67 110.08 96.16 2.4"
         id="polygon72" />
      <polygon
         fill="none"
         points="284.33 218.24 377.17 164.64 284.33 111.04 191.49 164.64 284.33 218.24"
         id="polygon73" />
      <polygon
         fill="none"
         points="96.16 219.68 96.16 326.88 282.67 219.2 189.83 165.59 96.16 219.68"
         id="polygon74" />
      <polygon
         fill="#b3e0df"
         points="284.33 218.24 285.99 219.2 378.83 165.59 377.17 164.64 284.33 218.24"
         id="polygon75" />
      <polygon
         fill="#b3e0df"
         points="189.83 163.68 191.49 164.64 284.33 111.04 282.67 110.08 189.83 163.68"
         id="polygon76" />
      <polygon
         fill="#b3e0df"
         points="472.5 2.4 472.5 0.48 284.33 109.12 285.99 110.08 472.5 2.4"
         id="polygon77" />
      <polygon
         fill="#b3e0df"
         points="472.5 111.52 472.5 109.6 378.83 163.68 380.49 164.64 472.5 111.52"
         id="polygon78" />
      <polygon
         fill="#b3e0df"
         points="472.5 328.79 472.5 326.88 285.99 219.2 284.33 220.16 472.5 328.79"
         id="polygon79" />
      <polygon
         fill="#b3e0df"
         points="472.5 219.67 472.5 217.76 380.49 164.64 378.83 165.59 472.5 219.67"
         id="polygon80" />
      <polygon
         fill="#b3e0df"
         points="378.83 165.59 380.49 164.64 378.83 163.68 377.17 164.64 378.83 165.59"
         id="polygon81" />
      <polygon
         fill="#b3e0df"
         points="191.49 164.64 189.83 163.68 188.17 164.64 189.83 165.59 191.49 164.64"
         id="polygon82" />
      <polygon
         fill="#b3e0df"
         points="282.67 219.2 284.33 220.16 285.99 219.2 284.33 218.24 282.67 219.2"
         id="polygon83" />
      <polygon
         fill="#b3e0df"
         points="284.33 111.04 285.99 110.08 284.33 109.12 282.67 110.08 284.33 111.04"
         id="polygon84" />
      <polygon
         fill="#b3e0df"
         points="472.5 326.88 472.5 219.68 472.5 219.67 472.5 326.88 472.5 326.88"
         id="polygon85" />
      <polygon
         fill="#b3e0df"
         points="474.16 0.48 474.16 2.4 567 56 567 273.16 474.16 326.76 474.16 328.68 568.25 274.36 568.66 274.12 568.66 55.04 474.16 0.48"
         id="polygon86" />
      <polygon
         fill="#b3e0df"
         points="474.16 110.56 473.75 110.8 472.5 111.52 472.5 217.76 474.16 218.72 474.16 110.56"
         id="polygon87" />
      <polygon
         fill="#b3e0df"
         points="474.16 326.76 474.16 218.72 472.5 217.76 472.5 219.67 472.5 219.68 472.5 326.88 472.5 326.88 472.5 328.79 473.23 329.21 474.16 328.68 474.16 326.76 474.16 326.76"
         id="polygon88" />
      <polygon
         fill="#b3e0df"
         points="472.5 109.6 472.5 2.4 472.5 2.4 472.5 109.6 472.5 109.6"
         id="polygon89" />
      <polygon
         fill="#b3e0df"
         points="474.16 110.56 474.16 2.4 474.16 2.4 474.16 0.48 473.33 0 472.5 0.48 472.5 2.4 472.5 2.4 472.5 109.6 472.5 109.6 472.5 111.52 473.75 110.8 474.16 110.56"
         id="polygon90" />
    </g>
  </g>
  
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >MTLX</text>
</svg>`,mayaascii:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-mayaascii" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-mayaascii" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-mayaascii)" 
    stroke="#008080" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-mayaascii)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <path fill="#008080" d="M 18.5 35.5 V 15.5 H 24.5 L 32 25.5 L 39.5 15.5 H 45.5 V 35.5 H 40 V 20.5 L 34.5 29.5 H 29.5 L 24 20.5 V 35.5 Z" />

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >MA</text>
</svg>`,mayabin:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-mayabin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-mayabin" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-mayabin)" 
    stroke="#00A896" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-mayabin)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <path fill="#00A896" d="M 18.5 35.5 V 15.5 H 24.5 L 32 25.5 L 39.5 15.5 H 45.5 V 35.5 H 40 V 20.5 L 34.5 29.5 H 29.5 L 24 20.5 V 35.5 Z" />

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >MB</text>
</svg>`,obj:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-obj" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-obj" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-obj)" 
    stroke="#6366F1" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-obj)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#6366F1" stroke-width="1.8" fill="none" stroke-linejoin="round"><path d="M 32 14.5 L 44 21.5 L 44 33.5 L 32 40.5 L 20 33.5 L 20 21.5 Z" fill="#6366F1" fill-opacity="0.2"/><path d="M 32 14.5 V 40.5 M 20 21.5 L 32 27.5 L 44 21.5"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >OBJ</text>
</svg>`,osl:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-osl" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-osl" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-osl)" 
    stroke="#6366F1" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-osl)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(19.92, 12.42) scale(0.4057)"><defs></defs><title>OSL_mark_col</title><path fill="#1dc5ed" d="M3.1952,27.2562c-.2116,0-.3647-.25-.437-.4a21.5682,21.5682,0,0,1-1.26-2.9812,7.2489,7.2489,0,0,1,.3339-3.8225A24.9458,24.9458,0,0,1,3.6891,16.298c.431-.7348.9472-1.066,1.2449-1.066.0482,0,.1471,0,.277.1609.7073.9016,1.5263,1.9056,2.4271,2.9742.6865.7967.65,2.729-.4147,4.0393-1.12,1.3955-2.1552,2.7807-3.08,4.12C3.7657,27.0635,3.3966,27.2562,3.1952,27.2562Z" transform="translate(-0.0012 -0.0021)"/><path fill="#1dc5ed" d="M10.25,17.5463a1.3576,1.3576,0,0,1-1.0771-.4585c-.8828-1.0471-1.6872-2.0331-2.3978-2.9373-.4208-.5532-.1979-1.9822.8095-3.1308a39.9229,39.9229,0,0,1,3.4389-3.44A3.8508,3.8508,0,0,1,13.39,6.5726a1.272,1.272,0,0,1,.7726.21c.8974.7055,1.8833,1.51,2.9192,2.3832a1.3379,1.3379,0,0,1,.4646,1.0143,3.0659,3.0659,0,0,1-1.0548,2.2137c-1.3955,1.3215-2.7746,2.7006-4.097,4.0978A3.1225,3.1225,0,0,1,10.25,17.5463Z" transform="translate(-0.0012 -0.0021)"/><path fill="#1dc5ed" d="M19.8955,8.1031a2.3348,2.3348,0,0,1-1.5194-.4594c-1.0608-.893-2.0648-1.713-2.9914-2.4408a.3161.3161,0,0,1-.1523-.2994A1.9265,1.9265,0,0,1,16.2915,3.693,25.192,25.192,0,0,1,20.07,1.8252a8.1084,8.1084,0,0,1,2.6568-.4543,4.4237,4.4237,0,0,1,1.1761.1351,21.5794,21.5794,0,0,1,2.9415,1.2449c.1557.0757.3958.22.4121.4181.0164.2013-.1669.5782-.7364.9782-1.3215.9137-2.7067,1.9479-4.1082,3.0715A4.1135,4.1135,0,0,1,19.8955,8.1031Z" transform="translate(-0.0012 -0.0021)"/><path fill="#1dc5ed" d="M29.7659,1.746a4.9865,4.9865,0,0,1-2.1827-.44c-.3046-.1531-.6092-.3-.9094-.4379a.3747.3747,0,0,1,.12-.7132c.376-.037.7683-.0689,1.183-.0981C28.4857.02,29.0544.0021,29.6678.0021c.61,0,1.2518.018,1.8927.0542.4741.0275.8552.05,1.21.0791A.3746.3746,0,0,1,32.8949.85c-.3071.1411-.6194.2908-.9377.4517A4.94,4.94,0,0,1,29.7659,1.746Z" transform="translate(-0.0012 -0.0021)"/><path fill="#9661ee" d="M29.907,59.5279c-.6118,0-1.2544-.018-1.8971-.0542-.4741-.0284-.8543-.0507-1.2079-.0791a.3748.3748,0,0,1-.1265-.7141c.3063-.14.62-.2917.9369-.4517a5.6262,5.6262,0,0,1,4.3749-.0043c.3037.1531.6091.3.9094.4388a.3743.3743,0,0,1-.1222.7123q-.56.0543-1.183.0981C31.0865,59.51,30.52,59.5279,29.907,59.5279Z" transform="translate(-0.0012 -0.0021)"/><path fill="#1dc5ed" d="M.4632,33.0524a.3736.3736,0,0,1-.31-.3338q-.0541-.56-.0981-1.1821a29.5484,29.5484,0,0,1,0-3.5817C.0838,27.48.1062,27.1.1346,26.746a.3746.3746,0,0,1,.308-.3389.4194.4194,0,0,1,.0654-.0052.3747.3747,0,0,1,.3407.2185q.2117.4608.4516.9369a5.6181,5.6181,0,0,1,.0043,4.3732c-.1531.3046-.3.61-.4387.91a.3733.3733,0,0,1-.34.2169A.3922.3922,0,0,1,.4632,33.0524Z" transform="translate(-0.0012 -0.0021)"/><path fill="#9661ee" d="M59.022,33.0567a.3749.3749,0,0,1-.3407-.2185q-.2116-.4608-.4516-.937a5.62,5.62,0,0,1-.0044-4.374c.1532-.3037.3-.6091.4388-.9094a.3734.3734,0,0,1,.34-.2168.3922.3922,0,0,1,.0628.0052.3736.3736,0,0,1,.31.3338q.0541.56.0981,1.183a29.5323,29.5323,0,0,1,0,3.5808c-.0284.4749-.0508.8552-.0792,1.2088a.3746.3746,0,0,1-.308.3389A.4194.4194,0,0,1,59.022,33.0567Z" transform="translate(-0.0012 -0.0021)"/><path fill="#319fe0" d="M4.9323,44.2972c-.2977,0-.8122-.3313-1.2381-1.0583A24.8794,24.8794,0,0,1,1.8264,39.46a7.2131,7.2131,0,0,1-.3192-3.8337,21.68,21.68,0,0,1,1.2441-2.94c.0792-.1634.2323-.4138.4439-.4138.2005,0,.5705.1927.9525.7365.9085,1.3154,1.9435,2.7,3.0714,4.109,1.0668,1.3172,1.1038,3.2495.4267,4.0359-.9145,1.0849-1.7336,2.0881-2.4416,2.9906A.3206.3206,0,0,1,4.9323,44.2972Z" transform="translate(-0.0012 -0.0021)"/><path fill="#319fe0" d="M10.5719,36.8233a2.3317,2.3317,0,0,1-1.7913-.9515c-1.0943-1.3671-2.1009-2.7136-2.994-4.005a4.0158,4.0158,0,0,1,.006-4.214c.8819-1.2767,1.8885-2.6223,2.9855-3.992a2.3356,2.3356,0,0,1,1.7946-.9541,1.9625,1.9625,0,0,1,1.4687.6883c1.1718,1.2939,2.4287,2.6576,3.7494,4.0625a3.48,3.48,0,0,1,.0017,4.6107c-1.3241,1.4083-2.5819,2.772-3.7546,4.07A1.9642,1.9642,0,0,1,10.5719,36.8233Z" transform="translate(-0.0012 -0.0021)"/><path fill="#319fe0" d="M19.3431,26.99a2.83,2.83,0,0,1-2.0941-.8973c-1.3163-1.399-2.5638-2.7523-3.7278-4.04a3.1444,3.1444,0,0,1,.3252-4.1891c1.2957-1.3688,2.649-2.7221,4.02-4.0195a3.5392,3.5392,0,0,1,2.39-.9757,2.6545,2.6545,0,0,1,1.8007.6556c1.2836,1.1615,2.6378,2.41,4.0342,3.7219a2.8308,2.8308,0,0,1,.8982,2.0528,3.198,3.198,0,0,1-.9826,2.33C24.54,23.0706,23.0719,24.54,21.6282,26.007A3.1983,3.1983,0,0,1,19.3431,26.99Z" transform="translate(-0.0012 -0.0021)"/><path fill="#319fe0" d="M29.7654,16.6705a3.3624,3.3624,0,0,1-2.3031-.8784c-1.4093-1.3232-2.7721-2.58-4.07-3.7546a1.9487,1.9487,0,0,1-.6831-1.5288,2.362,2.362,0,0,1,.95-1.7285c1.367-1.0961,2.7126-2.1027,4.004-2.9931a4.0151,4.0151,0,0,1,4.2149.0043c1.2836.8879,2.63,1.8945,3.992,2.9862a2.362,2.362,0,0,1,.9533,1.7311,1.951,1.951,0,0,1-.6875,1.5314c-1.2939,1.1709-2.6584,2.4288-4.0625,3.7494A3.37,3.37,0,0,1,29.7654,16.6705Z" transform="translate(-0.0012 -0.0021)"/><path fill="#319fe0" d="M39.6353,8.1031a4.1015,4.1015,0,0,1-2.5113-.881c-1.4093-1.1287-2.7944-2.1637-4.12-3.08-.5618-.3958-.7451-.7726-.7288-.9739.0164-.1971.2564-.3416.3984-.41a21.5811,21.5811,0,0,1,2.982-1.26,4.4329,4.4329,0,0,1,1.15-.1273,8.1432,8.1432,0,0,1,2.6732.4611,25.0742,25.0742,0,0,1,3.7537,1.8567c.7046.4138,1.04.9068,1.0633,1.2139a.3269.3269,0,0,1-.16.3089c-.9025.7081-1.9057,1.5271-2.9725,2.4253A2.3683,2.3683,0,0,1,39.6353,8.1031Z" transform="translate(-0.0012 -0.0021)"/><path fill="#4570ee" d="M13.39,52.9574a3.8486,3.8486,0,0,1-2.3685-1.01A40.4447,40.4447,0,0,1,7.58,48.5068c-1.004-1.1459-1.2268-2.575-.7966-3.1394.6857-.8732,1.49-1.8583,2.3823-2.9174a1.3647,1.3647,0,0,1,1.0857-.4663,3.1169,3.1169,0,0,1,2.1423,1.0548c1.3284,1.4015,2.7075,2.7806,4.0987,4.0987A3.0594,3.0594,0,0,1,17.545,49.344a1.3426,1.3426,0,0,1-.4577,1.0143c-1.066.8982-2.0511,1.7026-2.9355,2.3969A1.2728,1.2728,0,0,1,13.39,52.9574Z" transform="translate(-0.0012 -0.0021)"/><path fill="#4570ee" d="M20.2551,46.6614a3.5437,3.5437,0,0,1-2.3918-.9774c-1.3559-1.2827-2.7083-2.6361-4.0195-4.02a3.1407,3.1407,0,0,1-.32-4.19c1.1615-1.2845,2.41-2.6387,3.7219-4.0341a2.8334,2.8334,0,0,1,2.0975-.9,3.1966,3.1966,0,0,1,2.2851.9825c1.4428,1.4669,2.9132,2.9364,4.3792,4.38a3.1929,3.1929,0,0,1,.9825,2.3255,2.8346,2.8346,0,0,1-.8973,2.0554c-1.3964,1.312-2.7514,2.5612-4.04,3.727A2.6527,2.6527,0,0,1,20.2551,46.6614Z" transform="translate(-0.0012 -0.0021)"/><path fill="#4570ee" d="M29.7645,37.441a3.34,3.34,0,0,1-2.3556-.9627c-1.4583-1.4359-2.9209-2.8985-4.3568-4.3577a3.3774,3.3774,0,0,1,.0009-4.713c1.4342-1.4582,2.8968-2.9208,4.3551-4.3559a3.3642,3.3642,0,0,1,4.7138,0c1.4583,1.4359,2.9209,2.8977,4.3568,4.3568a3.38,3.38,0,0,1-.0008,4.7139c-1.4342,1.4574-2.8977,2.92-4.356,4.3559A3.3476,3.3476,0,0,1,29.7645,37.441Z" transform="translate(-0.0012 -0.0021)"/><path fill="#4570ee" d="M40.1868,26.99a3.1906,3.1906,0,0,1-2.2833-.9816c-1.4446-1.4678-2.9141-2.9373-4.3809-4.3809a3.185,3.185,0,0,1-.9826-2.3238,2.8322,2.8322,0,0,1,.8982-2.0554c1.3981-1.3146,2.7514-2.5639,4.04-3.7288a2.6458,2.6458,0,0,1,1.7964-.6513,3.54,3.54,0,0,1,2.3918.9774c1.3723,1.2983,2.7256,2.6516,4.02,4.02a3.1427,3.1427,0,0,1,.32,4.1891c-1.1615,1.2853-2.4116,2.6395-3.7219,4.035A2.8338,2.8338,0,0,1,40.1868,26.99Z" transform="translate(-0.0012 -0.0021)"/><path fill="#4570ee" d="M49.28,17.5455a3.12,3.12,0,0,1-2.1431-1.054c-1.3189-1.3946-2.698-2.7737-4.0987-4.0995a3.0619,3.0619,0,0,1-1.0539-2.2068,1.339,1.339,0,0,1,.4586-1.0135c1.0324-.8707,2.0183-1.6751,2.9372-2.397a1.2716,1.2716,0,0,1,.7623-.2021A3.8486,3.8486,0,0,1,48.51,7.5835a39.9044,39.9044,0,0,1,3.44,3.44c1.0058,1.1442,1.2286,2.5733.7976,3.1385-.7133.9068-1.5168,1.8919-2.3815,2.9183A1.3647,1.3647,0,0,1,49.28,17.5455Z" transform="translate(-0.0012 -0.0021)"/><path fill="#7870ee" d="M22.726,58.1582a8.1333,8.1333,0,0,1-2.6748-.4611,25.0283,25.0283,0,0,1-3.7528-1.8566c-.7064-.4147-1.0419-.9086-1.0643-1.2157-.006-.0809.0009-.1772.16-.3046.8939-.702,1.8971-1.5211,2.9734-2.4279a2.3652,2.3652,0,0,1,1.5263-.4654,4.1231,4.1231,0,0,1,2.5148.881c1.3989,1.121,2.7832,2.156,4.1185,3.0792.5618.3949.7442.7717.7278.973-.0163.1988-.2564.3433-.3975.4121a21.7219,21.7219,0,0,1-2.9828,1.26A4.4506,4.4506,0,0,1,22.726,58.1582Z" transform="translate(-0.0012 -0.0021)"/><path fill="#7870ee" d="M29.7654,54.3374a3.8055,3.8055,0,0,1-2.1113-.6c-1.2879-.8905-2.6344-1.8971-3.9929-2.9854a2.36,2.36,0,0,1-.9524-1.7276,1.9573,1.9573,0,0,1,.6866-1.5366c1.2948-1.1692,2.6576-2.4271,4.0634-3.7477a3.4606,3.4606,0,0,1,4.6106-.0043c1.4093,1.3241,2.7721,2.5819,4.0695,3.7554a1.95,1.95,0,0,1,.684,1.5323,2.3539,2.3539,0,0,1-.95,1.725c-1.3662,1.0952-2.7118,2.101-4.0049,2.9949A3.8014,3.8014,0,0,1,29.7654,54.3374Z" transform="translate(-0.0012 -0.0021)"/><path fill="#7870ee" d="M39.274,46.6614a2.6476,2.6476,0,0,1-1.799-.6547c-1.2845-1.1615-2.6387-2.4107-4.0342-3.7228a2.8279,2.8279,0,0,1-.9008-2.0528,3.1945,3.1945,0,0,1,.9843-2.33c1.4651-1.4428,2.9346-2.9123,4.3774-4.3774a3.2,3.2,0,0,1,2.2868-.9834,2.828,2.828,0,0,1,2.0933.8965c1.3146,1.398,2.5629,2.7522,3.7287,4.041a3.1461,3.1461,0,0,1-.3261,4.1882c-1.2948,1.3688-2.6481,2.7213-4.0195,4.02A3.5416,3.5416,0,0,1,39.274,46.6614Z" transform="translate(-0.0012 -0.0021)"/><path fill="#7870ee" d="M48.9564,36.8233a1.965,1.965,0,0,1-1.4669-.6874c-1.1718-1.2957-2.4279-2.6594-3.7494-4.0643a3.48,3.48,0,0,1-.0018-4.6115c1.3241-1.4084,2.5819-2.7712,3.7546-4.0694a1.9625,1.9625,0,0,1,1.4652-.6849,2.332,2.332,0,0,1,1.7921.9516c1.0995,1.3731,2.1061,2.7187,2.994,4.0049a4.0208,4.0208,0,0,1-.006,4.2149c-.8888,1.2853-1.8954,2.6309-2.9854,3.9911A2.3386,2.3386,0,0,1,48.9564,36.8233Z" transform="translate(-0.0012 -0.0021)"/><path fill="#7870ee" d="M56.3364,27.2562c-.2013,0-.5712-.1927-.9532-.7364-.9154-1.325-1.95-2.71-3.0715-4.1082-1.0677-1.3172-1.1038-3.2487-.4259-4.0359.9-1.0677,1.7182-2.0709,2.4409-2.9914a.3173.3173,0,0,1,.27-.1523c.2985,0,.8139.3321,1.2415,1.06A25.0734,25.0734,0,0,1,57.7052,20.07a7.237,7.237,0,0,1,.3192,3.8312A21.6253,21.6253,0,0,1,56.78,26.8415C56.7,27.0059,56.5481,27.2562,56.3364,27.2562Z" transform="translate(-0.0012 -0.0021)"/><path fill="#9661ee" d="M36.8048,58.1591a4.3827,4.3827,0,0,1-1.1761-.1359,21.5986,21.5986,0,0,1-2.9424-1.2441c-.1557-.0757-.3949-.2194-.4113-.4164-.0163-.2022.167-.58.7356-.9808,1.3129-.906,2.6972-1.941,4.1074-3.0706a4.1114,4.1114,0,0,1,2.5191-.8844,2.364,2.364,0,0,1,1.5176.4577c1.0643.8973,2.0683,1.7164,2.9923,2.4416a.3156.3156,0,0,1,.1506.2986,1.9333,1.9333,0,0,1-1.0591,1.2131,25.0066,25.0066,0,0,1-3.777,1.8661A8.12,8.12,0,0,1,36.8048,58.1591Z" transform="translate(-0.0012 -0.0021)"/><path fill="#9661ee" d="M46.143,52.9574a1.2744,1.2744,0,0,1-.7734-.2108c-.8819-.6925-1.8679-1.4978-2.9192-2.3831a1.35,1.35,0,0,1-.4637-1.0213,3.06,3.06,0,0,1,1.0522-2.2068c1.4049-1.3292,2.7841-2.7083,4.0978-4.0978a3.1181,3.1181,0,0,1,2.144-1.0539,1.359,1.359,0,0,1,1.078.4577c.8922,1.0591,1.6966,2.045,2.3978,2.9381.4207.5523.1979,1.9822-.81,3.1316a39.9923,39.9923,0,0,1-3.4388,3.4371A3.8467,3.8467,0,0,1,46.143,52.9574Z" transform="translate(-0.0012 -0.0021)"/><path fill="#9661ee" d="M54.5968,44.298c-.0482,0-.1471,0-.2753-.1609-.7107-.9033-1.53-1.9065-2.4288-2.9751-.6865-.7958-.6495-2.7273.4147-4.0393,1.1236-1.4015,2.1586-2.7858,3.08-4.1193.3785-.5369.7485-.73.95-.73.2108,0,.3631.25.4353.3992a21.7185,21.7185,0,0,1,1.26,2.9846,7.2793,7.2793,0,0,1-.3346,3.8234,25.0882,25.0882,0,0,1-1.8567,3.7519C55.4116,43.9668,54.8953,44.298,54.5968,44.298Z" transform="translate(-0.0012 -0.0021)"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >OSL</text>
</svg>`,otio:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-otio" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-otio" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-otio)" 
    stroke="#059669" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-otio)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(18.88, 15.03) scale(0.0767)"><defs
   id="defs276">
        
        
    </defs>
    <g
   transform="matrix(4.16667,0,0,4.16667,-3301.2817,-2160.8642)"
   id="g210">
            <g
   transform="translate(831.921,519.023)"
   id="g184">
                <path
   d="M 0,10.642 -9.435,1.481 c -0.711,-0.692 -0.222,-1.897 0.769,-1.897 h 18.869 c 0.991,0 1.481,1.205 0.77,1.897 l -9.435,9.161 c -0.429,0.416 -1.11,0.416 -1.538,0"
   style="fill:#f2a521;fill-rule:nonzero"
   id="path182" />
            </g>
            <g
   transform="translate(0,283.798)"
   id="g188">
                <rect
   x="814.30701"
   y="249.508"
   width="16.507"
   height="9.1859999"
   style="fill:#007f4b"
   id="rect186" />
            </g>
            <g
   transform="translate(0,283.798)"
   id="g192">
                <rect
   x="834.71899"
   y="249.508"
   width="39.758999"
   height="9.1859999"
   style="fill:#007f4b"
   id="rect190" />
            </g>
            <g
   transform="translate(0,354.924)"
   id="g196">
                <rect
   x="834.71899"
   y="214.11099"
   width="16.951"
   height="8.8540001"
   style="fill:#007f4b"
   id="rect194" />
            </g>
            <g
   transform="matrix(-1,0,0,1,1623.12,354.924)"
   id="g200">
                <rect
   x="792.30902"
   y="214.11099"
   width="38.504002"
   height="8.8540001"
   style="fill:#007f4b"
   id="rect198" />
            </g>
            <g
   transform="translate(0,319.528)"
   id="g204">
                <rect
   x="834.71899"
   y="226.87"
   width="39.758999"
   height="18.732"
   style="fill:#91c753"
   id="rect202" />
            </g>
            <g
   transform="matrix(-1,0,0,1,1623.31,319.526)"
   id="g208">
                <rect
   x="792.49298"
   y="226.871"
   width="38.32"
   height="18.732"
   style="fill:#91c753"
   id="rect206" />
            </g>
        </g>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >OTIO</text>
</svg>`,partio:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-partio" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-partio" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-partio)" 
    stroke="#84CC16" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-partio)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#84CC16"><circle cx="32.00" cy="15.00" r="0.80"/><circle cx="36.02" cy="15.80" r="0.90"/><circle cx="39.42" cy="18.08" r="1.00"/><circle cx="41.70" cy="21.48" r="1.10"/><circle cx="42.50" cy="25.50" r="1.20"/><circle cx="41.70" cy="29.52" r="1.30"/><circle cx="39.42" cy="32.92" r="1.40"/><circle cx="36.02" cy="35.20" r="1.50"/><circle cx="32.00" cy="36.00" r="1.60"/><circle cx="27.98" cy="35.20" r="1.70"/><circle cx="24.58" cy="32.92" r="1.80"/><circle cx="22.30" cy="29.52" r="1.90"/><circle cx="21.50" cy="25.50" r="2.00"/><circle cx="22.30" cy="21.48" r="2.10"/><circle cx="24.58" cy="18.08" r="2.20"/><circle cx="27.98" cy="15.80" r="2.30"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >PARTIO</text>
</svg>`,pdf:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-pdf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-pdf" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-pdf)" 
    stroke="#EF4444" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-pdf)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#EF4444" stroke-width="1.8" stroke-linejoin="round"><path d="M 21.5 14 H 34 L 42.5 22 V 36 H 21.5 Z" fill="#EF4444" fill-opacity="0.2"/><path d="M 34 14 V 22 H 42.5"/><text x="32" y="31" text-anchor="middle" fill="#EF4444" font-family="-apple-system, sans-serif" font-size="8" font-weight="bold">PDF</text></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >PDF</text>
</svg>`,ply:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-ply" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-ply" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-ply)" 
    stroke="#38BDF8" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-ply)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#38BDF8" stroke-width="1.6" fill="none" stroke-linejoin="round">
  <polygon points="32,14 44,22 38,36 26,36 20,22" fill="#38BDF8" fill-opacity="0.2"/>
  <line x1="32" y1="14" x2="26" y2="36"/>
  <line x1="32" y1="14" x2="38" y2="36"/>
  <line x1="20" y1="22" x2="44" y2="22"/>
  <circle cx="32" cy="14" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="44" cy="22" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="38" cy="36" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="26" cy="36" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="20" cy="22" r="2" fill="#38BDF8" stroke="none"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >PLY</text>
</svg>`,psd:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-psd" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-psd" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-psd)" 
    stroke="#3B82F6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-psd)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#3B82F6"><rect x="19.5" y="14" width="25" height="22" rx="3.5" fill="none" stroke="#3B82F6" stroke-width="2"/><text x="32" y="29.5" text-anchor="middle" fill="#3B82F6" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold">Ps</text></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >PSD</text>
</svg>`,ptex:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-ptex" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-ptex" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-ptex)" 
    stroke="#EC4899" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-ptex)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#EC4899" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="22" rx="2.5" fill="#EC4899" fill-opacity="0.15"/>
  <line x1="32" y1="14" x2="32" y2="36"/>
  <line x1="19.5" y1="25" x2="44.5" y2="25"/>
  <rect x="21.5" y="16" width="8.5" height="7" fill="#0096D6" stroke="none" opacity="0.8"/>
  <rect x="34" y="16" width="8.5" height="7" fill="#EC4899" stroke="none" opacity="0.8"/>
  <rect x="21.5" y="27" width="8.5" height="7" fill="#F59E0B" stroke="none" opacity="0.8"/>
  <rect x="34" y="27" width="8.5" height="7" fill="#10B981" stroke="none" opacity="0.8"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >PTEX</text>
</svg>`,review:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-review" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-review" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-review)" 
    stroke="#A855F7" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-review)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#A855F7" stroke-width="1.8" stroke-linejoin="round">
  <rect x="19" y="15" width="26" height="20" rx="3" fill="#A855F7" fill-opacity="0.2"/>
  <polygon points="28,20 37,25 28,30" fill="#A855F7" stroke="none"/>
  <rect x="21" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
  <rect x="30" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
  <rect x="39" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >REVIEW</text>
</svg>`,rumba:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-rumba" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-rumba" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-rumba)" 
    stroke="#06B6D4" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-rumba)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#06B6D4" stroke-width="1.8" fill="none"><polygon points="32,14 42.5,25.5 32,37 21.5,25.5" fill="#06B6D4" fill-opacity="0.3"/><circle cx="32" cy="25.5" r="3.8" fill="#06B6D4" stroke="none"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >RUMBA</text>
</svg>`,screenjson:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-screenjson" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-screenjson" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-screenjson)" 
    stroke="#F59E0B" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-screenjson)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linejoin="round">
  <rect x="20" y="14" width="24" height="21" rx="3" fill="#F59E0B" fill-opacity="0.2"/>
  <path d="M 25 19 C 23 19 23 21 23 22.5 C 23 23.5 22 24.5 21 24.5 C 22 24.5 23 25.5 23 26.5 C 23 28 23 30 25 30" stroke-linecap="round"/>
  <path d="M 39 19 C 41 19 41 21 41 22.5 C 41 23.5 42 24.5 43 24.5 C 42 24.5 41 25.5 41 26.5 C 41 28 41 30 39 30" stroke-linecap="round"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="6.5" 
    font-weight="700" 
    letter-spacing="0.6"
  >SCREENJSON</text>
</svg>`,splat:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-splat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-splat" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-splat)" 
    stroke="#F43F5E" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-splat)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#F43F5E">
  <ellipse cx="32" cy="25" rx="10" ry="6" fill-opacity="0.85" transform="rotate(-15 32 25)"/>
  <ellipse cx="26" cy="21" rx="6" ry="4" fill-opacity="0.6" transform="rotate(25 26 21)"/>
  <ellipse cx="38" cy="28" rx="7" ry="4.5" fill-opacity="0.75" transform="rotate(40 38 28)"/>
  <circle cx="23" cy="30" r="2.5" fill-opacity="0.9"/>
  <circle cx="41" cy="19" r="2.2" fill-opacity="0.8"/>
  <circle cx="32" cy="16" r="1.8" fill-opacity="0.7"/>
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >SPLAT</text>
</svg>`,uasset:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-uasset" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-uasset" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-uasset)" 
    stroke="#38BDF8" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-uasset)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(20.50, 13.00) scale(0.9583)" fill="#38BDF8"><title>Unreal Engine</title><path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="7.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >UASSET</text>
</svg>`,umap:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-umap" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-umap" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-umap)" 
    stroke="#0070E0" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-umap)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g transform="translate(20.50, 13.00) scale(0.9583)" fill="#38BDF8"><title>Unreal Engine</title><path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >UMAP</text>
</svg>`,usd:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-usd" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-usd" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-usd)" 
    stroke="#0088CC" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-usd)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="none" stroke="#0088CC" stroke-width="1.8" stroke-linejoin="round">
  <rect x="20" y="14" width="16" height="16" rx="2" fill="#0088CC" fill-opacity="0.25" />
  <rect x="24" y="18" width="16" height="16" rx="2" fill="#0088CC" fill-opacity="0.55" />
  <rect x="28" y="22" width="16" height="16" rx="2" fill="#0088CC" />
</g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >USD</text>
</svg>`,wav:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-wav" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-wav" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-wav)" 
    stroke="#8B5CF6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-wav)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g fill="#8B5CF6"><rect x="17.5" y="22.5" width="2.8" height="6" rx="1.4"/><rect x="22.5" y="17.5" width="2.8" height="16" rx="1.4"/><rect x="27.5" y="13.5" width="2.8" height="24" rx="1.4"/><rect x="32.5" y="15.5" width="2.8" height="20" rx="1.4"/><rect x="37.5" y="19.5" width="2.8" height="12" rx="1.4"/><rect x="42.5" y="23.5" width="2.8" height="4" rx="1.4"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >WAV</text>
</svg>`,xgen:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-xgen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-xgen" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-xgen)" 
    stroke="#14B8A6" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-xgen)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#14B8A6" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M 21 35.5 C 21 25 28 21 28 14.5"/><path d="M 28 35.5 C 28 24 34 19.5 34 14.5"/><path d="M 35 35.5 C 35 25 41 21 41 14.5"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.2" 
    font-weight="700" 
    letter-spacing="0.5"
  >XGEN</text>
</svg>`,xml:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-xml" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-xml" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-xml)" 
    stroke="#64748B" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-xml)"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  <g stroke="#64748B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M 23 17 L 17 25.5 L 23 34"/><path d="M 41 17 L 47 25.5 L 41 34"/><line x1="34.5" y1="15" x2="29.5" y2="36"/></g>

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="9.0" 
    font-weight="700" 
    letter-spacing="0.4"
  >XML</text>
</svg>`},Se=new class{constructor(){this.types=new Map,this.extensionMap=new Map,this.imageCaches=new Map,this.dataUrlCaches=new Map,this.svgTextCaches=new Map,this.inlineIcons=xe||null,this.initialized=!1,this.onLoadedListeners=new Set,this.registerDefaults(),this.inlineIcons&&this.registerInlineIcons(this.inlineIcons)}registerInlineIcons(e){this.inlineIcons=e;for(let[t,n]of Object.entries(e)){let e=t.toLowerCase();if(this.svgTextCaches.has(e))continue;this.svgTextCaches.set(e,n);let r=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(n)))}`;this.dataUrlCaches.set(e,r);let i=new Image;i.src=r,i.onload=()=>{this.imageCaches.set(e,i),this.notifyLoaded()}}}resolveCode(e){if(!e)return``;let t=e.toLowerCase();return this.extensionMap.get(t)||t}registerDefaults(){me.forEach(e=>{let t=e.code.toLowerCase(),n={code:e.code,type:e.type,extensions:e.extensions||[],description:e.description||``,iconPath:be(`/data_type_icons/${e.code}.svg`),isCustom:!1};this.types.set(t,n),Array.isArray(e.extensions)&&e.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),t)})}),ye.getTypes().forEach(e=>{let t=e.code.toLowerCase(),n=e.iconPath||``,r={code:e.code,type:e.type,extensions:e.extensions||[],description:e.description||``,iconPath:n,isCustom:!0,hash:e.hash};this.types.set(t,r),Array.isArray(e.extensions)&&e.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),t)}),n&&this.loadImage(t,n)})}async initialize(){this.initialized||(this.initialized=!0,await this.preloadImages())}getAllTypes(){return Array.from(this.types.values()).sort((e,t)=>e.code.localeCompare(t.code))}getType(e){if(!e)return null;let t=this.resolveCode(e);return this.types.get(t)||null}async preloadImages(){let e=[];for(let[t,n]of this.types.entries())n.iconPath&&e.push(this.loadImage(t,n.iconPath));await Promise.all(e),this.notifyLoaded()}loadImage(e,t){let n=this.resolveCode(e);return!n||!t?Promise.resolve(null):new Promise(e=>{if(this.imageCaches.has(n)&&this.dataUrlCaches.has(n)){e(this.imageCaches.get(n));return}if(t.startsWith(`data:`)){this.dataUrlCaches.set(n,t);try{if(t.includes(`base64,`)){let e=t.split(`base64,`)[1]||``,r=atob(e);r&&r.includes(`<svg`)&&this.svgTextCaches.set(n,r)}else{let e=decodeURIComponent(t.split(`,`)[1]||``);e&&e.includes(`<svg`)&&this.svgTextCaches.set(n,e)}}catch{}let r=new Image;r.src=t,r.onload=()=>{this.imageCaches.set(n,r),this.notifyLoaded(),e(r)},r.onerror=t=>{console.warn(`Failed to load Data URI image for custom type ${n}:`,t),e(null)};return}let r=typeof window<`u`&&window.location&&window.location.protocol===`file:`,i=t.startsWith(`http://`)||t.startsWith(`https://`);if(!(!r&&(i||t.startsWith(`/`)))){this._applyVectorFallback(n,e);return}fetch(t).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.text()}).then(r=>{this.svgTextCaches.set(n,r);let i=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(r)))}`;this.dataUrlCaches.set(n,i);let a=new Image;a.src=i,a.onload=()=>{this.imageCaches.set(n,a),this.notifyLoaded(),e(a)},a.onerror=()=>{let r=new Image;r.src=t,r.onload=()=>{this.imageCaches.set(n,r),this.notifyLoaded(),e(r)},r.onerror=()=>e(null)}}).catch(()=>{this._applyVectorFallback(n,e)})})}_applyVectorFallback(e,t){let n=(this.inlineIcons?this.inlineIcons[e]:null)||ge({code:e,label:e.toUpperCase(),color:`#38BDF8`});this.svgTextCaches.set(e,n);let r=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(n)))}`;this.dataUrlCaches.set(e,r);let i=new Image;i.src=r,i.onload=()=>{this.imageCaches.set(e,i),this.notifyLoaded(),t(i)},i.onerror=()=>t(null)}getImage(e){if(!e)return null;let t=this.resolveCode(e);if(this.imageCaches.has(t))return this.imageCaches.get(t);let n=this.types.get(t);return n&&n.iconPath&&this.loadImage(t,n.iconPath),null}getDataUrl(e){if(!e)return null;let t=this.resolveCode(e);return this.dataUrlCaches.get(t)||null}getSvgText(e){if(!e)return null;let t=this.resolveCode(e);return this.svgTextCaches.get(t)||null}onLoaded(e){return this.onLoadedListeners.add(e),()=>this.onLoadedListeners.delete(e)}notifyLoaded(){this.onLoadedListeners.forEach(e=>{try{e()}catch{}})}acceptsConnection(e,t){return!e||!t?!1:this.resolveCode(e)===this.resolveCode(t)}addCustomType(e){let t=ye.addType(e),n=ye.getType(e.code),r=this.resolveCode(e.code),i=n?.iconPath||e.iconPath||``,a={code:n?.code||e.code,type:n?.type||e.type,extensions:n?.extensions||e.extensions||[],description:n?.description||e.description||``,iconPath:i,isCustom:!0,hash:t};return this.types.set(r,a),Array.isArray(a.extensions)&&a.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),r)}),i&&this.loadImage(r,i),t}removeCustomType(e){let t=this.resolveCode(e);if(t){for(let[e,n]of this.extensionMap.entries())n===t&&this.extensionMap.delete(e);ye.removeType(t),this.types.delete(t),this.imageCaches.delete(t),this.dataUrlCaches.delete(t),this.svgTextCaches.delete(t)}}};function Ce(e,t){try{let n=typeof e==`string`?JSON.parse(e):e;if(t.clear(),!n||typeof n!=`object`)throw Error(`Invalid graph file format.`);n.CUSTOM_TYPES&&Array.isArray(n.CUSTOM_TYPES)&&n.CUSTOM_TYPES.forEach(e=>{Se.addCustomType(e)});let r=n.NODES||{};for(let[e,n]of Object.entries(r)){let r=n.position||[100,100],i={x:r[0],y:r[1]},a=n.preset||`node_preset_1`,o=t.createNode(e,i,a);o&&(o.alternate=n.alternate===void 0||n.alternate,o.metadata=n.metadata||{process_details:``},(n.attributes||[]).forEach(n=>{let r=n.dataType||`Unknown`;if(typeof r==`string`&&r.includes(`<class '`)){let e=r.match(/<class '__main__\.(\w+)'>/);if(e&&e[1])r=e[1].toLowerCase();else{let e=r.match(/'([^']+)'/);if(e&&e[1]){let t=e[1].split(`.`);r=t[t.length-1].toLowerCase()}}}else typeof r==`string`&&(r=r.toLowerCase());t.createAttribute(e,{name:n.name,plug:n.plug===void 0||n.plug,socket:n.socket===void 0||n.socket,preset:n.preset||(n.plug?`attr_preset_2`:`attr_preset_1`),dataType:r,connectionIcon:n.connectionIcon||null,connectionLabel:n.connectionLabel||null,plugMaxConnections:n.plugMaxConnections===void 0?-1:n.plugMaxConnections,socketMaxConnections:n.socketMaxConnections===void 0?1:n.socketMaxConnections})}))}return(n.CONNECTIONS||[]).forEach(e=>{let n=e[0],r=e[1];if(n&&r){let[e,i]=n.split(`.`),[a,o]=r.split(`.`);e&&i&&a&&o&&t.createConnection(e,i,a,o)}}),t.emit(`node:moved`,{}),t.emit(`graph:loaded`,{}),!0}catch(e){return console.error(`Failed to parse graph JSON:`,e),!1}}var we=s(((e,t)=>{var n;if(typeof require==`function`)try{n=ce()}catch{}n||=window.graphlib,t.exports=n})),S=s(((e,t)=>{var n=l(u()).default;t.exports={cloneDeep:n.cloneDeep,constant:n.constant,defaults:n.defaults,each:n.each,filter:n.filter,find:n.find,flatten:n.flatten,forEach:n.forEach,forIn:n.forIn,has:n.has,isUndefined:n.isUndefined,last:n.last,map:n.map,mapValues:n.mapValues,max:n.max,merge:n.merge,min:n.min,minBy:n.minBy,now:n.now,pick:n.pick,range:n.range,reduce:n.reduce,sortBy:n.sortBy,uniqueId:n.uniqueId,values:n.values,zipObject:n.zipObject}})),Te=s(((e,t)=>{t.exports=n;function n(){var e={};e._next=e._prev=e,this._sentinel=e}n.prototype.dequeue=function(){var e=this._sentinel,t=e._prev;if(t!==e)return r(t),t},n.prototype.enqueue=function(e){var t=this._sentinel;e._prev&&e._next&&r(e),e._next=t._next,t._next._prev=e,t._next=e,e._prev=t},n.prototype.toString=function(){for(var e=[],t=this._sentinel,n=t._prev;n!==t;)e.push(JSON.stringify(n,i)),n=n._prev;return`[`+e.join(`, `)+`]`};function r(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function i(e,t){if(e!==`_next`&&e!==`_prev`)return t}})),Ee=s(((e,t)=>{var n=S(),r=we().Graph,i=Te();t.exports=o;var a=n.constant(1);function o(e,t){if(e.nodeCount()<=1)return[];var r=l(e,t||a),i=s(r.graph,r.buckets,r.zeroIdx);return n.flatten(n.map(i,function(t){return e.outEdges(t.v,t.w)}),!0)}function s(e,t,n){for(var r=[],i=t[t.length-1],a=t[0],o;e.nodeCount();){for(;o=a.dequeue();)c(e,t,n,o);for(;o=i.dequeue();)c(e,t,n,o);if(e.nodeCount()){for(var s=t.length-2;s>0;--s)if(o=t[s].dequeue(),o){r=r.concat(c(e,t,n,o,!0));break}}}return r}function c(e,t,r,i,a){var o=a?[]:void 0;return n.forEach(e.inEdges(i.v),function(n){var i=e.edge(n),s=e.node(n.v);a&&o.push({v:n.v,w:n.w}),s.out-=i,u(t,r,s)}),n.forEach(e.outEdges(i.v),function(n){var i=e.edge(n),a=n.w,o=e.node(a);o.in-=i,u(t,r,o)}),e.removeNode(i.v),o}function l(e,t){var a=new r,o=0,s=0;n.forEach(e.nodes(),function(e){a.setNode(e,{v:e,in:0,out:0})}),n.forEach(e.edges(),function(e){var n=a.edge(e.v,e.w)||0,r=t(e),i=n+r;a.setEdge(e.v,e.w,i),s=Math.max(s,a.node(e.v).out+=r),o=Math.max(o,a.node(e.w).in+=r)});var c=n.range(s+o+3).map(function(){return new i}),l=o+1;return n.forEach(a.nodes(),function(e){u(c,l,a.node(e))}),{graph:a,buckets:c,zeroIdx:l}}function u(e,t,n){n.out?n.in?e[n.out-n.in+t].enqueue(n):e[e.length-1].enqueue(n):e[0].enqueue(n)}})),De=s(((e,t)=>{var n=S(),r=Ee();t.exports={run:i,undo:o};function i(e){var t=e.graph().acyclicer===`greedy`?r(e,i(e)):a(e);n.forEach(t,function(t){var r=e.edge(t);e.removeEdge(t),r.forwardName=t.name,r.reversed=!0,e.setEdge(t.w,t.v,r,n.uniqueId(`rev`))});function i(e){return function(t){return e.edge(t).weight}}}function a(e){var t=[],r={},i={};function a(o){n.has(i,o)||(i[o]=!0,r[o]=!0,n.forEach(e.outEdges(o),function(e){n.has(r,e.w)?t.push(e):a(e.w)}),delete r[o])}return n.forEach(e.nodes(),a),t}function o(e){n.forEach(e.edges(),function(t){var n=e.edge(t);if(n.reversed){e.removeEdge(t);var r=n.forwardName;delete n.reversed,delete n.forwardName,e.setEdge(t.w,t.v,n,r)}})}})),C=s(((e,t)=>{var n=S(),r=we().Graph;t.exports={addDummyNode:i,simplify:a,asNonCompoundGraph:o,successorWeights:s,predecessorWeights:c,intersectRect:l,buildLayerMatrix:u,normalizeRanks:d,removeEmptyRanks:f,addBorderNode:p,maxRank:m,partition:h,time:g,notime:_};function i(e,t,r,i){var a;do a=n.uniqueId(i);while(e.hasNode(a));return r.dummy=t,e.setNode(a,r),a}function a(e){var t=new r().setGraph(e.graph());return n.forEach(e.nodes(),function(n){t.setNode(n,e.node(n))}),n.forEach(e.edges(),function(n){var r=t.edge(n.v,n.w)||{weight:0,minlen:1},i=e.edge(n);t.setEdge(n.v,n.w,{weight:r.weight+i.weight,minlen:Math.max(r.minlen,i.minlen)})}),t}function o(e){var t=new r({multigraph:e.isMultigraph()}).setGraph(e.graph());return n.forEach(e.nodes(),function(n){e.children(n).length||t.setNode(n,e.node(n))}),n.forEach(e.edges(),function(n){t.setEdge(n,e.edge(n))}),t}function s(e){var t=n.map(e.nodes(),function(t){var r={};return n.forEach(e.outEdges(t),function(t){r[t.w]=(r[t.w]||0)+e.edge(t).weight}),r});return n.zipObject(e.nodes(),t)}function c(e){var t=n.map(e.nodes(),function(t){var r={};return n.forEach(e.inEdges(t),function(t){r[t.v]=(r[t.v]||0)+e.edge(t).weight}),r});return n.zipObject(e.nodes(),t)}function l(e,t){var n=e.x,r=e.y,i=t.x-n,a=t.y-r,o=e.width/2,s=e.height/2;if(!i&&!a)throw Error(`Not possible to find intersection inside of the rectangle`);var c,l;return Math.abs(a)*o>Math.abs(i)*s?(a<0&&(s=-s),c=s*i/a,l=s):(i<0&&(o=-o),c=o,l=o*a/i),{x:n+c,y:r+l}}function u(e){var t=n.map(n.range(m(e)+1),function(){return[]});return n.forEach(e.nodes(),function(r){var i=e.node(r),a=i.rank;n.isUndefined(a)||(t[a][i.order]=r)}),t}function d(e){var t=n.min(n.map(e.nodes(),function(t){return e.node(t).rank}));n.forEach(e.nodes(),function(r){var i=e.node(r);n.has(i,`rank`)&&(i.rank-=t)})}function f(e){var t=n.min(n.map(e.nodes(),function(t){return e.node(t).rank})),r=[];n.forEach(e.nodes(),function(n){var i=e.node(n).rank-t;r[i]||(r[i]=[]),r[i].push(n)});var i=0,a=e.graph().nodeRankFactor;n.forEach(r,function(t,r){n.isUndefined(t)&&r%a!==0?--i:i&&n.forEach(t,function(t){e.node(t).rank+=i})})}function p(e,t,n,r){var a={width:0,height:0};return arguments.length>=4&&(a.rank=n,a.order=r),i(e,`border`,a,t)}function m(e){return n.max(n.map(e.nodes(),function(t){var r=e.node(t).rank;if(!n.isUndefined(r))return r}))}function h(e,t){var r={lhs:[],rhs:[]};return n.forEach(e,function(e){t(e)?r.lhs.push(e):r.rhs.push(e)}),r}function g(e,t){var r=n.now();try{return t()}finally{console.log(e+` time: `+(n.now()-r)+`ms`)}}function _(e,t){return t()}})),Oe=s(((e,t)=>{var n=S(),r=C();t.exports={run:i,undo:o};function i(e){e.graph().dummyChains=[],n.forEach(e.edges(),function(t){a(e,t)})}function a(e,t){var n=t.v,i=e.node(n).rank,a=t.w,o=e.node(a).rank,s=t.name,c=e.edge(t),l=c.labelRank;if(o!==i+1){e.removeEdge(t);var u,d,f;for(f=0,++i;i<o;++f,++i)c.points=[],d={width:0,height:0,edgeLabel:c,edgeObj:t,rank:i},u=r.addDummyNode(e,`edge`,d,`_d`),i===l&&(d.width=c.width,d.height=c.height,d.dummy=`edge-label`,d.labelpos=c.labelpos),e.setEdge(n,u,{weight:c.weight},s),f===0&&e.graph().dummyChains.push(u),n=u;e.setEdge(n,a,{weight:c.weight},s)}}function o(e){n.forEach(e.graph().dummyChains,function(t){var n=e.node(t),r=n.edgeLabel,i;for(e.setEdge(n.edgeObj,r);n.dummy;)i=e.successors(t)[0],e.removeNode(t),r.points.push({x:n.x,y:n.y}),n.dummy===`edge-label`&&(r.x=n.x,r.y=n.y,r.width=n.width,r.height=n.height),t=i,n=e.node(t)})}})),ke=s(((e,t)=>{var n=S();t.exports={longestPath:r,slack:i};function r(e){var t={};function r(i){var a=e.node(i);if(n.has(t,i))return a.rank;t[i]=!0;var o=n.min(n.map(e.outEdges(i),function(t){return r(t.w)-e.edge(t).minlen}));return(o===1/0||o==null)&&(o=0),a.rank=o}n.forEach(e.sources(),r)}function i(e,t){return e.node(t.w).rank-e.node(t.v).rank-e.edge(t).minlen}})),Ae=s(((e,t)=>{var n=S(),r=we().Graph,i=ke().slack;t.exports=a;function a(e){var t=new r({directed:!1}),n=e.nodes()[0],a=e.nodeCount();t.setNode(n,{});for(var l,u;o(t,e)<a;)l=s(t,e),u=t.hasNode(l.v)?i(e,l):-i(e,l),c(t,e,u);return t}function o(e,t){function r(a){n.forEach(t.nodeEdges(a),function(n){var o=n.v,s=a===o?n.w:o;!e.hasNode(s)&&!i(t,n)&&(e.setNode(s,{}),e.setEdge(a,s,{}),r(s))})}return n.forEach(e.nodes(),r),e.nodeCount()}function s(e,t){return n.minBy(t.edges(),function(n){if(e.hasNode(n.v)!==e.hasNode(n.w))return i(t,n)})}function c(e,t,r){n.forEach(e.nodes(),function(e){t.node(e).rank+=r})}})),je=s(((e,t)=>{var n=S(),r=Ae(),i=ke().slack,a=ke().longestPath,o=we().alg.preorder,s=we().alg.postorder,c=C().simplify;t.exports=l,l.initLowLimValues=p,l.initCutValues=u,l.calcCutValue=f,l.leaveEdge=h,l.enterEdge=g,l.exchangeEdges=_;function l(e){e=c(e),a(e);var t=r(e);p(t),u(t,e);for(var n,i;n=h(t);)i=g(t,e,n),_(t,e,n,i)}function u(e,t){var r=s(e,e.nodes());r=r.slice(0,r.length-1),n.forEach(r,function(n){d(e,t,n)})}function d(e,t,n){var r=e.node(n).parent;e.edge(n,r).cutvalue=f(e,t,n)}function f(e,t,r){var i=e.node(r).parent,a=!0,o=t.edge(r,i),s=0;return o||=(a=!1,t.edge(i,r)),s=o.weight,n.forEach(t.nodeEdges(r),function(n){var o=n.v===r,c=o?n.w:n.v;if(c!==i){var l=o===a,u=t.edge(n).weight;if(s+=l?u:-u,y(e,r,c)){var d=e.edge(r,c).cutvalue;s+=l?-d:d}}}),s}function p(e,t){arguments.length<2&&(t=e.nodes()[0]),m(e,{},1,t)}function m(e,t,r,i,a){var o=r,s=e.node(i);return t[i]=!0,n.forEach(e.neighbors(i),function(a){n.has(t,a)||(r=m(e,t,r,a,i))}),s.low=o,s.lim=r++,a?s.parent=a:delete s.parent,r}function h(e){return n.find(e.edges(),function(t){return e.edge(t).cutvalue<0})}function g(e,t,r){var a=r.v,o=r.w;t.hasEdge(a,o)||(a=r.w,o=r.v);var s=e.node(a),c=e.node(o),l=s,u=!1;s.lim>c.lim&&(l=c,u=!0);var d=n.filter(t.edges(),function(t){return u===b(e,e.node(t.v),l)&&u!==b(e,e.node(t.w),l)});return n.minBy(d,function(e){return i(t,e)})}function _(e,t,n,r){var i=n.v,a=n.w;e.removeEdge(i,a),e.setEdge(r.v,r.w,{}),p(e),u(e,t),v(e,t)}function v(e,t){var r=o(e,n.find(e.nodes(),function(e){return!t.node(e).parent}));r=r.slice(1),n.forEach(r,function(n){var r=e.node(n).parent,i=t.edge(n,r),a=!1;i||(i=t.edge(r,n),a=!0),t.node(n).rank=t.node(r).rank+(a?i.minlen:-i.minlen)})}function y(e,t,n){return e.hasEdge(t,n)}function b(e,t,n){return n.low<=t.lim&&t.lim<=n.lim}})),Me=s(((e,t)=>{var n=ke().longestPath,r=Ae(),i=je();t.exports=a;function a(e){switch(e.graph().ranker){case`network-simplex`:c(e);break;case`tight-tree`:s(e);break;case`longest-path`:o(e);break;default:c(e)}}var o=n;function s(e){n(e),r(e)}function c(e){i(e)}})),Ne=s(((e,t)=>{var n=S();t.exports=r;function r(e){var t=a(e);n.forEach(e.graph().dummyChains,function(n){for(var r=e.node(n),a=r.edgeObj,o=i(e,t,a.v,a.w),s=o.path,c=o.lca,l=0,u=s[l],d=!0;n!==a.w;){if(r=e.node(n),d){for(;(u=s[l])!==c&&e.node(u).maxRank<r.rank;)l++;u===c&&(d=!1)}if(!d){for(;l<s.length-1&&e.node(u=s[l+1]).minRank<=r.rank;)l++;u=s[l]}e.setParent(n,u),n=e.successors(n)[0]}})}function i(e,t,n,r){var i=[],a=[],o=Math.min(t[n].low,t[r].low),s=Math.max(t[n].lim,t[r].lim),c=n,l;do c=e.parent(c),i.push(c);while(c&&(t[c].low>o||s>t[c].lim));for(l=c,c=r;(c=e.parent(c))!==l;)a.push(c);return{path:i.concat(a.reverse()),lca:l}}function a(e){var t={},r=0;function i(a){var o=r;n.forEach(e.children(a),i),t[a]={low:o,lim:r++}}return n.forEach(e.children(),i),t}})),Pe=s(((e,t)=>{var n=S(),r=C();t.exports={run:i,cleanup:c};function i(e){var t=r.addDummyNode(e,`root`,{},`_root`),i=o(e),c=n.max(n.values(i))-1,l=2*c+1;e.graph().nestingRoot=t,n.forEach(e.edges(),function(t){e.edge(t).minlen*=l});var u=s(e)+1;n.forEach(e.children(),function(n){a(e,t,l,u,c,i,n)}),e.graph().nodeRankFactor=l}function a(e,t,i,o,s,c,l){var u=e.children(l);if(!u.length){l!==t&&e.setEdge(t,l,{weight:0,minlen:i});return}var d=r.addBorderNode(e,`_bt`),f=r.addBorderNode(e,`_bb`),p=e.node(l);e.setParent(d,l),p.borderTop=d,e.setParent(f,l),p.borderBottom=f,n.forEach(u,function(n){a(e,t,i,o,s,c,n);var r=e.node(n),u=r.borderTop?r.borderTop:n,p=r.borderBottom?r.borderBottom:n,m=r.borderTop?o:2*o,h=u===p?s-c[l]+1:1;e.setEdge(d,u,{weight:m,minlen:h,nestingEdge:!0}),e.setEdge(p,f,{weight:m,minlen:h,nestingEdge:!0})}),e.parent(l)||e.setEdge(t,d,{weight:0,minlen:s+c[l]})}function o(e){var t={};function r(i,a){var o=e.children(i);o&&o.length&&n.forEach(o,function(e){r(e,a+1)}),t[i]=a}return n.forEach(e.children(),function(e){r(e,1)}),t}function s(e){return n.reduce(e.edges(),function(t,n){return t+e.edge(n).weight},0)}function c(e){var t=e.graph();e.removeNode(t.nestingRoot),delete t.nestingRoot,n.forEach(e.edges(),function(t){e.edge(t).nestingEdge&&e.removeEdge(t)})}})),Fe=s(((e,t)=>{var n=S(),r=C();t.exports=i;function i(e){function t(r){var i=e.children(r),o=e.node(r);if(i.length&&n.forEach(i,t),n.has(o,`minRank`)){o.borderLeft=[],o.borderRight=[];for(var s=o.minRank,c=o.maxRank+1;s<c;++s)a(e,`borderLeft`,`_bl`,r,o,s),a(e,`borderRight`,`_br`,r,o,s)}}n.forEach(e.children(),t)}function a(e,t,n,i,a,o){var s={width:0,height:0,rank:o,borderType:t},c=a[t][o-1],l=r.addDummyNode(e,`border`,s,n);a[t][o]=l,e.setParent(l,i),c&&e.setEdge(c,l,{weight:1})}})),Ie=s(((e,t)=>{var n=S();t.exports={adjust:r,undo:i};function r(e){var t=e.graph().rankdir.toLowerCase();(t===`lr`||t===`rl`)&&a(e)}function i(e){var t=e.graph().rankdir.toLowerCase();(t===`bt`||t===`rl`)&&s(e),(t===`lr`||t===`rl`)&&(l(e),a(e))}function a(e){n.forEach(e.nodes(),function(t){o(e.node(t))}),n.forEach(e.edges(),function(t){o(e.edge(t))})}function o(e){var t=e.width;e.width=e.height,e.height=t}function s(e){n.forEach(e.nodes(),function(t){c(e.node(t))}),n.forEach(e.edges(),function(t){var r=e.edge(t);n.forEach(r.points,c),n.has(r,`y`)&&c(r)})}function c(e){e.y=-e.y}function l(e){n.forEach(e.nodes(),function(t){u(e.node(t))}),n.forEach(e.edges(),function(t){var r=e.edge(t);n.forEach(r.points,u),n.has(r,`x`)&&u(r)})}function u(e){var t=e.x;e.x=e.y,e.y=t}})),Le=s(((e,t)=>{var n=S();t.exports=r;function r(e){var t={},r=n.filter(e.nodes(),function(t){return!e.children(t).length}),i=n.max(n.map(r,function(t){return e.node(t).rank})),a=n.map(n.range(i+1),function(){return[]});function o(r){n.has(t,r)||(t[r]=!0,a[e.node(r).rank].push(r),n.forEach(e.successors(r),o))}var s=n.sortBy(r,function(t){return e.node(t).rank});return n.forEach(s,o),a}})),Re=s(((e,t)=>{var n=S();t.exports=r;function r(e,t){for(var n=0,r=1;r<t.length;++r)n+=i(e,t[r-1],t[r]);return n}function i(e,t,r){for(var i=n.zipObject(r,n.map(r,function(e,t){return t})),a=n.flatten(n.map(t,function(t){return n.sortBy(n.map(e.outEdges(t),function(t){return{pos:i[t.w],weight:e.edge(t).weight}}),`pos`)}),!0),o=1;o<r.length;)o<<=1;var s=2*o-1;--o;var c=n.map(Array(s),function(){return 0}),l=0;return n.forEach(a.forEach(function(e){var t=e.pos+o;c[t]+=e.weight;for(var n=0;t>0;)t%2&&(n+=c[t+1]),t=t-1>>1,c[t]+=e.weight;l+=e.weight*n})),l}})),ze=s(((e,t)=>{var n=S();t.exports=r;function r(e,t){return n.map(t,function(t){var r=e.inEdges(t);if(r.length){var i=n.reduce(r,function(t,n){var r=e.edge(n),i=e.node(n.v);return{sum:t.sum+r.weight*i.order,weight:t.weight+r.weight}},{sum:0,weight:0});return{v:t,barycenter:i.sum/i.weight,weight:i.weight}}else return{v:t}})}})),Be=s(((e,t)=>{var n=S();t.exports=r;function r(e,t){var r={};return n.forEach(e,function(e,t){var i=r[e.v]={indegree:0,in:[],out:[],vs:[e.v],i:t};n.isUndefined(e.barycenter)||(i.barycenter=e.barycenter,i.weight=e.weight)}),n.forEach(t.edges(),function(e){var t=r[e.v],i=r[e.w];!n.isUndefined(t)&&!n.isUndefined(i)&&(i.indegree++,t.out.push(r[e.w]))}),i(n.filter(r,function(e){return!e.indegree}))}function i(e){var t=[];function r(e){return function(t){t.merged||(n.isUndefined(t.barycenter)||n.isUndefined(e.barycenter)||t.barycenter>=e.barycenter)&&a(e,t)}}function i(t){return function(n){n.in.push(t),--n.indegree===0&&e.push(n)}}for(;e.length;){var o=e.pop();t.push(o),n.forEach(o.in.reverse(),r(o)),n.forEach(o.out,i(o))}return n.map(n.filter(t,function(e){return!e.merged}),function(e){return n.pick(e,[`vs`,`i`,`barycenter`,`weight`])})}function a(e,t){var n=0,r=0;e.weight&&(n+=e.barycenter*e.weight,r+=e.weight),t.weight&&(n+=t.barycenter*t.weight,r+=t.weight),e.vs=t.vs.concat(e.vs),e.barycenter=n/r,e.weight=r,e.i=Math.min(t.i,e.i),t.merged=!0}})),Ve=s(((e,t)=>{var n=S(),r=C();t.exports=i;function i(e,t){var i=r.partition(e,function(e){return n.has(e,`barycenter`)}),s=i.lhs,c=n.sortBy(i.rhs,function(e){return-e.i}),l=[],u=0,d=0,f=0;s.sort(o(!!t)),f=a(l,c,f),n.forEach(s,function(e){f+=e.vs.length,l.push(e.vs),u+=e.barycenter*e.weight,d+=e.weight,f=a(l,c,f)});var p={vs:n.flatten(l,!0)};return d&&(p.barycenter=u/d,p.weight=d),p}function a(e,t,r){for(var i;t.length&&(i=n.last(t)).i<=r;)t.pop(),e.push(i.vs),r++;return r}function o(e){return function(t,n){return t.barycenter<n.barycenter?-1:t.barycenter>n.barycenter?1:e?n.i-t.i:t.i-n.i}}})),He=s(((e,t)=>{var n=S(),r=ze(),i=Be(),a=Ve();t.exports=o;function o(e,t,l,u){var d=e.children(t),f=e.node(t),p=f?f.borderLeft:void 0,m=f?f.borderRight:void 0,h={};p&&(d=n.filter(d,function(e){return e!==p&&e!==m}));var g=r(e,d);n.forEach(g,function(t){if(e.children(t.v).length){var r=o(e,t.v,l,u);h[t.v]=r,n.has(r,`barycenter`)&&c(t,r)}});var _=i(g,l);s(_,h);var v=a(_,u);if(p&&(v.vs=n.flatten([p,v.vs,m],!0),e.predecessors(p).length)){var y=e.node(e.predecessors(p)[0]),b=e.node(e.predecessors(m)[0]);n.has(v,`barycenter`)||(v.barycenter=0,v.weight=0),v.barycenter=(v.barycenter*v.weight+y.order+b.order)/(v.weight+2),v.weight+=2}return v}function s(e,t){n.forEach(e,function(e){e.vs=n.flatten(e.vs.map(function(e){return t[e]?t[e].vs:e}),!0)})}function c(e,t){n.isUndefined(e.barycenter)?(e.barycenter=t.barycenter,e.weight=t.weight):(e.barycenter=(e.barycenter*e.weight+t.barycenter*t.weight)/(e.weight+t.weight),e.weight+=t.weight)}})),Ue=s(((e,t)=>{var n=S(),r=we().Graph;t.exports=i;function i(e,t,i){var o=a(e),s=new r({compound:!0}).setGraph({root:o}).setDefaultNodeLabel(function(t){return e.node(t)});return n.forEach(e.nodes(),function(r){var a=e.node(r),c=e.parent(r);(a.rank===t||a.minRank<=t&&t<=a.maxRank)&&(s.setNode(r),s.setParent(r,c||o),n.forEach(e[i](r),function(t){var i=t.v===r?t.w:t.v,a=s.edge(i,r),o=n.isUndefined(a)?0:a.weight;s.setEdge(i,r,{weight:e.edge(t).weight+o})}),n.has(a,`minRank`)&&s.setNode(r,{borderLeft:a.borderLeft[t],borderRight:a.borderRight[t]}))}),s}function a(e){for(var t;e.hasNode(t=n.uniqueId(`_root`)););return t}})),We=s(((e,t)=>{var n=S();t.exports=r;function r(e,t,r){var i={},a;n.forEach(r,function(n){for(var r=e.parent(n),o,s;r;){if(o=e.parent(r),o?(s=i[o],i[o]=r):(s=a,a=r),s&&s!==r){t.setEdge(s,r);return}r=o}})}})),Ge=s(((e,t)=>{var n=S(),r=Le(),i=Re(),a=He(),o=Ue(),s=We(),c=we().Graph,l=C();t.exports=u;function u(e){var t=l.maxRank(e),a=d(e,n.range(1,t+1),`inEdges`),o=d(e,n.range(t-1,-1,-1),`outEdges`),s=r(e);p(e,s);for(var c=1/0,u,m=0,h=0;h<4;++m,++h){f(m%2?a:o,m%4>=2),s=l.buildLayerMatrix(e);var g=i(e,s);g<c&&(h=0,u=n.cloneDeep(s),c=g)}p(e,u)}function d(e,t,r){return n.map(t,function(t){return o(e,t,r)})}function f(e,t){var r=new c;n.forEach(e,function(e){var i=e.graph().root,o=a(e,i,r,t);n.forEach(o.vs,function(t,n){e.node(t).order=n}),s(e,r,o.vs)})}function p(e,t){n.forEach(t,function(t){n.forEach(t,function(t,n){e.node(t).order=n})})}})),Ke=s(((e,t)=>{var n=S(),r=we().Graph,i=C();t.exports={positionX:g,findType1Conflicts:a,findType2Conflicts:o,addConflict:c,hasConflict:l,verticalAlignment:u,horizontalCompaction:d,alignCoordinates:m,findSmallestWidthAlignment:p,balance:h};function a(e,t){var r={};function i(t,i){var a=0,o=0,l=t.length,u=n.last(i);return n.forEach(i,function(t,d){var f=s(e,t),p=f?e.node(f).order:l;(f||t===u)&&(n.forEach(i.slice(o,d+1),function(t){n.forEach(e.predecessors(t),function(n){var i=e.node(n),o=i.order;(o<a||p<o)&&!(i.dummy&&e.node(t).dummy)&&c(r,n,t)})}),o=d+1,a=p)}),i}return n.reduce(t,i),r}function o(e,t){var r={};function i(t,i,a,o,s){var l;n.forEach(n.range(i,a),function(i){l=t[i],e.node(l).dummy&&n.forEach(e.predecessors(l),function(t){var n=e.node(t);n.dummy&&(n.order<o||n.order>s)&&c(r,t,l)})})}function a(t,r){var a=-1,o,s=0;return n.forEach(r,function(n,c){if(e.node(n).dummy===`border`){var l=e.predecessors(n);l.length&&(o=e.node(l[0]).order,i(r,s,c,a,o),s=c,a=o)}i(r,s,r.length,o,t.length)}),r}return n.reduce(t,a),r}function s(e,t){if(e.node(t).dummy)return n.find(e.predecessors(t),function(t){return e.node(t).dummy})}function c(e,t,n){if(t>n){var r=t;t=n,n=r}var i=e[t];i||(e[t]=i={}),i[n]=!0}function l(e,t,r){if(t>r){var i=t;t=r,r=i}return n.has(e[t],r)}function u(e,t,r,i){var a={},o={},s={};return n.forEach(t,function(e){n.forEach(e,function(e,t){a[e]=e,o[e]=e,s[e]=t})}),n.forEach(t,function(e){var t=-1;n.forEach(e,function(e){var c=i(e);if(c.length){c=n.sortBy(c,function(e){return s[e]});for(var u=(c.length-1)/2,d=Math.floor(u),f=Math.ceil(u);d<=f;++d){var p=c[d];o[e]===e&&t<s[p]&&!l(r,e,p)&&(o[p]=e,o[e]=a[e]=a[p],t=s[p])}}})}),{root:a,align:o}}function d(e,t,r,i,a){var o={},s=f(e,t,r,a),c=a?`borderLeft`:`borderRight`;function l(e,t){for(var n=s.nodes(),r=n.pop(),i={};r;)i[r]?e(r):(i[r]=!0,n.push(r),n=n.concat(t(r))),r=n.pop()}function u(e){o[e]=s.inEdges(e).reduce(function(e,t){return Math.max(e,o[t.v]+s.edge(t))},0)}function d(t){var n=s.outEdges(t).reduce(function(e,t){return Math.min(e,o[t.w]-s.edge(t))},1/0),r=e.node(t);n!==1/0&&r.borderType!==c&&(o[t]=Math.max(o[t],n))}return l(u,s.predecessors.bind(s)),l(d,s.successors.bind(s)),n.forEach(i,function(e){o[e]=o[r[e]]}),o}function f(e,t,i,a){var o=new r,s=e.graph(),c=_(s.nodesep,s.edgesep,a);return n.forEach(t,function(t){var r;n.forEach(t,function(t){var n=i[t];if(o.setNode(n),r){var a=i[r],s=o.edge(a,n);o.setEdge(a,n,Math.max(c(e,t,r),s||0))}r=t})}),o}function p(e,t){return n.minBy(n.values(t),function(t){var r=-1/0,i=1/0;return n.forIn(t,function(t,n){var a=v(e,n)/2;r=Math.max(t+a,r),i=Math.min(t-a,i)}),r-i})}function m(e,t){var r=n.values(t),i=n.min(r),a=n.max(r);n.forEach([`u`,`d`],function(r){n.forEach([`l`,`r`],function(o){var s=r+o,c=e[s],l;if(c!==t){var u=n.values(c);l=o===`l`?i-n.min(u):a-n.max(u),l&&(e[s]=n.mapValues(c,function(e){return e+l}))}})})}function h(e,t){return n.mapValues(e.ul,function(r,i){if(t)return e[t.toLowerCase()][i];var a=n.sortBy(n.map(e,i));return(a[1]+a[2])/2})}function g(e){var t=i.buildLayerMatrix(e),r=n.merge(a(e,t),o(e,t)),s={},c;return n.forEach([`u`,`d`],function(i){c=i===`u`?t:n.values(t).reverse(),n.forEach([`l`,`r`],function(t){t===`r`&&(c=n.map(c,function(e){return n.values(e).reverse()}));var a=(i===`u`?e.predecessors:e.successors).bind(e),o=u(e,c,r,a),l=d(e,c,o.root,o.align,t===`r`);t===`r`&&(l=n.mapValues(l,function(e){return-e})),s[i+t]=l})}),m(s,p(e,s)),h(s,e.graph().align)}function _(e,t,r){return function(i,a,o){var s=i.node(a),c=i.node(o),l=0,u;if(l+=s.width/2,n.has(s,`labelpos`))switch(s.labelpos.toLowerCase()){case`l`:u=-s.width/2;break;case`r`:u=s.width/2;break}if(u&&(l+=r?u:-u),u=0,l+=(s.dummy?t:e)/2,l+=(c.dummy?t:e)/2,l+=c.width/2,n.has(c,`labelpos`))switch(c.labelpos.toLowerCase()){case`l`:u=c.width/2;break;case`r`:u=-c.width/2;break}return u&&(l+=r?u:-u),u=0,l}}function v(e,t){return e.node(t).width}})),w=s(((e,t)=>{var n=S(),r=C(),i=Ke().positionX;t.exports=a;function a(e){e=r.asNonCompoundGraph(e),o(e),n.forEach(i(e),function(t,n){e.node(n).x=t})}function o(e){var t=r.buildLayerMatrix(e),i=e.graph().ranksep,a=0;n.forEach(t,function(t){var r=n.max(n.map(t,function(t){return e.node(t).height}));n.forEach(t,function(t){e.node(t).y=a+r/2}),a+=r+i})}})),qe=s(((e,t)=>{var n=S(),r=De(),i=Oe(),a=Me(),o=C().normalizeRanks,s=Ne(),c=C().removeEmptyRanks,l=Pe(),u=Fe(),d=Ie(),f=Ge(),p=w(),m=C(),h=we().Graph;t.exports=g;function g(e,t){var n=t&&t.debugTiming?m.time:m.notime;n(`layout`,function(){var t=n(`  buildLayoutGraph`,function(){return ae(e)});n(`  runLayout`,function(){_(t,n)}),n(`  updateInputGraph`,function(){v(e,t)})})}function _(e,t){t(`    makeSpaceForEdgeLabels`,function(){oe(e)}),t(`    removeSelfEdges`,function(){he(e)}),t(`    acyclic`,function(){r.run(e)}),t(`    nestingGraph.run`,function(){l.run(e)}),t(`    rank`,function(){a(m.asNonCompoundGraph(e))}),t(`    injectEdgeLabelProxies`,function(){se(e)}),t(`    removeEmptyRanks`,function(){c(e)}),t(`    nestingGraph.cleanup`,function(){l.cleanup(e)}),t(`    normalizeRanks`,function(){o(e)}),t(`    assignRankMinMax`,function(){ce(e)}),t(`    removeEdgeLabelProxies`,function(){le(e)}),t(`    normalize.run`,function(){i.run(e)}),t(`    parentDummyChains`,function(){s(e)}),t(`    addBorderSegments`,function(){u(e)}),t(`    order`,function(){f(e)}),t(`    insertSelfEdges`,function(){ge(e)}),t(`    adjustCoordinateSystem`,function(){d.adjust(e)}),t(`    position`,function(){p(e)}),t(`    positionSelfEdges`,function(){_e(e)}),t(`    removeBorderNodes`,function(){me(e)}),t(`    normalize.undo`,function(){i.undo(e)}),t(`    fixupEdgeLabelCoords`,function(){fe(e)}),t(`    undoCoordinateSystem`,function(){d.undo(e)}),t(`    translateGraph`,function(){ue(e)}),t(`    assignNodeIntersects`,function(){de(e)}),t(`    reversePoints`,function(){pe(e)}),t(`    acyclic.undo`,function(){r.undo(e)})}function v(e,t){n.forEach(e.nodes(),function(n){var r=e.node(n),i=t.node(n);r&&(r.x=i.x,r.y=i.y,t.children(n).length&&(r.width=i.width,r.height=i.height))}),n.forEach(e.edges(),function(r){var i=e.edge(r),a=t.edge(r);i.points=a.points,n.has(a,`x`)&&(i.x=a.x,i.y=a.y)}),e.graph().width=t.graph().width,e.graph().height=t.graph().height}var y=[`nodesep`,`edgesep`,`ranksep`,`marginx`,`marginy`],b={ranksep:50,edgesep:20,nodesep:50,rankdir:`tb`},x=[`acyclicer`,`ranker`,`rankdir`,`align`],ee=[`width`,`height`],te={width:0,height:0},ne=[`minlen`,`weight`,`width`,`height`,`labeloffset`],re={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:`r`},ie=[`labelpos`];function ae(e){var t=new h({multigraph:!0,compound:!0}),r=ye(e.graph());return t.setGraph(n.merge({},b,ve(r,y),n.pick(r,x))),n.forEach(e.nodes(),function(r){var i=ye(e.node(r));t.setNode(r,n.defaults(ve(i,ee),te)),t.setParent(r,e.parent(r))}),n.forEach(e.edges(),function(r){var i=ye(e.edge(r));t.setEdge(r,n.merge({},re,ve(i,ne),n.pick(i,ie)))}),t}function oe(e){var t=e.graph();t.ranksep/=2,n.forEach(e.edges(),function(n){var r=e.edge(n);r.minlen*=2,r.labelpos.toLowerCase()!==`c`&&(t.rankdir===`TB`||t.rankdir===`BT`?r.width+=r.labeloffset:r.height+=r.labeloffset)})}function se(e){n.forEach(e.edges(),function(t){var n=e.edge(t);if(n.width&&n.height){var r=e.node(t.v),i={rank:(e.node(t.w).rank-r.rank)/2+r.rank,e:t};m.addDummyNode(e,`edge-proxy`,i,`_ep`)}})}function ce(e){var t=0;n.forEach(e.nodes(),function(r){var i=e.node(r);i.borderTop&&(i.minRank=e.node(i.borderTop).rank,i.maxRank=e.node(i.borderBottom).rank,t=n.max(t,i.maxRank))}),e.graph().maxRank=t}function le(e){n.forEach(e.nodes(),function(t){var n=e.node(t);n.dummy===`edge-proxy`&&(e.edge(n.e).labelRank=n.rank,e.removeNode(t))})}function ue(e){var t=1/0,r=0,i=1/0,a=0,o=e.graph(),s=o.marginx||0,c=o.marginy||0;function l(e){var n=e.x,o=e.y,s=e.width,c=e.height;t=Math.min(t,n-s/2),r=Math.max(r,n+s/2),i=Math.min(i,o-c/2),a=Math.max(a,o+c/2)}n.forEach(e.nodes(),function(t){l(e.node(t))}),n.forEach(e.edges(),function(t){var r=e.edge(t);n.has(r,`x`)&&l(r)}),t-=s,i-=c,n.forEach(e.nodes(),function(n){var r=e.node(n);r.x-=t,r.y-=i}),n.forEach(e.edges(),function(r){var a=e.edge(r);n.forEach(a.points,function(e){e.x-=t,e.y-=i}),n.has(a,`x`)&&(a.x-=t),n.has(a,`y`)&&(a.y-=i)}),o.width=r-t+s,o.height=a-i+c}function de(e){n.forEach(e.edges(),function(t){var n=e.edge(t),r=e.node(t.v),i=e.node(t.w),a,o;n.points?(a=n.points[0],o=n.points[n.points.length-1]):(n.points=[],a=i,o=r),n.points.unshift(m.intersectRect(r,a)),n.points.push(m.intersectRect(i,o))})}function fe(e){n.forEach(e.edges(),function(t){var r=e.edge(t);if(n.has(r,`x`))switch((r.labelpos===`l`||r.labelpos===`r`)&&(r.width-=r.labeloffset),r.labelpos){case`l`:r.x-=r.width/2+r.labeloffset;break;case`r`:r.x+=r.width/2+r.labeloffset;break}})}function pe(e){n.forEach(e.edges(),function(t){var n=e.edge(t);n.reversed&&n.points.reverse()})}function me(e){n.forEach(e.nodes(),function(t){if(e.children(t).length){var r=e.node(t),i=e.node(r.borderTop),a=e.node(r.borderBottom),o=e.node(n.last(r.borderLeft)),s=e.node(n.last(r.borderRight));r.width=Math.abs(s.x-o.x),r.height=Math.abs(a.y-i.y),r.x=o.x+r.width/2,r.y=i.y+r.height/2}}),n.forEach(e.nodes(),function(t){e.node(t).dummy===`border`&&e.removeNode(t)})}function he(e){n.forEach(e.edges(),function(t){if(t.v===t.w){var n=e.node(t.v);n.selfEdges||=[],n.selfEdges.push({e:t,label:e.edge(t)}),e.removeEdge(t)}})}function ge(e){var t=m.buildLayerMatrix(e);n.forEach(t,function(t){var r=0;n.forEach(t,function(t,i){var a=e.node(t);a.order=i+r,n.forEach(a.selfEdges,function(t){m.addDummyNode(e,`selfedge`,{width:t.label.width,height:t.label.height,rank:a.rank,order:i+ ++r,e:t.e,label:t.label},`_se`)}),delete a.selfEdges})})}function _e(e){n.forEach(e.nodes(),function(t){var n=e.node(t);if(n.dummy===`selfedge`){var r=e.node(n.e.v),i=r.x+r.width/2,a=r.y,o=n.x-i,s=r.height/2;e.setEdge(n.e,n.label),e.removeNode(t),n.label.points=[{x:i+2*o/3,y:a-s},{x:i+5*o/6,y:a-s},{x:i+o,y:a},{x:i+5*o/6,y:a+s},{x:i+2*o/3,y:a+s}],n.label.x=n.x,n.label.y=n.y}})}function ve(e,t){return n.mapValues(n.pick(e,t),Number)}function ye(e){var t={};return n.forEach(e,function(e,n){t[n.toLowerCase()]=e}),t}})),Je=s(((e,t)=>{var n=S(),r=C(),i=we().Graph;t.exports={debugOrdering:a};function a(e){var t=r.buildLayerMatrix(e),a=new i({compound:!0,multigraph:!0}).setGraph({});return n.forEach(e.nodes(),function(t){a.setNode(t,{label:t}),a.setParent(t,`layer`+e.node(t).rank)}),n.forEach(e.edges(),function(e){a.setEdge(e.v,e.w,{},e.name)}),n.forEach(t,function(e,t){var r=`layer`+t;a.setNode(r,{rank:`same`}),n.reduce(e,function(e,t){return a.setEdge(e,t,{style:`invis`}),t})}),a}})),Ye=s(((e,t)=>{t.exports=`0.8.5`})),Xe=l(s(((e,t)=>{t.exports={graphlib:we(),layout:qe(),debug:Je(),util:{time:C().time,notime:C().notime},version:Ye()}}))(),1),T={scene:{width:2e4,height:6e4,bgColor:[30,34,43,255]},grid:{size:64,color:[255,255,255,12]},node:{width:190,height:32,attrHeight:26,radius:8,border:1.5,font:`Inter, system-ui, sans-serif`,fontSize:12},attr:{font:`Inter, system-ui, sans-serif`,fontSize:11},connection:{width:2,color:[108,193,136,255]},presets:{node_default:{bg:[45,55,72,255],border:[74,85,104,255],borderSel:[108,193,136,255],text:[255,255,255,255]},node_preset_1:{bg:[108,193,136,255],border:[34,139,78,255],borderSel:[255,255,255,255],text:[255,255,255,255]},node_preset_note:{bg:[255,225,140,255],border:[200,160,60,255],borderSel:[255,255,255,255],text:[50,40,10,255]},node_preset_backdrop:{bg:[255,255,255,15],border:[90,100,120,255],borderSel:[108,193,136,255],text:[220,225,235,255]},attr_default:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_1:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_2:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_3:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]}}};function Ze(e,t=null){if(!Array.isArray(e))return`rgba(120, 120, 120, 1)`;let n=e[0]??120,r=e[1]??120,i=e[2]??120,a=(e[3]??255)/255;return t!==null&&(a=t),`rgba(${n}, ${r}, ${i}, ${a})`}function Qe(e,t){if(Array.isArray(e))return Ze(e,t);if(typeof e==`string`){if(e.startsWith(`#`)){let n=e.replace(`#`,``);return`rgba(${parseInt(n.substring(0,2),16)}, ${parseInt(n.substring(2,4),16)}, ${parseInt(n.substring(4,6),16)}, ${t})`}return e.startsWith(`rgba`)?e.replace(/,[\s\d.]+\)$/,`, ${t})`):e}return`rgba(255, 255, 255, ${t})`}function E(e){let t=T.node.border,n=T.node.radius;if(e.preset===`node_preset_backdrop`)return{width:e.metadata?.width||320,height:e.metadata?.height||220,headerHeight:28,attrHeight:0,radius:8,border:1.5};if(e.preset===`node_preset_note`)return{width:e.metadata?.width||220,height:e.metadata?.height||130,headerHeight:26,attrHeight:0,radius:6,border:1.5};let r=T.node.width,i=T.node.attrHeight,a=e.attributes.length;return{width:r,height:a>0?32+i*a+6:46,headerHeight:32,attrHeight:i,radius:n,border:t}}function $e(e,t,n,r=null){let{width:i,height:a,headerHeight:o,attrHeight:s,radius:c,border:l}=E(t),{x:u,y:d}=t.position,f=t.preset||`node_default`,p=T.presets[f]||T.presets.node_default,m=t.metadata?.custom_color||Ze(p.bg),h=n?Ze(p.borderSel):t.metadata?.custom_color||Ze(p.border),g=e=>{if(!e)return`rgba(50, 40, 10, 0.85)`;let t=parseInt(e.substring(1,3),16),n=parseInt(e.substring(3,5),16),r=parseInt(e.substring(5,7),16);return(t*299+n*587+r*114)/1e3>=128?`rgba(50, 40, 10, 0.85)`:`rgba(255, 255, 255, 0.9)`};if(t.preset===`node_preset_backdrop`){e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=Qe(t.metadata?.custom_color||`#1e222b`,.08),e.fill(),e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.clip(),e.fillStyle=Qe(t.metadata?.custom_color||`#1e222b`,.25),e.fillRect(u,d,i,o),e.fillStyle=`rgba(255, 255, 255, 0.08)`,e.fillRect(u,d+o-1,i,1),e.restore(),e.lineWidth=n?l+.5:l,e.strokeStyle=n?h:Qe(t.metadata?.custom_color||`#5a6478`,.5),e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold 12px sans-serif`,e.textAlign=`left`,e.textBaseline=`middle`,e.fillText(t.name,u+12,d+o/2),e.strokeStyle=n?h:`rgba(255, 255, 255, 0.2)`,e.lineWidth=1.5,e.beginPath(),e.moveTo(u+i-4,d+a-12),e.lineTo(u+i-12,d+a-4),e.moveTo(u+i-4,d+a-8),e.lineTo(u+i-8,d+a-4),e.stroke(),e.restore();return}if(t.preset===`node_preset_note`){e.save(),e.shadowColor=`rgba(0, 0, 0, 0.35)`,e.shadowBlur=8,e.shadowOffsetY=4,e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=m,e.fill(),e.restore(),e.lineWidth=l,e.strokeStyle=h,e.stroke();let r=g(t.metadata?.custom_color),s=g(t.metadata?.custom_color).replace(`0.85`,`1.0`).replace(`0.9`,`1.0`);e.fillStyle=s,e.font=`bold 11px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t.name,u+i/2,d+o/2),e.fillStyle=`rgba(0, 0, 0, 0.08)`,e.fillRect(u+8,d+o,i-16,1),e.textAlign=`left`,e.textBaseline=`top`;let f=(t.metadata?.process_details||`Double click to write a note...`).split(`
`),p=d+o+8,_=u+8,v=i-16,y=d+a-16,b=(t,n,r,i)=>{e.font=n;let a=r-i,o=t.split(/\s+/),s=[],c=``;for(let t of o){let n=c?c+` `+t:t;e.measureText(n).width>a&&c?(s.push(c),c=t):c=n}return c&&s.push(c),s};for(let t=0;t<f.length;t++){let n=f[t].trim();if(!n){p+=6;continue}if(e.fillStyle=r,e.font=`10px sans-serif`,n.startsWith(`#`)){let t=n.match(/^(#+)\s*(.*)/);if(t){let n=t[1].length,r=t[2],i=Math.max(9,14-n),a=`bold ${i}px sans-serif`;e.font=a,e.fillStyle=s;let o=b(r,a,v,0);for(let t of o){if(p+i+4>y)break;e.fillText(t,_,p),p+=i+4}continue}}let i=!1,a=0;if((n.startsWith(`- `)||n.startsWith(`* `))&&(i=!0,a=10,n=n.substring(2)),p+13>y)break;let o=b(n.replace(/\*\*/g,``),`10px sans-serif`,v,a);for(let t=0;t<o.length&&!(p+13>y);t++){i&&t===0&&(e.beginPath(),e.arc(_+3,p+6,2,0,Math.PI*2),e.fillStyle=r,e.fill());let s=i?a:0;if(t===0){let t=n.split(/(\*\*.*?\*\*)/g),i=_+s;e.fillStyle=r,t.forEach(t=>{if(t.startsWith(`**`)&&t.endsWith(`**`)){e.font=`bold 9.5px sans-serif`;let n=t.substring(2,t.length-2);e.fillText(n,i,p),i+=e.measureText(n).width}else e.font=`10px sans-serif`,e.fillText(t,i,p),i+=e.measureText(t).width})}else e.font=`10px sans-serif`,e.fillStyle=r,e.fillText(o[t],_+s,p);p+=13}}e.strokeStyle=n?h:g(t.metadata?.custom_color).replace(`0.85`,`0.25`).replace(`0.9`,`0.25`),e.lineWidth=1.5,e.beginPath(),e.moveTo(u+i-4,d+a-12),e.lineTo(u+i-12,d+a-4),e.moveTo(u+i-4,d+a-8),e.lineTo(u+i-8,d+a-4),e.stroke();return}e.save(),e.shadowColor=`rgba(0, 0, 0, 0.45)`,e.shadowBlur=10,e.shadowOffsetY=5,e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=`#1f242e`,e.fill(),e.restore(),e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.clip(),e.fillStyle=m,e.fillRect(u,d,i,o),e.fillStyle=`rgba(255, 255, 255, 0.12)`,e.fillRect(u,d+o-1,i,1),e.restore(),e.lineWidth=l,e.strokeStyle=h,e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold ${T.node.fontSize}px ${T.node.font||`sans-serif`}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t.name,u+i/2,d+o/2),e.textAlign=`left`,e.textBaseline=`middle`,e.font=`${T.attr.fontSize}px ${T.attr.font||`sans-serif`}`,t.attributes.forEach((n,r)=>{let a=d+o+r*s+2,c=T.presets[n.preset]||T.presets.attr_default,f=`transparent`;t.alternate&&r%2==1&&(f=`rgba(255, 255, 255, 0.02)`),f!==`transparent`&&(e.fillStyle=f,e.fillRect(u+l,a,i-l*2,s));let p=u+16,m=a+s/2;if(e.fillStyle=Ze(c.text),e.fillText(n.name,p,m),n.socket){let t=u,n=a+s/2,r=Ze(c.socket);e.beginPath(),e.arc(t,n,5,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle=`#11141a`,e.lineWidth=1.5,e.stroke()}if(n.plug){let t=u+i,n=a+s/2,r=Ze(c.plug);e.beginPath(),e.arc(t,n,5,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle=`#11141a`,e.lineWidth=1.5,e.stroke()}})}var{_:et,graphlib:tt}=de(),nt=Xe.default?.graphlib?Xe.default:Xe.default?.default||Xe.default||{};nt&&!nt.graphlib&&(nt.graphlib=typeof window<`u`&&window.graphlib?window.graphlib:tt);function rt(e,t){let n=t.nodes.get(e);if(!n||n.preset===`node_preset_backdrop`)return null;let r=null,i=1/0;for(let[e,a]of t.nodes.entries())if(a.preset===`node_preset_backdrop`){let t=a.metadata?.width||320,o=a.metadata?.height||220,s=E(n),c=n.position.x+s.width/2,l=n.position.y+s.height/2;if(c>=a.position.x&&c<=a.position.x+t&&l>=a.position.y&&l<=a.position.y+o){let n=t*o;n<i&&(i=n,r=e)}}return r}function it(e){for(let[t,n]of e.nodes.entries()){if(n.preset===`node_preset_backdrop`||n.preset===`node_preset_note`)continue;let r=n.attributes.filter(e=>e.socket),i=n.attributes.filter(e=>e.plug),a=n.attributes.filter(e=>!e.socket&&!e.plug),o=(n,r)=>{let i=0,a=0;return e.connections.forEach(o=>{if(r===`socket`&&o.targetNode===t&&o.targetAttr===n){let t=e.nodes.get(o.sourceNode);t&&(i+=t.position.y,a++)}if(r===`plug`&&o.sourceNode===t&&o.sourceAttr===n){let t=e.nodes.get(o.targetNode);t&&(i+=t.position.y,a++)}}),a>0?i/a:1/0};r.sort((e,t)=>{let n=o(e.name,`socket`),r=o(t.name,`socket`);return n===1/0&&r===1/0?0:n-r}),i.sort((e,t)=>{let n=o(e.name,`plug`),r=o(t.name,`plug`);return n===1/0&&r===1/0?0:n-r}),n.attributes=[...r,...i,...a]}}function at(e,t={}){if(e.nodes.size===0)return;let n=t.rankDir||t.rankdir||`LR`,r=t.nodesep===void 0?80:t.nodesep,i=t.ranksep===void 0?140:t.ranksep,a=new nt.graphlib.Graph({compound:!0});a.setGraph({rankdir:n,nodesep:r,ranksep:i,marginx:50,marginy:50}),a.setDefaultEdgeLabel(()=>({}));for(let[t,n]of e.nodes.entries())if(n.preset===`node_preset_backdrop`)a.setNode(t,{label:t,isGroup:!0});else{let{width:e,height:r}=E(n);a.setNode(t,{width:e,height:r})}for(let t of e.nodes.keys()){let n=rt(t,e);n&&a.setParent(t,n)}e.connections.forEach(e=>{a.setEdge(e.sourceNode,e.targetNode)});for(let[t,n]of e.nodes.entries())if(n.preset===`node_preset_note`&&n.metadata?.linked_process){let r=n.metadata.linked_process;e.nodes.has(r)&&a.setEdge(r,t,{minlen:1,weight:15})}if(nt.layout(a),t.centralNodeName&&e.nodes.has(t.centralNodeName)){let t=[];for(let[n,r]of e.nodes.entries()){if(r.preset===`node_preset_backdrop`)continue;let e=a.node(n);e&&t.push({name:n,node:r,dagreNode:e})}for(let e=0;e<20;e++){let e=!0;for(let n=0;n<t.length;n++)for(let r=n+1;r<t.length;r++){let i=t[n],a=t[r],o=i.dagreNode.width/2,s=i.dagreNode.height/2,c=a.dagreNode.width/2,l=a.dagreNode.height/2,u=o+c+70-Math.abs(i.dagreNode.x-a.dagreNode.x),d=s+l+50-Math.abs(i.dagreNode.y-a.dagreNode.y);if(u>0&&d>0)if(e=!1,u<d){let e=u/2+1;i.dagreNode.x<=a.dagreNode.x?(i.dagreNode.x-=e,a.dagreNode.x+=e):(i.dagreNode.x+=e,a.dagreNode.x-=e)}else{let e=d/2+1;i.dagreNode.y<=a.dagreNode.y?(i.dagreNode.y-=e,a.dagreNode.y+=e):(i.dagreNode.y+=e,a.dagreNode.y-=e)}}if(e)break}}let o={};for(let[t,n]of e.nodes.entries())o[t]={...n.position};let s={};for(let t of e.nodes.keys()){let n=a.node(t);if(n){let r={x:n.x-n.width/2,y:n.y-n.height/2};s[t]=r;let i=e.nodes.get(t);i&&(i.position=r,i.preset===`node_preset_backdrop`&&(i.metadata={...i.metadata,width:Math.max(160,n.width),height:Math.max(100,n.height)}))}}if(it(e),!t.animate||e.nodes.size<=1){e.emit(`node:moved`,{}),e.emit(`graph:layout_completed`,{});return}for(let[t,n]of e.nodes.entries()){let e=o[t];e&&(n.position=e)}let c=null,l=t=>{c||=t;let n=t-c,r=Math.min(1,n/300),i=r<.5?4*r*r*r:1-(-2*r+2)**3/2;for(let t of e.nodes.keys()){let n=o[t],r=s[t];if(n&&r){let a=n.x+(r.x-n.x)*i,o=n.y+(r.y-n.y)*i,s=e.nodes.get(t);s&&(s.position={x:a,y:o})}}e.emit(`node:moved`,{}),r<1?requestAnimationFrame(l):e.emit(`graph:layout_completed`,{})};requestAnimationFrame(l)}function ot(e,t){if(!e||!t)return null;let n=e.nodes.get(t);if(!n)return null;let r=new pe;if(n.preset===`node_preset_backdrop`){let{width:i,height:a}=E(n),o=n.position.x,s=n.position.y,c=[];for(let[t,r]of e.nodes.entries()){if(t===n.name)continue;let{width:e,height:l}=E(r),u=r.position.x,d=r.position.y;u>=o&&u+e<=o+i&&d>=s&&d+l<=s+a&&c.push(r)}let l=r.createNode(t,{...n.position},n.preset);l&&(l.metadata=JSON.parse(JSON.stringify(n.metadata||{})));let u=new Set(c.map(e=>e.name));for(let e of c){let t=r.createNode(e.name,{...e.position},e.preset);t&&(t.metadata=JSON.parse(JSON.stringify(e.metadata||{}))),e.attributes.forEach(t=>r.createAttribute(e.name,t))}for(let t of e.connections)u.has(t.sourceNode)&&u.has(t.targetNode)&&r.createConnection(t.sourceNode,t.sourceAttr,t.targetNode,t.targetAttr);return r}let i=e.getIsolatedData(t);if(!i)return null;let a=r.createNode(t,{x:200,y:200},n.preset);return a&&(a.metadata=JSON.parse(JSON.stringify(n.metadata||{}))),n.attributes.forEach(e=>r.createAttribute(t,e)),Object.entries(i.inputs).forEach(([n,i])=>{i.connections.forEach(([i,a])=>{if(!r.nodes.has(i)){let t=e.nodes.get(i),n=r.createNode(i,{x:50,y:100},t?.preset);n&&t&&(n.metadata=JSON.parse(JSON.stringify(t.metadata||{}))),t?.attributes.forEach(e=>r.createAttribute(i,e))}r.createConnection(i,a,t,n)})}),Object.entries(i.outputs).forEach(([n,i])=>{i.connections.forEach(([i,a])=>{if(!r.nodes.has(i)){let t=e.nodes.get(i),n=r.createNode(i,{x:400,y:100},t?.preset);n&&t&&(n.metadata=JSON.parse(JSON.stringify(t.metadata||{}))),t?.attributes.forEach(e=>r.createAttribute(i,e))}r.createConnection(t,n,i,a)})}),at(r,{animate:!1,nodesep:35,ranksep:220,centralNodeName:t}),r}function st(e,t,n,r,i){let a=T.grid.size;e.strokeStyle=Ze(T.grid.color),e.lineWidth=1/i;let o=-r.x/i,s=(t-r.x)/i,c=-r.y/i,l=(n-r.y)/i,u=Math.floor(o/a)*a,d=s+a,f=Math.floor(c/a)*a,p=l+a;e.beginPath();for(let t=u;t<d;t+=a)e.moveTo(t,c),e.lineTo(t,l);for(let t=f;t<p;t+=a)e.moveTo(o,t),e.lineTo(s,t);e.stroke()}function ct(e,t,n,r,i){let a=1-i,o=a*a,s=o*a,c=i*i,l=c*i;return{x:s*e.x+3*o*i*t.x+3*a*c*n.x+l*r.x,y:s*e.y+3*o*i*t.y+3*a*c*n.y+l*r.y}}function lt(e,t,n,r,i=null,a=!0,o=null){let s=(n.x-t.x)*.5,c=n.y-t.y,l={x:t.x+s,y:t.y},u={x:t.x+s,y:t.y+c},d=T.connection.width,f=Ze(T.connection.color,a?1:.25);if(e.save(),e.beginPath(),e.moveTo(t.x,t.y),e.bezierCurveTo(l.x,l.y,u.x,u.y,n.x,n.y),e.strokeStyle=f,e.lineWidth=d,e.stroke(),e.restore(),i){let r=.5;if(o&&o.nodes){let e=[.5,.35,.65,.25,.75,.2,.8],i=Array.from(o.nodes.values()).filter(e=>e.preset!==`node_preset_backdrop`),a=e=>{for(let t of i){let n=t.metadata?.width||190,r=t.attributes?32+t.attributes.length*26:100,i=t.position.x-18,a=t.position.x+n+18,o=t.position.y-18,s=t.position.y+r+18;if(e.x>=i&&e.x<=a&&e.y>=o&&e.y<=s)return!0}return!1};for(let i of e)if(!a(ct(t,l,u,n,i))){r=i;break}}let a=ct(t,l,u,n,r),s=Se.getImage(i);s&&s.complete?(e.save(),e.beginPath(),e.arc(a.x,a.y,42/2-4,0,Math.PI*2),e.fillStyle=`#0f172a`,e.fill(),e.drawImage(s,a.x-42/2,a.y-42/2,42,42),e.restore()):(e.save(),e.beginPath(),e.arc(a.x,a.y,16,0,Math.PI*2),e.fillStyle=`#2d3748`,e.fill(),e.strokeStyle=f,e.lineWidth=1,e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold 8px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(i.toUpperCase().substring(0,4),a.x,a.y),e.restore())}}function D(e,t){let n=Array.from(t.values()),r=n.filter(e=>e.preset!==`node_preset_backdrop`).reverse(),i=n.filter(e=>e.preset===`node_preset_backdrop`).reverse();for(let t of r){let{width:n,height:r}=E(t),{x:i,y:a}=t.position;if(e.x>=i&&e.x<=i+n&&e.y>=a&&e.y<=a+r)return t}for(let t of i){let{width:n,height:r}=E(t),{x:i,y:a}=t.position;if(e.x>=i&&e.x<=i+n&&e.y>=a&&e.y<=a+r)return t}return null}function ut(e,t,n){let{width:r,headerHeight:i,attrHeight:a,height:o}=E(e),{x:s,y:c}=e.position,l=e.attributes.findIndex(e=>e.name===t);if(l===-1)return{x:s+r/2,y:c+o/2};let u=c+i+l*a+2+a/2;return n===`socket`?{x:s,y:u}:{x:s+r,y:u}}var dt=class{constructor(e,t,n){this.canvas=e,this.ctx=e.getContext(`2d`),this.graph=t,this.onNodeClick=n,this.pan={x:0,y:0},this.zoom=1,this.selectedNodeName=null,this.isPanning=!1,this.panStart={x:0,y:0},this.isDraggingNode=!1,this.dragNode=null,this.dragStartWorld={x:0,y:0},this.dragStartNodePos={x:0,y:0},this.childNodeStarts=[],this.hasDragged=!1,this.initEvents()}setSelectedNode(e){this.selectedNodeName=e||null,this.render()}initEvents(){this.canvas.addEventListener(`mousedown`,this.handleMouseDown.bind(this)),this.canvas.addEventListener(`mousemove`,this.handleMouseMove.bind(this)),this.canvas.addEventListener(`mouseup`,this.handleMouseUp.bind(this)),this.canvas.addEventListener(`mouseleave`,this.handleMouseUp.bind(this)),this.canvas.addEventListener(`wheel`,this.handleWheel.bind(this)),this.touchState={startPos:null,lastPan:null,hasMoved:!1,pinchStartDist:null,pinchStartZoom:null,pinchMidpoint:null},this.canvas.addEventListener(`touchstart`,this.handleTouchStart.bind(this),{passive:!1}),this.canvas.addEventListener(`touchmove`,this.handleTouchMove.bind(this),{passive:!1}),this.canvas.addEventListener(`touchend`,this.handleTouchEnd.bind(this),{passive:!1})}handleTouchStart(e){let t=this.canvas.getBoundingClientRect();if(e.touches.length===1){e.preventDefault();let n=e.touches[0],r=n.clientX-t.left,i=n.clientY-t.top,a=this.screenToWorld(r,i),o=D(a,this.graph.nodes);if(o)if(this.isDraggingNode=!0,this.dragNode=o,this.dragStartWorld={...a},this.dragStartNodePos={x:o.position.x,y:o.position.y},this.hasDragged=!1,this.setSelectedNode(o.name),this.onNodeClick(o.name),o.preset===`node_preset_backdrop`){let{width:e,height:t}=E(o),n=o.position.x,r=o.position.y;this.childNodeStarts=[];for(let i of this.graph.nodes.values()){if(i.name===o.name||i.preset===`node_preset_backdrop`)continue;let{width:a,height:s}=E(i),c=i.position.x,l=i.position.y;c>=n&&c+a<=n+e&&l>=r&&l+s<=r+t&&this.childNodeStarts.push({node:i,startX:c,startY:l})}}else this.childNodeStarts=[];else this.isPanning=!0,this.panStart={x:n.clientX-this.pan.x,y:n.clientY-this.pan.y};this.touchState.startPos={x:r,y:i},this.touchState.hasMoved=!1,this.touchState.pinchStartDist=null}else if(e.touches.length===2){e.preventDefault();let n=e.touches[0],r=e.touches[1];this.touchState.pinchStartDist=Math.hypot(r.clientX-n.clientX,r.clientY-n.clientY),this.touchState.pinchStartZoom=this.zoom,this.touchState.pinchMidpoint={x:(n.clientX+r.clientX)/2-t.left,y:(n.clientY+r.clientY)/2-t.top},this.isPanning=!1,this.isDraggingNode=!1}}handleTouchMove(e){let t=this.canvas.getBoundingClientRect();if(e.touches.length===1){let n=e.touches[0],r=n.clientX-t.left,i=n.clientY-t.top,a=this.screenToWorld(r,i);if(this.isDraggingNode&&this.dragNode){e.preventDefault();let t=a.x-this.dragStartWorld.x,n=a.y-this.dragStartWorld.y;if(Math.hypot(t,n)>2&&(this.touchState.hasMoved=!0,this.hasDragged=!0),this.dragNode.position.x=this.dragStartNodePos.x+t,this.dragNode.position.y=this.dragStartNodePos.y+n,this.childNodeStarts.length>0)for(let e of this.childNodeStarts)e.node.position.x=e.startX+t,e.node.position.y=e.startY+n;this.render();return}if(this.isPanning){e.preventDefault();let t=this.touchState.startPos||{x:r,y:i};Math.hypot(r-t.x,i-t.y)>5&&(this.touchState.hasMoved=!0),this.pan={x:n.clientX-this.panStart.x,y:n.clientY-this.panStart.y},this.render()}}else if(e.touches.length===2&&this.touchState.pinchStartDist!==null){e.preventDefault();let n=e.touches[0],r=e.touches[1],i=Math.hypot(r.clientX-n.clientX,r.clientY-n.clientY)/this.touchState.pinchStartDist,a=Math.max(.1,Math.min(3,this.touchState.pinchStartZoom*i)),o={x:(n.clientX+r.clientX)/2-t.left,y:(n.clientY+r.clientY)/2-t.top},s=this.touchState.pinchMidpoint||o,c=(s.x-this.pan.x)/this.zoom,l=(s.y-this.pan.y)/this.zoom,u=o.x-s.x,d=o.y-s.y;this.zoom=a,this.pan={x:o.x-c*a+u,y:o.y-l*a+d},this.touchState.pinchMidpoint=o,this.render()}}handleTouchEnd(e){if(e.touches.length===0){if(this.isDraggingNode)this.isDraggingNode=!1,this.dragNode=null,this.childNodeStarts=[];else if(this.isPanning&&!this.touchState.hasMoved&&this.touchState.startPos){let e=D(this.screenToWorld(this.touchState.startPos.x,this.touchState.startPos.y),this.graph.nodes);e?(this.setSelectedNode(e.name),this.onNodeClick(e.name)):(this.setSelectedNode(null),this.onNodeClick(null))}this.isPanning=!1,this.touchState.startPos=null,this.touchState.hasMoved=!1,this.touchState.pinchStartDist=null,this.touchState.pinchStartZoom=null,this.touchState.pinchMidpoint=null}else e.touches.length===1&&(this.touchState.pinchStartDist=null)}screenToWorld(e,t){return{x:(e-this.pan.x)/this.zoom,y:(t-this.pan.y)/this.zoom}}handleMouseDown(e){let t=this.canvas.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=this.screenToWorld(n,r),a=D(i,this.graph.nodes);if(a)if(this.isDraggingNode=!0,this.dragNode=a,this.dragStartWorld={...i},this.dragStartNodePos={x:a.position.x,y:a.position.y},this.hasDragged=!1,this.setSelectedNode(a.name),this.onNodeClick(a.name),a.preset===`node_preset_backdrop`){let{width:e,height:t}=E(a),n=a.position.x,r=a.position.y;this.childNodeStarts=[];for(let i of this.graph.nodes.values()){if(i.name===a.name||i.preset===`node_preset_backdrop`)continue;let{width:o,height:s}=E(i),c=i.position.x,l=i.position.y;c>=n&&c+o<=n+e&&l>=r&&l+s<=r+t&&this.childNodeStarts.push({node:i,startX:c,startY:l})}}else this.childNodeStarts=[];else this.isPanning=!0,this.panStart={x:e.clientX-this.pan.x,y:e.clientY-this.pan.y}}handleMouseMove(e){let t=this.canvas.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=this.screenToWorld(n,r);if(this.isDraggingNode&&this.dragNode){let e=i.x-this.dragStartWorld.x,t=i.y-this.dragStartWorld.y;if(Math.hypot(e,t)>2&&(this.hasDragged=!0),this.dragNode.position.x=this.dragStartNodePos.x+e,this.dragNode.position.y=this.dragStartNodePos.y+t,this.childNodeStarts.length>0)for(let n of this.childNodeStarts)n.node.position.x=n.startX+e,n.node.position.y=n.startY+t;this.render();return}this.isPanning&&(this.pan={x:e.clientX-this.panStart.x,y:e.clientY-this.panStart.y},this.render())}handleMouseUp(e){if(this.isDraggingNode){this.isDraggingNode=!1,this.dragNode=null,this.childNodeStarts=[];return}if(this.isPanning){this.isPanning=!1;let t=this.canvas.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;D(this.screenToWorld(n,r),this.graph.nodes)||(this.setSelectedNode(null),this.onNodeClick(null))}}handleWheel(e){e.preventDefault();let t=this.canvas.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=this.screenToWorld(n,r),a=1.15,o=e.deltaY<0?this.zoom*a:this.zoom/a,s=Math.max(.1,Math.min(3,o));this.zoom=s,this.pan={x:n-i.x*s,y:r-i.y*s},this.render()}fitToView(){if(this.graph.nodes.size===0)return;let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of this.graph.nodes.values()){let{width:a,height:o}=E(i),{x:s,y:c}=i.position;s<e&&(e=s),s+a>t&&(t=s+a),c<n&&(n=c),c+o>r&&(r=c+o)}let i=t-e+120,a=r-n+120,o=this.canvas.width/i,s=this.canvas.height/a,c=Math.max(.15,Math.min(1.5,Math.min(o,s))),l=e+(t-e)/2,u=n+(r-n)/2;this.zoom=c,this.pan={x:this.canvas.width/2-l*c,y:this.canvas.height/2-u*c},this.render()}focusNode(e){let t=this.graph.nodes.get(e);if(!t)return;let n=1.15;this.zoom=n;let{width:r,height:i}=E(t),a=t.position.x+r/2,o=t.position.y+i/2;this.pan={x:this.canvas.width/2-a*n,y:this.canvas.height/2-o*n},this.setSelectedNode(e)}render(){let e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height),e.save(),e.translate(this.pan.x,this.pan.y),e.scale(this.zoom,this.zoom),st(e,this.canvas.width,this.canvas.height,this.pan,this.zoom),this.graph.connections.forEach(t=>{let n=this.graph.nodes.get(t.sourceNode),r=this.graph.nodes.get(t.targetNode);if(!n||!r)return;let i=ut(n,t.sourceAttr,`plug`),a=ut(r,t.targetAttr,`socket`),o=n.attributes.find(e=>e.name===t.sourceAttr);lt(e,i,a,t,o?.dataType,!0,this.graph)});let t=[],n=[];this.graph.nodes.forEach(e=>{e.preset===`node_preset_backdrop`?t.push(e):n.push(e)}),t.forEach(t=>{let n=this.selectedNodeName===t.name;$e(e,t,n)}),n.forEach(t=>{let n=this.selectedNodeName===t.name;$e(e,t,n)}),e.restore()}};function O(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ft=O();function pt(e){ft=e}var mt={exec:()=>null};function ht(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function k(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(j.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var A=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),j={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:ht(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:ht(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:ht(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:ht(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:ht(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,`i`)),blockquoteBeginRegex:ht(e=>RegExp(`^ {0,${e}}>`))},gt=/^(?:[ \t]*(?:\n|$))+/,_t=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,vt=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,yt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,bt=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,St=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ct=k(St).replace(/bull/g,xt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),wt=k(St).replace(/bull/g,xt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Tt=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Et=/^[^\n]+/,Dt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ot=k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Dt).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),kt=k(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,xt).getRegex(),At=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,jt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mt=k(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n+|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n+|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n+|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,jt).replace(`tag`,At).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nt=e=>k(Tt).replace(`hr`,yt).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,e).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,At).getRegex(),Pt=Nt(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Ft=Nt(/ {0,3}(?:[*+-]|\d{1,9}[.)])[ \t]+[^ \t\n]/),It={blockquote:k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Ft).getRegex(),code:_t,def:Ot,fences:vt,heading:bt,hr:yt,html:Mt,lheading:Ct,list:kt,newline:gt,paragraph:Pt,table:mt,text:Et},Lt=k(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,yt).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,At).getRegex(),Rt={...It,lheading:wt,table:Lt,paragraph:k(Tt).replace(`hr`,yt).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Lt).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,At).getRegex()},zt={...It,html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,jt).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(Tt).replace(`hr`,yt).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Ct).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},Bt=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Vt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ht=/^( {2,}|\\)\n(?!\s*$)/,Ut=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wt=/[\p{P}\p{S}]/u,M=/[\s\p{P}\p{S}]/u,Gt=/[^\s\p{P}\p{S}]/u,Kt=k(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,M).getRegex(),N=/(?!~)[\p{P}\p{S}]/u,P=/(?!~)[\s\p{P}\p{S}]/u,F=/(?:[^\s\p{P}\p{S}]|~)/u,qt=k(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,A?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Jt=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Yt=k(Jt,`u`).replace(/punct/g,Wt).getRegex(),Xt=k(Jt,`u`).replace(/punct/g,N).getRegex(),Zt=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Qt=k(Zt,`gu`).replace(/notPunctSpace/g,Gt).replace(/punctSpace/g,M).replace(/punct/g,Wt).getRegex(),$t=k(Zt,`gu`).replace(/notPunctSpace/g,F).replace(/punctSpace/g,P).replace(/punct/g,N).getRegex(),I=k(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Gt).replace(/punctSpace/g,M).replace(/punct/g,Wt).getRegex(),en=k(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Wt).getRegex(),tn=k(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Gt).replace(/punctSpace/g,M).replace(/punct/g,Wt).getRegex(),nn=k(/\\(punct)/,`gu`).replace(/punct/g,Wt).getRegex(),rn=k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),L=k(jt).replace(`(?:-->|$)`,`-->`).getRegex(),an=k(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,L).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),on=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,sn=k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,on).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cn=k(/^!?\[(label)\]\[(ref)\]/).replace(`label`,on).replace(`ref`,Dt).getRegex(),ln=k(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Dt).getRegex(),un=k(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,cn).replace(`nolink`,ln).getRegex(),dn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,fn={_backpedal:mt,anyPunctuation:nn,autolink:rn,blockSkip:qt,br:Ht,code:Vt,del:mt,delLDelim:mt,delRDelim:mt,emStrongLDelim:Yt,emStrongRDelimAst:Qt,emStrongRDelimUnd:I,escape:Bt,link:sn,nolink:ln,punctuation:Kt,reflink:cn,reflinkSearch:un,tag:an,text:Ut,url:mt},pn={...fn,link:k(/^!?\[(label)\]\((.*?)\)/).replace(`label`,on).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,on).getRegex()},mn={...fn,emStrongRDelimAst:$t,emStrongLDelim:Xt,delLDelim:en,delRDelim:tn,url:k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,dn).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,dn).getRegex()},hn={...mn,br:k(Ht).replace(`{2,}`,`*`).getRegex(),text:k(mn.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},gn={normal:It,gfm:Rt,pedantic:zt},_n={normal:fn,gfm:mn,breaks:hn,pedantic:pn},vn={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},R=e=>vn[e];function z(e,t){if(t){if(j.escapeTest.test(e))return e.replace(j.escapeReplace,R)}else if(j.escapeTestNoEncode.test(e))return e.replace(j.escapeReplaceNoEncode,R);return e}function yn(e){try{e=encodeURI(e).replace(j.percentDecode,`%`)}catch{return null}return e}function bn(e,t){let n=e.replace(j.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(j.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``);for(;r<n.length;r++)n[r]=n[r].trim().replace(j.slashPipe,`|`);return n}function xn(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Sn(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&j.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Cn(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function wn(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Tn(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function En(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var Dn=class{options;rules;lexer;constructor(e){this.options=e||ft}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Sn(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=En(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=xn(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:xn(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=xn(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}else if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=wn(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1;if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Sn(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:xn(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=bn(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:xn(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(bn(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:xn(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=xn(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Cn(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Tn(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Tn(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}else if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},On=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ft,this.options.tokenizer=this.options.tokenizer||new Dn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:j,block:gn.normal,inline:_n.normal};this.options.pedantic?(t.block=gn.pedantic,t.inline=_n.pedantic):this.options.gfm&&(t.block=gn.gfm,this.options.breaks?t.inline=_n.breaks:t.inline=_n.gfm),this.tokenizer.rules=t}static get rules(){return{block:gn,inline:_n}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(j.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(j.tabCharGlobal,`    `).replace(j.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!==null;)e.includes(r[0].slice(r[0].lastIndexOf(`[`)+1,-1))&&(n=n.slice(0,r.index)+`[`+`a`.repeat(r[0].length-2)+`]`+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!==null;)n=n.slice(0,r.index)+`++`+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!==null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+`[`+`a`.repeat(r[0].length-i-2)+`]`+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,o=``,s=1/0;for(;e;){if(e.length<s)s=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}a||(o=``),a=!1;let r;if(this.options.extensions?.inline?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);r.type===`text`&&n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i)){e=e.substring(r.raw.length),r.raw.slice(-1)!==`_`&&(o=r.raw.slice(-1)),a=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},kn=class{options;parser;constructor(e){this.options=e||ft}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(j.notSpaceStart)?.[0],i=e.replace(j.endingNewline,``)+`
`;return r?`<pre><code class="language-`+z(r)+`">`+(n?i:z(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:z(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${z(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=yn(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+z(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=yn(e);if(i===null)return z(n);e=i;let a=`<img src="${e}" alt="${z(n)}"`;return t&&(a+=` title="${z(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:z(e.text)}},An=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},jn=class e{options;renderer;textRenderer;constructor(e){this.options=e||ft,this.options.renderer=this.options.renderer||new kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new An}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},Mn=class{options;block;constructor(e){this.options=e||ft}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?On.lex:On.lexInline}provideParser(e=this.block){return e?jn.parse:jn.parseInline}},Nn=new class{defaults=O();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=jn;Renderer=kn;TextRenderer=An;Lexer=On;Tokenizer=Dn;Hooks=Mn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new kn(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Dn(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Mn;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];Mn.passThroughHooks.has(n)?t[r]=e=>{if(this.defaults.async&&Mn.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return On.lex(e,t??this.defaults)}parser(e,t){return jn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?On.lex:On.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?jn.parse:jn.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?On.lex:On.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?jn.parse:jn.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+z(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function B(e,t){return Nn.parse(e,t)}B.options=B.setOptions=function(e){return Nn.setOptions(e),B.defaults=Nn.defaults,pt(B.defaults),B},B.getDefaults=O,B.defaults=ft,B.use=function(...e){return Nn.use(...e),B.defaults=Nn.defaults,pt(B.defaults),B},B.walkTokens=function(e,t){return Nn.walkTokens(e,t)},B.parseInline=Nn.parseInline,B.Parser=jn,B.parser=jn.parse,B.Renderer=kn,B.TextRenderer=An,B.Lexer=On,B.lexer=On.lex,B.Tokenizer=Dn,B.Hooks=Mn,B.parse=B,B.options,B.setOptions,B.use,B.walkTokens,B.parseInline,jn.parse,On.lex;var Pn=`:host {
  display: block;
  width: 100%;
  height: 100%;
  --plumber-bg: #1a1f25;
  --plumber-bg-sidebar: #20262e;
  --plumber-border: #2d3748;
  --plumber-accent: #6cc188;
  --plumber-text: #e2e8f0;
  --plumber-text-muted: #718096;
  --plumber-font: system-ui, -apple-system, sans-serif;
}

.plumber-viewer-root {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: var(--plumber-bg);
  color: var(--plumber-text);
  font-family: var(--plumber-font);
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.plumber-canvas-container {
  flex-grow: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: grab;
}

.plumber-canvas-container:active {
  cursor: grabbing;
}

.plumber-canvas {
  display: block;
}

/* Toolbar overlay */
.plumber-toolbar {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
  background-color: rgba(32, 38, 46, 0.9);
  border: 1px solid var(--plumber-border);
  padding: 4px;
  border-radius: 6px;
  z-index: 10;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.plumber-btn {
  background: none;
  border: none;
  color: var(--plumber-text);
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms;
}

.plumber-btn:hover {
  background-color: var(--plumber-border);
}

/* Documentation panel */
.plumber-docs-panel {
  width: 280px;
  height: 100%;
  background-color: var(--plumber-bg-sidebar);
  border-left: 1px solid var(--plumber-border);
  display: flex;
  flex-direction: column;
  shrink-0: true;
  transition: transform 250ms ease-in-out;
  overflow-y: auto;
  padding: 16px;
}

.plumber-docs-panel h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--plumber-accent);
}

.plumber-docs-content {
  line-height: 1.5;
  font-size: 13px;
}

.plumber-docs-empty {
  color: var(--plumber-text-muted);
  text-align: center;
  margin-top: 40px;
}

/* Modal Isolation View overlay */
.plumber-iso-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 12, 16, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}

.plumber-iso-modal {
  width: 90%;
  height: 80%;
  background-color: var(--plumber-bg-sidebar);
  border: 1px solid var(--plumber-border);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.plumber-iso-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--plumber-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plumber-iso-title {
  font-weight: bold;
  margin: 0;
}

.plumber-iso-canvas-container {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
`;de();var Fn=class e{static create(t,n){let r=document.querySelector(t);return r?new e(r,n):(console.error(`Container not found for selector: ${t}`),null)}constructor(e,t={}){this.container=e,this.options={theme:`dark`,autoLayout:!0,fitOnLoad:!0,isolation:!0,documentation:!0,selectNode:null,...t},this.listeners=new Map,this.graph=new pe,this.selectedNodeName=null,this.initShadow(),this.initDom(),this.initCanvas(),this.options.src?this.loadFromUrl(this.options.src):this.options.data&&this.loadGraph(this.options.data)}initShadow(){this.shadow=this.container.attachShadow({mode:`open`});let e=document.createElement(`style`);e.textContent=Pn,this.shadow.appendChild(e)}initDom(){this.root=document.createElement(`div`),this.root.className=`plumber-viewer-root plumber-theme-${this.options.theme}`,this.canvasContainer=document.createElement(`div`),this.canvasContainer.className=`plumber-canvas-container`,this.canvasEl=document.createElement(`canvas`),this.canvasEl.className=`plumber-canvas`,this.canvasContainer.appendChild(this.canvasEl),this.toolbar=document.createElement(`div`),this.toolbar.className=`plumber-toolbar`;let e=document.createElement(`button`);if(e.className=`plumber-btn`,e.innerHTML=`🔍 Fit View`,e.onclick=()=>this.viewerCanvas.fitToView(),this.toolbar.appendChild(e),this.options.isolation){let e=document.createElement(`button`);e.className=`plumber-btn`,e.innerHTML=`👁️ Isolate Node`,e.onclick=()=>{this.selectedNodeName?this.showIsolation(this.selectedNodeName):alert(`Click a node first to isolate.`)},this.toolbar.appendChild(e)}this.canvasContainer.appendChild(this.toolbar),this.root.appendChild(this.canvasContainer),this.options.documentation&&(this.sidebar=document.createElement(`aside`),this.sidebar.className=`plumber-docs-panel`,this.sidebar.innerHTML=`
        <h3>Process Details</h3>
        <div class="plumber-docs-content">
          <div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>
        </div>
      `,this.root.appendChild(this.sidebar)),this.shadow.appendChild(this.root),new ResizeObserver(()=>this.resize()).observe(this.container)}initCanvas(){this.viewerCanvas=new dt(this.canvasEl,this.graph,e=>{this.handleNodeClick(e)})}resize(){let e=this.canvasContainer.clientWidth,t=this.canvasContainer.clientHeight;this.canvasEl.width=e,this.canvasEl.height=t,this.viewerCanvas&&this.viewerCanvas.render()}handleNodeClick(e){if(this.selectedNodeName=e||null,this.viewerCanvas&&this.viewerCanvas.setSelectedNode(this.selectedNodeName),this.emit(`node:click`,e),this.options.documentation&&this.sidebar){let t=this.graph.nodes.get(e),n=this.sidebar.querySelector(`.plumber-docs-content`);if(t&&n){let e=t.metadata?.process_details||`*No description provided.*`,r=t.attributes.filter(e=>e.socket).map(e=>`<li>${e.name} (<code>${e.dataType}</code>)</li>`).join(``),i=t.attributes.filter(e=>e.plug).map(e=>`<li>${e.name} (<code>${e.dataType}</code>)</li>`).join(``);n.innerHTML=`
          <h4 style="margin: 0 0 8px 0; font-size: 15px;">${t.name}</h4>
          <div style="font-size: 12px; margin-bottom: 12px;">
            ${r?`<strong>Inputs:</strong> <ul style="margin: 4px 0; padding-left: 16px;">${r}</ul>`:``}
            ${i?`<strong>Outputs:</strong> <ul style="margin: 4px 0; padding-left: 16px;">${i}</ul>`:``}
          </div>
          <div style="border-top: 1px solid var(--plumber-border); padding-top: 12px;">
            ${B.parse(e)}
          </div>
        `}}}loadGraph(e){Ce(e,this.graph)&&(this.options.autoLayout&&at(this.graph,{animate:!1}),this.resize(),this.options.selectNode&&this.selectNode(this.options.selectNode),this.options.fitOnLoad&&setTimeout(()=>this.viewerCanvas.fitToView(),50),this.emit(`graph:loaded`,e))}selectNode(e){if(e)this.handleNodeClick(e);else if(this.selectedNodeName=null,this.viewerCanvas&&this.viewerCanvas.setSelectedNode(null),this.options.documentation&&this.sidebar){let e=this.sidebar.querySelector(`.plumber-docs-content`);e&&(e.innerHTML=`<div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>`)}}async loadFromUrl(e){try{let t=await(await fetch(e)).json();this.loadGraph(t)}catch(t){console.error(`Failed to fetch graph from URL: ${e}`,t)}}focusNode(e){if(this.viewerCanvas){if(e)this.viewerCanvas.focusNode(e),this.handleNodeClick(e);else if(this.selectedNodeName=null,this.viewerCanvas.fitToView(),this.options.documentation&&this.sidebar){let e=this.sidebar.querySelector(`.plumber-docs-content`);e&&(e.innerHTML=`<div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>`)}}}showIsolation(e){let t=this.root.querySelector(`.plumber-iso-overlay`);if(t&&t.remove(),!e){this.emit(`isolation:close`,null);return}if(!this.graph.nodes.get(e)){console.warn(`Cannot isolate unknown node: ${e}`);return}let n=document.createElement(`div`);n.className=`plumber-iso-overlay`,n.innerHTML=`
      <div class="plumber-iso-modal">
        <div class="plumber-iso-header">
          <h3 class="plumber-iso-title">Isolated View: ${e}</h3>
          <button class="plumber-btn plumber-close-iso">✕ Close</button>
        </div>
        <div class="plumber-iso-canvas-container">
          <canvas class="plumber-canvas"></canvas>
        </div>
      </div>
    `,this.root.appendChild(n);let r=n.querySelector(`.plumber-close-iso`);r.onclick=()=>{n.remove(),this.emit(`isolation:close`,null)};let i=n.querySelector(`.plumber-canvas`),a=n.querySelector(`.plumber-iso-canvas-container`);i.width=a.clientWidth,i.height=a.clientHeight;let o=ot(this.graph,e);o&&new dt(i,o,()=>{}).fitToView(),this.emit(`isolation:open`,e)}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){this.listeners.has(e)&&this.listeners.get(e).delete(t)}emit(e,t){this.listeners.has(e)&&this.listeners.get(e).forEach(e=>e(t))}destroy(){this.container.innerHTML=``,this.listeners.clear()}},In=class extends HTMLElement{connectedCallback(){if(this._initialized)return;this._initialized=!0;let e=this.getAttribute(`src`),t=this.getAttribute(`theme`)||`dark`,n=this.getAttribute(`auto-layout`)!==`false`,r=this.getAttribute(`fit-on-load`)!==`false`,i=this.getAttribute(`isolation`)!==`false`,a=this.getAttribute(`documentation`)!==`false`,o=this.getAttribute(`select-node`);this.viewer=new Fn(this,{src:e,theme:t,autoLayout:n,fitOnLoad:r,isolation:i,documentation:a,selectNode:o})}disconnectedCallback(){this.viewer&&this.viewer.destroy()}selectNode(e){this.viewer&&this.viewer.selectNode(e)}focusNode(e){this.viewer&&this.viewer.focusNode(e)}showIsolation(e){this.viewer&&this.viewer.showIsolation(e)}loadGraph(e){this.viewer&&this.viewer.loadGraph(e)}loadFromUrl(e){this.viewer&&this.viewer.loadFromUrl(e)}};typeof window<`u`&&(window.PlumberViewer=Fn,typeof customElements<`u`&&!customElements.get(`plumber-viewer`)&&customElements.define(`plumber-viewer`,In)),e.PlumberViewer=Fn,e.PlumberViewerElement=In});