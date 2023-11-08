import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://rlpackaging.ca",
  integrations: [tailwind(), react(), sitemap(), prefetch()],
  output: "server",
  adapter: netlify(),
});
