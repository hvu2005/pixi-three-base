import { Sprite, Texture } from "pixi.js";
import { PixiObject } from "../engine/core/pixi-object";
import { SimpleSprite } from "../engine/extends/pixi/simple-sprite";

export class Player extends PixiObject {
    load() {
        this.sprite = new SimpleSprite({
            texture: Texture.WHITE,
            width: 100,
            height: 100,
            tint: 0xff0000,
            eventMode: "static",
        });
        this.add(this.sprite);

        this.sprite.on("pointerdown", () => {
            console.log("Player clicked");
        });
    }

    update(dt) {

    }
}