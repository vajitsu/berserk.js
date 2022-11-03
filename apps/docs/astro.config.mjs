import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import theme from "shiki/themes/dark-plus.json" assert { type: "json" };
import { remarkCodeHike } from "@code-hike/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      [remarkCodeHike, { autoImport: false, theme, lineNumbers: true }],
    ],
    extendDefaultPlugins: true,
  },
  integrations: [mdx(), react()],
});
