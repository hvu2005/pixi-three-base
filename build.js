
import * as esbuild from "esbuild";
import open from "open";
import fs from "fs";
import path from "path";

import MODULE_CONFIG from "./module.config.json" with { type: "json" };

/**
 * @type {esbuild.BuildOptions}
 */
const ESBUILD_CONFIG = {
    entryPoints: ["main.js"],
    bundle: true,
    sourcemap: false,
    outfile: "dist/main.js",
    format: "iife",
    target: ["esnext"],
    minify: true,
    treeShaking: true,
    legalComments: 'none',
    define: MODULE_CONFIG,
    splitting: false,
    plugins: [
        _bundleSizePlugin(),
    ],
    loader: {
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".jpeg": "dataurl",
        ".gif": "dataurl",
        ".glb": "dataurl",
        ".gltf": "dataurl",
        ".mp3": "dataurl",
        ".json": "json",
        ".atlas": "text",
        ".glsl": "text",
        ".frag": "text",
        ".vert": "text",
        '.fbx': 'dataurl',
        '.obj': 'dataurl',
        '.stl': 'dataurl',
        ".txt": "dataurl",
    },
    logLevel: "info",
    metafile: true,
};


(async () => {
    try {
        if (!fs.existsSync("dist")) {
            fs.mkdirSync("dist", { recursive: true });
        }
        fs.copyFileSync("index.html", path.join("dist", "index.html"));

        const ctx = await esbuild.context(ESBUILD_CONFIG);

        const result = await ctx.rebuild();
        fs.writeFileSync('meta.json', JSON.stringify(result.metafile, null, 2));

        await _startServer(ctx);


    } catch (err) {
        console.error("Lỗi build:", err);
        process.exit(1);
    }
})();


async function _startServer(ctx, startPort = 8080, maxTries = 10) {
    const watch = await ctx.watch();

    let port;
    for (port = startPort; port < startPort + maxTries; port++) {
        try {
            const server = await ctx.serve({ port, servedir: "dist" });
            const url = `http://localhost:${port}/index.html`;
            console.log(`>>> Dev server chạy tại: ${url}`);
            await open(url);
            return server;
        } catch (err) {
            continue;
        }
    }
    throw new Error("Không tìm được port khả dụng!", startPort + "-" + port);
}

function _bundleSizePlugin() {
    return {
        name: "bundle-size",
        setup(build) {
            build.onEnd(result => {
                try {
                    const stats = fs.statSync("dist/main.js");
                    const sizeKB = (stats.size / 1024).toFixed(2);
                    console.log(`📦 Bundle size: ${sizeKB} KB`);
                } catch {
                    console.warn("⚠️ Không đọc được bundle size.");
                }

            });
        }
    };
}


