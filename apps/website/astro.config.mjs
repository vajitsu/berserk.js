import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import theme from "shiki/themes/slack-dark.json" assert { type: "json" };
import { remarkCodeHike } from "@code-hike/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  markdown: {
    remarkPlugins: [
      [
        remarkCodeHike,
        {
          autoImport: false,
          theme,
          lineNumbers: true,
          showCopyButton: false,
          staticMediaQuery: "(max-width: 951px)",
        },
      ],
    ],
    extendDefaultPlugins: true,
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
