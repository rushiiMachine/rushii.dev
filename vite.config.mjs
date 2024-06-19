import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";
import devtoolsPlugin from "solid-devtools/vite";

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
    ],
    server: {
        port: 3000,
    },
    appType: "spa",
});
