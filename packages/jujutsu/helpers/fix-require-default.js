const t0 = performance.now();

const fs = require("fs-extra");
const path = require("path");
const f = path.join(process.cwd(), "dist", "index.js");
const New = fs
  .readFileSync(f, "utf8")
  .replace(
    "return obj&&obj.__esModule?obj:{default:obj}",
    "return obj&&obj.default?obj:{default:obj}"
  );
fs.writeFileSync(f, New, "utf8");

const t1 = performance.now();
console.log(`Fixed require function in ${(t1 - t0).toFixed(3)}ms`);