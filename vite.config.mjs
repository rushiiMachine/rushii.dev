import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";
import devtoolsPlugin from "solid-devtools/vite";
import {createHtmlPlugin} from "vite-plugin-html";

export default defineConfig({
    plugins: [
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
    server: {
        port: 3000,
    },
    appType: "spa",
});
