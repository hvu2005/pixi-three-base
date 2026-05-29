import { Enemy } from "./enemy";
import { AnimatedSprite, Texture } from "pixi.js";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { createCollisionFilter } from "../../config/collision-layer";

export class GruntEnemy extends Enemy {
    static type = "grunt";

    constructor(scene, config = {}) {
        super(scene, {
            hp: 2,
            ...config,
            type: GruntEnemy.type,
        });

        this.speedY = 45;

        this.sprite = new AnimatedSprite([Texture.WHITE, Texture.WHITE]);
        this.sprite.width = 42;
        this.sprite.height = 42;
        this.sprite.tint = 0xff8a80;
        this.sprite.animationSpeed = 0.08;
        this.sprite.play();
        this.sprite.anchor.set(0.5);
        this.add(this.sprite);

        this.collider = new Collider2d(this, {
            width: 42,
            height: 42,
            isSensor: true,
            collisionFilter: createCollisionFilter("ENEMY"),
        });
        this.addComponent(this.collider);
    }
}
