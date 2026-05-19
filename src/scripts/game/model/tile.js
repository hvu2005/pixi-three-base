import { Sprite, Texture } from "pixi.js";
import { PixiObject } from "../../../engine/core/pixi-object";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";



export class Tile extends PixiObject {
    constructor(scene) {
        super(scene, { eventMode: "static" });

        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 50,
            height: 50,
        });
        this.add(this.sprite);
    }

    onpointerdown() {
        console.log("Tile clicked");
    }


}