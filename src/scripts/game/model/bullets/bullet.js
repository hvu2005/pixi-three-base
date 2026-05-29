import { Texture } from "pixi.js";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { SimpleSprite } from "../../../../engine/extends/pixi/simple-sprite";
import { createCollisionFilter } from "../../config/collision-layer";
import { poolManager } from "../../controller/pool-manager";





export class Bullet extends PixiObject {
    constructor(scene, options = {}) {
        super(scene);

        const layerKey = options.layerKey || "BULLET";

        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 10,
            height: 30,
        });
        this.add(this.sprite);

        this.collider = new Collider2d(this.scene, {
            width: 10,
            height: 30,
            isSensor: true,
            collisionFilter: createCollisionFilter(layerKey),
        });
        this.addComponent(this.collider);

    }

    update(dt) {
        this.y -= dt * 300;
        this.collider.syncToPhysics();
    }

    oncollisionenter(other) {
        poolManager.release(Bullet.name, this);
    }
}