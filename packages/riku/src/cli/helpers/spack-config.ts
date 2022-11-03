import { config } from "@swc/core/spack";

export default config({
  target: "node",
  mode: "production",
  entry: {
    default: process.cwd() + "/index.ts",
  },
  output: {
    path: process.cwd() + "/.riku" + "/build",
    name: "index.js",
  },
  module: {},
  externalModules: ["riku", "discord.js"],
});
