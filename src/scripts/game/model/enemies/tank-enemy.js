import { Enemy } from "./enemy";
import { AnimatedSprite, Texture } from "pixi.js";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { createCollisionFilter } from "../../config/collision-layer";

export class TankEnemy extends Enemy {
    static type = "tank";

    constructor(scene, config = {}) {
        super(scene, {
            hp: 8,
            ...config,
            type: TankEnemy.type,
        });

        this.speedY = 22;

        this.sprite = new AnimatedSprite([Texture.WHITE, Texture.WHITE]);
        this.sprite.width = 64;
        this.sprite.height = 64;
        this.sprite.tint = 0xff7043;
        this.sprite.animationSpeed = 0.04;
        this.sprite.play();
        this.add(this.sprite);

        this.collider = new Collider2d(this, {
            width: 64,
            height: 64,
            isStatic: true,
            isSensor: true,
            collisionFilter: createCollisionFilter("ENEMY"),
        });
        this.matter.add(this.collider);
    }
}
