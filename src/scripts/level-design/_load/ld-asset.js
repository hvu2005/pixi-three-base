import { loadPixiTexture } from "../../../engine/load/load-pixi-texutre";
import { AS_1 } from "../../../engine/service/hot-loader/asset-alias";
import { Asset } from "../../game/_load/asset";


export const LD_Asset = {
    ...Asset,
}

export async function loadAsset() {
    for (const key in LD_Asset) {
        const asset = LD_Asset[key];
        if (asset instanceof Promise) {
            LD_Asset[key] = await asset;
        }
    }
}