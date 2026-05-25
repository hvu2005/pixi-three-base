import { loadPixiTexture } from "../../../engine/load/load-pixi-texutre";
import { AS_1 } from "../../../engine/service/hot-loader/asset-alias";


export const Asset = {
    TEXTURE_PLAYER: loadPixiTexture(AS_1),
}

export async function loadAsset() {
    for (const key in Asset) {
        const asset = Asset[key];
        if (asset instanceof Promise) {
            Asset[key] = await asset;
        }
    }
}