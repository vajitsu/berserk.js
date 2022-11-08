import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

import rehypeRewrite from "rehype-rewrite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: "prism",
  },
  integrations: [
    mdx({
      extendPlugins: "markdown",
    }),
    react(),
    vercel(),
    prefetch({
      throttle: 3,
    }),
  ],
});
