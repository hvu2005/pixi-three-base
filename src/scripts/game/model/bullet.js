import { Texture } from "pixi.js";
import { PixiObject } from "../../../engine/core/pixi-object";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";





export class Bullet extends PixiObject {
    constructor(scene) {
        super(scene);

        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 10,
            height: 30,
        });
        this.add(this.sprite);

        this.scene.addUpdate(this.update.bind(this));
    }

    update(dt) {
        this.y -= dt * 300;
    }
}