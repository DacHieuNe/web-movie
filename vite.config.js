import { defineConfig } from "vite";
import * as path from "path";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  server: {
    port: 5175,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detail: resolve(__dirname, "detail.html"),
        home: resolve(__dirname, "home.html"),
        authen: resolve(__dirname, "authen.html"),
        story: resolve(__dirname, "story.html"),
        "all-movie": resolve(__dirname, "all-movie.html"),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
