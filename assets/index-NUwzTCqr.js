const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MilkdownEditor-IHcWtXu_.js","assets/rolldown-runtime-aKtaBQYM.js","assets/vendor-others-DgFcSdEP.js","assets/vendor-milkdown-B6TKAjBH.js","assets/vendor-milkdown-B4vNOh4D.css","assets/vendor-react-DG8qk6YF.js","assets/MilkdownEditor-BeO449EE.css","assets/export-pdf-hW_wiH2K.js","assets/export-png-D8vey4oW.js","assets/export-svg-CtkS7fmm.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{An as t,On as n,jn as r,kn as i}from"./vendor-others-DgFcSdEP.js";import{a,c as o,i as s,o as c,s as l}from"./vendor-react-DG8qk6YF.js";import{X as u}from"./vendor-milkdown-B6TKAjBH.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var d=e(r(),1),f=e(o(),1),p=new class{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){this.listeners.has(e)&&(this.listeners.get(e).delete(t),this.listeners.get(e).size===0&&this.listeners.delete(e))}emit(e,t){if(this.listeners.has(e))for(let n of this.listeners.get(e))try{n(t)}catch(t){console.error(`Error in event listener for ${e}:`,t)}if(this.listeners.has(`*`))for(let n of this.listeners.get(`*`))try{n({event:e,payload:t})}catch(e){console.error(`Error in wildcard listener:`,e)}}},m=class{constructor(){this.nodes=new Map,this.connections=[],this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){this.listeners.has(e)&&this.listeners.get(e).delete(t)}emit(e,t){if(this.listeners.has(e))for(let n of this.listeners.get(e))n(t);p.emit(e,{graph:this,...t})}clear(){this.nodes.clear(),this.connections=[],this.emit(`graph:cleared`,{})}createNode(e,t={x:100,y:100},n=`node_preset_1`){if(this.nodes.has(e))return console.warn(`A node named "${e}" already exists.`),null;let r={name:e,position:t,preset:n,alternate:!0,attributes:[],metadata:{process_details:``}};return this.nodes.set(e,r),this.emit(`node:created`,{nodeName:e,node:r}),r}deleteNode(e){if(!this.nodes.has(e))return;this.connections=this.connections.filter(t=>{let n=t.sourceNode===e||t.targetNode===e;return n&&this.emit(`connection:deleted`,{connection:t}),!n});let t=this.nodes.get(e);this.nodes.delete(e),this.emit(`node:deleted`,{nodeName:e,node:t})}renameNode(e,t){if(!this.nodes.has(e))return!1;if(this.nodes.has(t))return console.warn(`Node named "${t}" already exists.`),!1;let n=this.nodes.get(e);return n.name=t,this.nodes.set(t,n),this.nodes.delete(e),this.connections.forEach(n=>{n.sourceNode===e&&(n.sourceNode=t),n.targetNode===e&&(n.targetNode=t)}),this.emit(`node:renamed`,{oldName:e,newName:t,node:n}),!0}moveNode(e,t){if(!this.nodes.has(e))return;let n=this.nodes.get(e);n.position=t,this.emit(`node:moved`,{nodeName:e,position:t})}updateNodeMetadata(e,t,n){if(!this.nodes.has(e))return;let r=this.nodes.get(e);r.metadata[t]=n,this.emit(`node:metadata_updated`,{nodeName:e,key:t,value:n})}createAttribute(e,t){let n=this.nodes.get(e);if(!n)return null;let{name:r,plug:i=!1,socket:a=!1,preset:o=i?`attr_preset_2`:`attr_preset_1`,dataType:s=`Unknown`,connectionIcon:c=null,connectionLabel:l=null,plugMaxConnections:u=-1,socketMaxConnections:d=1}=t;if(n.attributes.some(e=>e.name===r))return console.warn(`Attribute "${r}" already exists on node "${e}".`),null;let f={name:r,plug:i,socket:a,preset:o,dataType:s,connectionIcon:c,connectionLabel:l,plugMaxConnections:u,socketMaxConnections:d};n.attributes.push(f);let p=n.attributes.length-1;return this.emit(`attribute:created`,{nodeName:e,attribute:f,index:p}),f}deleteAttribute(e,t){let n=this.nodes.get(e);if(!n)return;let r=n.attributes.findIndex(e=>e.name===t);if(r===-1)return;this.connections=this.connections.filter(n=>{let r=n.sourceNode===e&&n.sourceAttr===t||n.targetNode===e&&n.targetAttr===t;return r&&this.emit(`connection:deleted`,{connection:n}),!r});let i=n.attributes[r];n.attributes.splice(r,1),this.emit(`attribute:deleted`,{nodeName:e,attribute:i,index:r})}editAttribute(e,t,n){let r=this.nodes.get(e);if(!r||!r.attributes[t])return;let i=r.attributes[t],a=i.name,o=n.name||a;r.attributes[t]={...i,...n},o!==a&&this.connections.forEach(t=>{t.sourceNode===e&&t.sourceAttr===a&&(t.sourceAttr=o),t.targetNode===e&&t.targetAttr===a&&(t.targetAttr=o)}),this.emit(`attribute:edited`,{nodeName:e,index:t,oldAttr:i,newAttr:r.attributes[t]})}reorderAttribute(e,t,n){let r=this.nodes.get(e);if(!r)return;let i=t+n;if(i<0||i>=r.attributes.length)return;let a=r.attributes[t];r.attributes[t]=r.attributes[i],r.attributes[i]=a,this.emit(`attribute:reordered`,{nodeName:e,fromIndex:t,toIndex:i})}createConnection(e,t,n,r){if(this.connections.some(i=>i.sourceNode===e&&i.sourceAttr===t&&i.targetNode===n&&i.targetAttr===r))return null;let i=this.nodes.get(e),a=this.nodes.get(n);if(!i||!a)return null;let o={sourceNode:e,sourceAttr:t,targetNode:n,targetAttr:r};return this.connections.push(o),this.emit(`connection:created`,{connection:o}),o}deleteConnection(e,t,n,r){let i=this.connections.length;return this.connections=this.connections.filter(i=>{let a=i.sourceNode===e&&i.sourceAttr===t&&i.targetNode===n&&i.targetAttr===r;return a&&this.emit(`connection:deleted`,{connection:i}),!a}),this.connections.length<i}evaluateGraph(){return this.connections.map(e=>[`${e.sourceNode}.${e.sourceAttr}`,`${e.targetNode}.${e.targetAttr}`])}getIsolatedData(e){let t=this.nodes.get(e);if(!t)return null;let n={node:e,inputs:{},outputs:{}},r=this.connections.filter(t=>t.sourceNode===e||t.targetNode===e);return t.attributes.forEach(t=>{if(t.socket){let i=r.filter(n=>n.targetNode===e&&n.targetAttr===t.name).map(e=>[e.sourceNode,e.sourceAttr]);n.inputs[t.name]={dataType:t.dataType,connectionIcon:t.connectionIcon,connections:i}}if(t.plug){let i=r.filter(n=>n.sourceNode===e&&n.sourceAttr===t.name).map(e=>[e.targetNode,e.targetAttr]);n.outputs[t.name]={dataType:t.dataType,connectionIcon:t.connectionIcon,connections:i}}}),n}},h=[{code:`aaf`,type:`AAF`,extensions:[`aaf`],description:`Avid Advanced Authoring Format edit decision list`,path:`/data_type_icons/aaf.svg`},{code:`alembic`,type:`Alembic`,extensions:[`abc`],description:`Alembic computer graphics interchange framework`,path:`/data_type_icons/alembic.svg`},{code:`ale`,type:`ALE`,extensions:[`ale`],description:`Avid Log Exchange metadata format`,path:`/data_type_icons/ale.svg`},{code:`atom`,type:`Atom`,extensions:[`atom`],description:`Atom parameter mapping format`,path:`/data_type_icons/atom.svg`},{code:`blend`,type:`BLEND`,extensions:[`blend`],description:`Blender project file`,path:`/data_type_icons/blend.svg`},{code:`bvh`,type:`BVH`,extensions:[`bvh`],description:`Biovision Hierarchy character animation format`,path:`/data_type_icons/bvh.svg`},{code:`csv`,type:`CSV`,extensions:[`csv`],description:`Comma-Separated Values`,path:`/data_type_icons/csv.svg`},{code:`exr`,type:`EXR`,extensions:[`exr`],description:`OpenEXR high dynamic-range image file format`,path:`/data_type_icons/exr.svg`},{code:`fbx`,type:`FBX`,extensions:[`fbx`],description:`Autodesk Filmbox interchange format`,path:`/data_type_icons/fbx.svg`},{code:`fdx`,type:`FDX`,extensions:[`fdx`],description:`Final Draft XML screenplay document`,path:`/data_type_icons/fdx.svg`},{code:`fountain`,type:`FOUNTAIN`,extensions:[`fountain`],description:`Fountain plain text screenplay markup format`,path:`/data_type_icons/fountain.svg`},{code:`gizmo`,type:`GIZMO`,extensions:[`gizmo`,`nk`],description:`Foundry Nuke Gizmo node script macro`,path:`/data_type_icons/gizmo.svg`},{code:`gltf`,type:`GLTF`,extensions:[`gltf`,`glb`],description:`GL Transmission Format`,path:`/data_type_icons/gltf.svg`},{code:`grm`,type:`GRM`,extensions:[`grm`],description:`Yeti Groom hair and fur description file`,path:`/data_type_icons/grm.svg`},{code:`gto`,type:`GTO`,extensions:[`gto`],description:`Production Kitchen Sink Computer Graphics File Format, OpenGTO`,path:`/data_type_icons/gto.svg`},{code:`hda`,type:`HDA`,extensions:[`hda`,`hdanc`,`otl`],description:`SideFX Houdini Digital Asset`,path:`/data_type_icons/hda.svg`},{code:`hdr`,type:`HDR`,extensions:[`hdr`,`pic`],description:`Radiance High Dynamic Range image format`,path:`/data_type_icons/hdr.svg`},{code:`jpg`,type:`JPG`,extensions:[`jpg`,`jpeg`],description:`Joint Photographic Experts Group image format`,path:`/data_type_icons/jpg.svg`},{code:`json`,type:`JSON`,extensions:[`json`],description:`JavaScript Object Notation`,path:`/data_type_icons/json.svg`},{code:`kiko`,type:`KIKO`,extensions:[`kiko`],description:`Kiko animation curves format`,path:`/data_type_icons/kiko.svg`},{code:`materialx`,type:`MaterialX`,extensions:[`mtlx`],description:`Open standard for transfer of rich material and look-development content`,path:`/data_type_icons/materialx.svg`},{code:`mayaascii`,type:`MAYAASCII`,extensions:[`ma`],description:`Autodesk Maya ASCII file format`,path:`/data_type_icons/mayaascii.svg`},{code:`mayabin`,type:`MAYABIN`,extensions:[`mb`],description:`Autodesk Maya Binary file format`,path:`/data_type_icons/mayabin.svg`},{code:`obj`,type:`OBJ`,extensions:[`obj`],description:`Wavefront 3D geometry definition file`,path:`/data_type_icons/obj.svg`},{code:`openvdb`,type:`OpenVDB`,extensions:[`vdb`],description:`Sparse volume data representation`,path:`/data_type_icons/openvdb.svg`},{code:`osl`,type:`OSL`,extensions:[`osl`,`oso`],description:`Open Shading Language shader specification format`,path:`/data_type_icons/osl.svg`},{code:`otio`,type:`OTIO`,extensions:[`otio`,`otioz`,`otiod`],description:`OpenTimelineIO API and interchange format`,path:`/data_type_icons/otio.svg`},{code:`partio`,type:`PARTIO`,extensions:[`ptc`,`pdg`,`bgeo`,`pda`,`partio`],description:`Disney Partio particle cache format`,path:`/data_type_icons/partio.svg`},{code:`pdf`,type:`PDF`,extensions:[`pdf`],description:`Portable Document Format`,path:`/data_type_icons/pdf.svg`},{code:`ply`,type:`PLY`,extensions:[`ply`],description:`Polygon File Format 3D mesh and point cloud`,path:`/data_type_icons/ply.svg`},{code:`psd`,type:`PSD`,extensions:[`psd`,`psb`],description:`Adobe Photoshop Document`,path:`/data_type_icons/psd.svg`},{code:`ptex`,type:`PTEX`,extensions:[`ptx`,`ptex`],description:`Per-Face Texture Mapping format`,path:`/data_type_icons/ptex.svg`},{code:`review`,type:`REVIEW`,extensions:[`mov`,`mp4`],description:`Pipeline movie review file`,path:`/data_type_icons/review.svg`},{code:`rumba`,type:`RUMBA`,extensions:[`rumba`],description:`Rumba animation tool format`,path:`/data_type_icons/rumba.svg`},{code:`screenjson`,type:`SCREENJSON`,extensions:[`screenjson`],description:`ScreenJson screenplay data format (screenjson.com)`,path:`/data_type_icons/screenjson.svg`},{code:`splat`,type:`SPLAT`,extensions:[`splat`],description:`3D Gaussian Splatting point cloud format`,path:`/data_type_icons/splat.svg`},{code:`uasset`,type:`UASSET`,extensions:[`uasset`],description:`Unreal Engine Asset binary package`,path:`/data_type_icons/uasset.svg`},{code:`umap`,type:`UMAP`,extensions:[`umap`],description:`Unreal Engine Map level package`,path:`/data_type_icons/umap.svg`},{code:`usd`,type:`USD`,extensions:[`usd`,`usda`,`usdc`,`usdz`],description:`Universal Scene Description`,path:`/data_type_icons/usd.svg`},{code:`wav`,type:`WAV`,extensions:[`wav`],description:`Waveform Audio File Format`,path:`/data_type_icons/wav.svg`},{code:`xgen`,type:`XGEN`,extensions:[`xgen`],description:`Autodesk Maya XGen description file`,path:`/data_type_icons/xgen.svg`},{code:`xml`,type:`XML`,extensions:[`xml`],description:`Extensible Markup Language`,path:`/data_type_icons/xml.svg`}];function g(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return(t>>>0).toString(16).padStart(8,`0`)}function _({code:e=`custom`,label:t=``,color:n=`#38BDF8`,logoXml:r=``}){let i=(e||`custom`).toLowerCase().replace(/[^a-z0-9-_]/g,`_`),a=(t||e||`FORMAT`).toUpperCase(),o=`7.2`,s=`0.5`;a.length<=3?(o=`9.0`,s=`0.4`):a.length===4?(o=`8.2`,s=`0.5`):a.length<=7?(o=`7.2`,s=`0.5`):(o=`6.5`,s=`0.6`);let c=(r||``).trim(),l=``;if(!c)l=`<circle cx="32" cy="25.5" r="7" fill="${n}" fill-opacity="0.25" stroke="${n}" stroke-width="1.8"/>`;else{let e=0,t=0,r=24,i=24,a=c,o=c.match(/<svg([^>]*)>(.*)<\/svg>/is);if(o){let n=o[1];a=o[2];let s=n.match(/viewBox=["']([^"']+)["']/i);if(s){let n=s[1].trim().split(/[\s,]+/).map(Number);n.length===4&&!n.some(isNaN)&&([e,t,r,i]=n)}else{let e=n.match(/width=["']([^"']+)["']/i),t=n.match(/height=["']([^"']+)["']/i);e&&t&&(r=parseFloat(e[1])||24,i=parseFloat(t[1])||24)}}else c.startsWith(`<`)||(a=`<path d="${c}"/>`);let s=r>0?r:24,u=i>0?i:24,d=Math.min(23/s,22/u),f=32-s*d/2-e*d,p=25.5-u*d/2-t*d;a=a.replace(/stroke=["']currentColor["']/gi,`stroke="${n}"`).replace(/fill=["']currentColor["']/gi,`fill="${n}"`);let m=c.includes(`stroke=`),h=m&&!c.includes(`fill="`)?`fill="none"`:``,g=m?`stroke="${n}"`:``;l=`<g transform="translate(${f.toFixed(2)}, ${p.toFixed(2)}) scale(${d.toFixed(4)})" ${h} ${g}>${a}</g>`}return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
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
</svg>`}var v=`plumber:custom-types`;function y(e){if(!e)return``;if(e.startsWith(`data:image/svg+xml;base64,`))return e;if(e.startsWith(`data:image/svg+xml`))try{let t=decodeURIComponent(e.split(`,`)[1]||``);if(t)return`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`}catch{}return`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(e)))}`}var b=new class{constructor(){this.customTypes=[],this.load()}load(){try{let e=localStorage.getItem(v);if(e){let t=JSON.parse(e);Array.isArray(t)?this.customTypes=t.map(e=>{let t=e.iconPath||``;return t.startsWith(`data:image/svg+xml`)?t.startsWith(`data:image/svg+xml;utf8,`)&&(t=y(t)):t=y(e.icon||_({code:e.code||`custom`,label:(e.code||`CUSTOM`).toUpperCase(),color:`#10B981`})),{...e,code:(e.code||``).toLowerCase(),extensions:Array.isArray(e.extensions)?e.extensions:[],iconPath:t}}):this.customTypes=[]}else this.customTypes=[]}catch(e){console.warn(`Recovering from invalid custom data types in localStorage:`,e),this.customTypes=[]}}save(){try{localStorage.setItem(v,JSON.stringify(this.customTypes))}catch(e){console.error(`Failed to save custom data types to localStorage:`,e)}}getTypes(){return this.customTypes}getType(e){return e?this.customTypes.find(t=>t.code.toLowerCase()===e.toLowerCase()):null}addType(e){let{code:t,type:n,extensions:r=[],description:i=``,icon:a=``,iconPath:o=``}=e,s=t.toLowerCase(),c=Array.isArray(r)?r:[],l=y(o||a||_({code:s,label:s.toUpperCase(),color:`#38BDF8`})),u=`sha256:${g(`${s}:${n}:${c.join(`,`)}:${l}`)}`,d=this.customTypes.findIndex(e=>e.code.toLowerCase()===s),f={code:s,type:n,extensions:c,description:i,icon:a,iconPath:l,hash:u};return d===-1?this.customTypes.push(f):this.customTypes[d]=f,this.save(),u}removeType(e){let t=e?.toLowerCase();t&&(this.customTypes=this.customTypes.filter(e=>e.code.toLowerCase()!==t),this.save())}importTypes(e){let t={added:0,skipped:0,conflicts:0};return Array.isArray(e)&&e.forEach(e=>{if(!e.code||!e.type){t.skipped++;return}let n=e.code.toLowerCase(),r=this.getType(n);r?r.hash===e.hash?t.skipped++:(this.addType(e),t.conflicts++):(this.addType(e),t.added++)}),t}};function x(e){if(!e)return``;if(e.startsWith(`data:`)||e.startsWith(`http:`)||e.startsWith(`https:`))return e;let t=e.startsWith(`/`)?e.slice(1):e,n=`/PlumberManager/`;return n.endsWith(`/`)?`${n}${t}`:`${n}/${t}`}var S={aaf:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
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
</svg>`},C=new class{constructor(){this.types=new Map,this.extensionMap=new Map,this.imageCaches=new Map,this.dataUrlCaches=new Map,this.svgTextCaches=new Map,this.inlineIcons=S||null,this.initialized=!1,this.onLoadedListeners=new Set,this.registerDefaults(),this.inlineIcons&&this.registerInlineIcons(this.inlineIcons)}registerInlineIcons(e){this.inlineIcons=e;for(let[t,n]of Object.entries(e)){let e=t.toLowerCase();if(this.svgTextCaches.has(e))continue;this.svgTextCaches.set(e,n);let r=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(n)))}`;this.dataUrlCaches.set(e,r);let i=new Image;i.src=r,i.onload=()=>{this.imageCaches.set(e,i),this.notifyLoaded()}}}resolveCode(e){if(!e)return``;let t=e.toLowerCase();return this.extensionMap.get(t)||t}registerDefaults(){h.forEach(e=>{let t=e.code.toLowerCase(),n={code:e.code,type:e.type,extensions:e.extensions||[],description:e.description||``,iconPath:x(`/data_type_icons/${e.code}.svg`),isCustom:!1};this.types.set(t,n),Array.isArray(e.extensions)&&e.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),t)})}),b.getTypes().forEach(e=>{let t=e.code.toLowerCase(),n=e.iconPath||``,r={code:e.code,type:e.type,extensions:e.extensions||[],description:e.description||``,iconPath:n,isCustom:!0,hash:e.hash};this.types.set(t,r),Array.isArray(e.extensions)&&e.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),t)}),n&&this.loadImage(t,n)})}async initialize(){this.initialized||(this.initialized=!0,await this.preloadImages())}getAllTypes(){return Array.from(this.types.values()).sort((e,t)=>e.code.localeCompare(t.code))}getType(e){if(!e)return null;let t=this.resolveCode(e);return this.types.get(t)||null}async preloadImages(){let e=[];for(let[t,n]of this.types.entries())n.iconPath&&e.push(this.loadImage(t,n.iconPath));await Promise.all(e),this.notifyLoaded()}loadImage(e,t){let n=this.resolveCode(e);return!n||!t?Promise.resolve(null):new Promise(e=>{if(this.imageCaches.has(n)&&this.dataUrlCaches.has(n)){e(this.imageCaches.get(n));return}if(t.startsWith(`data:`)){this.dataUrlCaches.set(n,t);try{if(t.includes(`base64,`)){let e=t.split(`base64,`)[1]||``,r=atob(e);r&&r.includes(`<svg`)&&this.svgTextCaches.set(n,r)}else{let e=decodeURIComponent(t.split(`,`)[1]||``);e&&e.includes(`<svg`)&&this.svgTextCaches.set(n,e)}}catch{}let r=new Image;r.src=t,r.onload=()=>{this.imageCaches.set(n,r),this.notifyLoaded(),e(r)},r.onerror=t=>{console.warn(`Failed to load Data URI image for custom type ${n}:`,t),e(null)};return}let r=typeof window<`u`&&window.location&&window.location.protocol===`file:`,i=t.startsWith(`http://`)||t.startsWith(`https://`);if(!(!r&&(i||t.startsWith(`/`)))){this._applyVectorFallback(n,e);return}fetch(t).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.text()}).then(r=>{this.svgTextCaches.set(n,r);let i=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(r)))}`;this.dataUrlCaches.set(n,i);let a=new Image;a.src=i,a.onload=()=>{this.imageCaches.set(n,a),this.notifyLoaded(),e(a)},a.onerror=()=>{let r=new Image;r.src=t,r.onload=()=>{this.imageCaches.set(n,r),this.notifyLoaded(),e(r)},r.onerror=()=>e(null)}}).catch(()=>{this._applyVectorFallback(n,e)})})}_applyVectorFallback(e,t){let n=(this.inlineIcons?this.inlineIcons[e]:null)||_({code:e,label:e.toUpperCase(),color:`#38BDF8`});this.svgTextCaches.set(e,n);let r=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(n)))}`;this.dataUrlCaches.set(e,r);let i=new Image;i.src=r,i.onload=()=>{this.imageCaches.set(e,i),this.notifyLoaded(),t(i)},i.onerror=()=>t(null)}getImage(e){if(!e)return null;let t=this.resolveCode(e);if(this.imageCaches.has(t))return this.imageCaches.get(t);let n=this.types.get(t);return n&&n.iconPath&&this.loadImage(t,n.iconPath),null}getDataUrl(e){if(!e)return null;let t=this.resolveCode(e);return this.dataUrlCaches.get(t)||null}getSvgText(e){if(!e)return null;let t=this.resolveCode(e);return this.svgTextCaches.get(t)||null}onLoaded(e){return this.onLoadedListeners.add(e),()=>this.onLoadedListeners.delete(e)}notifyLoaded(){this.onLoadedListeners.forEach(e=>{try{e()}catch{}})}acceptsConnection(e,t){return!e||!t?!1:this.resolveCode(e)===this.resolveCode(t)}addCustomType(e){let t=b.addType(e),n=b.getType(e.code),r=this.resolveCode(e.code),i=n?.iconPath||e.iconPath||``,a={code:n?.code||e.code,type:n?.type||e.type,extensions:n?.extensions||e.extensions||[],description:n?.description||e.description||``,iconPath:i,isCustom:!0,hash:t};return this.types.set(r,a),Array.isArray(a.extensions)&&a.extensions.forEach(e=>{this.extensionMap.set(e.toLowerCase(),r)}),i&&this.loadImage(r,i),t}removeCustomType(e){let t=this.resolveCode(e);if(t){for(let[e,n]of this.extensionMap.entries())n===t&&this.extensionMap.delete(e);b.removeType(t),this.types.delete(t),this.imageCaches.delete(t),this.dataUrlCaches.delete(t),this.svgTextCaches.delete(t)}}},w=l(),T=(0,d.createContext)(null);function E({children:e}){let[t]=(0,d.useState)(()=>new m),[n,r]=(0,d.useState)([]),[i,a]=(0,d.useState)(0);return(0,d.useEffect)(()=>{let e=()=>a(e=>e+1);C.initialize();let n=C.onLoaded(e),r=t.on(`node:created`,e),i=t.on(`node:deleted`,e),o=t.on(`node:renamed`,e),s=t.on(`node:moved`,e),c=t.on(`node:metadata_updated`,e),l=t.on(`attribute:created`,e),u=t.on(`attribute:deleted`,e),d=t.on(`attribute:edited`,e),f=t.on(`attribute:reordered`,e),p=t.on(`connection:created`,e),m=t.on(`connection:deleted`,e),h=t.on(`graph:cleared`,e);return()=>{n(),r(),i(),o(),s(),c(),l(),u(),d(),f(),p(),m(),h()}},[t]),(0,w.jsx)(T.Provider,{value:{graph:t,selection:n,setSelection:r,updateTrigger:i},children:e})}function D(){let e=(0,d.useContext)(T);if(!e)throw Error(`useGraph must be used within a GraphProvider`);return e}function O({children:e,variant:t=`secondary`,size:n=`md`,icon:r,onClick:i,disabled:a=!1,className:o=``,title:s,type:c=`button`,...l}){return(0,w.jsxs)(`button`,{type:c,className:`ds-button ds-button--${t} ds-button--${n} ${o}`,onClick:i,disabled:a,title:s,...l,children:[r&&(0,w.jsx)(`span`,{className:`ds-button__icon`,children:r}),e&&(0,w.jsx)(`span`,{className:`ds-button__text`,children:e})]})}function k({icon:e,variant:t=`ghost`,size:n=`md`,onClick:r,disabled:i=!1,className:a=``,title:o,...s}){return(0,w.jsx)(O,{variant:t,size:n,onClick:r,disabled:i,className:`ds-button--icon-only ${a}`,title:o,icon:e,...s})}function A({label:e,value:t,onChange:n,onKeyDown:r,onBlur:i,placeholder:a,disabled:o=!1,readOnly:s=!1,error:c,className:l=``,inline:u=!1,autoFocus:d=!1,onEnter:f,...p}){let m={type:`text`,className:`ds-text-input ${c?`ds-text-input--error`:``} ${s?`ds-text-input--readonly`:``}`,onKeyDown:e=>{e.key===`Enter`&&f&&f(e),r&&r(e)},onBlur:i,placeholder:a,disabled:o,readOnly:s,autoFocus:d,...p};return t!==void 0&&(m.value=t,m.onChange=n),(0,w.jsxs)(`div`,{className:`ds-input-group ${u?`ds-input-group--inline`:``} ${l}`,children:[e&&(0,w.jsx)(`label`,{className:`ds-input-label`,children:e}),(0,w.jsxs)(`div`,{className:`ds-input-container`,children:[(0,w.jsx)(`input`,{...m}),c&&(0,w.jsx)(`span`,{className:`ds-input-error-msg`,children:c})]})]})}function j({label:e,value:t,onChange:n,options:r=[],disabled:i=!1,className:a=``,inline:o=!1,...s}){return(0,w.jsxs)(`div`,{className:`ds-select-group ${o?`ds-select-group--inline`:``} ${a}`,children:[e&&(0,w.jsx)(`label`,{className:`ds-select-label`,children:e}),(0,w.jsxs)(`div`,{className:`ds-select-container`,children:[(0,w.jsx)(`select`,{className:`ds-select`,value:t,onChange:n,disabled:i,...s,children:r.map(e=>{let t=typeof e==`object`?e.value:e;return(0,w.jsx)(`option`,{value:t,className:`ds-select-option`,children:typeof e==`object`?e.label:e},t)})}),(0,w.jsx)(`span`,{className:`ds-select-arrow`,children:`▼`})]})]})}function M({isOpen:e,title:t,children:n,onClose:r,actions:i,size:a=`md`,className:o=``,...s}){return(0,d.useEffect)(()=>{let t=e=>{e.key===`Escape`&&r&&r()};return e&&window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`keydown`,t)}},[e,r]),e?(0,w.jsx)(`div`,{className:`ds-modal-backdrop`,onClick:r,children:(0,w.jsxs)(`div`,{className:`ds-modal ds-modal--${a} ${o}`,onClick:e=>e.stopPropagation(),role:`dialog`,"aria-modal":`true`,...s,children:[(0,w.jsxs)(`div`,{className:`ds-modal__header`,children:[(0,w.jsx)(`h2`,{className:`ds-modal__title`,children:t}),r&&(0,w.jsx)(k,{icon:`✕`,size:`sm`,onClick:r,title:`Close Dialog`,className:`ds-modal__close-btn`})]}),(0,w.jsx)(`div`,{className:`ds-modal__content ds-scroll-area`,children:n}),i&&(0,w.jsx)(`div`,{className:`ds-modal__footer`,children:i})]})}):null}function N({title:e,children:t,collapsible:n=!1,initExpanded:r=!0,className:i=``,headerActions:a,...o}){let[s,c]=(0,d.useState)(r);return(0,w.jsxs)(`div`,{className:`ds-panel ${s?`ds-panel--expanded`:`ds-panel--collapsed`} ${i}`,...o,children:[(0,w.jsxs)(`div`,{className:`ds-panel__header`,onClick:()=>n&&c(!s),children:[(0,w.jsxs)(`div`,{className:`ds-panel__header-left`,children:[n&&(0,w.jsx)(`span`,{className:`ds-panel__chevron ${s?`ds-panel__chevron--expanded`:``}`,children:`▼`}),(0,w.jsx)(`h3`,{className:`ds-panel__title`,children:e})]}),(a||n)&&(0,w.jsx)(`div`,{className:`ds-panel__header-right`,onClick:e=>e.stopPropagation(),children:a})]}),s&&(0,w.jsx)(`div`,{className:`ds-panel__content ds-scroll-area`,children:t})]})}function P({vertical:e=!1,className:t=``,...n}){return(0,w.jsx)(`hr`,{className:`ds-divider ${e?`ds-divider--vertical`:`ds-divider--horizontal`} ${t}`,...n})}function F({children:e,variant:t=`secondary`,className:n=``,...r}){return(0,w.jsx)(`span`,{className:`ds-badge ds-badge--${t} ${n}`,...r,children:e})}function I({children:e,className:t=``,...n}){return(0,w.jsx)(`kbd`,{className:`ds-kbd ${t}`,...n,children:e})}function ee({children:e,className:t=``,style:n={},...r}){return(0,w.jsx)(`div`,{className:`ds-scroll-area overflow-auto ${t}`,style:{maxHeight:`100%`,maxWidth:`100%`,...n},...r,children:e})}function te({message:e,type:t=`secondary`,onClose:n,duration:r=3e3}){return(0,d.useEffect)(()=>{if(r>0&&n){let e=setTimeout(()=>{n()},r);return()=>clearTimeout(e)}},[r,n]),(0,w.jsxs)(`div`,{className:`ds-toast ds-toast--${t}`,role:`alert`,children:[(0,w.jsx)(`span`,{className:`ds-toast__icon`,children:(()=>{switch(t){case`primary`:return`💾`;case`accent`:return`⚡`;case`error`:case`danger`:return`⚠️`;default:return`ℹ️`}})()}),(0,w.jsx)(`span`,{className:`ds-toast__message`,children:e}),n&&(0,w.jsx)(`button`,{className:`ds-toast__close`,onClick:n,"aria-label":`Close notification`,children:`✕`})]})}function ne({onCreateNode:e,onAutoLayout:t,onIsolateSelected:n,onToggleMinimap:r,minimapEnabled:i,undoEnabled:a,redoEnabled:o,onUndo:s,onRedo:c}){let{selection:l}=D();return(0,w.jsx)(`div`,{className:`ds-toolbar flex items-center justify-between px-4 py-2 border-b shrink-0`,"data-tour":`toolbar`,children:(0,w.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,w.jsx)(O,{variant:`primary`,size:`sm`,onClick:e,icon:`＋`,children:`Create Process`}),(0,w.jsx)(O,{variant:`secondary`,size:`sm`,onClick:t,icon:`⚡`,children:`Auto Layout Graph`}),(0,w.jsx)(O,{variant:`secondary`,size:`sm`,onClick:n,disabled:l.length!==1,icon:`🔍`,children:`Isolate Selected`}),(0,w.jsx)(P,{vertical:!0}),(0,w.jsx)(k,{icon:`↶`,size:`sm`,onClick:s,disabled:!a,title:`Undo (Ctrl+Z)`}),(0,w.jsx)(k,{icon:`↷`,size:`sm`,onClick:c,disabled:!o,title:`Redo (Ctrl+Shift+Z)`}),(0,w.jsx)(P,{vertical:!0}),(0,w.jsx)(k,{icon:`🗺️`,size:`sm`,onClick:r,className:i?`ds-button--active`:``,title:`Toggle Minimap`})]})})}function L(e){let t={NODES:{},CONNECTIONS:[],CUSTOM_TYPES:[]};for(let[n,r]of e.nodes.entries()){let e=r.attributes.map(e=>({name:e.name,plug:e.plug,socket:e.socket,preset:e.preset,dataType:e.dataType,connectionIcon:e.connectionIcon,connectionLabel:e.connectionLabel,plugMaxConnections:e.plugMaxConnections,socketMaxConnections:e.socketMaxConnections}));t.NODES[n]={preset:r.preset||`node_preset_1`,position:[r.position.x,r.position.y],alternate:r.alternate===void 0||r.alternate,attributes:e,metadata:r.metadata||{process_details:``}}}return t.CONNECTIONS=e.connections.map(e=>[`${e.sourceNode}.${e.sourceAttr}`,`${e.targetNode}.${e.targetAttr}`]),t.CUSTOM_TYPES=C.getAllTypes().filter(e=>e.isCustom).map(e=>({code:e.code,type:e.type,description:e.description,iconPath:e.iconPath,hash:e.hash})),JSON.stringify(t,null,4)}function R(e,t){try{let n=typeof e==`string`?JSON.parse(e):e;if(t.clear(),!n||typeof n!=`object`)throw Error(`Invalid graph file format.`);n.CUSTOM_TYPES&&Array.isArray(n.CUSTOM_TYPES)&&n.CUSTOM_TYPES.forEach(e=>{C.addCustomType(e)});let r=n.NODES||{};for(let[e,n]of Object.entries(r)){let r=n.position||[100,100],i={x:r[0],y:r[1]},a=n.preset||`node_preset_1`,o=t.createNode(e,i,a);o&&(o.alternate=n.alternate===void 0||n.alternate,o.metadata=n.metadata||{process_details:``},(n.attributes||[]).forEach(n=>{let r=n.dataType||`Unknown`;if(typeof r==`string`&&r.includes(`<class '`)){let e=r.match(/<class '__main__\.(\w+)'>/);if(e&&e[1])r=e[1].toLowerCase();else{let e=r.match(/'([^']+)'/);if(e&&e[1]){let t=e[1].split(`.`);r=t[t.length-1].toLowerCase()}}}else typeof r==`string`&&(r=r.toLowerCase());t.createAttribute(e,{name:n.name,plug:n.plug===void 0||n.plug,socket:n.socket===void 0||n.socket,preset:n.preset||(n.plug?`attr_preset_2`:`attr_preset_1`),dataType:r,connectionIcon:n.connectionIcon||null,connectionLabel:n.connectionLabel||null,plugMaxConnections:n.plugMaxConnections===void 0?-1:n.plugMaxConnections,socketMaxConnections:n.socketMaxConnections===void 0?1:n.socketMaxConnections})}))}return(n.CONNECTIONS||[]).forEach(e=>{let n=e[0],r=e[1];if(n&&r){let[e,i]=n.split(`.`),[a,o]=r.split(`.`);e&&i&&a&&o&&t.createConnection(e,i,a,o)}}),t.emit(`node:moved`,{}),t.emit(`graph:loaded`,{}),!0}catch(e){return console.error(`Failed to parse graph JSON:`,e),!1}}var z=class{constructor(e,t=``){this.graphModel=e,this.label=t,this.beforeState=L(e),this.afterState=null}saveAfter(){this.afterState=L(this.graphModel)}do(){this.afterState&&R(this.afterState,this.graphModel)}undo(){this.beforeState&&R(this.beforeState,this.graphModel)}},B=new class{constructor(){this.undoStack=[],this.redoStack=[],this.maxSize=50}execute(e){e instanceof z&&!e.afterState&&e.saveAfter(),this.undoStack.push(e),this.undoStack.length>this.maxSize&&this.undoStack.shift(),this.redoStack=[]}undo(){if(this.undoStack.length===0)return;let e=this.undoStack.pop();e.undo(),this.redoStack.push(e)}redo(){if(this.redoStack.length===0)return;let e=this.redoStack.pop();e.do(),this.undoStack.push(e)}canUndo(){return this.undoStack.length>0}canRedo(){return this.redoStack.length>0}clear(){this.undoStack=[],this.redoStack=[]}};function re(){let{graph:e,updateTrigger:t}=D(),[n,r]=(0,d.useState)(!1),[i,a]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{r(B.canUndo()),a(B.canRedo())},[t]),{executeAction:(t,n=``)=>{let r=new z(e,n);t(),r.saveAfter(),B.execute(r)},undo:()=>{B.undo()},redo:()=>{B.redo()},canUndo:n,canRedo:i,clearHistory:()=>{B.clear()}}}function V({value:e,onChange:t,options:n}){let[r,i]=(0,d.useState)(!1),[a,o]=(0,d.useState)(``),[s,c]=(0,d.useState)(0),l=(0,d.useRef)(null),u=(0,d.useRef)(null),f=(0,d.useRef)(null),p=d.useMemo(()=>[...n].sort((e,t)=>e.value.localeCompare(t.value)),[n]),m=d.useMemo(()=>{if(!a.trim())return p;let e=a.toLowerCase().trim();return p.filter(t=>{let n=C.getType(t.value),r=t.value.toLowerCase().includes(e),i=(n?.type||t.label||``).toLowerCase().includes(e),a=(n?.description||``).toLowerCase().includes(e),o=(n?.extensions||[]).some(t=>t.toLowerCase().includes(e));return r||i||a||o})},[p,a]);(0,d.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&i(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]),(0,d.useEffect)(()=>{r&&(o(``),c(0),setTimeout(()=>{u.current&&u.current.focus()},30))},[r]),(0,d.useEffect)(()=>{c(0)},[a]);let h=e=>{t({target:{value:e}}),i(!1)};return(0,w.jsxs)(`div`,{ref:l,className:`ds-format-select-container`,onKeyDown:e=>{if(!r){(e.key===`Enter`||e.key===`ArrowDown`||e.key===` `)&&(e.preventDefault(),i(!0));return}e.key===`ArrowDown`?(e.preventDefault(),c(e=>e<m.length-1?e+1:e)):e.key===`ArrowUp`?(e.preventDefault(),c(e=>e>0?e-1:0)):e.key===`Enter`?(e.preventDefault(),m.length>0&&m[s]&&h(m[s].value)):e.key===`Escape`&&(e.preventDefault(),i(!1))},children:[(0,w.jsxs)(`button`,{type:`button`,className:`ds-format-select-trigger`,onClick:()=>i(!r),"aria-expanded":r,children:[(0,w.jsx)(`img`,{src:C.getType(e)?.iconPath||C.getDataUrl(e)||x(`/data_type_icons/${e}.svg`),alt:``,className:`ds-format-select-icon`,onError:e=>{e.target.style.display=`none`}}),(0,w.jsx)(`span`,{className:`ds-format-select-label`,children:e}),(0,w.jsx)(`span`,{className:`ds-format-select-arrow`,children:r?`▲`:`▼`})]}),r&&(0,w.jsxs)(`div`,{className:`ds-format-select-dropdown`,children:[(0,w.jsx)(`div`,{className:`ds-format-select-search-wrap`,children:(0,w.jsx)(`input`,{ref:u,type:`text`,className:`ds-format-select-search-input`,placeholder:`Search format, name, desc...`,value:a,onChange:e=>o(e.target.value),onClick:e=>e.stopPropagation()})}),(0,w.jsx)(`div`,{ref:f,className:`ds-format-select-options-list ds-scroll-area`,children:m.length===0?(0,w.jsx)(`div`,{className:`ds-format-select-empty`,children:`No matching format found`}):m.map((t,n)=>{let r=C.getType(t.value),i=r?.isCustom??!1,a=r?.description||``,o=r?.type||t.label,l=r?.iconPath||C.getDataUrl(t.value)||x(`/data_type_icons/${t.value}.svg`);return(0,w.jsxs)(`div`,{className:`ds-format-select-option ${t.value===e?`ds-format-select-option--selected`:``} ${n===s?`ds-format-select-option--highlighted`:``}`,onClick:()=>h(t.value),onMouseEnter:()=>c(n),children:[(0,w.jsx)(`img`,{src:l,alt:``,className:`ds-format-select-option-icon`,onError:e=>{e.target.style.display=`none`}}),(0,w.jsxs)(`div`,{className:`ds-format-select-option-info`,children:[(0,w.jsxs)(`div`,{className:`ds-format-select-option-header`,children:[(0,w.jsx)(`span`,{className:`ds-format-select-option-code`,children:t.value.toUpperCase()}),(0,w.jsx)(`span`,{className:`ds-format-select-option-name`,children:o})]}),a&&(0,w.jsx)(`span`,{className:`ds-format-select-option-desc`,children:a})]}),(0,w.jsx)(`span`,{className:`ds-format-select-option-badge ${i?`ds-format-select-option-badge--custom`:``}`,children:i?`Custom`:`Built-in`})]},t.value)})})]})]})}function H({node:e,type:t=`input`,onRenameAttribute:n,onDataTypeChange:r,onReorderAttribute:i,onDeleteAttribute:a}){let[o,s]=(0,d.useState)([]);(0,d.useEffect)(()=>{let e=C.getAllTypes().map(e=>({value:e.code,label:e.type}));s(e)},[]);let c=e.attributes.filter(e=>t===`input`?e.socket:e.plug);return c.length===0?(0,w.jsxs)(`div`,{className:`text-center text-xs text-muted py-3 border border-dashed rounded`,children:[`No `,t,`s created yet.`]}):(0,w.jsx)(`div`,{className:`ds-slot-list-container`,children:c.map((t,s)=>{let l=e.attributes.findIndex(e=>e.name===t.name);return(0,w.jsxs)(`div`,{className:`ds-slot-row`,children:[(0,w.jsx)(`div`,{className:`ds-slot-name-field`,children:(0,w.jsx)(A,{defaultValue:t.name,placeholder:`Slot name`,onEnter:e=>n(l,e.target.value),onBlur:e=>n(l,e.target.value)})}),(0,w.jsx)(`div`,{className:`ds-slot-type-select`,children:(0,w.jsx)(V,{value:t.dataType,options:o,onChange:e=>r(l,e.target.value)})}),(0,w.jsxs)(`div`,{className:`ds-slot-actions`,children:[(0,w.jsx)(k,{icon:`▲`,size:`sm`,onClick:()=>i(l,-1),disabled:s===0,title:`Move Up`}),(0,w.jsx)(k,{icon:`▼`,size:`sm`,onClick:()=>i(l,1),disabled:s===c.length-1,title:`Move Down`}),(0,w.jsx)(k,{icon:`✕`,size:`sm`,onClick:()=>a(t.name),className:`text-error`,title:`Delete Attribute`})]})]},t.name)})})}function ie({isOpen:e,onClose:t,nodeName:n,attrName:r,oldType:i,newType:a,affectedConnections:o=[],onCascade:s,onDisconnect:c}){return e?(0,w.jsx)(M,{isOpen:e,title:`Data Type Mismatch Detected`,onClose:t,actions:(0,w.jsxs)(`div`,{className:`ds-mismatch-actions`,children:[(0,w.jsx)(O,{variant:`ghost`,onClick:t,children:`Cancel`}),(0,w.jsx)(O,{variant:`secondary`,onClick:c,children:`Disconnect Incompatible`}),(0,w.jsx)(O,{variant:`primary`,onClick:s,children:`Cascade & Update Connected Slots`})]}),size:`md`,children:(0,w.jsxs)(`div`,{className:`ds-mismatch-body`,children:[(0,w.jsxs)(`p`,{className:`ds-mismatch-description`,children:[`Changing `,(0,w.jsxs)(`strong`,{children:[n,` ➔ `,r]}),` from`,` `,(0,w.jsx)(`span`,{className:`ds-mismatch-badge ds-mismatch-badge--old`,children:i.toUpperCase()}),` to`,` `,(0,w.jsx)(`span`,{className:`ds-mismatch-badge ds-mismatch-badge--new`,children:a.toUpperCase()}),` `,`affects `,(0,w.jsx)(`strong`,{children:o.length}),` active connection`,o.length>1?`s`:``,`:`]}),(0,w.jsx)(`div`,{className:`ds-mismatch-list ds-scroll-area`,children:o.map((e,t)=>(0,w.jsxs)(`div`,{className:`ds-mismatch-row`,children:[(0,w.jsxs)(`div`,{className:`ds-mismatch-endpoint`,children:[(0,w.jsx)(`img`,{src:x(`/data_type_icons/${e.sourceType.toLowerCase()}.svg`),alt:``,className:`ds-mismatch-icon`,onError:e=>{e.target.style.display=`none`}}),(0,w.jsx)(`span`,{className:`ds-mismatch-node-name`,children:e.sourceNode}),(0,w.jsxs)(`span`,{className:`ds-mismatch-attr-name`,children:[`.`,e.sourceAttr]})]}),(0,w.jsx)(`div`,{className:`ds-mismatch-flow-arrow`,children:`➔`}),(0,w.jsxs)(`div`,{className:`ds-mismatch-endpoint`,children:[(0,w.jsx)(`img`,{src:x(`/data_type_icons/${e.targetType.toLowerCase()}.svg`),alt:``,className:`ds-mismatch-icon`,onError:e=>{e.target.style.display=`none`}}),(0,w.jsx)(`span`,{className:`ds-mismatch-node-name`,children:e.targetNode}),(0,w.jsxs)(`span`,{className:`ds-mismatch-attr-name`,children:[`.`,e.targetAttr]})]})]},t))}),(0,w.jsx)(`div`,{className:`ds-mismatch-callout`,children:(0,w.jsxs)(`p`,{children:[`Choose `,(0,w.jsx)(`strong`,{children:`Cascade & Update`}),` to update all connected slot types to `,a.toUpperCase(),` in lockstep, or `,(0,w.jsx)(`strong`,{children:`Disconnect Incompatible`}),` to break mismatched connections.`]})})]})}):null}var U=(0,d.lazy)(()=>u(()=>import(`./MilkdownEditor-IHcWtXu_.js`).then(e=>({default:e.MilkdownEditor})),__vite__mapDeps([0,1,2,3,4,5,6])));function ae({nodeName:e,onNameChange:t,onCreateInput:n,onCreateOutput:r,onExpandDetails:i,activeTab:a,onTabChange:o}){let{graph:s}=D(),{executeAction:c}=re(),l=s.nodes.get(e),[u,f]=(0,d.useState)(``),[p,m]=(0,d.useState)(``),[h,g]=(0,d.useState)(``),[_,v]=(0,d.useState)(`properties`),[y,b]=(0,d.useState)(null),x=a??_,S=e=>{v(e),o&&o(e)},C=(0,d.useRef)(``),T=(0,d.useRef)(null);if((0,d.useEffect)(()=>{l&&(f(l.name),m(l.metadata?.process_details||``),g(l.metadata?.custom_color||``))},[e,l]),!l)return(0,w.jsxs)(`div`,{className:`text-center text-muted py-8 text-sm`,children:[`No selection.`,(0,w.jsx)(`br`,{}),`Select a node to inspect and edit.`]});let E=()=>{u&&u!==l.name&&c(()=>{s.renameNode(l.name,u.trim())||f(l.name)},`Rename Node`)},k=e=>{m(e),l.metadata={...l.metadata,process_details:e},s.emit(`node:moved`,{})},j=()=>{C.current=p},M=()=>{if(p!==C.current){let e=p;l.metadata={...l.metadata,process_details:C.current},c(()=>{l.metadata={...l.metadata,process_details:e},s.emit(`node:moved`,{})},`Edit Documentation`)}},F=(e,t)=>{t&&c(()=>{s.editAttribute(l.name,e,{name:t})},`Rename Slot Attribute`)},I=(e,t)=>{let n=l.attributes[e];if(!n||n.dataType?.toLowerCase()===t?.toLowerCase())return;let r=s.connections.filter(e=>e.sourceNode===l.name&&e.sourceAttr===n.name||e.targetNode===l.name&&e.targetAttr===n.name).map(e=>{let t=e.sourceNode===l.name,r=t?e.targetNode:e.sourceNode,i=t?e.targetAttr:e.sourceAttr,a=s.nodes.get(r)?.attributes.find(e=>e.name===i);return{sourceNode:e.sourceNode,sourceAttr:e.sourceAttr,sourceType:(e.sourceNode===l.name?n.dataType:a?.dataType)||`unknown`,targetNode:e.targetNode,targetAttr:e.targetAttr,targetType:(e.targetNode===l.name?n.dataType:a?.dataType)||`unknown`,oppNodeName:r,oppAttrName:i,oppAttr:a}}).filter(e=>e.oppAttr&&e.oppAttr.dataType.toLowerCase()!==t.toLowerCase());if(r.length===0){c(()=>{s.editAttribute(l.name,e,{dataType:t}),s.emit(`node:moved`,{})},`Change Connection Type`);return}b({nodeName:l.name,attrIndex:e,attrName:n.name,oldType:n.dataType,newType:t,affectedConnections:r})},te=()=>{if(!y)return;let{nodeName:e,attrIndex:t,attrName:n,newType:r}=y;c(()=>{s.editAttribute(e,t,{dataType:r});let i=[{nodeName:e,attrName:n}],a=new Set([`${e}:${n}`]);for(;i.length>0;){let e=i.shift(),t=s.connections.filter(t=>t.sourceNode===e.nodeName&&t.sourceAttr===e.attrName||t.targetNode===e.nodeName&&t.targetAttr===e.attrName);for(let n of t){let t=n.sourceNode===e.nodeName?n.targetNode:n.sourceNode,r=n.sourceNode===e.nodeName?n.targetAttr:n.sourceAttr,o=`${t}:${r}`;a.has(o)||(a.add(o),i.push({nodeName:t,attrName:r}))}}a.forEach(e=>{let[t,n]=e.split(`:`),i=s.nodes.get(t);if(i){let e=i.attributes.findIndex(e=>e.name===n);e!==-1&&s.editAttribute(t,e,{dataType:r})}}),s.emit(`node:moved`,{})},`Cascade Data Type Change`),b(null)},ne=()=>{if(!y)return;let{nodeName:e,attrIndex:t,newType:n,affectedConnections:r}=y;c(()=>{s.editAttribute(e,t,{dataType:n}),r.forEach(e=>{s.deleteConnection(e.sourceNode,e.sourceAttr,e.targetNode,e.targetAttr)}),s.emit(`node:moved`,{})},`Change Type & Disconnect Incompatible`),b(null)},L=(e,t)=>{c(()=>{s.reorderAttribute(l.name,e,t)},`Reorder Attributes`)},R=e=>{c(()=>{s.deleteAttribute(l.name,e)},`Delete Slot Attribute`)},z=e=>{c(()=>{g(e),l.metadata={...l.metadata,custom_color:e},s.emit(`node:moved`,{})},`Change Node Color`)},B=[{hex:``,label:`Default`,border:`rgba(255,255,255,0.1)`},{hex:`#6cc188`,label:`Green`,border:`#4ca76a`},{hex:`#2f855a`,label:`Dark Green`,border:`#22543d`},{hex:`#4a90e2`,label:`Blue`,border:`#2a74c7`},{hex:`#3182ce`,label:`Light Blue`,border:`#2b6cb0`},{hex:`#319795`,label:`Teal`,border:`#234e52`},{hex:`#00b5d8`,label:`Cyan`,border:`#008b8b`},{hex:`#9013fe`,label:`Purple`,border:`#740bc7`},{hex:`#d53f8c`,label:`Pink`,border:`#97266d`},{hex:`#e28b4a`,label:`Orange`,border:`#c36f2f`},{hex:`#f5a623`,label:`Yellow`,border:`#d58c14`},{hex:`#d0021b`,label:`Red`,border:`#b00010`},{hex:`#4a4a4a`,label:`Grey`,border:`#333333`}],V=h&&!B.some(e=>e.hex===h),ae=l.preset===`node_preset_note`,oe=l.preset===`node_preset_backdrop`,W=[{value:``,label:`None (Unlinked)`},...Array.from(s.nodes.values()).filter(e=>e.preset!==`node_preset_note`&&e.preset!==`node_preset_backdrop`).map(e=>({value:e.name,label:e.name}))];return(0,w.jsxs)(`div`,{className:`ds-properties-panel flex flex-col h-full`,children:[(0,w.jsxs)(`div`,{className:`ds-tab-bar`,children:[(0,w.jsx)(`button`,{type:`button`,className:`ds-tab ${x===`properties`?`ds-tab--active`:``}`,onClick:()=>S(`properties`),"data-tour":`sidebar-properties-tab`,children:`Properties`}),(0,w.jsx)(`button`,{type:`button`,className:`ds-tab ${x===`details`?`ds-tab--active`:``}`,onClick:()=>S(`details`),"data-tour":`sidebar-details-tab`,children:ae?`Note Content`:oe?`Group Details`:`Details`})]}),x===`properties`?(0,w.jsx)(ee,{className:`h-full`,children:(0,w.jsxs)(`div`,{className:`ds-tab-content flex flex-col gap-4 p-4`,children:[(0,w.jsx)(A,{label:oe?`Group Title`:ae?`Note Title`:`Process Name`,value:u,onChange:e=>{let n=e.target.value;f(n),t&&t(n)},onBlur:E,onEnter:E}),(0,w.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Node Highlight Color`}),(0,w.jsxs)(`div`,{className:`flex items-center gap-2 flex-wrap`,children:[B.map(e=>(0,w.jsx)(`button`,{type:`button`,className:`ds-color-badge ${h===e.hex?`ds-color-badge--active`:``}`,style:{width:`22px`,height:`22px`,borderRadius:`50%`,backgroundColor:e.hex||`#1a202c`,border:`2px solid ${h===e.hex?`var(--ds-text-primary)`:e.border}`,cursor:`pointer`,padding:0},title:e.label,onClick:()=>z(e.hex)},e.label)),(0,w.jsxs)(`div`,{style:{position:`relative`,width:`22px`,height:`22px`},children:[(0,w.jsx)(`button`,{type:`button`,className:`ds-color-badge ${V?`ds-color-badge--active`:``}`,style:{width:`22px`,height:`22px`,borderRadius:`50%`,background:`linear-gradient(45deg, red, orange, yellow, green, blue, purple)`,border:`2px solid ${V?`var(--ds-text-primary)`:`rgba(255,255,255,0.15)`}`,cursor:`pointer`,padding:0},title:`Custom Color`,onClick:()=>T.current?.click()}),(0,w.jsx)(`input`,{ref:T,type:`color`,value:V?h:`#6cc188`,onChange:e=>z(e.target.value),style:{position:`absolute`,top:0,left:0,width:0,height:0,opacity:0,pointerEvents:`none`}})]})]})]}),oe&&(0,w.jsxs)(`div`,{className:`text-center text-xs text-muted py-6 border border-dashed rounded mt-4`,children:[`Drag nodes inside backdrop to group.`,(0,w.jsx)(`br`,{}),`Resize from the bottom-right corner.`]}),ae&&(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)(`div`,{className:`flex flex-col gap-1 mt-2`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Linked Process Node`}),(0,w.jsx)(`select`,{value:l.metadata?.linked_process||``,onChange:e=>{let t=e.target.value;c(()=>{l.metadata={...l.metadata,linked_process:t},s.emit(`node:moved`,{})},`Link Note to Process`)},className:`ds-select p-2 rounded border bg-sidebar text-sm text-primary`,style:{width:`100%`,height:`34px`,backgroundColor:`var(--ds-bg-sidebar)`,borderColor:`var(--ds-border-color)`,color:`var(--ds-text-primary)`,outline:`none`},children:W.map(e=>(0,w.jsx)(`option`,{value:e.value,children:e.label},e.value))})]})}),!ae&&!oe&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`flex gap-2`,children:[(0,w.jsx)(O,{variant:`secondary`,size:`sm`,className:`flex-1`,onClick:n,children:`Create Input`}),(0,w.jsx)(O,{variant:`secondary`,size:`sm`,className:`flex-1`,onClick:r,children:`Create Output`})]}),(0,w.jsx)(P,{}),(0,w.jsx)(N,{title:`Inputs`,collapsible:!0,children:(0,w.jsx)(H,{node:l,type:`input`,onRenameAttribute:F,onDataTypeChange:I,onReorderAttribute:L,onDeleteAttribute:R})}),(0,w.jsx)(N,{title:`Outputs`,collapsible:!0,children:(0,w.jsx)(H,{node:l,type:`output`,onRenameAttribute:F,onDataTypeChange:I,onReorderAttribute:L,onDeleteAttribute:R})}),(0,w.jsx)(P,{}),(0,w.jsx)(A,{label:`Coordinates`,value:`${Math.round(l.position.x)}, ${Math.round(l.position.y)}`,readOnly:!0})]})]})}):(0,w.jsxs)(`div`,{className:`ds-tab-content ds-tab-content--details flex flex-col gap-2 p-4 flex-1 min-h-0`,children:[(0,w.jsxs)(`div`,{className:`flex items-center justify-between flex-shrink-0`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:ae?`Note Description`:oe?`Group Details`:`Process Details`}),(0,w.jsx)(`div`,{className:`flex items-center gap-2`,children:(0,w.jsx)(`button`,{type:`button`,className:`text-xs text-accent hover:underline`,onClick:i,title:`Expand details markdown editor`,"data-tour":`markdown-doc`,children:`↗️ Expand`})})]}),(0,w.jsx)(d.Suspense,{fallback:(0,w.jsx)(`div`,{style:{padding:`20px`,fontSize:`13px`,color:`var(--ds-text-secondary)`},children:`Loading WYSIWYG Editor...`}),children:(0,w.jsx)(U,{defaultValue:l.metadata?.process_details||``,onChange:k,onFocus:j,onBlur:M,className:`ds-milkdown-inline`},e)})]}),y&&(0,w.jsx)(ie,{isOpen:!!y,onClose:()=>b(null),nodeName:y.nodeName,attrName:y.attrName,oldType:y.oldType,newType:y.newType,affectedConnections:y.affectedConnections,onCascade:te,onDisconnect:ne})]})}function oe({onCreateNode:e,onOpenFile:t,onLoadSample:n,recentFiles:r=[],onOpenRecent:i,onStartTour:a}){return(0,w.jsx)(`div`,{className:`ds-welcome-screen p-8 absolute inset-0 z-10`,children:(0,w.jsxs)(`div`,{className:`ds-welcome-container`,children:[(0,w.jsxs)(`div`,{className:`ds-welcome-logo flex flex-col items-center gap-2`,children:[(0,w.jsx)(`img`,{src:x(`/favicon.svg`),alt:`PlumberManager`,style:{width:`80px`,height:`80px`,objectFit:`contain`,marginBottom:`8px`}}),(0,w.jsx)(`h1`,{className:`text-xl font-bold`,children:`Welcome to Plumber Manager`}),(0,w.jsx)(`p`,{className:`text-sm text-secondary`,children:`Design CG Pipeline interactive diagrams and structure your data flow documentation.`})]}),(0,w.jsxs)(`div`,{className:`flex flex-col gap-3 w-full max-w-xs mt-2`,children:[(0,w.jsx)(O,{variant:`primary`,onClick:e,className:`w-full`,children:`Create Process Node`}),(0,w.jsx)(O,{variant:`secondary`,onClick:t,className:`w-full`,children:`Open Graph File (.gph)`}),a&&(0,w.jsx)(O,{variant:`secondary`,onClick:a,className:`w-full`,"data-tour":`take-tour`,children:`🚀 Take Feature Tour`}),(0,w.jsxs)(`div`,{className:`ds-welcome-samples flex flex-col gap-1 mt-2`,children:[(0,w.jsx)(`span`,{className:`text-xs text-muted font-semibold text-left mb-1`,children:`Load Samples:`}),(0,w.jsxs)(`div`,{className:`flex gap-2`,children:[(0,w.jsx)(O,{size:`sm`,onClick:()=>n(`minimal`),className:`flex-1`,children:`Minimal`}),(0,w.jsx)(O,{size:`sm`,onClick:()=>n(`test`),className:`flex-1`,children:`Test`}),(0,w.jsx)(O,{size:`sm`,onClick:()=>n(`animation`),className:`flex-1`,children:`Animation`})]})]})]}),r.length>0&&(0,w.jsxs)(`div`,{className:`ds-recent-files w-full border-t border-color pt-6 text-left`,children:[(0,w.jsx)(`h4`,{className:`text-xs text-muted font-bold uppercase letter-spacing mb-2`,children:`Recent Files`}),(0,w.jsx)(`div`,{className:`flex flex-col gap-2`,children:r.map(e=>(0,w.jsxs)(`button`,{onClick:()=>i(e),className:`ds-recent-file-item flex justify-between p-2 rounded hover:bg-hover transition-colors text-left`,children:[(0,w.jsx)(`span`,{className:`text-sm font-medium text-primary`,children:e.name}),(0,w.jsx)(`span`,{className:`text-xs text-muted`,children:new Date(e.lastOpened).toLocaleDateString()})]},e.name))})]})]})})}var W={scene:{width:2e4,height:6e4,bgColor:[30,34,43,255]},grid:{size:64,color:[255,255,255,12]},node:{width:190,height:32,attrHeight:26,radius:8,border:1.5,font:`Inter, system-ui, sans-serif`,fontSize:12},attr:{font:`Inter, system-ui, sans-serif`,fontSize:11},connection:{width:2,color:[108,193,136,255]},presets:{node_default:{bg:[45,55,72,255],border:[74,85,104,255],borderSel:[108,193,136,255],text:[255,255,255,255]},node_preset_1:{bg:[108,193,136,255],border:[34,139,78,255],borderSel:[255,255,255,255],text:[255,255,255,255]},node_preset_note:{bg:[255,225,140,255],border:[200,160,60,255],borderSel:[255,255,255,255],text:[50,40,10,255]},node_preset_backdrop:{bg:[255,255,255,15],border:[90,100,120,255],borderSel:[108,193,136,255],text:[220,225,235,255]},attr_default:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_1:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_2:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]},attr_preset_3:{bg:[32,38,46,255],text:[226,232,240,255],plug:[108,193,136,255],socket:[108,193,136,255]}}};function G(e,t=null){if(!Array.isArray(e))return`rgba(120, 120, 120, 1)`;let n=e[0]??120,r=e[1]??120,i=e[2]??120,a=(e[3]??255)/255;return t!==null&&(a=t),`rgba(${n}, ${r}, ${i}, ${a})`}function K(e,t){if(Array.isArray(e))return G(e,t);if(typeof e==`string`){if(e.startsWith(`#`)){let n=e.replace(`#`,``);return`rgba(${parseInt(n.substring(0,2),16)}, ${parseInt(n.substring(2,4),16)}, ${parseInt(n.substring(4,6),16)}, ${t})`}return e.startsWith(`rgba`)?e.replace(/,[\s\d.]+\)$/,`, ${t})`):e}return`rgba(255, 255, 255, ${t})`}function se(e,t,n,r,i){let a=W.grid.size;e.strokeStyle=G(W.grid.color),e.lineWidth=1/i;let o=-r.x/i,s=(t-r.x)/i,c=-r.y/i,l=(n-r.y)/i,u=Math.floor(o/a)*a,d=s+a,f=Math.floor(c/a)*a,p=l+a;e.beginPath();for(let t=u;t<d;t+=a)e.moveTo(t,c),e.lineTo(t,l);for(let t=f;t<p;t+=a)e.moveTo(o,t),e.lineTo(s,t);e.stroke()}function q(e){let t=W.node.border,n=W.node.radius;if(e.preset===`node_preset_backdrop`)return{width:e.metadata?.width||320,height:e.metadata?.height||220,headerHeight:28,attrHeight:0,radius:8,border:1.5};if(e.preset===`node_preset_note`)return{width:e.metadata?.width||220,height:e.metadata?.height||130,headerHeight:26,attrHeight:0,radius:6,border:1.5};let r=W.node.width,i=W.node.attrHeight,a=e.attributes.length;return{width:r,height:a>0?32+i*a+6:46,headerHeight:32,attrHeight:i,radius:n,border:t}}function ce(e,t,n,r=null){let{width:i,height:a,headerHeight:o,attrHeight:s,radius:c,border:l}=q(t),{x:u,y:d}=t.position,f=t.preset||`node_default`,p=W.presets[f]||W.presets.node_default,m=t.metadata?.custom_color||G(p.bg),h=n?G(p.borderSel):t.metadata?.custom_color||G(p.border),g=e=>{if(!e)return`rgba(50, 40, 10, 0.85)`;let t=parseInt(e.substring(1,3),16),n=parseInt(e.substring(3,5),16),r=parseInt(e.substring(5,7),16);return(t*299+n*587+r*114)/1e3>=128?`rgba(50, 40, 10, 0.85)`:`rgba(255, 255, 255, 0.9)`};if(t.preset===`node_preset_backdrop`){e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=K(t.metadata?.custom_color||`#1e222b`,.08),e.fill(),e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.clip(),e.fillStyle=K(t.metadata?.custom_color||`#1e222b`,.25),e.fillRect(u,d,i,o),e.fillStyle=`rgba(255, 255, 255, 0.08)`,e.fillRect(u,d+o-1,i,1),e.restore(),e.lineWidth=n?l+.5:l,e.strokeStyle=n?h:K(t.metadata?.custom_color||`#5a6478`,.5),e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold 12px sans-serif`,e.textAlign=`left`,e.textBaseline=`middle`,e.fillText(t.name,u+12,d+o/2),e.strokeStyle=n?h:`rgba(255, 255, 255, 0.2)`,e.lineWidth=1.5,e.beginPath(),e.moveTo(u+i-4,d+a-12),e.lineTo(u+i-12,d+a-4),e.moveTo(u+i-4,d+a-8),e.lineTo(u+i-8,d+a-4),e.stroke(),e.restore();return}if(t.preset===`node_preset_note`){e.save(),e.shadowColor=`rgba(0, 0, 0, 0.35)`,e.shadowBlur=8,e.shadowOffsetY=4,e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=m,e.fill(),e.restore(),e.lineWidth=l,e.strokeStyle=h,e.stroke();let r=g(t.metadata?.custom_color),s=g(t.metadata?.custom_color).replace(`0.85`,`1.0`).replace(`0.9`,`1.0`);e.fillStyle=s,e.font=`bold 11px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t.name,u+i/2,d+o/2),e.fillStyle=`rgba(0, 0, 0, 0.08)`,e.fillRect(u+8,d+o,i-16,1),e.textAlign=`left`,e.textBaseline=`top`;let f=(t.metadata?.process_details||`Double click to write a note...`).split(`
`),p=d+o+8,_=u+8,v=i-16,y=d+a-16,b=(t,n,r,i)=>{e.font=n;let a=r-i,o=t.split(/\s+/),s=[],c=``;for(let t of o){let n=c?c+` `+t:t;e.measureText(n).width>a&&c?(s.push(c),c=t):c=n}return c&&s.push(c),s};for(let t=0;t<f.length;t++){let n=f[t].trim();if(!n){p+=6;continue}if(e.fillStyle=r,e.font=`10px sans-serif`,n.startsWith(`#`)){let t=n.match(/^(#+)\s*(.*)/);if(t){let n=t[1].length,r=t[2],i=Math.max(9,14-n),a=`bold ${i}px sans-serif`;e.font=a,e.fillStyle=s;let o=b(r,a,v,0);for(let t of o){if(p+i+4>y)break;e.fillText(t,_,p),p+=i+4}continue}}let i=!1,a=0;if((n.startsWith(`- `)||n.startsWith(`* `))&&(i=!0,a=10,n=n.substring(2)),p+13>y)break;let o=b(n.replace(/\*\*/g,``),`10px sans-serif`,v,a);for(let t=0;t<o.length&&!(p+13>y);t++){i&&t===0&&(e.beginPath(),e.arc(_+3,p+6,2,0,Math.PI*2),e.fillStyle=r,e.fill());let s=i?a:0;if(t===0){let t=n.split(/(\*\*.*?\*\*)/g),i=_+s;e.fillStyle=r,t.forEach(t=>{if(t.startsWith(`**`)&&t.endsWith(`**`)){e.font=`bold 9.5px sans-serif`;let n=t.substring(2,t.length-2);e.fillText(n,i,p),i+=e.measureText(n).width}else e.font=`10px sans-serif`,e.fillText(t,i,p),i+=e.measureText(t).width})}else e.font=`10px sans-serif`,e.fillStyle=r,e.fillText(o[t],_+s,p);p+=13}}e.strokeStyle=n?h:g(t.metadata?.custom_color).replace(`0.85`,`0.25`).replace(`0.9`,`0.25`),e.lineWidth=1.5,e.beginPath(),e.moveTo(u+i-4,d+a-12),e.lineTo(u+i-12,d+a-4),e.moveTo(u+i-4,d+a-8),e.lineTo(u+i-8,d+a-4),e.stroke();return}e.save(),e.shadowColor=`rgba(0, 0, 0, 0.45)`,e.shadowBlur=10,e.shadowOffsetY=5,e.beginPath(),e.roundRect(u,d,i,a,c),e.fillStyle=`#1f242e`,e.fill(),e.restore(),e.save(),e.beginPath(),e.roundRect(u,d,i,a,c),e.clip(),e.fillStyle=m,e.fillRect(u,d,i,o),e.fillStyle=`rgba(255, 255, 255, 0.12)`,e.fillRect(u,d+o-1,i,1),e.restore(),e.lineWidth=l,e.strokeStyle=h,e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold ${W.node.fontSize}px ${W.node.font||`sans-serif`}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t.name,u+i/2,d+o/2),e.textAlign=`left`,e.textBaseline=`middle`,e.font=`${W.attr.fontSize}px ${W.attr.font||`sans-serif`}`,t.attributes.forEach((n,r)=>{let a=d+o+r*s+2,c=W.presets[n.preset]||W.presets.attr_default,f=`transparent`;t.alternate&&r%2==1&&(f=`rgba(255, 255, 255, 0.02)`),f!==`transparent`&&(e.fillStyle=f,e.fillRect(u+l,a,i-l*2,s));let p=u+16,m=a+s/2;if(e.fillStyle=G(c.text),e.fillText(n.name,p,m),n.socket){let t=u,n=a+s/2,r=G(c.socket);e.beginPath(),e.arc(t,n,5,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle=`#11141a`,e.lineWidth=1.5,e.stroke()}if(n.plug){let t=u+i,n=a+s/2,r=G(c.plug);e.beginPath(),e.arc(t,n,5,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle=`#11141a`,e.lineWidth=1.5,e.stroke()}})}function J(e,t,n,r,i){let a=1-i,o=a*a,s=o*a,c=i*i,l=c*i;return{x:s*e.x+3*o*i*t.x+3*a*c*n.x+l*r.x,y:s*e.y+3*o*i*t.y+3*a*c*n.y+l*r.y}}function Y(e,t,n,r,i=null,a=!0,o=null){let s=(n.x-t.x)*.5,c=n.y-t.y,l={x:t.x+s,y:t.y},u={x:t.x+s,y:t.y+c},d=W.connection.width,f=G(W.connection.color,a?1:.25);if(e.save(),e.beginPath(),e.moveTo(t.x,t.y),e.bezierCurveTo(l.x,l.y,u.x,u.y,n.x,n.y),e.strokeStyle=f,e.lineWidth=d,e.stroke(),e.restore(),i){let r=.5;if(o&&o.nodes){let e=[.5,.35,.65,.25,.75,.2,.8],i=Array.from(o.nodes.values()).filter(e=>e.preset!==`node_preset_backdrop`),a=e=>{for(let t of i){let n=t.metadata?.width||190,r=t.attributes?32+t.attributes.length*26:100,i=t.position.x-18,a=t.position.x+n+18,o=t.position.y-18,s=t.position.y+r+18;if(e.x>=i&&e.x<=a&&e.y>=o&&e.y<=s)return!0}return!1};for(let i of e)if(!a(J(t,l,u,n,i))){r=i;break}}let a=J(t,l,u,n,r),s=C.getImage(i);s&&s.complete?(e.save(),e.beginPath(),e.arc(a.x,a.y,42/2-4,0,Math.PI*2),e.fillStyle=`#0f172a`,e.fill(),e.drawImage(s,a.x-42/2,a.y-42/2,42,42),e.restore()):(e.save(),e.beginPath(),e.arc(a.x,a.y,16,0,Math.PI*2),e.fillStyle=`#2d3748`,e.fill(),e.strokeStyle=f,e.lineWidth=1,e.stroke(),e.fillStyle=`#ffffff`,e.font=`bold 8px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(i.toUpperCase().substring(0,4),a.x,a.y),e.restore())}}function X(e,t){let n=Array.from(t.values()),r=n.filter(e=>e.preset!==`node_preset_backdrop`).reverse(),i=n.filter(e=>e.preset===`node_preset_backdrop`).reverse();for(let t of r){let{width:n,height:r}=q(t),{x:i,y:a}=t.position;if(e.x>=i&&e.x<=i+n&&e.y>=a&&e.y<=a+r)return t}for(let t of i){let{width:n,height:r}=q(t),{x:i,y:a}=t.position;if(e.x>=i&&e.x<=i+n&&e.y>=a&&e.y<=a+r)return t}return null}function Z(e,t){let{width:n,headerHeight:r,attrHeight:i}=q(t),{x:a,y:o}=t.position;for(let s=0;s<t.attributes.length;s++){let c=t.attributes[s],l=o+r+s*i+2+i/2;if(c.socket){let n=a;if(Math.hypot(e.x-n,e.y-l)<=17)return{nodeName:t.name,attributeName:c.name,type:`socket`,index:s,dataType:c.dataType}}if(c.plug){let r=a+n;if(Math.hypot(e.x-r,e.y-l)<=17)return{nodeName:t.name,attributeName:c.name,type:`plug`,index:s,dataType:c.dataType}}}return null}function Q(e,t,n){let{width:r,headerHeight:i,attrHeight:a,height:o}=q(e),{x:s,y:c}=e.position,l=e.attributes.findIndex(e=>e.name===t);if(l===-1)return{x:s+r/2,y:c+o/2};let u=c+i+l*a+2+a/2;return n===`socket`?{x:s,y:u}:{x:s+r,y:u}}function le(e,t,n){for(let r=0;r<t.length;r++){let i=t[r],a=n.get(i.sourceNode),o=n.get(i.targetNode);if(!a||!o)continue;let s=Q(a,i.sourceAttr,`plug`),c=Q(o,i.targetAttr,`socket`),l=(c.x-s.x)*.5,u=c.y-s.y,d={x:s.x+l,y:s.y},f={x:s.x+l,y:s.y+u};for(let t=0;t<=1;t+=.05){let n=J(s,d,f,c,t);if(Math.hypot(e.x-n.x,e.y-n.y)<=10)return i}}return null}function ue(e,t){let n=[],r=Math.min(e.p1.x,e.p2.x),i=Math.max(e.p1.x,e.p2.x),a=Math.min(e.p1.y,e.p2.y),o=Math.max(e.p1.y,e.p2.y);for(let e of t.values()){let{width:t,height:s}=q(e),{x:c,y:l}=e.position;c+t>=r&&c<=i&&l+s>=a&&l<=o&&n.push(e.name)}return n}var de=e(t(),1),fe=e(i(),1);function pe(){return typeof window<`u`&&(window._||(window._=de.default),window.graphlib||(window.graphlib=fe.default)),{_:de.default,graphlib:fe.default}}pe();var me=e(n(),1),{_:he,graphlib:ge}=pe(),_e=me.default?.graphlib?me.default:me.default?.default||me.default||{};_e&&!_e.graphlib&&(_e.graphlib=typeof window<`u`&&window.graphlib?window.graphlib:ge);function ve(e,t){let n=t.nodes.get(e);if(!n||n.preset===`node_preset_backdrop`)return null;let r=null,i=1/0;for(let[e,a]of t.nodes.entries())if(a.preset===`node_preset_backdrop`){let t=a.metadata?.width||320,o=a.metadata?.height||220,s=q(n),c=n.position.x+s.width/2,l=n.position.y+s.height/2;if(c>=a.position.x&&c<=a.position.x+t&&l>=a.position.y&&l<=a.position.y+o){let n=t*o;n<i&&(i=n,r=e)}}return r}function ye(e){for(let[t,n]of e.nodes.entries()){if(n.preset===`node_preset_backdrop`||n.preset===`node_preset_note`)continue;let r=n.attributes.filter(e=>e.socket),i=n.attributes.filter(e=>e.plug),a=n.attributes.filter(e=>!e.socket&&!e.plug),o=(n,r)=>{let i=0,a=0;return e.connections.forEach(o=>{if(r===`socket`&&o.targetNode===t&&o.targetAttr===n){let t=e.nodes.get(o.sourceNode);t&&(i+=t.position.y,a++)}if(r===`plug`&&o.sourceNode===t&&o.sourceAttr===n){let t=e.nodes.get(o.targetNode);t&&(i+=t.position.y,a++)}}),a>0?i/a:1/0};r.sort((e,t)=>{let n=o(e.name,`socket`),r=o(t.name,`socket`);return n===1/0&&r===1/0?0:n-r}),i.sort((e,t)=>{let n=o(e.name,`plug`),r=o(t.name,`plug`);return n===1/0&&r===1/0?0:n-r}),n.attributes=[...r,...i,...a]}}function be(e,t={}){if(e.nodes.size===0)return;let n=t.rankDir||t.rankdir||`LR`,r=t.nodesep===void 0?80:t.nodesep,i=t.ranksep===void 0?140:t.ranksep,a=new _e.graphlib.Graph({compound:!0});a.setGraph({rankdir:n,nodesep:r,ranksep:i,marginx:50,marginy:50}),a.setDefaultEdgeLabel(()=>({}));for(let[t,n]of e.nodes.entries())if(n.preset===`node_preset_backdrop`)a.setNode(t,{label:t,isGroup:!0});else{let{width:e,height:r}=q(n);a.setNode(t,{width:e,height:r})}for(let t of e.nodes.keys()){let n=ve(t,e);n&&a.setParent(t,n)}e.connections.forEach(e=>{a.setEdge(e.sourceNode,e.targetNode)});for(let[t,n]of e.nodes.entries())if(n.preset===`node_preset_note`&&n.metadata?.linked_process){let r=n.metadata.linked_process;e.nodes.has(r)&&a.setEdge(r,t,{minlen:1,weight:15})}if(_e.layout(a),t.centralNodeName&&e.nodes.has(t.centralNodeName)){let t=[];for(let[n,r]of e.nodes.entries()){if(r.preset===`node_preset_backdrop`)continue;let e=a.node(n);e&&t.push({name:n,node:r,dagreNode:e})}for(let e=0;e<20;e++){let e=!0;for(let n=0;n<t.length;n++)for(let r=n+1;r<t.length;r++){let i=t[n],a=t[r],o=i.dagreNode.width/2,s=i.dagreNode.height/2,c=a.dagreNode.width/2,l=a.dagreNode.height/2,u=o+c+70-Math.abs(i.dagreNode.x-a.dagreNode.x),d=s+l+50-Math.abs(i.dagreNode.y-a.dagreNode.y);if(u>0&&d>0)if(e=!1,u<d){let e=u/2+1;i.dagreNode.x<=a.dagreNode.x?(i.dagreNode.x-=e,a.dagreNode.x+=e):(i.dagreNode.x+=e,a.dagreNode.x-=e)}else{let e=d/2+1;i.dagreNode.y<=a.dagreNode.y?(i.dagreNode.y-=e,a.dagreNode.y+=e):(i.dagreNode.y+=e,a.dagreNode.y-=e)}}if(e)break}}let o={};for(let[t,n]of e.nodes.entries())o[t]={...n.position};let s={};for(let t of e.nodes.keys()){let n=a.node(t);if(n){let r={x:n.x-n.width/2,y:n.y-n.height/2};s[t]=r;let i=e.nodes.get(t);i&&(i.position=r,i.preset===`node_preset_backdrop`&&(i.metadata={...i.metadata,width:Math.max(160,n.width),height:Math.max(100,n.height)}))}}if(ye(e),!t.animate||e.nodes.size<=1){e.emit(`node:moved`,{}),e.emit(`graph:layout_completed`,{});return}for(let[t,n]of e.nodes.entries()){let e=o[t];e&&(n.position=e)}let c=null,l=t=>{c||=t;let n=t-c,r=Math.min(1,n/300),i=r<.5?4*r*r*r:1-(-2*r+2)**3/2;for(let t of e.nodes.keys()){let n=o[t],r=s[t];if(n&&r){let a=n.x+(r.x-n.x)*i,o=n.y+(r.y-n.y)*i,s=e.nodes.get(t);s&&(s.position={x:a,y:o})}}e.emit(`node:moved`,{}),r<1?requestAnimationFrame(l):e.emit(`graph:layout_completed`,{})};requestAnimationFrame(l)}function xe(e,t,n,r,i,a){if(a.size===0)return;e.save(),e.setTransform(1,0,0,1,0,0);let o=n-120-16;e.fillStyle=`rgba(20, 24, 30, 0.85)`,e.strokeStyle=`rgba(255, 255, 255, 0.12)`,e.lineWidth=1,e.beginPath(),e.roundRect(16,o,180,120,6),e.fill(),e.stroke(),e.save(),e.beginPath(),e.roundRect(17,o+1,178,118,5),e.clip();let s=1/0,c=-1/0,l=1/0,u=-1/0;for(let e of a.values()){let{width:t,height:n}=q(e),{x:r,y:i}=e.position;r<s&&(s=r),r+t>c&&(c=r+t),i<l&&(l=i),i+n>u&&(u=i+n)}s-=200,l-=200,c+=200,u+=200;let d=c-s,f=u-l,p=164/d,m=104/f,h=Math.min(p,m),g=24+(164-d*h)/2,_=o+8+(104-f*h)/2,v=(e,t)=>({x:g+(e-s)*h,y:_+(t-l)*h});a.forEach(t=>{let{width:n,height:r}=q(t),{x:i,y:a}=t.position,o=v(i,a),s=n*h,c=r*h;e.fillStyle=`rgba(108, 193, 136, 0.7)`,e.fillRect(o.x,o.y,Math.max(2,s),Math.max(2,c))});let y={x:-r.x/i,y:-r.y/i},b={x:(t-r.x)/i,y:(n-r.y)/i},x=v(y.x,y.y),S=v(b.x,b.y);e.strokeStyle=`rgba(255, 255, 255, 0.35)`,e.lineWidth=1.5,e.strokeRect(x.x,x.y,S.x-x.x,S.y-x.y),e.restore(),e.restore()}function Se({isOpen:e,onClose:t,onCreate:n}){let[r,i]=(0,d.useState)(``);(0,d.useEffect)(()=>{e&&i(``)},[e]);let a=e=>{e.preventDefault(),r.trim()&&(n(r.trim()),t())};return(0,w.jsx)(M,{isOpen:e,title:`Create Process Node`,onClose:t,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:t,children:`Cancel`}),(0,w.jsx)(O,{variant:`primary`,onClick:a,disabled:!r.trim(),children:`Create Node`})]}),size:`sm`,children:(0,w.jsx)(`form`,{onSubmit:a,className:`flex flex-col gap-4`,children:(0,w.jsx)(A,{label:`Process Name`,value:r,onChange:e=>i(e.target.value),placeholder:`e.g. LookDev, Animation, Render`,autoFocus:!0})})})}function Ce({isOpen:e,onClose:t,onCreate:n,type:r=`input`}){let[i,a]=(0,d.useState)(``),[o,s]=(0,d.useState)(`usd`),[c,l]=(0,d.useState)([]);(0,d.useEffect)(()=>{if(e){a(``);let e=C.getAllTypes().map(e=>({value:e.code,label:e.type}));l(e),e.length>0&&s(e[0].value)}},[e]);let u=e=>{e.preventDefault(),i.trim()&&o&&(n(i.trim(),o),t())},f=(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:t,children:`Cancel`}),(0,w.jsxs)(O,{variant:`primary`,onClick:u,disabled:!i.trim(),children:[`Create `,r===`input`?`Input`:`Output`]})]});return(0,w.jsx)(M,{isOpen:e,title:`Create New ${r===`input`?`Input Slot (Socket)`:`Output Slot (Plug)`}`,onClose:t,actions:f,size:`sm`,className:`ds-modal--overflow-visible`,children:(0,w.jsxs)(`form`,{onSubmit:u,className:`flex flex-col gap-4`,children:[(0,w.jsx)(A,{label:`Slot Name`,value:i,onChange:e=>a(e.target.value),placeholder:`e.g. cache, geometry, textures`,autoFocus:!0}),(0,w.jsxs)(`div`,{className:`ds-input-group`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Data Type Format`}),(0,w.jsx)(V,{value:o,options:c,onChange:e=>s(e.target.value)})]})]})})}function we({isOpen:e,title:t=`Are you sure?`,message:n,onConfirm:r,onCancel:i,onClose:a,confirmText:o=`Yes, proceed`,cancelText:s=`Cancel`,variant:c=`primary`}){let l=i||a;return(0,w.jsx)(M,{isOpen:e,title:t,onClose:l,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:l,children:s}),(0,w.jsx)(O,{variant:c,onClick:r,children:o})]}),size:`sm`,children:(0,w.jsx)(`p`,{className:`text-sm text-secondary`,children:n})})}function Te({isOpen:e,onClose:t}){return(0,w.jsx)(M,{isOpen:e,title:`About Plumber Manager`,onClose:t,actions:(0,w.jsx)(O,{variant:`primary`,onClick:t,children:`Close`}),size:`md`,children:(0,w.jsxs)(`div`,{className:`flex flex-col items-center text-center gap-4 py-2`,children:[(0,w.jsx)(`img`,{src:x(`/favicon.svg`),alt:`PlumberManager Logo`,style:{width:`96px`,height:`96px`,objectFit:`contain`,filter:`drop-shadow(0 4px 14px rgba(16, 185, 129, 0.3))`}}),(0,w.jsxs)(`div`,{className:`flex flex-col items-center justify-center text-center w-full gap-1`,children:[(0,w.jsx)(`h3`,{className:`text-xl font-bold text-primary m-0`,children:`Plumber Manager`}),(0,w.jsxs)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent inline-block`,children:[`v`,`1.0.1`]})]}),(0,w.jsx)(`p`,{className:`text-sm text-secondary max-w-md leading-relaxed`,children:`A dedicated interactive node editor and documentation platform designed for planning, managing, and visualizing CG Pipeline data flows and DCC connection structures.`}),(0,w.jsxs)(`div`,{className:`text-xs text-muted flex flex-col gap-1 w-full border-t border-border/50 pt-3 text-center`,children:[(0,w.jsxs)(`div`,{children:[`Author: `,(0,w.jsx)(`strong`,{className:`text-primary`,children:`Hasiel Alvarez`})]}),(0,w.jsxs)(`div`,{children:[`Repo: `,(0,w.jsx)(`a`,{href:`https://github.com/hasielhassan/PlumberManager`,target:`_blank`,rel:`noreferrer`,className:`text-accent hover:underline`,children:`github.com/hasielhassan/PlumberManager`})]}),(0,w.jsx)(`div`,{children:`License: GNU General Public License v3.0`}),(0,w.jsx)(`div`,{children:`Copyright © 2019-2026 Hasiel Alvarez`})]}),(0,w.jsx)(`div`,{style:{backgroundColor:`var(--ds-bg-sidebar)`,border:`1px solid var(--ds-border-color)`,borderRadius:`var(--ds-radius-md)`,padding:`10px 16px`,width:`100%`,maxWidth:`440px`,textAlign:`center`},children:(0,w.jsxs)(`p`,{className:`text-xs text-muted leading-relaxed m-0`,children:[`🤖 `,(0,w.jsx)(`strong`,{children:`AI & Craftsmanship Disclaimer:`}),(0,w.jsx)(`br`,{}),`Developed with the interactive assistance of `,(0,w.jsx)(`strong`,{children:`Claude`}),` and `,(0,w.jsx)(`strong`,{children:`Gemini`}),`, fueled by lots of coffee ☕, hands-on pipeline experience, and love.`]})}),(0,w.jsxs)(`a`,{href:`https://buymeacoffee.com/hasielhassan`,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`,backgroundColor:`rgba(245, 158, 11, 0.12)`,color:`#F59E0B`,border:`1px solid rgba(245, 158, 11, 0.3)`,padding:`6px 14px`,borderRadius:`var(--ds-radius-md)`,fontWeight:`600`,fontSize:`12px`,textDecoration:`none`,transition:`all 0.15s ease`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=`rgba(245, 158, 11, 0.2)`,e.currentTarget.style.borderColor=`rgba(245, 158, 11, 0.5)`,e.currentTarget.style.color=`#FBBF24`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=`rgba(245, 158, 11, 0.12)`,e.currentTarget.style.borderColor=`rgba(245, 158, 11, 0.3)`,e.currentTarget.style.color=`#F59E0B`},children:[(0,w.jsx)(`span`,{children:`☕`}),` Buy me a coffee`]})]})})}function Ee({isOpen:e,title:t,label:n,placeholder:r,defaultValue:i=``,onClose:a,onSubmit:o}){let[s,c]=(0,d.useState)(i);(0,d.useEffect)(()=>{e&&c(i)},[e,i]);let l=()=>{o(s),a()};return(0,w.jsx)(M,{isOpen:e,title:t,onClose:a,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:a,children:`Cancel`}),(0,w.jsx)(O,{variant:`primary`,onClick:l,disabled:!s.trim(),children:`Confirm`})]}),children:(0,w.jsx)(`div`,{className:`py-2`,children:(0,w.jsx)(A,{label:n,placeholder:r,value:s,onChange:e=>c(e.target.value),onEnter:l,autoFocus:!0})})})}function De({isOpen:e,title:t=`Processing`,message:n=`Please wait while we complete the action...`}){return(0,w.jsx)(M,{isOpen:e,title:t,onClose:null,size:`sm`,children:(0,w.jsxs)(`div`,{className:`ds-progress-container flex flex-col items-center justify-center gap-4 py-8`,children:[(0,w.jsx)(`div`,{className:`ds-progress-spinner`}),(0,w.jsx)(`div`,{className:`ds-progress-message text-center text-sm text-secondary`,children:n})]})})}var Oe=(0,d.lazy)(()=>u(()=>import(`./MilkdownEditor-IHcWtXu_.js`).then(e=>({default:e.MilkdownEditor})),__vite__mapDeps([0,1,2,3,4,5,6])));function ke({isOpen:e,nodeName:t,initialContent:n=``,onClose:r,onSave:i}){let[,a]=(0,d.useState)(n),o=(0,d.useRef)(n);return(0,d.useEffect)(()=>{e&&(a(n),o.current=n)},[e,n]),(0,w.jsx)(M,{isOpen:e,title:`Documentation Editor — ${t}`,onClose:r,size:`2xl`,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:r,children:`Cancel`}),(0,w.jsx)(O,{variant:`primary`,onClick:()=>{i(o.current),r()},children:`Save Documentation`})]}),children:(0,w.jsx)(`div`,{className:`ds-md-editor-layout`,children:e&&(0,w.jsx)(d.Suspense,{fallback:(0,w.jsx)(`div`,{style:{padding:`20px`,fontSize:`14px`,color:`var(--ds-text-secondary)`,textAlign:`center`},children:`Loading WYSIWYG Editor...`}),children:(0,w.jsx)(Oe,{defaultValue:n,onChange:e=>{a(e),o.current=e},className:`ds-milkdown-modal`})})})})}function Ae({isOpen:e,onClose:t,graph:n,onShowProgress:r}){let[i,a]=(0,d.useState)(`png`),[o,s]=(0,d.useState)(`pipeline`),[c,l]=(0,d.useState)(!0),[f,p]=(0,d.useState)(`vector`),[m,h]=(0,d.useState)(!0),[g,_]=(0,d.useState)(80),[v,y]=(0,d.useState)(`CG Pipeline Diagram`),[b,x]=(0,d.useState)(`Interactive Data Flow Documentation`),[S,C]=(0,d.useState)(!1);return e?(0,w.jsx)(M,{isOpen:e,title:`Export Diagram`,onClose:t,"data-tour":`export-dialog-modal`,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{variant:`ghost`,onClick:t,children:`Cancel`}),(0,w.jsx)(O,{variant:`primary`,onClick:()=>{t(),r(!0,`Generating Export`,`Generating your ${i.toUpperCase()} diagram, please wait...`),setTimeout(async()=>{try{let e=`${o}.${i===`jpeg`?`jpg`:i}`,t=g/100;if(i===`png`){let{exportPng:t}=await u(async()=>{let{exportPng:e}=await import(`./export-png-D8vey4oW.js`);return{exportPng:e}},[]);t(n,e,c)}else if(i===`jpeg`){let{exportJpeg:r}=await u(async()=>{let{exportJpeg:e}=await import(`./export-png-D8vey4oW.js`);return{exportJpeg:e}},[]);r(n,e,c,t)}else if(i===`svg`){let{exportSvg:t}=await u(async()=>{let{exportSvg:e}=await import(`./export-svg-CtkS7fmm.js`);return{exportSvg:e}},[]);t(n,e,c)}else if(i===`pdf`){let{exportPdf:r}=await u(async()=>{let{exportPdf:e}=await import(`./export-pdf-hW_wiH2K.js`);return{exportPdf:e}},__vite__mapDeps([7,3,1,4,8,9]));await r(n,e,c,{pdfMode:f,compressPdf:m,quality:t,title:v,subtitle:b,includeBackdropPages:S})}}catch(e){console.error(`Export failed:`,e)}finally{r(!1)}},150)},children:`Export File`})]}),children:(0,w.jsxs)(`div`,{className:`flex flex-col gap-4 py-2`,children:[(0,w.jsx)(A,{label:`File Name`,value:o,onChange:e=>s(e.target.value),placeholder:`Enter file name...`}),(0,w.jsxs)(`div`,{className:`ds-input-group`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Format`}),(0,w.jsx)(j,{value:i,onChange:e=>a(e.target.value),options:[{value:`png`,label:`Portable Network Graphics (.png)`},{value:`jpeg`,label:`JPEG Image (.jpg)`},{value:`svg`,label:`Scalable Vector Graphics (.svg)`},{value:`pdf`,label:`Adobe PDF Document (.pdf)`}]})]}),i===`pdf`&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(A,{label:`PDF Cover Title`,value:v,onChange:e=>y(e.target.value),placeholder:`Enter PDF cover title...`}),(0,w.jsx)(A,{label:`PDF Cover Subtitle`,value:b,onChange:e=>x(e.target.value),placeholder:`Enter PDF cover subtitle...`}),(0,w.jsxs)(`div`,{className:`ds-input-group`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`PDF Render Mode`}),(0,w.jsx)(j,{value:f,onChange:e=>p(e.target.value),options:[{value:`vector`,label:`Vector (SVG - Crisp & Zoomable, Infinite Quality)`},{value:`raster`,label:`Raster (Image - Compact size, configurable quality)`}]})]}),(0,w.jsxs)(`div`,{className:`flex items-center gap-2 py-1`,children:[(0,w.jsx)(`input`,{type:`checkbox`,id:`backdrop-pages-cb`,checked:S,onChange:e=>C(e.target.checked),style:{width:`16px`,height:`16px`,cursor:`pointer`}}),(0,w.jsx)(`label`,{htmlFor:`backdrop-pages-cb`,style:{fontSize:`14px`,color:`var(--ds-text-primary)`,cursor:`pointer`,userSelect:`none`},children:`Include dedicated page for each Backdrop Group`})]})]}),(i===`jpeg`||i===`pdf`&&f===`raster`)&&(0,w.jsxs)(`div`,{className:`ds-input-group flex flex-col gap-1`,children:[(0,w.jsxs)(`label`,{className:`ds-input-label flex justify-between`,style:{display:`flex`,justifyContent:`space-between`,width:`100%`},children:[(0,w.jsx)(`span`,{children:`Compression Quality`}),(0,w.jsxs)(`span`,{style:{fontWeight:`bold`,color:`var(--ds-color-accent)`},children:[g,`%`]})]}),(0,w.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,width:`100%`},children:[(0,w.jsx)(`input`,{type:`range`,min:`10`,max:`100`,step:`5`,value:g,onChange:e=>_(parseInt(e.target.value)),style:{flex:1,cursor:`pointer`,accentColor:`var(--ds-color-accent)`}}),(0,w.jsx)(`span`,{style:{fontSize:`13px`,color:`var(--ds-text-secondary)`,minWidth:`50px`,textAlign:`right`},children:g>=90?`High`:g>=60?`Medium`:`Low`})]})]}),i===`pdf`&&f===`raster`&&(0,w.jsxs)(`div`,{className:`flex items-center gap-2 py-1`,children:[(0,w.jsx)(`input`,{type:`checkbox`,id:`compress-pdf-cb`,checked:m,onChange:e=>h(e.target.checked),style:{width:`16px`,height:`16px`,cursor:`pointer`}}),(0,w.jsx)(`label`,{htmlFor:`compress-pdf-cb`,style:{fontSize:`14px`,color:`var(--ds-text-primary)`,cursor:`pointer`,userSelect:`none`},children:`Compress PDF streams (reduces file size)`})]}),(0,w.jsxs)(`div`,{className:`flex items-center gap-2 py-2`,children:[(0,w.jsx)(`input`,{type:`checkbox`,id:`include-bg-cb`,checked:c,onChange:e=>l(e.target.checked),style:{width:`16px`,height:`16px`,cursor:`pointer`}}),(0,w.jsx)(`label`,{htmlFor:`include-bg-cb`,style:{fontSize:`14px`,color:`var(--ds-text-primary)`,cursor:`pointer`,userSelect:`none`},children:`Include dark grey background (otherwise transparent / alpha)`})]})]})}):null}function je({isOpen:e,onClose:t,onStartTour:n}){return e?(0,w.jsx)(M,{isOpen:e,title:`PlumberManager Help & Shortcuts`,onClose:t,size:`lg`,actions:(0,w.jsxs)(`div`,{className:`flex items-center gap-2`,children:[n&&(0,w.jsx)(O,{variant:`secondary`,onClick:()=>{t(),n()},"data-tour":`take-tour`,children:`🚀 Take Guided Tour`}),(0,w.jsx)(O,{variant:`primary`,onClick:t,children:`Got it`})]}),children:(0,w.jsxs)(`div`,{className:`ds-help-layout`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{className:`ds-help-section-title`,children:`Key Features`}),(0,w.jsxs)(`div`,{className:`ds-features-grid`,children:[(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,w.jsx)(`path`,{d:`m10 15-3-3 3-3`}),(0,w.jsx)(`path`,{d:`m14 9 3 3-3 3`}),(0,w.jsx)(`path`,{d:`m15 10-3-3-3 3`}),(0,w.jsx)(`path`,{d:`m9 14 3 3 3-3`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`Dynamic Canvas`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Middle-mouse-drag or Alt+drag to pan. Scroll to zoom centered on mouse cursor.`})]})]}),(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`9`,ry:`3`}),(0,w.jsx)(`path`,{d:`M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5`}),(0,w.jsx)(`path`,{d:`M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`CG Industry Data Types`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Preloaded with USD, Alembic, OpenColorIO, EXR, FBX, and more.`})]})]}),(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`path`,{d:`M12 20h9`}),(0,w.jsx)(`path`,{d:`M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`Custom Format Builder`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Create custom pipeline data formats with custom colors.`})]})]}),(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`path`,{d:`M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z`}),(0,w.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`Isolated Graph View`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Filter and view isolated subgraphs focusing purely on a process and its immediate connections.`})]})]}),(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`path`,{d:`M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7`}),(0,w.jsx)(`path`,{d:`M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`Note Blocks`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Annotate process workflows using text note boxes directly on the canvas.`})]})]}),(0,w.jsxs)(`div`,{className:`ds-feature-card`,children:[(0,w.jsx)(`div`,{className:`ds-feature-icon`,children:(0,w.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,w.jsx)(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),(0,w.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,w.jsx)(`line`,{x1:`12`,x2:`12`,y1:`15`,y2:`3`})]})}),(0,w.jsxs)(`div`,{className:`ds-feature-content`,children:[(0,w.jsx)(`span`,{className:`ds-feature-title`,children:`Production Grade Exports`}),(0,w.jsx)(`span`,{className:`ds-feature-desc`,children:`Save graphs as High-res PNG, Vector SVG, or multi-page documentation PDF files.`})]})]})]})]}),(0,w.jsx)(`hr`,{style:{border:`none`,borderTop:`1px solid var(--ds-border-color)`,margin:0}}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{className:`ds-help-section-title`,children:`Keyboard Shortcuts`}),(0,w.jsxs)(`div`,{className:`ds-shortcuts-list`,children:[(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Command Palette Search`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`K`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Quick Connection Spawn`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`→`}),` / `,(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`←`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Rename Selected Process`}),(0,w.jsx)(`div`,{className:`ds-shortcut-keys-container`,children:(0,w.jsx)(I,{children:`F2`})})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Delete Selected Nodes`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Delete`}),` or `,(0,w.jsx)(I,{children:`Backspace`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Fit Canvas to View`}),(0,w.jsx)(`div`,{className:`ds-shortcut-keys-container`,children:(0,w.jsx)(I,{children:`F`})})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Snap Node coordinates`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Shift`}),` + `,(0,w.jsx)(`span`,{className:`ds-shortcut-action-text`,children:`Drag Node`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Copy Selected Node`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`C`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Paste Node under Mouse`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`V`})]})]}),(0,w.jsxs)(`div`,{className:`ds-shortcut-row`,children:[(0,w.jsx)(`span`,{className:`ds-shortcut-name`,children:`Undo / Redo`}),(0,w.jsxs)(`div`,{className:`ds-shortcut-keys-container`,children:[(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`Z`}),` / `,(0,w.jsx)(I,{children:`Ctrl`}),` + `,(0,w.jsx)(I,{children:`Shift`}),` + `,(0,w.jsx)(I,{children:`Z`})]})]})]})]}),(0,w.jsx)(`hr`,{style:{border:`none`,borderTop:`1px solid var(--ds-border-color)`,margin:0}}),(0,w.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,fontSize:`var(--ds-font-size-xs)`,color:`var(--ds-text-secondary)`,gap:`12px`,flexWrap:`wrap`},children:[(0,w.jsx)(`span`,{children:`Want to embed diagrams in your wiki or pipeline dashboards?`}),(0,w.jsxs)(`div`,{style:{display:`flex`,gap:`16px`},children:[(0,w.jsx)(`a`,{href:x(`/embed-example.html`),target:`_blank`,rel:`noreferrer`,style:{color:`var(--ds-color-accent)`,textDecoration:`none`,fontWeight:`600`},children:`Live Embed Showcase ↗`}),(0,w.jsx)(`a`,{href:`https://github.com/hasielhassan/PlumberManager#embedding-the-viewer-widget`,target:`_blank`,rel:`noreferrer`,style:{color:`var(--ds-color-accent)`,textDecoration:`none`,fontWeight:`600`},children:`Developer Docs ↗`})]})]})]})}):null}function Me({autoRelayout:e=!0,minimapEnabled:t=!0}){let n=(0,d.useRef)(null),r=(0,d.useRef)(null),{graph:i,selection:a,setSelection:o,updateTrigger:s}=D(),c=(0,d.useRef)(null),l=(0,d.useRef)(null),u=(0,d.useRef)({x:0,y:0}),f=(0,d.useRef)(null),p=(0,d.useRef)(!1),[m,h]=(0,d.useState)({x:0,y:0}),[g,_]=(0,d.useState)(1),[v,y]=(0,d.useState)({width:800,height:600}),[b,x]=(0,d.useState)(null),[S,T]=(0,d.useState)(null),[E,O]=(0,d.useState)(null),k=(0,d.useRef)(m),A=(0,d.useRef)(g),j=(0,d.useRef)(a);(0,d.useEffect)(()=>{k.current=m,A.current=g},[m,g]),(0,d.useEffect)(()=>{j.current=a},[a]);let[M,N]=(0,d.useState)({state:`DEFAULT`,startPoint:null,currentPoint:null,draggedNodes:[],nodeOffsets:[],activeSlot:null,rubberBandRect:null}),P=(0,d.useRef)(M);(0,d.useEffect)(()=>{P.current=M},[M]),(0,d.useEffect)(()=>{if(!r.current)return;let e=()=>{if(r.current){let e=r.current.clientWidth,t=r.current.clientHeight;y(n=>n.width===e&&n.height===t?n:{width:e,height:t})}},t=new ResizeObserver(()=>{e()});return t.observe(r.current),e(),()=>{t.disconnect()}},[]);let F=(0,d.useCallback)((e,t)=>({x:(e-m.x)/g,y:(t-m.y)/g}),[m,g]),I=(0,d.useCallback)(()=>{if(i.nodes.size===0)return;let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let a of i.nodes.values()){let{width:i,height:o}=q(a),{x:s,y:c}=a.position;s<e&&(e=s),s+i>t&&(t=s+i),c<n&&(n=c),c+o>r&&(r=c+o)}let a=t-e+200,o=r-n+200,s=v.width/a,c=v.height/o,l=Math.max(.1,Math.min(2,Math.min(s,c))),u=e+(t-e)/2,d=n+(r-n)/2;_(l),h({x:v.width/2-u*l,y:v.height/2-d*l})},[i,v]);return(0,d.useEffect)(()=>{i.nodes.size>0&&!p.current&&v.width!==800&&(I(),p.current=!0);let e=()=>{setTimeout(()=>{I()},50)};return i.on(`graph:loaded`,e),()=>{i.off(`graph:loaded`,e)}},[i,v,I]),(0,d.useEffect)(()=>{let t=t=>{if(!(t.target.tagName===`INPUT`||t.target.tagName===`TEXTAREA`||t.target.tagName===`SELECT`||t.target.isContentEditable||t.target.closest(`[contenteditable="true"]`))){if((t.key===`Delete`||t.key===`Backspace`)&&(a.forEach(e=>i.deleteNode(e)),o([])),t.key.toLowerCase()===`f`&&!t.ctrlKey)if(a.length>0){let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let o of a){let a=i.nodes.get(o);if(!a)continue;let{width:s,height:c}=q(a),{x:l,y:u}=a.position;l<e&&(e=l),l+s>t&&(t=l+s),u<n&&(n=u),u+c>r&&(r=u+c)}let o=t-e+160,s=r-n+160,c=Math.max(.15,Math.min(2,Math.min(v.width/o,v.height/s))),l=e+(t-e)/2,u=n+(r-n)/2;_(c),h({x:v.width/2-l*c,y:v.height/2-u*c})}else I();if(t.key===`F2`&&a.length===1){t.preventDefault();let e=a[0];T({title:`Rename Node`,label:`Node Name`,defaultValue:e,placeholder:`Enter new name...`,onSubmit:t=>{if(t&&t.trim()&&t!==e){let n=L(i);if(i.renameNode(e,t.trim())){o([t.trim()]);let e=L(i),r=new z(i,`Rename Node`);r.beforeState=n,r.afterState=e,B.execute(r),i.emit(`node:moved`,{})}}}})}if(t.ctrlKey&&t.key.toLowerCase()===`c`&&a.length===1){t.preventDefault();let e=i.nodes.get(a[0]);e&&(l.current={name:e.name,preset:e.preset,alternate:e.alternate,attributes:e.attributes.map(e=>({...e})),metadata:{...e.metadata}})}if(t.ctrlKey&&t.key.toLowerCase()===`v`&&l.current){t.preventDefault();let e=l.current,n=`${e.name}_copy`,r=1;for(;i.nodes.has(n);)n=`${e.name}_copy${r}`,r++;let a=L(i),s=u.current||{x:100,y:100},c=i.createNode(n,{x:s.x,y:s.y},e.preset);if(c){c.alternate=e.alternate,c.metadata={...e.metadata},e.attributes.forEach(e=>{i.createAttribute(n,e)}),o([n]);let t=L(i),r=new z(i,`Paste Node`);r.beforeState=a,r.afterState=t,B.execute(r),i.emit(`node:moved`,{})}}if(t.ctrlKey&&(t.key===`ArrowRight`||t.key===`ArrowLeft`)&&a.length===1){t.preventDefault();let n=a[0],r=i.nodes.get(n);if(!r||r.preset===`node_preset_backdrop`)return;let s=t.key===`ArrowRight`;T({title:`Quick Spawn — Step 1`,label:`Enter ${s?`output`:`input`} slot name:`,defaultValue:s?`output`:`input`,placeholder:`Slot name...`,onSubmit:t=>{!t||!t.trim()||T({title:`Quick Spawn — Step 2`,label:`Enter new process name:`,defaultValue:`${r.name}_Next`,placeholder:`Process name...`,onSubmit:a=>{if(!a||!a.trim())return;let c=L(i);i.createAttribute(n,{name:t,plug:s,socket:!s,dataType:`usd`});let l=s?320:-320,u={x:r.position.x+l,y:r.position.y};i.createNode(a,u,`node_preset_1`),i.createAttribute(a,{name:t,plug:!s,socket:s,dataType:`usd`}),s?i.createConnection(n,t,a,t):i.createConnection(a,t,n,t),e&&be(i),o([a]);let d=L(i),f=new z(i,`Quick Spawn Node`);f.beforeState=c,f.afterState=d,B.execute(f),i.emit(`node:moved`,{})}})}})}}};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[a,v,i,e,I,o]),(0,d.useEffect)(()=>{a.length===1?f.current=a[0]:f.current=null},[a]),(0,d.useEffect)(()=>{let e=n.current;if(!e)return;let r=e.getContext(`2d`);if(r.clearRect(0,0,v.width,v.height),r.save(),r.translate(m.x,m.y),r.scale(g,g),se(r,v.width,v.height,m,g),i.connections.forEach(e=>{let t=i.nodes.get(e.sourceNode),n=i.nodes.get(e.targetNode);if(!t||!n)return;let a=Q(t,e.sourceAttr,`plug`),o=Q(n,e.targetAttr,`socket`),s=t.attributes.find(t=>t.name===e.sourceAttr);Y(r,a,o,e,s?.dataType,!0,i)}),M.state===`DRAW_CONNECTION`&&M.startPoint&&M.currentPoint){let e=F(M.startPoint.x,M.startPoint.y),t=F(M.currentPoint.x,M.currentPoint.y),n=M.activeSlot.type===`plug`;Y(r,n?e:t,n?t:e,null,M.activeSlot.dataType,!0,i)}if(Array.from(i.nodes.values()).sort((e,t)=>{let n=e.preset===`node_preset_backdrop`,r=t.preset===`node_preset_backdrop`;return n&&!r?-1:!n&&r?1:0}).forEach(e=>{let t=a.includes(e.name);ce(r,e,t)}),M.state===`SELECTION`&&M.rubberBandRect){let{p1:e,p2:t}=M.rubberBandRect;r.strokeStyle=G(W.connection.color,.5),r.lineWidth=1/g,r.fillStyle=`rgba(108, 193, 136, 0.1)`,r.beginPath(),r.rect(e.x,e.y,t.x-e.x,t.y-e.y),r.fill(),r.stroke()}t&&xe(r,v.width,v.height,m,g,i.nodes),r.restore()},[v,m,g,i,a,M,s,t,F]),(0,d.useEffect)(()=>{let e=n.current;if(!e)return;let t=t=>{t.preventDefault();let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top,a=A.current,o=k.current,s={x:(r-o.x)/a,y:(i-o.y)/a},c=1.15,l=t.deltaY<0?a*c:a/c,u=Math.max(.1,Math.min(4,l));_(u),h({x:r-s.x*u,y:i-s.y*u})};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[]),(0,d.useEffect)(()=>{let e=n.current;if(!e)return;let t={startPos:null,startWorld:null,hasMoved:!1,pinchStartDist:null,pinchStartZoom:null,pinchMidpoint:null},r=(e,t)=>Math.hypot(t.clientX-e.clientX,t.clientY-e.clientY),a=(e,t,n)=>({x:(e.clientX+t.clientX)/2-n.left,y:(e.clientY+t.clientY)/2-n.top}),s=n=>{x(null);let s=e.getBoundingClientRect();if(n.touches.length===1){n.preventDefault();let e=n.touches[0],r=e.clientX-s.left,a=e.clientY-s.top,l=k.current,u=A.current,d={x:(r-l.x)/u,y:(a-l.y)/u};t.startPos={x:r,y:a},t.startWorld=d,t.hasMoved=!1,t.pinchStartDist=null,c.current=L(i);let f=j.current;for(let[e,t]of i.nodes.entries())if((t.preset===`node_preset_backdrop`||t.preset===`node_preset_note`)&&f.includes(e)){let{width:n,height:i}=q(t),o=t.position.x+n,s=t.position.y+i;if(Math.hypot(d.x-o,d.y-s)<24){N({state:`DRAG_RESIZE_BACKDROP`,startPoint:{x:r,y:a},currentPoint:{x:r,y:a},backdropName:e,startWidth:n,startHeight:i});return}}for(let e of i.nodes.values()){if(e.preset===`node_preset_backdrop`)continue;let t=Z(d,e);if(t){N({state:`DRAW_CONNECTION`,startPoint:{x:r,y:a},currentPoint:{x:r,y:a},activeSlot:t});return}}let p=null,m=Array.from(i.nodes.values()).filter(e=>e.preset!==`node_preset_backdrop`);if(p=X(d,new Map(m.map(e=>[e.name,e]))),!p){let e=Array.from(i.nodes.values()).filter(e=>e.preset===`node_preset_backdrop`);p=X(d,new Map(e.map(e=>[e.name,e])))}if(p){let e=[...f];f.includes(p.name)||(e=[p.name]),o(e);let t=[...e];if(p.preset===`node_preset_backdrop`){let e=p.metadata?.width||320,n=p.metadata?.height||220,r=[];i.nodes.forEach((t,i)=>{if(i!==p.name&&t.preset!==`node_preset_backdrop`){let a=q(t),o=t.position.x+a.width/2,s=t.position.y+a.height/2;o>=p.position.x&&o<=p.position.x+e&&s>=p.position.y&&s<=p.position.y+n&&r.push(i)}}),t=[p.name,...r]}let n=t.map(e=>{let t=i.nodes.get(e);return{x:d.x-(t?t.position.x:0),y:d.y-(t?t.position.y:0)}});N({state:`DRAG_NODE`,startPoint:{x:r,y:a},currentPoint:{x:r,y:a},draggedNodes:t,nodeOffsets:n});return}let h=le(d,i.connections,i.nodes);if(h){O({title:`Delete Connection`,message:`Are you sure you want to remove this connection line?`,onConfirm:()=>{let e=L(i);i.deleteConnection(h.sourceNode,h.sourceAttr,h.targetNode,h.targetAttr);let t=L(i),n=new z(i,`Delete Connection`);n.beforeState=e,n.afterState=t,B.execute(n),i.emit(`node:moved`,{})}}),c.current=null;return}N({state:`DRAG_VIEW`,startPoint:{x:r,y:a},currentPoint:{x:r,y:a}})}else if(n.touches.length===2){n.preventDefault();let i=e.getBoundingClientRect();t.pinchStartDist=r(n.touches[0],n.touches[1]),t.pinchStartZoom=A.current,t.pinchMidpoint=a(n.touches[0],n.touches[1],i),N({state:`DEFAULT`,startPoint:null,currentPoint:null,draggedNodes:[],nodeOffsets:[],activeSlot:null,rubberBandRect:null})}},l=n=>{let o=e.getBoundingClientRect();if(n.touches.length===1){n.preventDefault();let e=n.touches[0],r=e.clientX-o.left,a=e.clientY-o.top,s=k.current,c=A.current,l={x:(r-s.x)/c,y:(a-s.y)/c},u=t.startPos||{x:r,y:a};Math.hypot(r-u.x,a-u.y)>5&&(t.hasMoved=!0);let d=P.current;if(d.state===`DRAG_VIEW`){let e=r-(d.startPoint?.x??r),t=a-(d.startPoint?.y??a);h(n=>({x:n.x+e,y:n.y+t})),N(e=>({...e,startPoint:{x:r,y:a},currentPoint:{x:r,y:a}}))}else if(d.state===`DRAG_NODE`)d.draggedNodes.forEach((e,t)=>{let n=d.nodeOffsets[t];if(!n)return;let r=l.x-n.x,a=l.y-n.y;i.moveNode(e,{x:r,y:a})}),N(e=>({...e,currentPoint:{x:r,y:a}}));else if(d.state===`DRAG_RESIZE_BACKDROP`){let e=t.startWorld||l,n=l.x-e.x,o=l.y-e.y,s=i.nodes.get(d.backdropName);s&&(s.metadata={...s.metadata,width:Math.max(160,d.startWidth+n),height:Math.max(100,d.startHeight+o)},i.emit(`node:moved`,{})),N(e=>({...e,currentPoint:{x:r,y:a}}))}else d.state===`DRAW_CONNECTION`&&N(e=>({...e,currentPoint:{x:r,y:a}}))}else if(n.touches.length===2&&t.pinchStartDist!==null){n.preventDefault();let e=r(n.touches[0],n.touches[1])/t.pinchStartDist,i=Math.max(.1,Math.min(4,t.pinchStartZoom*e)),s=a(n.touches[0],n.touches[1],o),c=k.current,l=t.pinchMidpoint||s,u=(l.x-c.x)/A.current,d=(l.y-c.y)/A.current,f=s.x-l.x,p=s.y-l.y;_(i),h({x:s.x-u*i+f,y:s.y-d*i+p}),t.pinchMidpoint=s}},u=e=>{if(e.touches.length===0){let e=P.current,n=t.hasMoved;if(e.state===`DRAG_VIEW`&&!n&&o([]),e.state===`DRAW_CONNECTION`&&e.currentPoint){let t=k.current,n=A.current,r={x:(e.currentPoint.x-t.x)/n,y:(e.currentPoint.y-t.y)/n},a=null;for(let t of i.nodes.values()){if(t.preset===`node_preset_backdrop`)continue;let n=Z(r,t);if(n&&n.nodeName!==e.activeSlot.nodeName){let t=e.activeSlot.type===`plug`&&n.type===`socket`||e.activeSlot.type===`socket`&&n.type===`plug`,r=C.acceptsConnection(e.activeSlot.dataType,n.dataType);if(t&&r){a=n;break}}}if(a){let t=e.activeSlot.type===`plug`,n=t?e.activeSlot.nodeName:a.nodeName,r=t?e.activeSlot.attributeName:a.attributeName,o=t?a.nodeName:e.activeSlot.nodeName,s=t?a.attributeName:e.activeSlot.attributeName;i.createConnection(n,r,o,s)}}let r=c.current,a=L(i);if(r&&r!==a){let t=e.state===`DRAG_RESIZE_BACKDROP`?`Resize Node`:`Canvas Action`,n=new z(i,t);n.beforeState=r,n.afterState=a,B.execute(n),i.emit(`node:moved`,{})}c.current=null,N({state:`DEFAULT`,startPoint:null,currentPoint:null,draggedNodes:[],nodeOffsets:[],activeSlot:null,rubberBandRect:null}),t.startPos=null,t.startWorld=null,t.hasMoved=!1,t.pinchStartDist=null,t.pinchStartZoom=null,t.pinchMidpoint=null}else e.touches.length===1&&(t.pinchStartDist=null,t.pinchStartZoom=null,t.pinchMidpoint=null)};return e.addEventListener(`touchstart`,s,{passive:!1}),e.addEventListener(`touchmove`,l,{passive:!1}),e.addEventListener(`touchend`,u,{passive:!1}),()=>{e.removeEventListener(`touchstart`,s),e.removeEventListener(`touchmove`,l),e.removeEventListener(`touchend`,u)}},[i,o]),(0,w.jsxs)(`div`,{ref:r,className:`w-full h-full overflow-hidden select-none relative`,onContextMenu:e=>{e.preventDefault();let t=n.current.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top,a=F(r,i);x({x:r,y:i,worldPos:a})},children:[(0,w.jsx)(`canvas`,{ref:n,width:v.width,height:v.height,onMouseDown:e=>{x(null);let t=n.current.getBoundingClientRect(),r=e.clientX-t.left,s=e.clientY-t.top,l=F(r,s);if(e.button===1||e.button===0&&(e.altKey||e.shiftKey)){N({state:`DRAG_VIEW`,startPoint:{x:r,y:s},currentPoint:{x:r,y:s}});return}if(e.button===0){c.current=L(i);for(let[e,t]of i.nodes.entries())if((t.preset===`node_preset_backdrop`||t.preset===`node_preset_note`)&&a.includes(e)){let{width:n,height:i}=q(t),a=t.position.x+n,o=t.position.y+i;if(Math.hypot(l.x-a,l.y-o)<16){N({state:`DRAG_RESIZE_BACKDROP`,startPoint:{x:r,y:s},currentPoint:{x:r,y:s},backdropName:e,startWidth:n,startHeight:i});return}}for(let e of i.nodes.values()){if(e.preset===`node_preset_backdrop`)continue;let t=Z(l,e);if(t){N({state:`DRAW_CONNECTION`,startPoint:{x:r,y:s},currentPoint:{x:r,y:s},activeSlot:t});return}}let t=null,n=Array.from(i.nodes.values()).filter(e=>e.preset!==`node_preset_backdrop`);if(t=X(l,new Map(n.map(e=>[e.name,e]))),!t){let e=Array.from(i.nodes.values()).filter(e=>e.preset===`node_preset_backdrop`);t=X(l,new Map(e.map(e=>[e.name,e])))}if(t){let n=[...a];!e.ctrlKey&&!e.shiftKey?a.includes(t.name)||(n=[t.name]):e.ctrlKey&&(a.includes(t.name)?n=n.filter(e=>e!==t.name):n.push(t.name)),o(n);let c=[...n];if(t.preset===`node_preset_backdrop`){let e=t.metadata?.width||320,n=t.metadata?.height||220,r=[];i.nodes.forEach((i,a)=>{if(a!==t.name&&i.preset!==`node_preset_backdrop`){let o=q(i),s=i.position.x+o.width/2,c=i.position.y+o.height/2;s>=t.position.x&&s<=t.position.x+e&&c>=t.position.y&&c<=t.position.y+n&&r.push(a)}}),c=[t.name,...r]}let u=c.map(e=>{let t=i.nodes.get(e);return{x:l.x-t.position.x,y:l.y-t.position.y}});N({state:`DRAG_NODE`,startPoint:{x:r,y:s},currentPoint:{x:r,y:s},draggedNodes:c,nodeOffsets:u});return}let u=le(l,i.connections,i.nodes);if(u){O({title:`Delete Connection`,message:`Are you sure you want to remove this connection line?`,onConfirm:()=>{let e=L(i);i.deleteConnection(u.sourceNode,u.sourceAttr,u.targetNode,u.targetAttr);let t=L(i),n=new z(i,`Delete Connection`);n.beforeState=e,n.afterState=t,B.execute(n),i.emit(`node:moved`,{})}}),c.current=null;return}o([]),N({state:`SELECTION`,startPoint:{x:r,y:s},currentPoint:{x:r,y:s},rubberBandRect:{p1:l,p2:l}})}},onMouseMove:e=>{let t=n.current.getBoundingClientRect(),r=e.clientX-t.left,a=e.clientY-t.top,o=F(r,a);if(u.current=o,M.state!==`DEFAULT`){if(M.state===`DRAG_VIEW`){let e=r-M.startPoint.x,t=a-M.startPoint.y;h(n=>({x:n.x+e,y:n.y+t})),N(e=>({...e,startPoint:{x:r,y:a},currentPoint:{x:r,y:a}}))}if(M.state===`DRAG_NODE`&&(M.draggedNodes.forEach((t,n)=>{let r=M.nodeOffsets[n],a=o.x-r.x,s=o.y-r.y;if(e.shiftKey){let e=W.grid.size;a=Math.round(a/e)*e,s=Math.round(s/e)*e}i.moveNode(t,{x:a,y:s})}),N(e=>({...e,currentPoint:{x:r,y:a}}))),M.state===`DRAG_RESIZE_BACKDROP`){let e=F(M.startPoint.x,M.startPoint.y),t=o.x-e.x,n=o.y-e.y,s=i.nodes.get(M.backdropName);s&&(s.metadata={...s.metadata,width:Math.max(160,M.startWidth+t),height:Math.max(100,M.startHeight+n)},i.emit(`node:moved`,{})),N(e=>({...e,currentPoint:{x:r,y:a}}))}if(M.state===`DRAW_CONNECTION`&&N(e=>({...e,currentPoint:{x:r,y:a}})),M.state===`SELECTION`){let e=F(M.startPoint.x,M.startPoint.y);N(t=>({...t,currentPoint:{x:r,y:a},rubberBandRect:{p1:e,p2:o}}))}}},onMouseUp:e=>{if(M.state===`DEFAULT`)return;let t=n.current.getBoundingClientRect(),r=e.clientX-t.left,a=e.clientY-t.top,s=F(r,a);if(M.state===`DRAW_CONNECTION`){let e=null;for(let t of i.nodes.values()){if(t.preset===`node_preset_backdrop`)continue;let n=Z(s,t);if(n&&n.nodeName!==M.activeSlot.nodeName){let t=M.activeSlot.type===`plug`&&n.type===`socket`||M.activeSlot.type===`socket`&&n.type===`plug`,r=C.acceptsConnection(M.activeSlot.dataType,n.dataType);if(t&&r){e=n;break}}}if(e){let t=M.activeSlot.type===`plug`,n=t?M.activeSlot.nodeName:e.nodeName,r=t?M.activeSlot.attributeName:e.attributeName,a=t?e.nodeName:M.activeSlot.nodeName,o=t?e.attributeName:M.activeSlot.attributeName;i.createConnection(n,r,a,o)}}if(M.state===`SELECTION`&&M.rubberBandRect){let e=ue(M.rubberBandRect,i.nodes);o(e)}let l=c.current,u=L(i);if(l&&l!==u){let e=M.state===`DRAG_RESIZE_BACKDROP`?`Resize Node`:`Canvas Action`,t=new z(i,e);t.beforeState=l,t.afterState=u,B.execute(t),i.emit(`node:moved`,{})}c.current=null,N({state:`DEFAULT`,startPoint:null,currentPoint:null,draggedNodes:[],nodeOffsets:[],activeSlot:null,rubberBandRect:null})},className:`block`,style:{position:`absolute`,top:0,left:0},"data-tour":`canvas-area`}),b&&(0,w.jsxs)(`div`,{className:`ds-context-menu`,style:{position:`absolute`,top:`${b.y}px`,left:`${b.x}px`},children:[(0,w.jsx)(`button`,{type:`button`,className:`ds-context-item`,onClick:()=>{x(null),T({title:`Create Process Node`,label:`Process Name`,placeholder:`Enter process name...`,defaultValue:`Modeling`,onSubmit:e=>{if(!e||!e.trim())return;let t=L(i);if(i.createNode(e.trim(),b.worldPos,`node_preset_1`)){o([e.trim()]);let n=L(i),r=new z(i,`Create Process`);r.beforeState=t,r.afterState=n,B.execute(r),i.emit(`node:moved`,{})}}})},children:`＋ Create Process Node`}),(0,w.jsx)(`button`,{type:`button`,className:`ds-context-item`,onClick:()=>{x(null),T({title:`Create Note Block`,label:`Note Title`,placeholder:`Enter note title...`,defaultValue:`Note`,onSubmit:e=>{if(!e||!e.trim())return;let t=L(i),n=i.createNode(e.trim(),b.worldPos,`node_preset_note`);if(n){n.metadata={process_details:`Double click to edit this note.`},o([e.trim()]);let r=L(i),a=new z(i,`Create Note`);a.beforeState=t,a.afterState=r,B.execute(a),i.emit(`node:moved`,{})}}})},children:`📝 Create Note Block`}),(0,w.jsx)(`button`,{type:`button`,className:`ds-context-item`,onClick:()=>{x(null),T({title:`Create Backdrop Group`,label:`Group Name`,placeholder:`Enter group title...`,defaultValue:`Backdrop Group`,onSubmit:e=>{if(!e||!e.trim())return;let t=L(i),n=i.createNode(e.trim(),b.worldPos,`node_preset_backdrop`);if(n){n.metadata={width:340,height:240},o([e.trim()]);let r=L(i),a=new z(i,`Create Backdrop Group`);a.beforeState=t,a.afterState=r,B.execute(a),i.emit(`node:moved`,{})}}})},children:`📁 Create Backdrop Group`}),(0,w.jsx)(`button`,{type:`button`,className:`ds-context-item`,onClick:()=>{x(null),be(i)},children:`⚡ Auto Layout Graph`})]}),(0,w.jsx)(Ee,{isOpen:S!==null,title:S?.title,label:S?.label,placeholder:S?.placeholder,defaultValue:S?.defaultValue,onClose:()=>T(null),onSubmit:e=>{S?.onSubmit&&S.onSubmit(e),T(null)}}),(0,w.jsx)(we,{isOpen:E!==null,title:E?.title,message:E?.message,onClose:()=>O(null),onConfirm:()=>{E?.onConfirm&&E.onConfirm(),O(null)}})]})}var Ne=`plumber:autosave`,Pe=`plumber:recent-files`,Fe=`plumber:preferences`,Ie=null,$={autoSave(e){Ie&&clearTimeout(Ie),Ie=setTimeout(()=>{try{let t=L(e);localStorage.setItem(Ne,t)}catch(e){console.error(`Failed to auto-save graph to localStorage:`,e)}},1e3)},hasAutoSave(){return!!localStorage.getItem(Ne)},loadAutoSave(e){try{let t=localStorage.getItem(Ne);if(t)return R(t,e)}catch(e){console.error(`Failed to load auto-save from localStorage:`,e)}return!1},clearAutoSave(){localStorage.removeItem(Ne)},getRecentFiles(){try{let e=localStorage.getItem(Pe);return e?JSON.parse(e):[]}catch{return[]}},addRecentFile(e,t){try{let n=this.getRecentFiles();n=n.filter(t=>t.name!==e),n.unshift({name:e,content:t,lastOpened:Date.now()}),n.length>5&&n.pop(),localStorage.setItem(Pe,JSON.stringify(n))}catch(e){console.error(`Failed to save recent files list:`,e)}},getPreferences(){try{let e=localStorage.getItem(Fe),t={theme:`dark`,panelWidth:420,minimapEnabled:!0,autoRelayout:!0,hasCompletedTour:!1};return e?{...t,...JSON.parse(e)}:t}catch{return{theme:`dark`,panelWidth:420,minimapEnabled:!0,autoRelayout:!0,hasCompletedTour:!1}}},savePreferences(e){try{let t=this.getPreferences();localStorage.setItem(Fe,JSON.stringify({...t,...e}))}catch(e){console.error(`Failed to save preferences:`,e)}}};function Le(e,t,n=`application/json`){let r=document.createElement(`a`),i=new Blob([e],{type:n});r.href=URL.createObjectURL(i),r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(r.href)}function Re(e=`.gph, .json`){return new Promise((t,n)=>{let r=document.createElement(`input`);r.type=`file`,r.accept=e,r.onchange=e=>{let r=e.target.files[0];if(!r){t(null);return}let i=new FileReader;i.onload=e=>{t({name:r.name,content:e.target.result})},i.onerror=e=>n(e),i.readAsText(r)},r.click()})}function ze({isOpen:e,onClose:t,onSelectNode:n}){let{graph:r}=D(),[i,a]=(0,d.useState)(``),[o,s]=(0,d.useState)(0),c=(0,d.useRef)(null);if((0,d.useEffect)(()=>{e&&(a(``),s(0),setTimeout(()=>c.current?.focus(),50))},[e]),(0,d.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t()};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,t]),!e)return null;let l=Array.from(r.nodes.keys()).filter(e=>e.toLowerCase().includes(i.toLowerCase()));return(0,w.jsx)(`div`,{className:`ds-palette-backdrop`,onClick:t,children:(0,w.jsxs)(`div`,{className:`ds-palette`,onClick:e=>e.stopPropagation(),onKeyDown:e=>{e.key===`ArrowDown`?(e.preventDefault(),s(e=>(e+1)%Math.max(1,l.length))):e.key===`ArrowUp`?(e.preventDefault(),s(e=>(e-1+l.length)%Math.max(1,l.length))):e.key===`Enter`&&(e.preventDefault(),l[o]&&(n(l[o]),t()))},children:[(0,w.jsxs)(`div`,{className:`ds-palette-search-container`,children:[(0,w.jsx)(`span`,{className:`ds-palette-search-icon`,children:`🔍`}),(0,w.jsx)(`input`,{ref:c,type:`text`,className:`ds-palette-input`,placeholder:`Search processes...`,value:i,onChange:e=>{a(e.target.value),s(0)}}),(0,w.jsx)(`span`,{className:`ds-palette-esc-badge`,children:`ESC`})]}),(0,w.jsx)(`div`,{className:`ds-palette-results ds-scroll-area`,children:l.length===0?(0,w.jsx)(`div`,{className:`ds-palette-empty`,children:`No nodes match your search.`}):l.map((e,r)=>(0,w.jsxs)(`div`,{className:`ds-palette-item ${r===o?`ds-palette-item--selected`:``}`,onClick:()=>{n(e),t()},children:[(0,w.jsx)(`span`,{className:`ds-palette-item-icon`,children:`🔌`}),(0,w.jsx)(`span`,{className:`ds-palette-item-name`,children:e}),r===o&&(0,w.jsx)(`span`,{className:`ds-palette-enter-indicator`,children:`⏎ Select`})]},e))})]})})}var Be=[{hex:`#38BDF8`,label:`Sky Blue`},{hex:`#10B981`,label:`Emerald`},{hex:`#F59E0B`,label:`Amber`},{hex:`#8B5CF6`,label:`Purple`},{hex:`#F43F5E`,label:`Rose`},{hex:`#EA7600`,label:`Orange`},{hex:`#0088CC`,label:`Cyan`},{hex:`#EC4899`,label:`Pink`},{hex:`#6366F1`,label:`Indigo`}];function Ve({isOpen:e,onClose:t,onUpdate:n}){let[r,i]=(0,d.useState)([]),[a,o]=(0,d.useState)(``),[s,c]=(0,d.useState)(``),[l,u]=(0,d.useState)(``),[f,p]=(0,d.useState)(``),[m,h]=(0,d.useState)(``),[g,v]=(0,d.useState)(`#38BDF8`),[y,b]=(0,d.useState)(``),[S,T]=(0,d.useState)(null),E=()=>{i(C.getAllTypes())};(0,d.useEffect)(()=>{e&&(E(),o(``),c(``),u(``),p(``),h(``),v(`#38BDF8`),b(``))},[e]);let D=(0,d.useMemo)(()=>_({code:s||`custom`,label:(s||`CUSTOM`).toUpperCase(),color:g||`#38BDF8`,logoXml:y}),[s,g,y]),j=(0,d.useMemo)(()=>`data:image/svg+xml;utf8,${encodeURIComponent(D)}`,[D]),N=(0,d.useMemo)(()=>{let e=[...r].sort((e,t)=>e.code.localeCompare(t.code));if(!a.trim())return e;let t=a.toLowerCase().trim();return e.filter(e=>{let n=e.code.toLowerCase().includes(t),r=(e.type||``).toLowerCase().includes(t),i=(e.description||``).toLowerCase().includes(t),a=(e.extensions||[]).some(e=>e.toLowerCase().includes(t));return n||r||i||a})},[r,a]),P=e=>{if(e.preventDefault(),!s.trim()||!l.trim())return;let t=s.trim().toLowerCase(),r=f.split(`,`).map(e=>e.trim().toLowerCase().replace(/^\./,``)).filter(Boolean),i=_({code:t,label:t.toUpperCase(),color:g||`#38BDF8`,logoXml:y}),a=`data:image/svg+xml;utf8,${encodeURIComponent(i)}`;C.addCustomType({code:t,type:l.trim(),extensions:r,description:m.trim(),icon:i,iconPath:a}),E(),c(``),u(``),p(``),h(``),v(`#38BDF8`),b(``),n&&n()},I=e=>{T(e)};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(M,{isOpen:e,title:`Format Type Manager`,onClose:t,size:`xl`,className:`ds-type-manager-modal`,"data-tour":`format-manager-dialog`,children:(0,w.jsxs)(`div`,{className:`ds-type-manager-layout`,children:[(0,w.jsxs)(`form`,{onSubmit:P,className:`ds-type-manager-form`,children:[(0,w.jsx)(`h3`,{className:`ds-type-manager-section-title`,children:`Add Custom Format`}),(0,w.jsx)(A,{label:`Format Code (e.g., usd, abc)`,value:s,onChange:e=>c(e.target.value),placeholder:`e.g. exr`,required:!0}),(0,w.jsx)(A,{label:`Format Display Name`,value:l,onChange:e=>u(e.target.value),placeholder:`e.g. OpenEXR Image Sequence`,required:!0}),(0,w.jsx)(A,{label:`File Extensions (comma-separated, e.g. exr, sxr)`,value:f,onChange:e=>p(e.target.value),placeholder:`e.g. exr, sxr`}),(0,w.jsx)(A,{label:`Description`,value:m,onChange:e=>h(e.target.value),placeholder:`Brief description of pipeline usage...`}),(0,w.jsxs)(`div`,{className:`ds-input-group`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Badge Theme Color`}),(0,w.jsxs)(`div`,{className:`ds-color-swatches-wrap`,children:[Be.map(e=>(0,w.jsx)(`button`,{type:`button`,className:`ds-color-swatch ${g===e.hex?`ds-color-swatch--active`:``}`,style:{backgroundColor:e.hex},onClick:()=>v(e.hex),title:e.label},e.hex)),(0,w.jsx)(`input`,{type:`color`,value:g,onChange:e=>v(e.target.value),className:`ds-custom-color-input`,title:`Choose custom color`})]})]}),(0,w.jsxs)(`div`,{className:`ds-input-group`,children:[(0,w.jsx)(`label`,{className:`ds-input-label`,children:`Custom Inner Logo Path (optional)`}),(0,w.jsx)(`textarea`,{value:y,onChange:e=>b(e.target.value),placeholder:`e.g. <path d='M12 2L2 22h20L12 2z'/> or SVG paths`,className:`ds-textarea`,rows:2})]}),(0,w.jsxs)(`div`,{className:`ds-badge-preview-card`,children:[(0,w.jsx)(`span`,{className:`ds-badge-preview-label`,children:`Live Icon Preview:`}),(0,w.jsx)(`div`,{className:`ds-badge-preview-icon-wrap`,children:(0,w.jsx)(`img`,{src:j,alt:`Badge Preview`,className:`ds-badge-preview-img`})})]}),(0,w.jsx)(O,{type:`submit`,variant:`primary`,children:`Add Format Code`})]}),(0,w.jsxs)(`div`,{className:`ds-type-manager-list-pane`,children:[(0,w.jsxs)(`h3`,{className:`ds-type-manager-section-title`,children:[`Registered Data Formats (`,N.length,`)`]}),(0,w.jsx)(`div`,{className:`mb-2`,children:(0,w.jsx)(A,{placeholder:`Search format code, name, extensions, description...`,value:a,onChange:e=>o(e.target.value)})}),(0,w.jsx)(ee,{className:`ds-type-manager-scroll-area`,children:(0,w.jsx)(`div`,{className:`ds-type-manager-list`,children:N.length===0?(0,w.jsxs)(`div`,{className:`text-center text-xs text-muted py-4`,children:[`No formats match "`,a,`"`]}):N.map(e=>(0,w.jsxs)(`div`,{className:`ds-format-row`,children:[(0,w.jsxs)(`div`,{className:`ds-format-row-info-wrap`,children:[(0,w.jsx)(`img`,{src:e.iconPath||C.getDataUrl(e.code)||x(`/data_type_icons/${e.code}.svg`),alt:``,className:`ds-format-row-icon`,onError:e=>{e.target.src=x(`/data_type_icons/usd.svg`)}}),(0,w.jsxs)(`div`,{className:`ds-format-info`,children:[(0,w.jsxs)(`div`,{className:`ds-format-header`,children:[(0,w.jsx)(`span`,{className:`ds-format-code`,children:e.code.toUpperCase()}),(0,w.jsx)(`span`,{className:`ds-format-name`,children:e.type}),e.extensions&&e.extensions.length>0&&(0,w.jsxs)(`span`,{className:`ds-format-exts`,style:{fontSize:`11px`,color:`var(--ds-text-secondary)`,marginLeft:`6px`,opacity:.8},children:[`(`,e.extensions.map(e=>`.${e}`).join(`, `),`)`]})]}),e.description&&(0,w.jsx)(`span`,{className:`ds-format-desc`,children:e.description})]})]}),(0,w.jsx)(`div`,{className:`ds-format-row-actions`,children:e.isCustom?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(F,{variant:`accent`,children:`Custom`}),(0,w.jsx)(k,{icon:`✕`,size:`sm`,onClick:()=>I(e.code),className:`text-error`,title:`Delete Custom Format`})]}):(0,w.jsx)(F,{variant:`primary`,children:`Built-in`})})]},e.code))})})]})]})}),(0,w.jsx)(we,{isOpen:S!==null,title:`Delete Custom Format`,message:`Are you sure you want to delete the custom data format "${S?.toUpperCase()}"? This action cannot be undone.`,onClose:()=>T(null),onConfirm:()=>{S&&(C.removeCustomType(S),E(),n&&n()),T(null)}})]})}function He(e,t){if(!e||!t)return null;let n=e.nodes.get(t);if(!n)return null;let r=new m;if(n.preset===`node_preset_backdrop`){let{width:i,height:a}=q(n),o=n.position.x,s=n.position.y,c=[];for(let[t,r]of e.nodes.entries()){if(t===n.name)continue;let{width:e,height:l}=q(r),u=r.position.x,d=r.position.y;u>=o&&u+e<=o+i&&d>=s&&d+l<=s+a&&c.push(r)}let l=r.createNode(t,{...n.position},n.preset);l&&(l.metadata=JSON.parse(JSON.stringify(n.metadata||{})));let u=new Set(c.map(e=>e.name));for(let e of c){let t=r.createNode(e.name,{...e.position},e.preset);t&&(t.metadata=JSON.parse(JSON.stringify(e.metadata||{}))),e.attributes.forEach(t=>r.createAttribute(e.name,t))}for(let t of e.connections)u.has(t.sourceNode)&&u.has(t.targetNode)&&r.createConnection(t.sourceNode,t.sourceAttr,t.targetNode,t.targetAttr);return r}let i=e.getIsolatedData(t);if(!i)return null;let a=r.createNode(t,{x:200,y:200},n.preset);return a&&(a.metadata=JSON.parse(JSON.stringify(n.metadata||{}))),n.attributes.forEach(e=>r.createAttribute(t,e)),Object.entries(i.inputs).forEach(([n,i])=>{i.connections.forEach(([i,a])=>{if(!r.nodes.has(i)){let t=e.nodes.get(i),n=r.createNode(i,{x:50,y:100},t?.preset);n&&t&&(n.metadata=JSON.parse(JSON.stringify(t.metadata||{}))),t?.attributes.forEach(e=>r.createAttribute(i,e))}r.createConnection(i,a,t,n)})}),Object.entries(i.outputs).forEach(([n,i])=>{i.connections.forEach(([i,a])=>{if(!r.nodes.has(i)){let t=e.nodes.get(i),n=r.createNode(i,{x:400,y:100},t?.preset);n&&t&&(n.metadata=JSON.parse(JSON.stringify(t.metadata||{}))),t?.attributes.forEach(e=>r.createAttribute(i,e))}r.createConnection(t,n,i,a)})}),be(r,{animate:!1,nodesep:35,ranksep:220,centralNodeName:t}),r}function Ue({isOpen:e,onClose:t,nodeName:n,mainGraph:r}){let i=(0,d.useRef)(null),a=(0,d.useRef)(null),[o,s]=(0,d.useState)({x:0,y:0}),[c,l]=(0,d.useState)(1),[u,f]=(0,d.useState)({width:500,height:350}),[p,m]=(0,d.useState)(null),[h,g]=(0,d.useState)(0);(0,d.useEffect)(()=>{if(!e||!n||!r)return;let t=He(r,n);t&&(m(t),g(e=>e+1),setTimeout(()=>{a.current&&f({width:a.current.clientWidth,height:a.current.clientHeight})},100))},[e,n,r]),(0,d.useEffect)(()=>{if(!p||p.nodes.size===0)return;let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of p.nodes.values()){let{width:a,height:o}=q(i),{x:s,y:c}=i.position;s<e&&(e=s),s+a>t&&(t=s+a),c<n&&(n=c),c+o>r&&(r=c+o)}let i=t-e+120,a=r-n+120,o=u.width/i,c=u.height/a,d=Math.max(.2,Math.min(1.5,Math.min(o,c))),f=e+(t-e)/2,m=n+(r-n)/2;l(d),s({x:u.width/2-f*d,y:u.height/2-m*d})},[u,h,p]),(0,d.useEffect)(()=>{let e=i.current;if(!e||!p)return;let t=e.getContext(`2d`);t.clearRect(0,0,u.width,u.height),t.save(),t.translate(o.x,o.y),t.scale(c,c),se(t,u.width,u.height,o,c),p.connections.forEach(e=>{let n=p.nodes.get(e.sourceNode),r=p.nodes.get(e.targetNode);if(!n||!r)return;let i=Q(n,e.sourceAttr,`plug`),a=Q(r,e.targetAttr,`socket`),o=n.attributes.find(t=>t.name===e.sourceAttr);Y(t,i,a,e,o?.dataType,!0,p)}),p.nodes.forEach(e=>{ce(t,e,e.name===n)}),t.restore()},[u,o,c,p,h,n]);let[_,v]=(0,d.useState)(!1),[y,b]=(0,d.useState)({x:0,y:0}),x=e=>{v(!0),b({x:e.clientX-o.x,y:e.clientY-o.y})},S=e=>{_&&s({x:e.clientX-y.x,y:e.clientY-y.y})},C=()=>{v(!1)},T=(0,d.useRef)(c),E=(0,d.useRef)(o);return(0,d.useEffect)(()=>{T.current=c,E.current=o},[c,o]),(0,d.useEffect)(()=>{let e=i.current;if(!e)return;let t=t=>{t.preventDefault();let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top,a=T.current,o=E.current,c={x:(r-o.x)/a,y:(i-o.y)/a},u=1.15,d=t.deltaY<0?a*u:a/u,f=Math.max(.1,Math.min(3,d));l(f),s({x:r-c.x*f,y:i-c.y*f})},n={lastPos:null,pinchDist:null,pinchZoom:null,midpoint:null},r=t=>{if(t.touches.length===1)t.preventDefault(),n.lastPos={x:t.touches[0].clientX,y:t.touches[0].clientY},n.pinchDist=null;else if(t.touches.length===2){t.preventDefault();let r=e.getBoundingClientRect(),i=t.touches[0],a=t.touches[1];n.pinchDist=Math.hypot(a.clientX-i.clientX,a.clientY-i.clientY),n.pinchZoom=T.current,n.midpoint={x:(i.clientX+a.clientX)/2-r.left,y:(i.clientY+a.clientY)/2-r.top},n.lastPos=null}},a=t=>{if(t.touches.length===1&&n.lastPos){t.preventDefault();let e=t.touches[0].clientX-n.lastPos.x,r=t.touches[0].clientY-n.lastPos.y;s(t=>({x:t.x+e,y:t.y+r})),n.lastPos={x:t.touches[0].clientX,y:t.touches[0].clientY}}else if(t.touches.length===2&&n.pinchDist!==null){t.preventDefault();let r=e.getBoundingClientRect(),i=t.touches[0],a=t.touches[1],o=Math.hypot(a.clientX-i.clientX,a.clientY-i.clientY)/n.pinchDist,c=Math.max(.1,Math.min(3,n.pinchZoom*o)),u={x:(i.clientX+a.clientX)/2-r.left,y:(i.clientY+a.clientY)/2-r.top},d=E.current,f=n.midpoint||u,p=(f.x-d.x)/T.current,m=(f.y-d.y)/T.current,h=u.x-f.x,g=u.y-f.y;l(c),s({x:u.x-p*c+h,y:u.y-m*c+g}),n.midpoint=u}},o=e=>{e.touches.length===0&&(n.lastPos=null,n.pinchDist=null,n.pinchZoom=null,n.midpoint=null)};return e.addEventListener(`wheel`,t,{passive:!1}),e.addEventListener(`touchstart`,r,{passive:!1}),e.addEventListener(`touchmove`,a,{passive:!1}),e.addEventListener(`touchend`,o,{passive:!1}),()=>{e.removeEventListener(`wheel`,t),e.removeEventListener(`touchstart`,r),e.removeEventListener(`touchmove`,a),e.removeEventListener(`touchend`,o)}},[e,p]),(0,w.jsx)(M,{isOpen:e,title:`Isolated View: ${n}`,onClose:t,size:`xl`,className:`ds-isolated-view-modal`,children:(0,w.jsx)(`div`,{ref:a,className:`ds-isolated-view-container`,children:(0,w.jsx)(`canvas`,{ref:i,width:u.width,height:u.height,onMouseDown:x,onMouseMove:S,onMouseUp:C,onMouseLeave:C,className:`ds-isolated-view-canvas`})})})}var We=480,Ge=({onLoadSample:e,setIsSidebarCollapsed:t,setSidebarTab:n,setSelection:r,setActiveModal:i,setPanelWidth:a,graph:o})=>[{target:`body`,placement:`center`,title:`👋 Welcome to Plumber Manager`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`p`,{style:{marginBottom:`10px`},children:[(0,w.jsx)(`strong`,{children:`Plumber Manager`}),` is a modern CG Pipeline visualization tool designed to map, document, and manage DCC data flows and asset handoffs.`]}),(0,w.jsx)(`p`,{className:`text-xs text-muted`,children:`Let's take a quick guided tour of all UI options, features, and dialog options!`})]})},{target:`[data-tour="menu-bar"]`,placement:`bottom-start`,title:`📁 Main Menu Bar`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`Use the main menu bar to manage your pipeline diagram files:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`New / Open / Save`}),`: Wipes workspace or loads/downloads `,(0,w.jsx)(`code`,{children:`.gph`}),` files.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Export`}),`: Render to PNG, SVG, or multi-page PDF documents.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Formats`}),`: Manage DCC file extensions & custom format registries.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Help & About`}),`: View keyboard shortcuts and version specs.`]})]})]})},{target:`[data-tour="search-palette-trigger"]`,placement:`bottom-end`,title:`🔍 Quick Search Palette (Ctrl+K)`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`p`,{style:{marginBottom:`10px`},children:[`Press `,(0,w.jsx)(`code`,{children:`Ctrl + K`}),` anywhere in the app to open the quick search palette.`]}),(0,w.jsx)(`p`,{className:`text-xs text-muted`,children:`Instantly jump to any process node, filter by format slots, or execute menu actions without leaving your keyboard.`})]})},{target:`[data-tour="toolbar"]`,placement:`bottom-start`,title:`⚡ Canvas Toolbar`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`Quickly manipulate the active diagram layout and history:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`+ Create Process`}),`: Spawn a new process node (or press `,(0,w.jsx)(`code`,{children:`Ctrl+P`}),`).`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`⚡ Auto Layout`}),`: Execute Dagre compound layout graph positioning.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`🔍 Isolate Selected`}),`: Open sub-viewport focused on dependencies.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`↶ / ↷ History`}),`: Command transaction undo and redo (`,(0,w.jsx)(`code`,{children:`Ctrl+Z`}),` / `,(0,w.jsx)(`code`,{children:`Ctrl+Y`}),`).`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`🗺️ Minimap`}),`: Toggle spatial viewport navigator.`]})]})]})},{target:`[data-tour="canvas-container"]`,placement:`right`,title:`🎨 Interactive HTML5 Canvas Viewport`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`The canvas provides hardware-accelerated 2D diagram rendering:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Pan & Zoom`}),`: Middle-mouse drag or wheel scroll. Press `,(0,w.jsx)(`code`,{children:`F`}),` to fit view.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Box Selection`}),`: Drag marquee box across multiple nodes.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Backdrop Groups`}),`: Group processes together inside backdrop boxes with resize handles.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Note Blocks`}),`: Sticky notes with inline markdown and YIQ luminance contrast text.`]})]})]}),before:async()=>{o&&o.nodes.size===0&&e&&await e(`minimal`,!0),t&&t(!1),a&&a(We),await new Promise(e=>setTimeout(e,200))}},{target:`[data-tour="sidebar-properties"]`,placement:`left`,title:`🎛️ Right Inspector — Properties Tab`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`The right panel displays full configuration options for the selected process node:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsx)(`li`,{children:`Rename process nodes and pick custom highlight accent colors.`}),(0,w.jsxs)(`li`,{children:[`Add format-aware `,(0,w.jsx)(`strong`,{children:`Input Sockets`}),` and `,(0,w.jsx)(`strong`,{children:`Output Plugs`}),`.`]}),(0,w.jsx)(`li`,{children:`Assign data format types (USD, Alembic, EXR, Maya, Nuke).`})]})]}),before:async()=>{if(o&&o.nodes.size===0&&e&&await e(`minimal`,!0),t&&t(!1),n&&n(`properties`),a&&a(We),o&&o.nodes.size>0&&r){let e=Array.from(o.nodes.keys())[0];r([e])}await new Promise(e=>setTimeout(e,200))}},{target:`[data-tour="sidebar-properties"]`,placement:`left`,title:`📝 Right Inspector — Details & Markdown Tab`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`p`,{style:{marginBottom:`10px`},children:[`The panel switches to the `,(0,w.jsx)(`strong`,{children:`Details`}),` tab to edit rich WYSIWYG documentation:`]}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsx)(`li`,{children:`Edit markdown descriptions, publish steps, and data contracts.`}),(0,w.jsxs)(`li`,{children:[`Click `,(0,w.jsx)(`strong`,{children:`↗️ Expand`}),` to open the full-screen markdown modal editor.`]})]})]}),before:async()=>{if(o&&o.nodes.size===0&&e&&await e(`minimal`,!0),t&&t(!1),n&&n(`details`),a&&a(We),o&&o.nodes.size>0&&r){let e=Array.from(o.nodes.keys())[0];r([e])}await new Promise(e=>setTimeout(e,200))}},{target:`[data-tour="format-manager-trigger"]`,placement:`bottom`,title:`🏷️ DCC Formats Menu`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`p`,{style:{marginBottom:`10px`},children:[`Clicking `,(0,w.jsx)(`strong`,{children:`Formats`}),` in the main menu opens the custom CG extension registry.`]}),(0,w.jsx)(`p`,{className:`text-xs text-muted`,children:`Let's take a look inside the Format Type Manager dialog on the next step!`})]}),before:async()=>{i&&i(null)}},{target:`[data-tour="format-manager-dialog"]`,placement:`right`,title:`⚙️ Format Type Manager Dialog`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`Register and manage custom CG file extensions and formats:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsxs)(`li`,{children:[`Define format codes (e.g. `,(0,w.jsx)(`code`,{children:`usd`}),`, `,(0,w.jsx)(`code`,{children:`exr`}),`, `,(0,w.jsx)(`code`,{children:`abc`}),`, `,(0,w.jsx)(`code`,{children:`ma`}),`).`]}),(0,w.jsx)(`li`,{children:`Assign unique color tags and custom SVG file type icons.`}),(0,w.jsx)(`li`,{children:`Connection paths automatically render centered format badges!`})]})]}),before:async()=>{i&&i(`FORMAT_MANAGER`),await new Promise(e=>setTimeout(e,150))}},{target:`[data-tour="export-trigger"]`,placement:`bottom`,title:`📤 Export Menu`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`p`,{style:{marginBottom:`10px`},children:[`Clicking `,(0,w.jsx)(`strong`,{children:`Export...`}),` opens high-resolution diagram export options.`]}),(0,w.jsx)(`p`,{className:`text-xs text-muted`,children:`Let's inspect the SVG, PNG, and PDF rendering options on the next step!`})]}),before:async()=>{i&&i(null)}},{target:`[data-tour="export-dialog-modal"]`,placement:`right`,title:`🖼️ Diagram Export & Report Settings`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`Export your pipeline architecture directly into production deliverables:`}),(0,w.jsxs)(`ul`,{style:{paddingLeft:`18px`,margin:0,fontSize:`14px`,lineHeight:`1.6`},children:[(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Vector SVG`}),` with embedded format badges and header clip paths.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`High-DPI PNG / JPEG`}),` raster images for wiki pages.`]}),(0,w.jsxs)(`li`,{children:[(0,w.jsx)(`strong`,{children:`Multi-Page PDF`}),` documentation reports with cover pages.`]})]})]}),before:async()=>{i&&i(`EXPORT_DIALOG`),await new Promise(e=>setTimeout(e,150))}},{target:`[data-tour="status-bar"]`,placement:`top`,title:`🚀 Ready to Build!`,content:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`p`,{style:{marginBottom:`10px`},children:`You're all set to start mapping your CG pipelines!`}),(0,w.jsxs)(`p`,{className:`text-xs text-muted`,children:[`You can restart this onboarding tour anytime from the `,(0,w.jsx)(`strong`,{children:`Help`}),` menu or the Welcome Screen.`]})]}),before:async()=>{i&&i(null)}}];function Ke({index:e,step:t,backProps:n,closeProps:r,skipProps:i,primaryProps:a,tooltipProps:o,controls:s,size:c,isLastStep:l}){let u=e=>{$.savePreferences({hasCompletedTour:!0});let t=i||r;t&&t.onClick&&t.onClick(e)},d=e=>{l&&$.savePreferences({hasCompletedTour:!0}),a&&a.onClick&&a.onClick(e)};return(0,w.jsxs)(`div`,{className:`ds-tour-tooltip`,...o,children:[(0,w.jsxs)(`div`,{className:`ds-tour-header`,children:[t.title&&(0,w.jsx)(`h3`,{className:`ds-tour-title`,children:t.title}),(0,w.jsxs)(`span`,{className:`ds-tour-step-badge`,children:[`Step `,e+1,` of `,c]})]}),(0,w.jsx)(`div`,{className:`ds-tour-body`,children:t.content}),(0,w.jsxs)(`div`,{className:`ds-tour-footer`,children:[(0,w.jsx)(`button`,{type:`button`,className:`ds-tour-skip-btn`,...i||r,onClick:u,title:`Skip onboarding tour`,children:`Skip Tour`}),(0,w.jsxs)(`div`,{className:`ds-tour-actions`,children:[e>0&&(0,w.jsx)(`button`,{type:`button`,className:`ds-tour-btn ds-tour-btn-secondary`,...n,children:`Back`}),(0,w.jsx)(`button`,{type:`button`,className:`ds-tour-btn ds-tour-btn-primary`,...a,onClick:d,children:l?`Finish`:`Next`})]})]})]})}function qe({run:e,onCloseTour:t,graph:n,onLoadSample:r,_isSidebarCollapsed:i,setIsSidebarCollapsed:o,setActiveModal:l,setSidebarTab:u,setSelection:f,setPanelWidth:p}){let[m,h]=(0,d.useState)(0),g=(0,d.useRef)(!1),_=(0,d.useRef)({onLoadSample:r,setIsSidebarCollapsed:o,setSidebarTab:u,setSelection:f,setActiveModal:l,setPanelWidth:p,graph:n});(0,d.useEffect)(()=>{_.current={onLoadSample:r,setIsSidebarCollapsed:o,setSidebarTab:u,setSelection:f,setActiveModal:l,setPanelWidth:p,graph:n}});let v=(0,d.useMemo)(()=>Ge({onLoadSample:(...e)=>_.current.onLoadSample?.(...e),setIsSidebarCollapsed:(...e)=>_.current.setIsSidebarCollapsed?.(...e),setSidebarTab:(...e)=>_.current.setSidebarTab?.(...e),setSelection:(...e)=>_.current.setSelection?.(...e),setActiveModal:(...e)=>_.current.setActiveModal?.(...e),setPanelWidth:(...e)=>_.current.setPanelWidth?.(...e),get graph(){return _.current.graph}}),[m]);(0,d.useEffect)(()=>{e&&!g.current&&(h(e=>e+1),n&&n.nodes.size===0&&r&&r(`minimal`,!0)),g.current=e},[e,n,r]);let y=(0,d.useCallback)((e,n)=>{let{status:r,type:i}=e;([c.FINISHED,c.SKIPPED].includes(r)||i===s.TOUR_END)&&($.savePreferences({hasCompletedTour:!0}),l&&l(null),t&&t())},[l,t]);return e?(0,w.jsx)(a,{steps:v,run:e,continuous:!0,tooltipComponent:Ke,onEvent:y,options:{zIndex:10050,primaryColor:`hsl(142, 36%, 59%)`,backgroundColor:`hsl(210, 12%, 22%)`,textColor:`hsl(0, 0%, 93%)`,overlayColor:`rgba(10, 15, 20, 0.75)`,spotlightPadding:6,spotlightRadius:8,blockTargetInteraction:!1,overlayClickAction:!1,buttons:[`back`,`close`,`primary`,`skip`],beforeTimeout:8e3,targetWaitTimeout:3e3}},m):null}function Je(){let{graph:e,selection:t,setSelection:n,updateTrigger:r}=D(),[i,a]=(0,d.useState)(()=>$.getPreferences().panelWidth),[o,s]=(0,d.useState)(!1),[c,l]=(0,d.useState)(null),[u,f]=(0,d.useState)(``),[p,m]=(0,d.useState)(!1),[h]=(0,d.useState)(()=>$.getPreferences().autoRelayout),[g,_]=(0,d.useState)(null),[v,y]=(0,d.useState)(null),[b,S]=(0,d.useState)(()=>$.getRecentFiles()),[C,T]=(0,d.useState)(()=>$.getPreferences().minimapEnabled),[E,O]=(0,d.useState)(null),[k,A]=(0,d.useState)({isOpen:!1,title:``,message:``}),[j,M]=(0,d.useState)(!1),[P,F]=(0,d.useState)(()=>!$.getPreferences().hasCompletedTour),[I,ee]=(0,d.useState)(`properties`),[z,B]=(0,d.useState)([{id:`animation`,name:`Animation Pipeline`,file:`animation.gph`},{id:`minimal`,name:`Minimal Diagram`,file:`minimal.gph`},{id:`test`,name:`Test Diagram`,file:`test.gph`}]),[V,H]=(0,d.useState)(!1),[ie,U]=(0,d.useState)(!1),W=(0,d.useRef)(null);(0,d.useEffect)(()=>{fetch(x(`/samples/manifest.json`)).then(e=>{if(e.ok)return e.json();throw Error(`No manifest file`)}).then(e=>{Array.isArray(e)&&e.length>0&&B(e)}).catch(e=>{console.warn(`Failed to load sample manifest, using default list`,e)})},[]),(0,d.useEffect)(()=>{let e=e=>{W.current&&!W.current.contains(e.target)&&(H(!1),U(!1))},t=e=>{e.key===`Escape`&&(H(!1),U(!1))};return document.addEventListener(`mousedown`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`mousedown`,e),document.removeEventListener(`keydown`,t)}},[]);let{executeAction:G,undo:K,redo:se,canUndo:q,canRedo:ce,clearHistory:J}=re(),Y=(0,d.useCallback)((e,t=`secondary`)=>{_({message:e,type:t})},[]);(0,d.useEffect)(()=>{t.length===1?(l(t[0]),f(t[0])):(l(null),f(``))},[t]),(0,d.useEffect)(()=>{e.nodes.size>0&&$.autoSave(e)},[r,e]),(0,d.useEffect)(()=>{$.hasAutoSave()&&e.nodes.size===0&&M(!0)},[e]);let X=(0,d.useCallback)(async()=>{try{let t=await Re(`.gph, .json`);t&&t.content&&(A({isOpen:!0,title:`Opening Graph`,message:`Loading ${t.name}...`}),setTimeout(()=>{let n=R(t.content,e);A({isOpen:!1}),n?($.addRecentFile(t.name,t.content),S($.getRecentFiles()),Y(`Loaded graph: ${t.name}`,`accent`)):Y(`Failed to parse graph file. Format invalid.`,`danger`)},300))}catch{A({isOpen:!1}),Y(`Error opening file.`,`danger`)}},[e,Y]),Z=(0,d.useCallback)(()=>{if(e.nodes.size===0){Y(`Cannot save an empty graph.`,`secondary`);return}try{A({isOpen:!0,title:`Saving Graph`,message:`Saving file to your computer...`}),setTimeout(()=>{let t=Le(L(e),`pipeline.gph`,`application/json`);A({isOpen:!1}),t?Y(`Graph downloaded successfully.`,`accent`):Y(`Failed to save file.`,`danger`)},300)}catch{A({isOpen:!1}),Y(`Error saving file.`,`danger`)}},[e,Y]);(0,d.useEffect)(()=>{let e=e=>{e.target.tagName===`INPUT`||e.target.tagName===`TEXTAREA`||e.target.tagName===`SELECT`||e.target.isContentEditable||e.target.closest(`[contenteditable="true"]`)||(e.ctrlKey&&e.key.toLowerCase()===`z`&&(e.preventDefault(),K(),Y(`Undone.`,`secondary`)),e.ctrlKey&&(e.key.toLowerCase()===`y`||e.shiftKey&&e.key.toLowerCase()===`z`)&&(e.preventDefault(),se(),Y(`Redone.`,`secondary`)),e.ctrlKey&&e.key.toLowerCase()===`k`&&(e.preventDefault(),y(`SEARCH_PALETTE`)),e.ctrlKey&&e.key.toLowerCase()===`p`&&(e.preventDefault(),y(`CREATE_NODE`)),e.ctrlKey&&e.key.toLowerCase()===`o`&&(e.preventDefault(),X()),e.ctrlKey&&e.key.toLowerCase()===`s`&&(e.preventDefault(),Z()))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[K,se,X,Z,Y]);let Q=t=>{A({isOpen:!0,title:`Restoring Graph`,message:`Loading recent graph file...`}),setTimeout(()=>{let n=R(t.content,e);A({isOpen:!1}),n?(J(),Y(`Loaded recent graph: ${t.name}`,`accent`)):Y(`Failed to load recent graph.`,`danger`)},300)},le=(0,d.useCallback)(async(t,r=!1)=>{try{r||A({isOpen:!0,title:`Loading Sample`,message:`Fetching /samples/${t}.gph...`});let i=await fetch(x(`/samples/${t}.gph`));if(!i.ok)throw Error(`Sample file not found`);let a=R(await i.text(),e);if(r||A({isOpen:!1}),a){J();let i=Array.from(e.nodes.keys())[0];i&&n([i]),r||Y(`Loaded sample graph: ${t}`,`accent`)}else r||Y(`Failed to parse sample graph.`,`danger`)}catch(e){r||A({isOpen:!1}),console.warn(`Fetch failed, loading fallback local samples.`,e),r||Y(`Failed to fetch sample: /samples/${t}.gph`,`danger`)}},[e,J,n,Y]),ue=t=>{G(()=>{e.createNode(t,{x:150,y:150})?(n([t]),Y(`Node "${t}" created.`,`primary`)):Y(`A node named "${t}" already exists.`,`danger`)},`Create Process Node`)},de=(t,n)=>{c&&G(()=>{e.createAttribute(c,{name:t,plug:!1,socket:!0,dataType:n}),Y(`Input slot "${t}" created on "${c}".`,`primary`)},`Create Input Attribute`)},fe=(t,n)=>{c&&G(()=>{e.createAttribute(c,{name:t,plug:!0,socket:!1,dataType:n}),Y(`Output slot "${t}" created on "${c}".`,`primary`)},`Create Output Attribute`)},pe=()=>{G(()=>{be(e),Y(`Auto-layout computed successfully.`,`accent`)},`Auto Layout Graph`)},me=()=>{let e=!C;T(e),$.savePreferences({minimapEnabled:e})},he=e=>{e.preventDefault()},ge=t=>{t.preventDefault();let n=t.dataTransfer.files[0];if(n&&(n.name.endsWith(`.gph`)||n.name.endsWith(`.json`))){let t=new FileReader;t.onload=t=>{R(t.target.result,e)?(J(),$.addRecentFile(n.name,t.target.result),S($.getRecentFiles()),Y(`Dropped and loaded graph: ${n.name}`,`accent`)):Y(`Failed to parse dropped file.`,`danger`)},t.readAsText(n)}},_e=e=>{e.preventDefault(),s(!0),document.addEventListener(`mousemove`,ve),document.addEventListener(`mouseup`,ye)},ve=e=>{let t=window.innerWidth-e.clientX,n=Math.floor(window.innerWidth*.5);t>260&&t<n&&(a(t),$.savePreferences({panelWidth:t}))},ye=()=>{s(!1),document.removeEventListener(`mousemove`,ve),document.removeEventListener(`mouseup`,ye)};return(0,w.jsxs)(`div`,{className:`ds-app-shell flex flex-col h-full overflow-hidden`,onDragOver:he,onDrop:ge,children:[(0,w.jsxs)(`header`,{className:`ds-menu-bar flex items-center justify-between shrink-0`,"data-tour":`menu-bar`,children:[(0,w.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,w.jsxs)(`div`,{className:`ds-app-logo flex items-center gap-2`,children:[(0,w.jsx)(`img`,{src:x(`/favicon.svg`),alt:``,className:`ds-logo-icon`,style:{width:`20px`,height:`20px`,objectFit:`contain`}}),(0,w.jsx)(`span`,{className:`ds-logo-text font-bold`,children:`PlumberManager`})]}),(0,w.jsxs)(`nav`,{className:`ds-menu-nav flex items-center`,children:[(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:()=>{O({title:`Clear Workspace`,message:`Clear current editor workspace? This will wipe all nodes and configurations.`,onConfirm:()=>{G(()=>{e.clear(),$.clearAutoSave(),Y(`Cleared workspace.`,`secondary`)},`Clear Workspace`)}})},children:`New`}),(0,w.jsxs)(`div`,{className:`ds-menu-container`,ref:W,children:[(0,w.jsx)(`button`,{className:`ds-menu-trigger ${V?`ds-menu-trigger--active`:``}`,onClick:()=>H(e=>!e),children:`Open ▾`}),V&&(0,w.jsxs)(`div`,{className:`ds-menu-dropdown`,children:[(0,w.jsx)(`button`,{className:`ds-menu-dropdown-item`,onClick:()=>{H(!1),U(!1),X()},children:(0,w.jsx)(`span`,{children:`📁 From file...`})}),(0,w.jsx)(`div`,{className:`ds-menu-dropdown-divider`}),(0,w.jsxs)(`div`,{className:`ds-submenu-container`,onMouseEnter:()=>U(!0),onMouseLeave:()=>U(!1),children:[(0,w.jsxs)(`button`,{className:`ds-menu-dropdown-item ${ie?`ds-menu-dropdown-item--active`:``}`,onClick:()=>U(e=>!e),children:[(0,w.jsx)(`span`,{children:`Samples`}),(0,w.jsx)(`span`,{children:`▸`})]}),ie&&(0,w.jsx)(`div`,{className:`ds-submenu-dropdown`,children:z.map(e=>(0,w.jsx)(`button`,{className:`ds-menu-dropdown-item`,onClick:()=>{H(!1),U(!1),le(e.id)},title:e.description||e.name,children:(0,w.jsx)(`span`,{children:e.name})},e.id))})]})]})]}),(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:Z,children:`Save`}),(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:()=>y(`EXPORT_DIALOG`),"data-tour":`export-trigger`,children:`Export...`}),(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:()=>y(`FORMAT_MANAGER`),"data-tour":`format-manager-trigger`,children:`Formats`}),(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:()=>y(`HELP_DIALOG`),children:`Help`}),(0,w.jsx)(`button`,{className:`ds-menu-trigger`,onClick:()=>y(`ABOUT`),children:`About`})]})]}),(0,w.jsx)(`div`,{className:`ds-menu-bar-right text-xs text-muted pr-4`,"data-tour":`search-palette-trigger`,children:`Ctrl+K Search`})]}),(0,w.jsxs)(`div`,{className:`flex flex-row flex-1 overflow-hidden relative`,children:[(0,w.jsxs)(`main`,{className:`ds-main-area flex-1 flex flex-col overflow-hidden relative`,children:[(0,w.jsx)(ne,{onCreateNode:()=>y(`CREATE_NODE`),onAutoLayout:pe,onIsolateSelected:()=>y(`ISOLATION_VIEW`),undoEnabled:q,redoEnabled:ce,onUndo:K,onRedo:se,minimapEnabled:C,onToggleMinimap:me}),(0,w.jsxs)(`div`,{className:`ds-canvas-container flex-1 bg-app relative`,"data-tour":`canvas-container`,children:[e.nodes.size===0?(0,w.jsx)(oe,{onCreateNode:()=>y(`CREATE_NODE`),onOpenFile:X,onLoadSample:le,recentFiles:b,onOpenRecent:Q,onStartTour:()=>F(!0)}):(0,w.jsx)(Me,{autoRelayout:h,minimapEnabled:C}),p&&(0,w.jsx)(`button`,{type:`button`,className:`ds-sidebar-expand-btn`,onClick:()=>m(!1),title:`Expand Sidebar`,children:`◂`})]})]}),!p&&(0,w.jsx)(`div`,{className:`ds-resizer ${o?`ds-resizer--active`:``}`,onMouseDown:_e}),!p&&(0,w.jsx)(`aside`,{className:`ds-sidebar shrink-0`,style:{width:i},"data-tour":`sidebar-properties`,children:(0,w.jsx)(N,{title:c?`Properties — ${u}`:`Properties`,collapsible:!1,className:`h-full border-none rounded-none`,headerActions:(0,w.jsx)(`button`,{type:`button`,className:`ds-sidebar-collapse-btn`,onClick:()=>m(!0),title:`Collapse Sidebar`,children:`▸`}),children:(0,w.jsx)(ae,{nodeName:c,onNameChange:f,onCreateInput:()=>y(`CREATE_INPUT`),onCreateOutput:()=>y(`CREATE_OUTPUT`),onExpandDetails:()=>y(`MARKDOWN_EDITOR`),activeTab:I,onTabChange:ee})})})]}),(0,w.jsxs)(`footer`,{className:`ds-status-bar flex items-center justify-between shrink-0 px-4 text-xs text-secondary border-t`,"data-tour":`status-bar`,children:[(0,w.jsx)(`div`,{children:`Ready`}),(0,w.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,w.jsxs)(`div`,{children:[`Nodes: `,e.nodes.size]}),(0,w.jsxs)(`div`,{children:[`Connections: `,e.connections.length]})]})]}),(0,w.jsx)(Se,{isOpen:v===`CREATE_NODE`,onClose:()=>y(null),onCreate:ue}),(0,w.jsx)(Ce,{isOpen:v===`CREATE_INPUT`,onClose:()=>y(null),type:`input`,onCreate:de}),(0,w.jsx)(Ce,{isOpen:v===`CREATE_OUTPUT`,onClose:()=>y(null),type:`output`,onCreate:fe}),(0,w.jsx)(Te,{isOpen:v===`ABOUT`,onClose:()=>y(null)}),(0,w.jsx)(ze,{isOpen:v===`SEARCH_PALETTE`,onClose:()=>y(null),onSelectNode:e=>n([e])}),(0,w.jsx)(Ve,{isOpen:v===`FORMAT_MANAGER`,onClose:()=>y(null),onUpdate:()=>e.emit(`node:moved`,{})}),(0,w.jsx)(Ue,{isOpen:v===`ISOLATION_VIEW`,onClose:()=>y(null),nodeName:c,mainGraph:e}),(0,w.jsx)(Ae,{isOpen:v===`EXPORT_DIALOG`,onClose:()=>y(null),graph:e,onShowProgress:(e,t,n)=>{A({isOpen:e,title:t||``,message:n||``})}}),(0,w.jsx)(je,{isOpen:v===`HELP_DIALOG`,onClose:()=>y(null),onStartTour:()=>F(!0)}),(0,w.jsx)(qe,{run:P,onCloseTour:()=>{F(!1),y(null),$.savePreferences({hasCompletedTour:!0})},graph:e,onLoadSample:le,isSidebarCollapsed:p,setIsSidebarCollapsed:m,setActiveModal:y,setSidebarTab:ee,setSelection:n,setPanelWidth:a,selection:t}),c&&e.nodes.has(c)&&(0,w.jsx)(ke,{isOpen:v===`MARKDOWN_EDITOR`,nodeName:c,initialContent:e.nodes.get(c).metadata?.process_details||``,onClose:()=>y(null),onSave:t=>{e.updateNodeMetadata(c,`process_details`,t),e.emit(`node:moved`,{}),Y(`Documentation saved.`,`accent`)}}),(0,w.jsx)(De,{isOpen:k.isOpen,title:k.title,message:k.message}),(0,w.jsx)(we,{isOpen:E!==null,title:E?.title,message:E?.message,onClose:()=>O(null),onConfirm:()=>{E?.onConfirm&&E.onConfirm(),O(null)}}),(0,w.jsx)(we,{isOpen:j,title:`Restore Workspace`,message:`We found unsaved changes from your previous session. Would you like to restore them?`,onClose:()=>{M(!1),$.clearAutoSave()},onConfirm:()=>{M(!1),$.loadAutoSave(e),J(),Y(`Restored previous unsaved work.`,`accent`)}}),g&&(0,w.jsx)(te,{message:g.message,type:g.type,onClose:()=>_(null),duration:3e3})]})}var Ye=class extends d.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error(`PlumberManager ErrorBoundary caught an exception:`,e,t),this.setState({errorInfo:t})}handleReset=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?this.props.fallback?this.props.fallback:(0,w.jsx)(`div`,{className:`ds-error-boundary-container`,children:(0,w.jsxs)(`div`,{className:`ds-error-boundary-card`,children:[(0,w.jsx)(`div`,{className:`ds-error-boundary-icon`,children:`⚠️`}),(0,w.jsx)(`h2`,{className:`ds-error-boundary-title`,children:`Something went wrong`}),(0,w.jsx)(`p`,{className:`ds-error-boundary-msg`,children:`An unexpected error occurred in the PlumberManager UI module.`}),this.state.error&&(0,w.jsxs)(`div`,{className:`ds-error-boundary-details`,children:[(0,w.jsxs)(`strong`,{children:[this.state.error.name,`:`]}),` `,this.state.error.message,this.state.errorInfo&&(0,w.jsx)(`div`,{style:{marginTop:`8px`,opacity:.8},children:this.state.errorInfo.componentStack})]}),(0,w.jsxs)(`div`,{className:`ds-error-boundary-actions`,children:[(0,w.jsx)(O,{variant:`secondary`,onClick:this.handleReset,children:`Try Again`}),(0,w.jsx)(O,{variant:`primary`,onClick:this.handleReload,children:`Reload Application`})]})]})}):this.props.children}};function Xe(){return(0,w.jsx)(Ye,{children:(0,w.jsx)(E,{children:(0,w.jsx)(Je,{})})})}f.createRoot(document.getElementById(`root`)).render((0,w.jsx)(d.StrictMode,{children:(0,w.jsx)(Xe,{})}));export{q as a,W as c,m as d,ce as i,C as l,Q as n,G as o,Y as r,K as s,be as t,x as u};