const { config } = require("@swc/core/spack");

module.exports = config({
  target: "node",
  mode: "production",
  module: {},
  entry: {
    node: __dirname + "/src/index.ts",
  },
  output: {
    path: __dirname + "/lib",
    name: "index.js",
  },
});
