import { Sprite, Texture } from "pixi.js";
import { PixiObject } from "../engine/core/pixi-object";
import { SimpleSprite } from "../engine/extends/pixi/simple-sprite";
import { Collider2d } from "../engine/extends/matter/collider-2d";

export class Player extends PixiObject {

    constructor(scene) {
        super(scene);

        this.load();
        this.scene.ticker.push(this.update.bind(this));
    }

    load() {
        this.sprite = new SimpleSprite(Texture.WHITE, { 
            width: 100, 
            height: 100,
            tint: 0x0ff000
        });
        this.add(this.sprite);

        this.collider = new Collider2d({
            width: 100,
            height: 100,
            isStatic: true,
            x: 200,
            y: 200
        });
        this.scene.matter.add(this.collider);
        // this.collider.on('collision-start', this.onCollisionEnter.bind(this));
    }

    onCollisionEnter(other) {

    }

    update(dt) {

    }
}