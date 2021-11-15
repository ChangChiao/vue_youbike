var J=Object.defineProperty,Q=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var B=(e,t,o)=>t in e?J(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,S=(e,t)=>{for(var o in t||(t={}))X.call(t,o)&&B(e,o,t[o]);if(P)for(var o of P(t))q.call(t,o)&&B(e,o,t[o]);return e},R=(e,t)=>Q(e,W(t));import{r as x,o as p,c as d,a as w,w as z,b as g,F as k,d as M,p as O,e as E,f as ee,t as A,g as T,h as te,i as oe,j as ae,k as j,l as H,L as _,m as Y,n as ne,q as D,v as U,s as re,u as se,x as ie,y as ce,V as le,z as ue,A as pe,B as de}from"./vendor.4ba96625.js";const me=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}};me();var _e="./images/logo.png";var y=(e,t)=>{for(const[o,a]of t)e[o]=a;return e};const he={setup(){return{menuList:[{title:"\u4ECA\u65E5\u5929\u6C23",path:"/weather"},{title:"\u81EA\u884C\u8ECA\u9053",path:"/bikemap"},{title:"\u5468\u570D\u666F\u9EDE",path:"/spot"},{title:"\u6B77\u53F2\u7D00\u9304",path:"/history"}]}}},V=e=>(O("data-v-61dd7a3d"),e=e(),E(),e),ge={class:"flex justify-center box-border border-solid border-t-8 border-sub items-center font-medium"},ye=V(()=>g("img",{class:"pr-10",src:_e,alt:""},null,-1)),fe={class:"input-box flex h-10 w-56 items-center rounded-3xl text-gray-500"},ve=V(()=>g("input",{class:"w-30 pl-4 bg-transparent text-gray-900",placeholder:"\u641C\u5C0B\u81EA\u884C\u8ECA\u79DF\u501F\u7AD9",type:"text"},null,-1)),be={class:"menu flex"};function $e(e,t,o,a,n,i){const r=x("router-link"),f=x("BootstrapIcon");return p(),d("header",ge,[w(r,{to:"/"},{default:z(()=>[ye]),_:1}),g("div",fe,[w(f,{icon:"search",size:"2x","flip-v":""}),ve]),g("ul",be,[(p(!0),d(k,null,M(a.menuList,v=>(p(),d("li",{class:"mx-3 text-lg",key:v.path},[w(r,{to:v.path,class:"duration-200"},{default:z(()=>[ee(A(v.title),1)]),_:2},1032,["to"])]))),128))])])}var I=y(he,[["render",$e],["__scopeId","data-v-61dd7a3d"]]);const we={components:{Header:I},setup(){}};function ke(e){return(t,o)=>{const a=x("router-view");return p(),d(k,null,[w(I),w(a)],64)}}const Se=Object.assign(we,{setup:ke}),xe={components:{Header:I},setup(){return{address:T({list:[]})}}},Le={class:"text-grey-300 font-bold bg-green-500"};function Me(e,t,o,a,n,i){return p(),d("div",null,[te(" <Header /> "),g("ul",Le,[(p(!0),d(k,null,M(a.address.list,r=>(p(),d("li",{key:r.StationUID},A(r.StationAddress),1))),128))])])}var Ae=y(xe,[["render",Me]]);const Te={setup(){}};function Ie(e,t,o,a,n,i){return" weather "}var Ce=y(Te,[["render",Ie]]);const L=oe.create();L.interceptors.request.use(e=>e,e=>e);L.interceptors.response.use(e=>e.data,e=>Promise.reject(e));const C="https://ptx.transportdata.tw/MOTC/v2",Ne=C+"/Cycling/Shape",Pe=C+"/Bike/Station/NearBy",Be=C+"/Bike/Availability/NearBy",G=[{label:"\u81FA\u5317\u5E02",value:"Taipei"},{label:"\u65B0\u5317\u5E02",value:"NewTaipei"},{label:"\u6843\u5712\u5E02",value:"Taoyuan"},{label:"\u81FA\u4E2D\u5E02",value:"Taichung"},{label:"\u81FA\u5357\u5E02",value:"Tainan"},{label:"\u9AD8\u96C4\u5E02",value:"Kaohsiung"},{label:"\u57FA\u9686\u5E02",value:"Keelung"},{label:"\u65B0\u7AF9\u5E02",value:"Hsinchu"},{label:"\u65B0\u7AF9\u7E23",value:"HsinchuCounty"},{label:"\u82D7\u6817\u7E23",value:"MiaoliCounty"},{label:"\u5F70\u5316\u7E23",value:"ChanghuaCounty"},{label:"\u5357\u6295\u7E23",value:"NantouCounty"},{label:"\u96F2\u6797\u7E23",value:"YunlinCounty"},{label:"\u5609\u7FA9\u7E23",value:"ChiayiCounty"},{label:"\u5609\u7FA9\u5E02",value:"Chiayi"},{label:"\u5C4F\u6771\u7E23",value:"PingtungCounty"},{label:"\u5B9C\u862D\u7E23",value:"YilanCounty"},{label:"\u82B1\u84EE\u7E23",value:"HualienCounty"},{label:"\u81FA\u6771\u7E23",value:"TaitungCounty"},{label:"\u91D1\u9580\u7E23",value:"KinmenCounty"},{label:"\u6F8E\u6E56\u7E23",value:"PenghuCounty"},{label:"\u9023\u6C5F\u7E23",value:"LienchiangCounty"}],Re=()=>{let e="b65665fcca144956a79d25bb3edc7b34",t="daVxLDO01nPgTTwhQKVBmY-pjeQ";const o=new Date().toGMTString(),a=new ae("SHA-1","TEXT");a.setHMACKey(t,"TEXT"),a.update("x-date: "+o);let n=a.getHMAC("B64");return{Authorization:`hmac username="${e}", algorithm="hmac-sha1", headers="x-date", signature="${n}"`,"X-Date":o,"Content-Type":"application/x-www-form-urlencoded"}},N=()=>({headers:Re()}),ze=e=>{const{city:t=""}=e;return delete e.city,{cityPath:t,data:e}},Oe=e=>{const{cityPath:t,data:o}=ze(e);return L.get(Ne+`/${t}`,{params:S({},o)},N)},Ee=e=>L.get(Pe,{params:S({},e)},N),je=e=>L.get(Be,{params:S({},e)},N),He={setup(){let e=null,t=null;const o=()=>{let s="pk.eyJ1Ijoiam9lY2hhbmcxMDE0IiwiYSI6ImNrdno1ZnM3OTRtM2YzMG8wYnA2NGxpZzEifQ.EDTMLv4rcckA89UjJNWgXQ";e=_.map("map"),_.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery \xA9 <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1,accessToken:s}).addTo(e),t=new _.MarkerClusterGroup().addTo(e),n()},a=()=>{t.clearLayers(),e.eachLayer(s=>{s instanceof _.Marker&&e.removeLayer(s)})},n=()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(s=>{const u=s.coords.longitude,m=s.coords.latitude;console.log("longitude",u),console.log("latitude",m),e.setView([m,u],18),_.marker([m,u]).addTo(e).bindPopup("A pretty CSS3 popup.<br> Easily customizable.").openPopup(),r(u,m)},s=>{const{code:u,message:m}=s;console.log("error",`code=${u}, msg=${m}`)})},i=T([]),r=async(s,u)=>{const m={$spatialFilter:`nearby(${u},${s},${500})`};try{const h=await Ee(m);console.log("station",h),Object.assign(i,h),v(s,u)}catch(h){console.log("error",h)}},f=T([]),v=async(s,u)=>{const m={$spatialFilter:`nearby(${u},${s},${500})`};try{const h=await je(m);h.forEach(b=>{i.forEach($=>{$.StationUID===b.StationUID&&(b.StationName=$.StationName,b.StationPosition=$.StationPosition,b.StationAddress=$.StationAddress)})}),Object.assign(f,h),console.log("availableList",f),l()}catch(h){console.log("error",h)}},c=s=>new Date(s).toString("Zh_tw"),l=()=>{a(),f.forEach(s=>{let{PositionLat:u,PositionLon:m}=s.StationPosition,{AvailableRentBikes:h,AvailableReturnBikes:b,UpdateTime:$,StationName:K,StationAddress:F}=s;t.addLayer(_.marker([u,m]).bindPopup(`
                <h2 class="title">${K.Zh_tw}</h2>
                <h4>\u5730\u5740:${F.Zh_tw}</h4>
                <h4>\u53EF\u501F\u8173\u8E0F\u8ECA\u6578:${h}</h4>
                <h4>\u53EF\u9084\u8173\u8E0F\u8ECA\u6578:${b}</h4>
                <h4>\u66F4\u65B0\u6642\u9593:${c($)}</h4>
                <a target="_blank" href='https://www.google.com/maps/search/?api=1&query=${u},${m}'>\u5728google map\u4E0A\u67E5\u770B</a>`))}),e.addLayer(t)};return j(()=>{o()}),H(()=>{e=null}),{}}},Ye={id:"map",class:"w-screen h-screen"};function De(e,t,o,a,n,i){return p(),d("div",Ye)}var Ue=y(He,[["render",De]]);const Ve={components:{Map:Ue},setup(){}};function Ge(e,t,o,a,n,i){const r=x("Map");return p(),d("div",null,[w(r)])}var Ze=y(Ve,[["render",Ge]]);const Ke={setup(){}};function Fe(e,t,o,a,n,i){return null}var Je=y(Ke,[["render",Fe]]);const Qe={setup(){let e=null,t=null;const o=T({city:G[0].value,bikeRoute:"",routeList:[]}),a=()=>{let c="pk.eyJ1Ijoiam9lY2hhbmcxMDE0IiwiYSI6ImNrdno1ZnM3OTRtM2YzMG8wYnA2NGxpZzEifQ.EDTMLv4rcckA89UjJNWgXQ";e=_.map("map_route"),_.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery \xA9 <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1,accessToken:c}).addTo(e),t=new _.MarkerClusterGroup().addTo(e),f()},n=()=>{t.clearLayers(),e.eachLayer(c=>{c instanceof _.Marker&&e.removeLayer(c)})},i=async()=>{const c={city:o.city};try{const l=await Oe(c);l.length>1&&(o.routeList=l,o.bikeRoute=l[0].RouteName)}catch(l){console.log("error",l)}},r=()=>{const{Geometry:c}=o.routeList.find(l=>l.RouteName===o.bikeRoute);v(c)};Y(()=>o.city,()=>{i()}),Y(()=>o.bikeRoute,()=>{r()});const f=()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(c=>{const l=c.coords.longitude,s=c.coords.latitude;console.log("longitude",l),console.log("latitude",s),e.setView([s,l],18),_.marker([s,l]).addTo(e).bindPopup("A pretty CSS3 popup.<br> Easily customizable.").openPopup(),i()},c=>{const{code:l,message:s}=c;console.log("error",`code=${l}, msg=${s}`)})},v=c=>{console.log("Geometry",c),n();const l=new re.exports.Wkt;l.read(c);const s=l.toJson(),u={color:"olive",weight:5};t=_.geoJSON(s,{style:u}).addTo(e),t.addData(s),e.fitBounds(t.getBounds()),e.addLayer(t)};return j(()=>{a()}),H(()=>{e=null}),R(S({},ne(o)),{CITY_LIST:G})}},We=e=>(O("data-v-3aad47fd"),e=e(),E(),e),Xe=We(()=>g("div",{id:"map_route",class:"w-screen h-screen"},null,-1)),qe={class:"fixed top-20 right-10 w-20 h-20 z-20"},et=["value"],tt=["value"];function ot(e,t,o,a,n,i){return p(),d(k,null,[Xe,g("div",qe,[D(g("select",{name:"",id:"","onUpdate:modelValue":t[0]||(t[0]=r=>e.city=r)},[(p(!0),d(k,null,M(a.CITY_LIST,r=>(p(),d("option",{key:r.value,value:r.value},A(r.label),9,et))),128))],512),[[U,e.city]]),D(g("select",{name:"",id:"","onUpdate:modelValue":t[1]||(t[1]=r=>e.bikeRoute=r)},[(p(!0),d(k,null,M(e.routeList,r=>(p(),d("option",{key:r.RouteName,value:r.RouteName},A(r.RouteName),9,tt))),128))],512),[[U,e.bikeRoute]])])],64)}var at=y(Qe,[["render",ot],["__scopeId","data-v-3aad47fd"]]);const nt={components:{MapRoute:at},setup(){}};function rt(e,t,o,a,n,i){const r=x("map-route");return p(),se(r)}var st=y(nt,[["render",rt]]);const it=[{path:"/",name:"Index",component:Ae},{path:"/weather",name:"Weather",component:Ce},{path:"/bikemap",name:"BikeMap",component:Ze},{path:"/history",name:"History",component:Je},{path:"/Spot",name:"Spot",component:st}],ct=ie({history:ce(),routes:it});function lt(e){const o={tId:adminUse.Cookie("cAa")};e.commit("updLoading",!0),adminUse.getAjax(e.state.config.groupPath.platformAdmin+"/backLogOut",o).then(a=>{e.commit("updLoading",!1),a.resultCode=="000"?(adminUse.Cookie("remove","cAa"),e.commit("updMenuList",""),e.commit("updUserName",""),e.commit("updIsLogin",!1),adminUse.showToast(a.msg),router.push("/login")):adminUse.showToast(a.msg+"("+a.resultCode+")","red")})}var ut=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",logout:lt});const pt=new le({storage:window.localStorage,reducer:e=>({myPlatformId:e.myPlatformId})}),dt=()=>({config:{}});var mt=ue({state:dt,mutations:{updBeep(e,t){e.beep=t}},actions:ut,plugins:[pt.plugin],modules:{}});const Z=pe(Se);Z.component("BootstrapIcon",de);Z.use(mt).use(ct).mount("#app");
