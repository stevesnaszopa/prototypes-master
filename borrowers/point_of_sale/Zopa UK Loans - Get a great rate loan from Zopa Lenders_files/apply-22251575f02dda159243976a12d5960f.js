(function(e,t){typeof exports=="object"&&exports?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):t(e.Mustache={})})(this,function(e){function r(e){return typeof e=="function"}function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return s.call(e,t)}function a(e){return!o(u,e)}function l(e){return String(e).replace(/[&<>"'\/]/g,function(e){return f[e]})}function m(t,r){function m(){if(f&&!l)while(u.length)delete o[u.pop()];else u=[];f=!1,l=!1}function x(e){typeof e=="string"&&(e=e.split(h,2));if(!n(e)||e.length!==2)throw new Error("Invalid tags: "+e);w=new RegExp(i(e[0])+"\\s*"),E=new RegExp("\\s*"+i(e[1])),S=new RegExp("\\s*"+i("}"+e[1]))}if(!t)return[];var s=[],o=[],u=[],f=!1,l=!1,w,E,S;x(r||e.tags);var T=new b(t),N,C,k,L,A,O;while(!T.eos()){N=T.pos,k=T.scanUntil(w);if(k)for(var M=0,_=k.length;M<_;++M)L=k.charAt(M),a(L)?u.push(o.length):l=!0,o.push(["text",L,N,N+1]),N+=1,L==="\n"&&m();if(!T.scan(w))break;f=!0,C=T.scan(v)||"name",T.scan(c),C==="="?(k=T.scanUntil(p),T.scan(p),T.scanUntil(E)):C==="{"?(k=T.scanUntil(S),T.scan(d),T.scanUntil(E),C="&"):k=T.scanUntil(E);if(!T.scan(E))throw new Error("Unclosed tag at "+T.pos);A=[C,k,N,T.pos],o.push(A);if(C==="#"||C==="^")s.push(A);else if(C==="/"){O=s.pop();if(!O)throw new Error('Unopened section "'+k+'" at '+N);if(O[1]!==k)throw new Error('Unclosed section "'+O[1]+'" at '+N)}else C==="name"||C==="{"||C==="&"?l=!0:C==="="&&x(k)}O=s.pop();if(O)throw new Error('Unclosed section "'+O[1]+'" at '+T.pos);return y(g(o))}function g(e){var t=[],n,r;for(var i=0,s=e.length;i<s;++i)n=e[i],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(t.push(n),r=n));return t}function y(e){var t=[],n=t,r=[],i,s;for(var o=0,u=e.length;o<u;++o){i=e[o];switch(i[0]){case"#":case"^":n.push(i),r.push(i),n=i[4]=[];break;case"/":s=r.pop(),s[5]=i[2],n=r.length>0?r[r.length-1][4]:t;break;default:n.push(i)}}return t}function b(e){this.string=e,this.tail=e,this.pos=0}function w(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function E(){this.cache={}}var t=Object.prototype.toString,n=Array.isArray||function(e){return t.call(e)==="[object Array]"},s=RegExp.prototype.test,u=/\S/,f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},c=/\s*/,h=/\s+/,p=/\s*=/,d=/\s*\}/,v=/#|\^|\/|>|\{|&|=|!/;b.prototype.eos=function(){return this.tail===""},b.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},b.prototype.scanUntil=function(e){var t=this.tail.search(e),n;switch(t){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=n.length,n},w.prototype.push=function(e){return new w(e,this)},w.prototype.lookup=function(e){var t=this.cache,n;if(e in t)n=t[e];else{var i=this,s,o,u=!1;while(i){if(e.indexOf(".")>0){n=i.view,s=e.split("."),o=0;while(n!=null&&o<s.length)o===s.length-1&&n!=null&&(u=typeof n=="object"&&n.hasOwnProperty(s[o])),n=n[s[o++]]}else i.view!=null&&typeof i.view=="object"&&(n=i.view[e],u=i.view.hasOwnProperty(e));if(u)break;i=i.parent}t[e]=n}return r(n)&&(n=n.call(this.view)),n},E.prototype.clearCache=function(){this.cache={}},E.prototype.parse=function(e,t){var n=this.cache,r=n[e];return r==null&&(r=n[e]=m(e,t)),r},E.prototype.render=function(e,t,n){var r=this.parse(e),i=t instanceof w?t:new w(t);return this.renderTokens(r,i,n,e)},E.prototype.renderTokens=function(e,t,n,r){var i="",s,o,u;for(var a=0,f=e.length;a<f;++a)u=undefined,s=e[a],o=s[0],o==="#"?u=this._renderSection(s,t,n,r):o==="^"?u=this._renderInverted(s,t,n,r):o===">"?u=this._renderPartial(s,t,n,r):o==="&"?u=this._unescapedValue(s,t):o==="name"?u=this._escapedValue(s,t):o==="text"&&(u=this._rawValue(s)),u!==undefined&&(i+=u);return i},E.prototype._renderSection=function(e,t,i,s){function f(e){return o.render(e,t,i)}var o=this,u="",a=t.lookup(e[1]);if(!a)return;if(n(a))for(var l=0,c=a.length;l<c;++l)u+=this.renderTokens(e[4],t.push(a[l]),i,s);else if(typeof a=="object"||typeof a=="string"||typeof a=="number")u+=this.renderTokens(e[4],t.push(a),i,s);else if(r(a)){if(typeof s!="string")throw new Error("Cannot use higher-order sections without the original template");a=a.call(t.view,s.slice(e[3],e[5]),f),a!=null&&(u+=a)}else u+=this.renderTokens(e[4],t,i,s);return u},E.prototype._renderInverted=function(e,t,r,i){var s=t.lookup(e[1]);if(!s||n(s)&&s.length===0)return this.renderTokens(e[4],t,r,i)},E.prototype._renderPartial=function(e,t,n){if(!n)return;var i=r(n)?n(e[1]):n[e[1]];if(i!=null)return this.renderTokens(this.parse(i),t,n,i)},E.prototype._unescapedValue=function(e,t){var n=t.lookup(e[1]);if(n!=null)return n},E.prototype._escapedValue=function(t,n){var r=n.lookup(t[1]);if(r!=null)return e.escape(r)},E.prototype._rawValue=function(e){return e[1]},e.name="mustache.js",e.version="2.0.0",e.tags=["{{","}}"];var S=new E;e.clearCache=function(){return S.clearCache()},e.parse=function(e,t){return S.parse(e,t)},e.render=function(e,t,n){return S.render(e,t,n)},e.to_html=function(t,n,i,s){var o=e.render(t,n,i);if(!r(s))return o;s(o)},e.escape=l,e.Scanner=b,e.Context=w,e.Writer=E}),window.Zopa=window.Zopa||{},Zopa.DataBinder=function(t){"use strict";var n=jQuery({});return jQuery(document).on("input change","[data-bind-"+t+"]",function(){var e=jQuery(this);n.trigger(t+":change",[e.data("bind-"+t),e.val()])}),jQuery(document).on("click","[data-destroy='"+t+"']",function(e){e.preventDefault();var r=jQuery(this);n.trigger(t+":destroy",[r.data("destroy")])}),jQuery(document).on("click","[data-find='"+t+"']",function(e){e.preventDefault();var r=jQuery(this);n.trigger(t+":find",[r.data("destroy")])}),jQuery(document).on("click","[data-action-"+t+"]",function(e){e.preventDefault();var r=jQuery(this);n.trigger(t+":action",[r.data("action"),r])}),n.on(t+":change",function(e,t,n){jQuery("[data-bind="+t+"]").each(function(){var e=jQuery(this);e.is("input, textarea, select")?e.val(n):e.html(n)})}),n},window.Zopa=window.Zopa||{},Zopa.EmailValidator=function(e){this.email=e.email,this.callback=e.callback,this.valid=!1,this.errors=[]},Zopa.EmailValidator.prototype={data:function(){return{"member[email]":this.email.val()}},email_regex:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,emailLookupUrl:"/members/email_available",set_validity:function(e,t){t=t||!1,e==1&&this.clear_errors(),t==="ajax"&&e===!1&&this.add_error("emailNotAvailable"),this.valid=e,this.callback()},add_error:function(e){this.errors.push(e)},clear_errors:function(){this.errors=[]},validate:function(e,t){this.clear_errors(),this.email_regex.test(this.email.val())?this.emailCheck("set_validity",this):(this.add_error("formatError"),this.set_validity(!1))},emailCheck:function(e,t){$.ajax({url:"/members/email_available",type:"post",data:this.data(),success:function(n){t[e](n,"ajax")},error:function(){this.errors.push("requestError"),e(!1)}})}},window.Zopa=window.Zopa||{},Zopa.DateHelper=function(e){this.yearVal=e.year,this.monthVal=e.month,this.dayVal=e.day,this.errors=[]},Zopa.DateHelper.prototype={complete:function(){return this.yearVal===""?this.addError("yearBlank"):this.removeError("yearBlank"),this.monthVal===""?this.addError("monthBlank"):this.removeError("monthBlank"),this.dayVal===""?this.addError("dayBlank"):this.removeError("dayBlank"),String(this.yearVal).length!==4?this.addError("yearWrongCharacterCount"):this.removeError("yearWrongCharacterCount"),String(this.monthVal).length>2?this.addError("monthWrongCharacterCount"):this.removeError("monthWrongCharacterCount"),String(this.dayVal).length>2?this.addError("dayWrongCharacterCount"):this.removeError("dayWrongCharacterCount"),isNaN(Number(this.yearVal))?this.addError("yearNaN"):this.removeError("yearNaN"),isNaN(Number(this.monthVal))?this.addError("monthNaN"):this.removeError("monthNaN"),isNaN(Number(this.dayVal))?this.addError("dayNaN"):this.removeError("dayNan"),Number(this.monthVal)<1||Number(this.monthVal)>12?this.addError("monthInvalid"):this.removeError("monthInvalid"),Number(this.dayVal)<1||Number(this.dayVal)>31?this.addError("dayInvalid"):this.removeError("dayInvalid"),this.errors.length===0},inValid:function(){return!this.complete()},addError:function(e){this.removeError(e),this.errors.push(e)},removeError:function(e){var t=this.errors.indexOf(e);t>-1&&this.errors.splice(t,1)},toString:function(){if(this.inValid())return!1;var e=this.toDate();return e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)},toDate:function(){return this.inValid()?!1:new Date([this.yearVal,this.monthVal,this.dayVal].join("/"))},year:function(){return this.inValid()?!1:this.toDate().getFullYear()},month:function(){return this.inValid()?!1:this.toDate().getMonth()+1},monthDiff:function(e,t){if(this.inValid())return!1;var n;return n=(t.getFullYear()-e.getFullYear())*12,n-=e.getMonth()+1,n+=t.getMonth(),++n},differenceFromToday:function(){return this.inValid()?!1:this.monthDiff(this.toDate(),this.today())},today:function(){return new Date}},window.Zopa=window.Zopa||{},Zopa.Address=function(e){var t=this;this.county=e.county,this.from=e.from,this.house_name=e.house_name,this.house_number=e.house_number,this.id=e.id,this.postcode=e.postcode,this.ptcabs=e.ptcabs,this.rialto_id=e.rialto_id,this.street_1=e.street_1,this.street_2=e.street_2,this.to=e.to,this.month="",this.year="",this.errors=[],this.sanitizedPtcabs=function(){return this.ptcabs.replace(" ","_")},this.makeId=function(){var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var n=0;n<5;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},this.localId=this.makeId().toLowerCase(),this.init=function(){if(this.from!==null){var e=this.from.split("-"),t=new Zopa.DateHelper({year:e[0],month:e[1],day:[2]});t.complete()&&(this.year=t.year(),this.month=t.month())}},this.addError=function(e){this.removeError(e),this.errors.push(e)},this.removeError=function(e){var t=this.errors.indexOf(e);t>-1&&this.errors.splice(t,1)};var n=new Zopa.DataBinder(this.localId);this.set=function(e,r){this[e]=r;if(e==="month"||e==="year"){var i=this.toZopaDateHelper();i?(i.toDate()>new Date?this.addError("dateInTheFuture"):this.removeError("dateInTheFuture"),this.from=i.toString(),n.trigger(t.localId+":change",["from",i,this])):(this.from="",n.trigger(t.localId+":change",["from","",this]))}else n.trigger(t.localId+":change",[e,r,this])},n.on(this.localId+":change",function(e,n,r,i){i!==t&&t.set(n,r)}),n.on(this.localId+":action",function(){t.month===""||t.year===""?t.addError("moveInDateBlank"):t.removeError("moveInDateBlank"),$(document).trigger(t.localId+":updateView")}),this.datesMonths=function(){var e=["","January","February","March","April","May","June","July","August","September","October","November","December"],n=[];for(var r=1;r<=12;r++)r==t.month?n.push([e[r],r,"selected"]):n.push([e[r],r]);return n},this.datesYears=function(){var e=[],n=(new Date).getFullYear(),r=n-50,i;for(i=n;i>r;i--)i==t.year?e.push([i,i,"selected"]):e.push([i,i]);return e},this.valid=function(){if(this.from!==null){var e=this.from.split("-"),t=new Zopa.DateHelper({year:e[0],month:e[1],day:[2]});if(t.complete()&&t.toDate()<new Date)return this.errors=[],!0}return!1},this.complete=function(){if(this.from!==null){var e=this.from.split("-"),t=new Zopa.DateHelper({year:e[0],month:e[1],day:[2]});if(t.complete())return!0}return!1},this.toZopaDateHelper=function(){var e=new Zopa.DateHelper({year:this.year,month:this.month,day:"1"});return e.complete()?e:!1}},window.Zopa=window.Zopa||{},Zopa.AddressHelper=function(e){var t=this;this.helperId=Date.now(),this.results=[],this.currentAddresses=[],this.errors=[],this.onChange=e.onChange||function(){},this.loadExisting(e.existingJson),this.addressStaging=[],this.messageTranslations=e.messageTranslations,this.t=function(){return function(e,n){return t.messageTranslations[n(e)]}},this.houseNumber="",this.postcode="",this.searching=!1,this.binder=new Zopa.DataBinder(this.helperId),this.binder.on(this.helperId+":change",function(e,n,r,i){i!==t&&t.set(n,r)}),this.init()},Zopa.AddressHelper.prototype={set:function(e,t){this[e]=t,this.binder.trigger(this.helperId+":change",[e,t,this])},haveResults:function(){return this.results.length>0},haveCurrentAddresses:function(){return this.currentAddresses.length>0},isValid:function(){return this.errors.length===0},allAddressDatesSet:function(){for(var e=0;e<this.currentAddresses.length;e++)if(!this.currentAddresses[e].valid())return!1;return!0},validate:function(){this.errors=[],this.checkDuplicates(),this.longEnough(!0),this.onChange()},init:function(){var e=this;this.binder.off(e.helperId+":find").on(e.helperId+":find",function(){e.postcode!==""?(e.removeError("postCodeEmpty"),e.search()):(e.addError("postCodeEmpty"),e.onChange())}),$(document).off("change","#possible_addresses").on("change","#possible_addresses",function(){var t=$(document).find("#possible_addresses").val();return function(){var n=e.findAddressByLocalId(t,"results");e.addAddressToStaging(n)}()})},longEnough:function(e){typeof e=="undefined"&&(e=!1);var t=!1;for(var n=0;n<this.currentAddresses.length;n++)if(this.currentAddresses[n].from!==null&&!t){var r=this.currentAddresses[n].from.split("-"),i=new Zopa.DateHelper({year:r[0],month:r[1],day:[2]});t=i.differenceFromToday()>=36}return e&&(t?this.removeError("notLongEnough"):this.addError("notLongEnough")),t},objectToAddress:function(e){var t=e,n=this,r=new Zopa.Address({county:t.county,from:t.from,house_name:t.house_name,house_number:t.house_number,id:t.id,postcode:t.postcode,ptcabs:t.ptcabs,rialto_id:t.rialto_id,street_1:t.street_1,street_2:t.street_2,to:t.to}),i=new Zopa.DataBinder(r.localId);return r.init(),i.on(r.localId+":destroy",function(e,t){n.removeAddressByLocalId(t),n.validate()}),i.on(r.localId+":change",function(e,t){if(t==="year"||t==="month")r.complete()?n.findAddressByLocalId(r.localId,"addressStaging")&&n.addAddress(r):r.from="",n.validate(!0)}),$(document).on(r.localId+":updateView",function(){n.onChange()}),r},setResults:function(e){for(var t=0,n=e.addresses;t<n.length;t++)this.results.push(this.objectToAddress(n[t]));this.postcode="",this.houseNumber="",this.onChange()},loadExisting:function(e){var t=JSON.parse(e);for(var n=0,r=t;n<r.length;n++)this.currentAddresses.push(this.objectToAddress(r[n]));this.setAddressesIndex(),this.onChange()},addError:function(e){this.removeError(e),this.errors.push(e)},removeError:function(e){var t=this.errors.indexOf(e);t>-1&&this.errors.splice(t,1)},search:function(){this.searching=!0,this.onChange(),this.findAddress("setResults")},findAddress:function(e){var t=this;$.ajax({url:"/addresses",type:"GET",data:{"[address][house_number]":t.houseNumber,"[address][postcode]":t.postcode},success:function(n){t.searching=!1,n.addresses.length===0?t.addError("noAddressesFound"):t.removeError("noAddressesFound"),t[e](n)},error:function(){return t.searching=!1,function(){t.addError("connectionError")}()}})},setAddressesIndex:function(){for(var e=0;e<this.currentAddresses.length;e++)this.currentAddresses[e].index=e},checkDuplicates:function(){var e=this.currentAddresses.map(function(e){return e.sanitizedPtcabs()});for(var t=0;t<this.currentAddresses.length;t++){var n=e[t],r=e[t+1];if(n===r)return this.addError("duplicateAddress"),!0}return this.removeError("duplicateAddress"),!1},addAddress:function(e){var t=this.findAddressByLocalId(e.localId,"addressStaging");t.valid()&&(this.currentAddresses.push(e),this.checkDuplicates(),this.setAddressesIndex(),this.addressStaging=[]),this.validate()},addAddressToStaging:function(e){e.index=this.currentAddresses.length,this.results=[],this.postcode="",this.houseNumber="",this.addressStaging.push(e),this.onChange()},findAddressByPtcabs:function(e,t){for(var n=0;n<this[t].length;n++)if(this[t][n].ptcabs.replace(" ","_")==e)return this[t][n];return!1},findAddressByLocalId:function(e,t){for(var n=0;n<this[t].length;n++)if(this[t][n].localId==e)return this[t][n];return!1},removeAddressByPtcabs:function(e){var t=this.findAddressByPtcabs(e,"addressStaging");if(!t)return t=this.findAddressByPtcabs(e,"currentAddresses"),t?(this.removeAddress(t),this.onChange(),!0):!1;this.addressStaging=[],this.onChange()},removeAddressByLocalId:function(e){var t=this.findAddressByLocalId(e,"addressStaging");if(!t)return t=this.findAddressByLocalId(e,"currentAddresses"),t?(this.removeAddress(t),this.onChange(),!0):!1;this.addressStaging=[],this.onChange()},removeAddress:function(e){var t=this.currentAddresses.indexOf(e);return t>-1?(this.currentAddresses.splice(t,1),this.checkDuplicates(),this.setAddressesIndex(),!0):!1}},$(function(){var e=$("#member_email"),t=e.data("errormsg"),n=$('<p class="error remote" role="alert">'+t+"</p>"),r=function(){i.valid?u():o()},i=new Zopa.EmailValidator({email:e,callback:r}),s=function(){var t=$("a",n);t.on("click",function(t){var n=$(this),r=window.location.pathname+window.location.search,i="email="+encodeURIComponent(e.val()),s="redirect="+encodeURIComponent(r),o=n.attr("href")+"?"+i+"&"+s;t.preventDefault(),location.href=o})},o=function(){e.parent().addClass("error");for(var t=0;t<i.errors.length;t++)i.errors[t]==="emailNotAvailable"&&(e.parent().parent().append(n),s())},u=function(){e.parent().removeClass("error"),n.remove()};e.on("input blur",function(){i.validate(r)})}),$(function(){var e=$(".residential-status input[type=radio]"),t=$(".contribution"),n=t.find("input"),r=function(e){var r=t.data("existing-value");e.data("residential-status")==="mortgage"||e.data("residential-status")==="rent"?(n.val()==="0"&&n.val(r),t.aria("show"),t.find("label span").text(e.data("residential-status"))):(n.val("0"),t.aria("hide"))};t.data("existing-value",n.val()),e.each(function(){$(this).is(":checked")&&r($(this))}),e.on("click",function(){r($(this))}),n.on("change",function(){t.data("existing-value",$(this).val())})}),$(function(){var e=$("fieldset.address"),t=$('.error[role="alert"]',e),n=$("#addressTemplate").html(),r=new Zopa.AddressHelper({existingJson:CURRENT_ADDRESSES,messageTranslations:{dateInTheFuture:"Move in dates cannot be in the future.",notLongEnough:"We need to identify all the addresses at which you have lived for the last 3 years.",postCodeEmpty:"Please provide a postcode",noAddressesFound:"No addresses found, please try again with a different postcode",connectionError:"Error in connection",duplicateAddress:"If you have lived at the same address multiple times, please ensure that you have specified any addresses between the occurrences",moveInDateBlank:"Please select a move in date."}}),i=function(){var t=Mustache.render(n,r);e.html(t)};r.onChange=i,i(),e.find(".addresses").append(t)});