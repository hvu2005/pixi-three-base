import { Enemy } from "./enemy";
import { AnimatedSprite, Texture } from "pixi.js";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { createCollisionFilter } from "../../config/collision-layer";

export class ShooterEnemy extends Enemy {
    static type = "shooter";

    constructor(scene, config = {}) {
        super(scene, {
            hp: 5,
            ...config,
            type: ShooterEnemy.type,
        });

        this.speedY = 35;

        this.sprite = new AnimatedSprite([Texture.WHITE, Texture.WHITE]);
        this.sprite.width = 52;
        this.sprite.height = 52;
        this.sprite.tint = 0xce93d8;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.add(this.sprite);

        this.collider = new Collider2d(this, {
            width: 52,
            height: 52,
            isStatic: true,
            isSensor: true,
            collisionFilter: createCollisionFilter("ENEMY"),
        });
        this.matter.add(this.collider);
    }
}
