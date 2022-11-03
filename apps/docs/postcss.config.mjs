import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import modules from "postcss-modules";

module.exports = {
  plugins: [autoprefixer, cssnano, modules],
};
