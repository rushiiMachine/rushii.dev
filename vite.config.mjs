import {defineConfig} from "vite";
import devtoolsPlugin from "solid-devtools/vite";
import compileTime from "vite-plugin-compile-time"
import {createHtmlPlugin} from "vite-plugin-html";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    plugins: [
        compileTime(),
        devtoolsPlugin({
            autoname: true,
            locator: {
                targetIDE: "webstorm",
                jsxLocation: true,
                componentLocation: true,
            }
        }),
        solidPlugin({
            hot: true,
            ssr: true,
        }),
        createHtmlPlugin({
            minify: true,
            template: "index.html",
        }),
    ],
    esbuild: {
        legalComments: "none",
    },
    server: {
        port: 3000,
    },
    appType: "spa",
});
