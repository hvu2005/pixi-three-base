import { Texture } from "pixi.js";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { SimpleSprite } from "../../../../engine/extends/pixi/simple-sprite";
import { createCollisionFilter } from "../../config/collision-layer";


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

        this.collider = new Collider2d(this.scene, {
            width: 1500,
            height: 60,
            isSensor: true,
            collisionFilter: createCollisionFilter("ITEM"),
        });
        this.addComponent(this.collider);
    }

    update(dt) {
        this.collider.syncToPhysics();
        this.y += dt * 150;
    }

    oncollisionenter(other) {
        this.collect(other);
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
    }

    onCollect(item, payload) {

    }


}
