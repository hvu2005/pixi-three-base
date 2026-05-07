import { Sprite, Texture } from "pixi.js";
import { PixiObject } from "../engine/core/pixi-object";

export class Player extends PixiObject {
    constructor(scene) {
        super(scene);

        this.sprite = new Sprite({
            texture: Texture.WHITE, 
            width: 100, 
            height: 100, 
            anchor: { x: 0.5, y: 0.5 },
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