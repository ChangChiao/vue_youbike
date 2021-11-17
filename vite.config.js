import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig((mode) => {
    console.log("mode--", mode.mode);
    return {
        base: mode.mode === "prd" ? "./" : "/",
        plugins: [vue()],
        build: {
            outDir: "./docs"
        },
        server: {
            host: "0.0.0.0"
        },
        "resolve.alias": {
            vue: "vue/dist/vue.esm-bundler.js"
        }
    };
});
