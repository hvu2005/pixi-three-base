import { Sprite, Texture } from "pixi.js";
import { PixiObject } from "../engine/core/pixi-object";
import { SimpleSprite } from "../engine/extends/pixi/simple-sprite";

export class Player extends PixiObject {

    constructor(scene) {
        super(scene);

        this.load();
        this.scene.ticker.push(this.update.bind(this));
    }

    load() {
        this.sprite = new SimpleSprite(Texture.WHITE, { width: 100, height: 100});
        this.add(this.sprite);

    }

    update(dt) {

    }
}