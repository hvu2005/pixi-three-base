import { Texture } from "pixi.js";
import { PixiObject } from "../../../engine/core/pixi-object";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";

/**
 * @typedef {Object} ItemDataConfig
 * @property {string} [type]
 * @property {(item: Item, payload?: any) => void} [onCollect]
 */

export class Item extends PixiObject {
    /**
     * @param {import("../../../engine/core/scene").Scene} scene
     * @param {ItemDataConfig} dataConfig
     */
    constructor(scene, dataConfig = {}) {
        super(scene);

        this.data = dataConfig;
        this.id = `item_${Math.floor(Math.random() * 1000000)}`;
        this.type = dataConfig.type || "item";
        this.onCollect = dataConfig.onCollect || null;
        this.isCollected = false;

        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 24,
            height: 24,
            tint: 0x66ff66,
        });
        this.add(this.sprite);
    }

    /**
     * @param {any} payload
     */
    collect(payload) {
        if (this.isCollected) {
            return;
        }

        this.isCollected = true;
        this.onCollect?.(this, payload);
        this.destroySelf();
    }

    destroySelf() {
        this.parent?.removeChild(this);
        this.destroy({ children: true });
    }
}
