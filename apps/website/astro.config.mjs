import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: "prism",
  },
  integrations: [
    mdx(),
    react(),
    vercel(),
    prefetch({
      throttle: 3,
    }),
  ],
});
