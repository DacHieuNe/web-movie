import { defineConfig } from "vite";
import * as path from "path";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptinos: {
      input: {
        main: resolve(__dirname, "index.html"),
        detail: resolve(__dirname, "detail.html"),
        signup: resolve(__dirname, "signup.html"),
        home: resolve(__dirname, "home.html"),
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
