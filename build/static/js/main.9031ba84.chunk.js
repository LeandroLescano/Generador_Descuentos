(this["webpackJsonpyour-app"]=this["webpackJsonpyour-app"]||[]).push([[0],{103:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(22),o=t.n(l),r=(t(66),t(67),t(68),t(69),t(11)),c=t(12),i=t(20),d=t(13),u=t(19),m=t(3),g=t(23),f=t(25),p=(t(49),t(24)),h=t(31),v=t.n(h),E=function(e){function a(){var e,t;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(t=Object(i.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(s)))).state={typeFile:"",nameNovedades:"",nameAusencias:"",listOficinas:[],fileNovedades:null,fileAusencias:null,checkAus:!1,checkNov:!1,uploadValue:0,modal1:!1,modal2:!1,modal3:!1,modal4:!1,descuentos:[{nombre:"",numero:null,agentesAus:[],agentesNov:[]}]},t.recargar=function(){window.location.reload()},t.scrollToTop=function(){return window.scrollTo(0,0)},t.handleClick=function(e){(t.setState({typeFile:e.target.value}),"Novedades"===e.target.value)?document.getElementById("fileNovedades").click():document.getElementById("fileAusencias").click()},t.handleChange=function(e){var a=e.target.value.substr(12);e.target.files.length>0&&("Novedades"===t.state.typeFile?t.setState({nameNovedades:a,fileNovedades:e.target.files[0]},(function(){var e=!1;null!==t.state.fileNovedades&&"application/vnd.ms-excel"!==t.state.fileNovedades.type?(t.toggleModal(1)(),t.setState({checkNov:e})):t.papaParsePromiseNov(t.state.fileNovedades).then((function(a){a?e=!0:t.toggleModal(3)(),t.setState({checkNov:e})}))})):t.setState({nameAusencias:a,fileAusencias:e.target.files[0]},(function(){var e=!1;null!==t.state.fileAusencias&&"application/vnd.ms-excel"!==t.state.fileAusencias.type?(t.toggleModal(1)(),t.setState({checkAus:e})):t.papaParsePromiseAus(t.state.fileAusencias).then((function(a){a?e=!0:t.toggleModal(2)(),t.setState({checkAus:e})}))})))},t.leerArchivoA=function(e,a){(new FileReader).readAsDataURL(e);var n=[],s=JSON.parse(JSON.stringify(t.state.descuentos)),l=[20,21,22,28,32,42,43,45,46,47,48,49,51,53,55,60,64,100,117,122,133,150,203,206,245];v.a.parse(e,{complete:function(e){for(var a=e.data,t=0,o=0,r=0,c=0,i=0,d=0;"Observaciones"!==a[0][d]&&d<a[0].length;)d++;var u=d,m=a[0][u+3];s[0]={nombre:m.substring(m.indexOf("- ")+8),numero:m.substring(7,10),agentesAus:[],agentesNov:[]};for(var g=a[c][u+1];c<a.length-1;){n.includes(a[c][u+3].substring(7,10))||n.push(a[c][u+3].substring(7,10));var f=null,p=[];for(t=0,o=0,r=0,i+=1,g=a[c][u+1];g===a[c][u+1];){var h=a[c][u+10],v=h.substring(0,h.indexOf(" -"));if(l.includes(parseInt(v))&&(p.push({codigo:v,nombre:h.substring(h.indexOf("- ")+2),fechai:a[c][u+6],fechaf:a[c][u+7],dias:parseInt(a[c][u+8],10),descripcion:a[c][u+11]}),"49"===v?o+=parseInt(a[c][u+8],10):"51"===v?r+=parseInt(a[c][u+8],10):t+=parseInt(a[c][u+8],10),f=JSON.parse(JSON.stringify({key:i,default:"0",legajo:g.substring(3,g.indexOf(" -")),oficina:a[c][u+3].substring(7,10),nombre:a[c][u+2].replace("\ufffd","\xd1"),diasdesc:t.toString(),diasexenfer:o.toString(),diasexenfamil:r.toString(),ausencias:p}))),!(c+1<a.length)){c++;break}c++}null!==f&&s[0].agentesAus.push(f)}console.log(n)}},t.setState({descuentos:s,listOficinas:n},(function(){t.state.checkNov?t.leerArchivoN(t.state.fileNovedades,"N",s):t.props.onUpload(t.state.descuentos)})))},t.leerArchivoN=function(e,a,n){var s;(new FileReader).readAsDataURL(e),s=null!=n?Object.assign({},n):[];var l=[1,2,3,4];v.a.parse(e,{complete:function(e){var a=e.data;console.log(a);var t=-1,o=0,r=0,c=a[0][6];s[0]=null!=n?{nombre:n[0].nombre,numero:n[0].numero,agentesAus:n[0].agentesAus,agentesNov:[]}:{nombre:"",numero:c.substring(c.indexOf("Oficina")+8,c.indexOf("Oficina")+11),agentesAus:[],agentesNov:[]};for(var i=a[o][11];o<a.length-1;){var d=null,u={hora:0,min:0},m=[];for(t=-1,r+=1,i=a[o][16].substring(3,8);i===a[o][16].substring(3,8);){var g=a[o][20],f=g.substring(0,g.indexOf(" -"));if(l.includes(parseInt(f))){if(m.push({nombre:g.substring(g.indexOf("- ")+2),valor:a[o][23],dias:parseInt(a[o][18],10)}),"4"===f)t++;else{var p=parseInt(a[o][23].substring(0,2)),h=parseInt(a[o][23].substring(3,5));u.hora+=p,u.min+h>59?(u.hora++,u.min+=h-60):u.min+=h}var v=u.hora;v<=0?u.min>15&&u.min<=30?v+=.5:u.min>30&&(v+=1):u.min>0&&u.min<=30?v+=.5:u.min>30&&(v+=1),v=v.toString().replace(",",".");var E=0;t>=1&&(E=t),(E>0||v>0)&&(d=JSON.parse(JSON.stringify({key:r,default:"0",legajo:i,nombre:a[o][16].substring(11).replace("\ufffd","\xd1"),diasdesc:E.toString(),horasdesc:v.toString(),novedades:m})))}if(!(o+1<a.length-1)){o++;break}o++}if(null!==d){if(s[0].agentesAus.length>0){var b=s[0].agentesAus.findIndex((function(e){return e.legajo===d.legajo}));-1!==b&&d.diasdesc>0?s[0].agentesAus[b].diasdesc=parseInt(s[0].agentesAus[b].diasdesc)+parseInt(d.diasdesc):d.diasdesc>0&&(s[0].agentesAus.push(d),s[0].agentesAus.sort((function(e,a){return e.legajo-a.legajo})))}s[0].agentesNov.push(d)}}}},t.setState({descuentos:s},(function(){t.props.onUpload(t.state.descuentos)})))},t.papaParsePromiseAus=function(e){return new Promise((function(a,t){v.a.parse(e,{step:function(e,t){for(var n=e.data,s=0;s<n.length;s++)"Dias Corridos"===n[s]&&(a(!0),t.abort());a(!1)}})}))},t.papaParsePromiseNov=function(e){return new Promise((function(a,t){v.a.parse(e,{step:function(e,t){for(var n=e.data,s=0;s<n.length;s++)"Valor"===n[s]&&a(!0);a(!1)}})}))},t.generarDescuentos=function(){t.state.checkAus?t.leerArchivoA(t.state.fileAusencias,"A"):t.state.checkNov&&t.leerArchivoN(t.state.fileNovedades,"N")},t.toggleModal=function(e){return function(){var a="modal"+e;t.setState(Object(p.a)({},a,!t.state[a]))}},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=null===this.state.fileAusencias?"btn-elegant":this.state.checkAus?"btn-success":"btn-danger",a=null===this.state.fileNovedades?"btn-elegant":this.state.checkNov?"btn-success":"btn-danger";return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"mt-3 mb-5"},s.a.createElement(m.j,null,s.a.createElement(m.y,null,s.a.createElement(m.e,{md:"10",className:"mx-auto float-none white z-depth-1 py-2 px-2"},s.a.createElement(m.d,{className:"text-center"},s.a.createElement("h2",{className:"h2-responsive mb-4"},s.a.createElement("strong",{className:"font-weight-bold"},"Subir archivos misma oficina (.csv)")),s.a.createElement(m.y,null),s.a.createElement(m.y,{className:"d-flex flex-row justify-content-center row"},s.a.createElement("button",{className:"btn Ripple-parent ".concat(a),onClick:this.handleClick,value:"Novedades"},"Novedades"),s.a.createElement("input",{id:"fileNovedades",type:"file",hidden:!0,onChange:this.handleChange}),s.a.createElement("button",{className:"btn Ripple-parent ".concat(e),onClick:this.handleClick,value:"Ausencias"},"Ausencias"),s.a.createElement("input",{id:"fileAusencias",type:"file",hidden:!0,onChange:this.handleChange})),s.a.createElement(m.y,{className:"d-flex flex-row justify-content-center row"},s.a.createElement("p",{className:"textFile"},this.state.nameNovedades),s.a.createElement("p",{className:"textFile"},this.state.nameAusencias)),s.a.createElement("button",{className:"btn Ripple-parent btn-success top20",onClick:this.generarDescuentos},"Generar"))))),s.a.createElement(m.g,null,s.a.createElement(m.n,{isOpen:this.state.modal1,toggle:this.toggleModal(1)},s.a.createElement(m.q,{toggle:this.toggleModal(1)},"Ha ocurrido un problema"),s.a.createElement(m.o,null,"El archivo elegido no corresponde a un",s.a.createElement("strong",null," archivo .CSV"),", por favor intente nuevamente."),s.a.createElement(m.p,null,s.a.createElement(m.c,{color:"indigo",onClick:this.toggleModal(1)},"Entendido"))),s.a.createElement(m.n,{isOpen:this.state.modal2,toggle:this.toggleModal(2)},s.a.createElement(m.q,{toggle:this.toggleModal(2)},"Ha ocurrido un problema"),s.a.createElement(m.o,null,"El archivo de ",s.a.createElement("strong",null,"ausencias")," seleccionado no es v\xe1lido, intente con otro archivo. ",s.a.createElement("br",null)," ",s.a.createElement("br",null),"Recuerde que el mismo debe ser descargado de: ",s.a.createElement("br",null),"'Ausencias por legajo completo'.",s.a.createElement("br",null)," ",s.a.createElement("br",null),"En caso de que el error persista, por favor comun\xedquese con el administrador del sistema."),s.a.createElement(m.p,null,s.a.createElement(m.c,{color:"indigo",onClick:this.toggleModal(2)},"Entendido"))),s.a.createElement(m.n,{isOpen:this.state.modal3,toggle:this.toggleModal(3)},s.a.createElement(m.q,{toggle:this.toggleModal(3)},"Ha ocurrido un problema"),s.a.createElement(m.o,null,"El archivo de ",s.a.createElement("strong",null,"novedades")," seleccionado no es v\xe1lido, intente nuevamente.",s.a.createElement("br",null),s.a.createElement("br",null),"En caso de que el error persista, por favor comun\xedquese con el administrador del sistema."),s.a.createElement(m.p,null,s.a.createElement(m.c,{color:"indigo",onClick:this.toggleModal(3)},"Entendido"))),s.a.createElement(m.n,{isOpen:this.state.modal4,toggle:this.toggleModal(4)},s.a.createElement(m.q,{toggle:this.toggleModal(4)},"Ha ocurrido un problema"),s.a.createElement(m.o,null,"Ambos archivos seleccionados no son v\xe1lidos, intente nuevamente.",s.a.createElement("br",null),s.a.createElement("br",null),"En caso de que el error persista, por favor comun\xedquese con el administrador del sistema."),s.a.createElement(m.p,null,s.a.createElement(m.c,{color:"indigo",onClick:this.toggleModal(4)},"Entendido"))))))}}]),a}(s.a.Component),b=t(18),N=t(42);t(88),t(89),t(90);var A=function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.d,{className:"text-center"},s.a.createElement("div",{className:"col-md-12 centrar"},s.a.createElement("svg",{className:"spinner",width:"65px",height:"65px",viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("circle",{className:"circle",fill:"none",strokeWidth:"6",strokeLinecap:"round",cx:"33",cy:"33",r:"30"})),s.a.createElement("h3",{className:"top20"},"Generando descuentos..."))))},x=t(108),y=t(28),w=t.n(y),O=t(59);var j=function(e){var a=this,t=e.desc,l=Object(n.useState)(!1),o=Object(N.a)(l,2),r=o[0],c=o[1],i=Object(n.useState)({showToast:!1,agentesAusMesAnterior:[{ausencias:[],default:0,diasdesc:null,diasexenfamil:null,diasexenfer:null,key:null,legajo:"",nombre:""}],descuentos:t,loaded:!1,valuesMesAnterior:[]}),d=Object(N.a)(i,2),u=d[0],g=d[1],f=function(e,a){var t=u.valuesMesAnterior;void 0===t[e]?function(e,a){"diasdesc"===a.target.name?g((function(t){return Object(b.a)({},t,{valuesMesAnterior:Object(b.a)({},t.valuesMesAnterior,Object(p.a)({},e,{diasdesc:a.target.value}))})})):"diasexenfer"===a.target.name?g((function(t){return Object(b.a)({},t,{valuesMesAnterior:Object(b.a)({},t.valuesMesAnterior,Object(p.a)({},e,{diasexenfer:a.target.value}))})})):g((function(t){return Object(b.a)({},t,{valuesMesAnterior:Object(b.a)({},t.valuesMesAnterior,Object(p.a)({},e,{diasexenfamil:a.target.value}))})}))}(e,a):("diasdesc"===a.target.name?t[e].diasdesc=a.target.value:"diasexenfer"===a.target.name?t[e].diasexenfer=a.target.value:t[e].diasexenfamil=a.target.value,g((function(e){return Object(b.a)({},e,{valuesMesAnterior:t})})))};Object(n.useEffect)((function(){console.log(e.desc),void 0===e.desc&&(window.location.href="/"),setTimeout((function(){g({showToast:!1,agentesAusMesAnterior:[{ausencias:[],default:0,diasdesc:null,diasexenfamil:null,diasexenfer:null,key:null,legajo:"",nombre:""}],descuentos:e.desc,loaded:!0,valuesMesAnterior:[]}),h()}),2e3)}),[]);var h=function(){console.log("checkOmisionesF");var e=new Date,a=e.getMonth();if(console.log(e),console.log("mesAnterior: "+a),null!=u.descuentos[0].agentesAus)var t=u.descuentos[0].agentesAus.filter((function(e){return null!=e.ausencias})).filter((function(t){return t.ausencias.some((function(t){return parseInt(t.fechai.substring(t.fechai.indexOf("/")+1,t.fechai.lastIndexOf("/")))<a||parseInt(t.fechaf.substring(t.fechaf.indexOf("/")+1,t.fechaf.lastIndexOf("/")))>a||parseInt(t.fechai.substring(6,10)<e.getFullYear())}))}));g((function(e){return Object(b.a)({},e,{agentesAusMesAnterior:t})})),u.descuentos[0].agentesNov.filter((function(e){return e.diasdesc>0})).length>0&&u.descuentos[0].agentesAus.length>0&&E()},v=function(){c(!r)},E=function(){O.a.fire({toast:!0,position:"top",icon:"warning",title:"Las omisiones de fichada fueron automaticamente pasadas al archivo de ausencias",timer:6e3,timerProgressBar:!0})},y={columns:[{label:"Legajo",field:"id"},{label:"Apellido y Nombre",field:"heading0"},{label:"D\xedas a descuento",field:"heading1"},{label:"D\xedas exceso enfermedad",field:"heading2"},{label:"D\xedas exceso familiar enf.",field:"heading3"}],columnsN:[{label:"Legajo",field:"id"},{label:"Apellido y Nombre",field:"heading0"},{label:"Horas a descuento",field:"heading1"},{label:"D\xedas a descuento",field:"heading2"}]};return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"mt-3 mb-5"},s.a.createElement(m.j,null,s.a.createElement(m.y,null,s.a.createElement(m.e,{md:"10",className:"mx-auto float-none white z-depth-1 py-2 px-2"},!u.loaded&&s.a.createElement(A,null),u.loaded&&s.a.createElement(m.d,{className:"text-center"},s.a.createElement("span",{className:"arrowBack",onClick:function(){window.location.reload()}},s.a.createElement("i",{className:"material-icons"},"arrow_back_ios"),s.a.createElement("p",{style:{float:"right"}},"Volver")),s.a.createElement("h2",{className:"h2-responsive mb-4"},s.a.createElement("strong",{className:"font-weight-bold"},"Resultados")),s.a.createElement(m.y,null),u.descuentos[0].agentesAus.length>0&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"d-flex"},s.a.createElement("h3",{className:"h3-responsive text-left mb-2"},s.a.createElement("strong",{className:"font-weight-bold"},"Ausencias ",u.descuentos[0].numero)),u.agentesAusMesAnterior.length>0&&s.a.createElement(m.c,{className:"btn-elegant ml-auto",onClick:function(){return v()}},"Ausencias excedentes al mes actual")),s.a.createElement(m.z,{responsiveSm:!0},s.a.createElement(m.B,{columns:y.columns,color:"indigo",textWhite:!0}),s.a.createElement(m.D,null,u.descuentos[0].agentesAus.map((function(e,a){return s.a.createElement("tr",{key:a},s.a.createElement("td",{className:"text-center"},e.legajo),s.a.createElement("td",null,e.nombre),s.a.createElement("td",{className:"text-center"},e.diasdesc),s.a.createElement("td",{className:"text-center"},e.diasexenfer),s.a.createElement("td",{className:"text-center"},e.diasexenfamil))})))),u.descuentos[0].agentesAus.filter((function(e){return e.diasdesc>0})).length>0&&s.a.createElement(w.a,{id:"test",bom:"false",filename:"Descuento ausencias "+u.descuentos[0].numero+".csv",datas:u.descuentos[0].agentesAus.filter((function(e){return e.diasdesc>0})),columns:[{id:"legajo",displayName:""},{id:"default",displayName:""},{id:"diasdesc",displayName:""}]},s.a.createElement("button",{className:"btn Ripple-parent btn-indigo top20"},"Descargar descuentos ausencias (.csv)")),u.descuentos[0].agentesAus.filter((function(e){return e.diasexenfer>0})).length>0&&s.a.createElement(w.a,{filename:"Descuento dias exceso enfermedad "+u.descuentos[0].numero+".csv",datas:u.descuentos[0].agentesAus.filter((function(e){return e.diasexenfer>0})),columns:[{id:"legajo",displayName:""},{id:"default",displayName:""},{id:"diasexenfer",displayName:""}]},s.a.createElement("button",{className:"btn Ripple-parent btn-indigo top20"},"Descargar descuentos exceso enfermedad (.csv)")),u.descuentos[0].agentesAus.filter((function(e){return e.diasexenfamil>0})).length>0&&s.a.createElement(w.a,{filename:"Descuento dias exceso familiar enf. "+u.descuentos[0].numero+".csv",datas:u.descuentos[0].agentesAus.filter((function(e){return e.diasexenfamil>0})),columns:[{id:"legajo",displayName:""},{id:"default",displayName:""},{id:"diasexenfamil",displayName:""}]},s.a.createElement("button",{className:"btn Ripple-parent btn-indigo top20"},"Descargar descuentos exceso familiar enf. (.csv)"))),u.descuentos[0].agentesNov.length>0&&s.a.createElement(s.a.Fragment,null,s.a.createElement("h3",{className:"h3-responsive text-left mb-2 mt-3"},s.a.createElement("strong",{className:"font-weight-bold"}," ","Novedades ",u.descuentos[0].numero)),s.a.createElement(m.z,{responsiveSm:!0},s.a.createElement(m.B,{columns:y.columnsN,color:"indigo",textWhite:!0}),s.a.createElement(m.D,null,u.descuentos[0].agentesNov.map((function(e,a){return s.a.createElement("tr",{key:a},s.a.createElement("td",{className:"text-center"},e.legajo),s.a.createElement("td",null,e.nombre),s.a.createElement("td",{className:"text-center"},e.horasdesc),s.a.createElement("td",{className:"text-center"},e.diasdesc))})))),u.descuentos[0].agentesNov.filter((function(e){return e.horasdesc>=.5})).length>0&&s.a.createElement(w.a,{filename:"Descuento horas novedades "+u.descuentos[0].numero+".csv",datas:u.descuentos[0].agentesNov.filter((function(e){return e.horasdesc>=.5})),columns:[{id:"legajo",displayName:""},{id:"default",displayName:""},{id:"horasdesc",displayName:""}]},s.a.createElement("button",{className:"btn Ripple-parent btn-indigo top20"},"Descargar descuentos horas novedades (.csv)")),u.descuentos[0].agentesNov.filter((function(e){return e.diasdesc>=1})).length>0&&u.descuentos[0].agentesAus.length<=0&&s.a.createElement(w.a,{filename:"Descuento dias novedades "+u.descuentos[0].numero+".csv",datas:u.descuentos[0].agentesNov.filter((function(e){return e.diasdesc>=1})),columns:[{id:"legajo",displayName:""},{id:"default",displayName:""},{id:"diasdesc",displayName:""}]},s.a.createElement("button",{className:"btn Ripple-parent btn-indigo top20"},"Descargar descuentos d\xedas novedades (.csv)"))))))),s.a.createElement(m.g,null),r&&s.a.createElement(m.n,{size:"lg",isOpen:r,toggle:function(){v()}},s.a.createElement(m.q,{toggle:function(){v()}},"Agentes que poseen ausencias del mes anterior o siguiente"),s.a.createElement(m.o,null,s.a.createElement(m.z,{className:"text-center",responsiveSm:!0},s.a.createElement(m.B,{columns:y.columns,color:"indigo",textWhite:!0}),s.a.createElement(m.A,null,u.agentesAusMesAnterior.length>0&&u.agentesAusMesAnterior.map((function(e,t){return s.a.createElement("tr",{key:t},s.a.createElement("td",{className:"text-center"},e.legajo),s.a.createElement("td",null,e.nombre),s.a.createElement("td",{className:"text-center"},s.a.createElement(m.m,{className:"text-center",name:"diasdesc",onChange:f.bind(a,e.legajo),valueDefault:e.diasdesc})),s.a.createElement("td",{className:"text-center"},s.a.createElement(m.m,{className:"text-center",name:"diasexenfer",onChange:f.bind(a,e.legajo),valueDefault:e.diasexenfer})),s.a.createElement("td",{className:"text-center"},s.a.createElement(m.m,{className:"text-center",name:"diasexenfamil",onChange:f.bind(a,e.legajo),valueDefault:e.diasexenfamil})))}))))),s.a.createElement(m.p,null,s.a.createElement(m.c,{color:"danger",onClick:function(){v()}},"Cancelar"),s.a.createElement(m.c,{color:"success",onClick:function(){!function(){var a=Object.assign({},e.desc),t=function(e){var t=u.descuentos[0].agentesAus.findIndex((function(a){return a.legajo===e}));u.valuesMesAnterior[e].diasdesc!==a[0].agentesAus[t].diasdesc&&void 0!==u.valuesMesAnterior[e].diasdesc&&(a[0].agentesAus[t].diasdesc=u.valuesMesAnterior[e].diasdesc),u.valuesMesAnterior[e].diasexenfer!==a[0].agentesAus[t].diasexenfer&&void 0!==u.valuesMesAnterior[e].diasexenfer&&(a[0].agentesAus[t].diasexenfer=u.valuesMesAnterior[e].diasexenfer),u.valuesMesAnterior[e].diasexenfamil!==a[0].agentesAus[t].diasexenfamil&&void 0!==u.valuesMesAnterior[e].diasexenfamil&&(a[0].agentesAus[t].diasexenfamil=u.valuesMesAnterior[e].diasexenfamil)};for(var n in u.valuesMesAnterior)t(n);g((function(e){return Object(b.a)({},e,{descuentos:a})})),v()}()}},"Guardar"))),u.showToast&&s.a.createElement(x.a,{show:u.showToast,onClose:function(){g((function(e){return Object(b.a)({},e,{showToast:!1})}))},delay:1e4,autohide:!0,className:"toast-place"},s.a.createElement(x.a.Header,null,s.a.createElement(m.k,{icon:"exclamation-triangle",className:"img-toast"}),s.a.createElement("strong",{className:"mr-auto"},"Omisiones de fichada")),s.a.createElement(x.a.Body,null,"Los descuentos por omisiones de fichada fueron sumados en el archivo de ausencias."))))},k=function(e){function a(){var e,t;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(t=Object(i.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(s)))).state={typeFile:"",nameNovedades:"",nameAusencias:"",fileNovedades:null,fileAusencias:null,descuentos:[{nombre:"",numero:null,agentesAus:[],agentesNov:[]}],resultados:!1,showHome:!0},t.handleChange=function(e){console.log(e),t.setState({descuentos:e},(function(){t.mostrarResultados()}))},t.mostrarResultados=function(){t.setState({resultados:!0,showHome:!1})},t.scrollToTop=function(){return window.scrollTo(0,0)},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.h,{color:"indigo darken-3",className:"sectionPage"}),this.state.showHome&&s.a.createElement(E,{agentes:this.state.agente,onUpload:this.handleChange}),this.state.resultados&&s.a.createElement(j,{desc:this.state.descuentos}))}}]),a}(s.a.Component),C=function(e){function a(){return Object(r.a)(this,a),Object(i.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement(f.c,null,s.a.createElement(f.a,{exact:!0,path:"/",component:k}),s.a.createElement(f.a,{exact:!0,path:"/resultados",component:j}),s.a.createElement(f.a,{render:function(){return s.a.createElement("div",{className:"jumbotron m-5"},s.a.createElement("h2",{className:"display-4"},"Oops!"),s.a.createElement("p",{className:"lead"},"La p\xe1gina especificada no existe."),s.a.createElement("hr",{className:"my-4"}),s.a.createElement("p",null,"Para volver a la pantalla principal haz click aqu\xed debajo"),s.a.createElement("a",{className:"btn btn-primary btn-md",href:"/",role:"button"},"Generador de descuentos"))}}))}}]),a}(s.a.Component),M=t(57);t.n(M).a.initializeApp({apiKey:"AIzaSyDmpS8UwB3aHq4qHuzlXVnSj1knOYY8yig",authDomain:"generador-descuentos.firebaseapp.com",databaseURL:"https://generador-descuentos.firebaseio.com",projectId:"generador-descuentos",storageBucket:"generador-descuentos.appspot.com",messagingSenderId:"91523567902",appId:"1:91523567902:web:9cd9a13edc8b30d609f90f",measurementId:"G-FBTKKQ9H97"});var S=function(e){function a(){var e,t;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(t=Object(i.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(s)))).state={collapseID:"",typeFile:"",nameNovedades:"",nameAusencias:"",fileNovedades:null,fileAusencias:null,uploadValue:0},t.toggleCollapse=function(e){return function(){return t.setState((function(a){return{collapseID:a.collapseID!==e?e:""}}))}},t.closeCollapse=function(e){return function(){window.scrollTo(0,0),t.state.collapseID===e&&t.setState({collapseID:""})}},t.recargar=function(){window.location.reload()},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=s.a.createElement("div",{id:"sidenav-overlay",style:{backgroundColor:"transparent"},onClick:this.toggleCollapse("mainNavbarCollapse")}),a=this.state.collapseID;return s.a.createElement(g.a,null,s.a.createElement("div",{className:"flyout"},s.a.createElement(m.s,{color:"indigo",dark:!0,expand:"md",fixed:"top",scrolling:!0},s.a.createElement(m.t,{href:"/",className:"py-0 font-weight-bold"},s.a.createElement("strong",{className:"align-middle",onClick:this.recargar},"Generador de descuentos")),s.a.createElement(m.v,{onClick:this.toggleCollapse("mainNavbarCollapse")}),s.a.createElement(m.f,{id:"mainNavbarCollapse",isOpen:this.state.collapseID,navbar:!0},s.a.createElement(m.u,{right:!0},s.a.createElement(m.r,null,s.a.createElement("strong",{style:{color:"white"}},"Versi\xf3n Beta 1.0"))))),a&&e,s.a.createElement("main",{style:{marginTop:"4rem"}},s.a.createElement(C,null)),s.a.createElement(m.i,{color:"indigo"},s.a.createElement("div",null,s.a.createElement("p",{className:"footer-copyright mb-2 pb-1 pt-2 text-center"},(new Date).getFullYear()," - Desarrollado por Lescano Leandro Nicolas"," ")))))}}]),a}(n.Component),D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function I(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(s.a.createElement(S,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");D?function(e){fetch(e).then((function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):I(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):I(e)}))}}()},49:function(e,a,t){},61:function(e,a,t){e.exports=t(103)},69:function(e,a,t){},88:function(e,a,t){},89:function(e,a,t){},90:function(e,a,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.9031ba84.chunk.js.map