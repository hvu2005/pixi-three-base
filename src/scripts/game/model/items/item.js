import { Texture } from "pixi.js";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { SimpleSprite } from "../../../../engine/extends/pixi/simple-sprite";


export class Item extends PixiObject {
    /**
     * @param {import("../../../../engine/core/scene").Scene} scene
     */
    constructor(scene) {
        super(scene);

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
        this.onCollect(this, payload);
        this.destroySelf();
    }

    onCollect(item, payload) {

    }

    destroySelf() {
        this.parent?.removeChild(this);
        this.destroy({ children: true });
    }
}
