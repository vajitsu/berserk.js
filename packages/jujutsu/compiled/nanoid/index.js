"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    customAlphabet: ()=>m,
    customRandom: ()=>u,
    nanoid: ()=>c,
    random: ()=>s,
    urlAlphabet: ()=>f
});
const _module = require("module");
var t = {};
(()=>{
    t.d = (e, r)=>{
        for(var l in r){
            if (t.o(r, l) && !t.o(e, l)) {
                Object.defineProperty(e, l, {
                    enumerable: true,
                    get: r[l]
                });
            }
        }
    };
})();
(()=>{
    t.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t);
})();
if (typeof t !== "undefined") t.ab = new URL(".", require("url").pathToFileURL(__filename).toString()).pathname.slice(require("url").pathToFileURL(__filename).toString().match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
var r = {};
t.d(r, {
    kP: ()=>customAlphabet,
    AO: ()=>customRandom,
    x0: ()=>nanoid,
    MX: ()=>random,
    QP: ()=>a
});
const l = (0, _module.createRequire)(require("url").pathToFileURL(__filename).toString())("crypto");
const a = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
const n = 128;
let o, i;
let fillPool = (e)=>{
    if (!o || o.length < e) {
        o = Buffer.allocUnsafe(e * n);
        (0, l.randomFillSync)(o);
        i = 0;
    } else if (i + e > o.length) {
        (0, l.randomFillSync)(o);
        i = 0;
    }
    i += e;
};
let random = (e)=>{
    fillPool(e -= 0);
    return o.subarray(i - e, i);
};
let customRandom = (e, t, r)=>{
    let l = (2 << 31 - Math.clz32(e.length - 1 | 1)) - 1;
    let a = Math.ceil(1.6 * l * t / e.length);
    return (n = t)=>{
        let o = "";
        while(true){
            let t1 = r(a);
            let i = a;
            while(i--){
                o += e[t1[i] & l] || "";
                if (o.length === n) return o;
            }
        }
    };
};
let customAlphabet = (e, t = 21)=>customRandom(e, t, random);
let nanoid = (e = 21)=>{
    fillPool(e -= 0);
    let t = "";
    for(let r = i - e; r < i; r++){
        t += a[o[r] & 63];
    }
    return t;
};
var m = r.kP;
var u = r.AO;
var c = r.x0;
var s = r.MX;
var f = r.QP;
