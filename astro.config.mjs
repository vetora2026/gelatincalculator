import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gelatincalculator.com",
  output: "static",
  integrations: [react(), tailwind(), sitemap()],
  // Inline the single site stylesheet; it was render-blocking at ~358 ms.
  build: { inlineStylesheets: "always" },
});
