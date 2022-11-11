"use strict";function e(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function t(t){if(Array.isArray(t))return e(t)}function r(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function u(e,t,r){if(t)n(e.prototype,t);if(r)n(e,r);return e}function a(e){if(typeof Symbol!=="undefined"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e){return t(e)||a(e)||l(e)||i()}var f=function(e){"@swc/helpers - typeof";return e&&typeof Symbol!=="undefined"&&e.constructor===Symbol?"symbol":typeof e};function l(t,r){if(!t)return;if(typeof t==="string")return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor)n=t.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(t,r)}var d=require("discord.js");var s=Object.create;var c=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var h=function(e,t,r){return t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r};var _=function(e,t){return c(e,"name",{value:t,configurable:!0})},m=function(e){return(typeof require==="undefined"?"undefined":f(require))<"u"?require:(typeof Proxy==="undefined"?"undefined":f(Proxy))<"u"?new Proxy(e,{get:function(e,t){return((typeof require==="undefined"?"undefined":f(require))<"u"?require:e)[t]}}):e}(function(e){if((typeof require==="undefined"?"undefined":f(require))<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var g=function(e,t){return function(){return t||e((t={exports:{}}).exports,t),t.exports}};var M=function(e,t,r,n){var u=true,a=false,i=undefined;if(t&&typeof t=="object"||typeof t=="function")try{var o=function(){var u=l.value;!b.call(e,u)&&u!==r&&c(e,u,{get:function(){return t[u]},enumerable:!(n=v(t,u))||n.enumerable})};for(var f=p(t)[Symbol.iterator](),l;!(u=(l=f.next()).done);u=true)o()}catch(d){a=true;i=d}finally{try{if(!u&&f.return!=null){f.return()}}finally{if(a){throw i}}}return e};var j=function(e,t,r){return r=e!=null?s(y(e)):{},M(t||!e||!e.__esModule?c(r,"default",{value:e,enumerable:!0}):r,e)};var O=function(e,t,r){return h(e,(typeof t==="undefined"?"undefined":f(t))!="symbol"?t+"":t,r),r};var w=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(){return a>u.length-16&&(n.default.randomFillSync(u),a=0),u.slice(a,a+=16)};Object.defineProperty(e,"__esModule",{value:!0});e.default=r;var n=t(m("crypto"));_(t,"_interopRequireDefault");var u=new Uint8Array(256),a=u.length;_(r,"rng")});var P=g(function(e){Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var t=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;e.default=t});var D=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){return typeof e=="string"&&n.default.test(e)};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(P());_(t,"_interopRequireDefault");_(r,"validate");var u=r;e.default=u});var q=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return(a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]).toLowerCase()};var n=function n(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;var n=r(e,t);if(!(0,u.default)(n))throw TypeError("Stringified UUID is invalid");return n};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;e.unsafeStringify=r;var u=t(D());_(t,"_interopRequireDefault");var a=[];for(var i=0;i<256;++i)a.push((i+256).toString(16).slice(1));_(r,"unsafeStringify");_(n,"stringify");var o=n;e.default=o});var U=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e,t,r){var l=t&&r||0,d=t||new Array(16);e=e||{};var s=e.node||a,c=e.clockseq!==void 0?e.clockseq:i;if(s==null||c==null){var v=e.random||(e.rng||n.default)();s==null&&(s=a=[v[0]|1,v[1],v[2],v[3],v[4],v[5]]),c==null&&(c=i=(v[6]<<8|v[7])&16383)}var p=e.msecs!==void 0?e.msecs:Date.now(),y=e.nsecs!==void 0?e.nsecs:f+1,b=p-o+(y-f)/1e4;if(b<0&&e.clockseq===void 0&&(c=c+1&16383),(b<0||p>o)&&e.nsecs===void 0&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");o=p,f=y,i=c,p+=122192928e5;var h=((p&268435455)*1e4+y)%4294967296;d[l++]=h>>>24&255,d[l++]=h>>>16&255,d[l++]=h>>>8&255,d[l++]=h&255;var _=p/4294967296*1e4&268435455;d[l++]=_>>>8&255,d[l++]=_&255,d[l++]=_>>>24&15|16,d[l++]=_>>>16&255,d[l++]=c>>>8|128,d[l++]=c&255;for(var m=0;m<6;++m)d[l+m]=s[m];return t||(0,u.unsafeStringify)(d)};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(w()),u=q();_(t,"_interopRequireDefault");var a,i,o=0,f=0;_(r,"v1");var l=r;e.default=l});var I=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){if(!(0,n.default)(e))throw TypeError("Invalid UUID");var t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(D());_(t,"_interopRequireDefault");_(r,"parse");var u=r;e.default=u});var R=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){e=unescape(encodeURIComponent(e));var t=[];for(var r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t};var n=function n(e,t,n){function f(e,i,o,f){var l;if(typeof e=="string"&&(e=r(e)),typeof i=="string"&&(i=(0,a.default)(i)),((l=i)===null||l===void 0?void 0:l.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var d=new Uint8Array(16+e.length);if(d.set(i),d.set(e,i.length),d=n(d),d[6]=d[6]&15|t,d[8]=d[8]&63|128,o){f=f||0;for(var s=0;s<16;++s)o[f+s]=d[s];return o}return(0,u.unsafeStringify)(d)}_(f,"generateUUID");try{f.name=e}catch(l){}return f.DNS=i,f.URL=o,f};Object.defineProperty(e,"__esModule",{value:!0});e.URL=e.DNS=void 0;e.default=n;var u=q(),a=t(I());_(t,"_interopRequireDefault");_(r,"stringToBytes");var i="6ba7b810-9dad-11d1-80b4-00c04fd430c8";e.DNS=i;var o="6ba7b811-9dad-11d1-80b4-00c04fd430c8";e.URL=o;_(n,"v35")});var S=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),n.default.createHash("md5").update(e).digest()};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(m("crypto"));_(t,"_interopRequireDefault");_(r,"md5");var u=r;e.default=u});var A=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var r=t(R()),n=t(S());_(t,"_interopRequireDefault");var u=(0,r.default)("v3",48,n.default),a=u;e.default=a});var x=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var r=t(m("crypto"));_(t,"_interopRequireDefault");var n={randomUUID:r.default.randomUUID};e.default=n});var B=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e,t,r){if(n.default.randomUUID&&!t&&!e)return n.default.randomUUID();e=e||{};var i=e.random||(e.rng||u.default)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){r=r||0;for(var o=0;o<16;++o)t[r+o]=i[o];return t}return(0,a.unsafeStringify)(i)};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(x()),u=t(w()),a=q();_(t,"_interopRequireDefault");_(r,"v4");var i=r;e.default=i});var C=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),n.default.createHash("sha1").update(e).digest()};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(m("crypto"));_(t,"_interopRequireDefault");_(r,"sha1");var u=r;e.default=u});var k=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var r=t(R()),n=t(C());_(t,"_interopRequireDefault");var u=(0,r.default)("v5",80,n.default),a=u;e.default=a});var L=g(function(e){Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var t="00000000-0000-0000-0000-000000000000";e.default=t});var V=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};var r=function r(e){if(!(0,n.default)(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)};Object.defineProperty(e,"__esModule",{value:!0});e.default=void 0;var n=t(D());_(t,"_interopRequireDefault");_(r,"version");var u=r;e.default=u});var E=g(function(e){var t=function t(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0});Object.defineProperty(e,"NIL",{enumerable:!0,get:function e(){return i.default}});Object.defineProperty(e,"parse",{enumerable:!0,get:function e(){return d.default}});Object.defineProperty(e,"stringify",{enumerable:!0,get:function e(){return l.default}});Object.defineProperty(e,"v1",{enumerable:!0,get:function e(){return r.default}});Object.defineProperty(e,"v3",{enumerable:!0,get:function e(){return n.default}});Object.defineProperty(e,"v4",{enumerable:!0,get:function e(){return u.default}});Object.defineProperty(e,"v5",{enumerable:!0,get:function e(){return a.default}});Object.defineProperty(e,"validate",{enumerable:!0,get:function e(){return f.default}});Object.defineProperty(e,"version",{enumerable:!0,get:function e(){return o.default}});var r=t(U()),n=t(A()),u=t(B()),a=t(k()),i=t(L()),o=t(V()),f=t(D()),l=t(q()),d=t(I());_(t,"_interopRequireDefault")});var N=function(){function e(){r(this,e);O(this,"row",new d.ActionRowBuilder)}u(e,[{key:"build",value:function e(){return this.row.addComponents(this.components),this.row}}]);return e}();_(N,"ActionRow");var T=function(){function e(){r(this,e);O(this,"disabled");O(this,"maxValues");O(this,"minValues");O(this,"selectMenu",new d.SelectMenuBuilder)}u(e,[{key:"build",value:function e(){var e;return this.selectMenu.setCustomId(this.id),this.selectMenu.setPlaceholder(this.placeholder),this.selectMenu.setDisabled(this.disabled||!1),(e=this.selectMenu).setOptions.apply(e,o(this.options)),typeof this.maxValues=="number"&&this.selectMenu.setMaxValues(this.maxValues),typeof this.minValues=="number"&&this.selectMenu.setMinValues(this.minValues),this.selectMenu}}]);return e}();_(T,"SelectMenu");var H=j(E(),1);H.default.v1;H.default.v3;var $=H.default.v4;H.default.v5;H.default.NIL;H.default.version;H.default.validate;H.default.stringify;H.default.parse;var F=function(){function e(){r(this,e);O(this,"id",$());O(this,"disabled",!1);O(this,"emoji");O(this,"url");O(this,"button",new d.ButtonBuilder)}u(e,[{key:"build",value:function e(){return this.button.setLabel(this.label).setStyle(this.style),this.disabled&&this.button.setDisabled(this.disabled),this.emoji&&this.button.setEmoji(this.emoji),this.url?this.button.setURL(this.url):this.button.setCustomId(this.id),this.button}}]);return e}();_(F,"Button");var z={ActionRow:N,SelectMenu:T,Button:F};module.exports=z;