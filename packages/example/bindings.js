"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loadNative", {
    enumerable: true,
    get: ()=>c
});
const e = require("os");
const r = require("next/dist/compiled/@napi-rs/triples");
const o = (0, e.arch)();
const n = (0, e.platform)();
const t = r.platformArchTriples[n][o] || [];
const i = [
    "aarch64-linux-android",
    "x86_64-unknown-freebsd",
    "aarch64-pc-windows-msvc",
    "arm-linux-androideabi",
    "armv7-unknown-linux-gnueabihf",
    "i686-pc-windows-msvc"
];
let s;
function c() {
    let e;
    let r = [];
    for (const o of t){
        try {
            e = require(`./native/discord.${o.platformArchABI}.node`);
            break;
        } catch (n) {
            console.error(n);
        }
    }
    return e;
}
