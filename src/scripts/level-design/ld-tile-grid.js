import { Texture } from "pixi.js";
import { PixiObject } from "../../engine/core/pixi-object";
import { SimpleSprite } from "../../engine/extends/pixi/simple-sprite";




export class LD_TileGrid extends PixiObject {
    constructor(scene) {
        super(scene, { eventMode: "static" });

        this.CONFIG = {
            ENTER_COLOR: 0x678087,
            LEAVE_COLOR: 0x02f236
        }

        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 50,
            height: 50,
            alpha: 0.7,
            tint: this.CONFIG.ENTER_COLOR
        });
        this.add(this.sprite);
    }

    onpointerenter() {
        this.sprite.tint = this.CONFIG.LEAVE_COLOR;
    }

    onpointerleave() {
        this.sprite.tint = this.CONFIG.ENTER_COLOR;
    }
}