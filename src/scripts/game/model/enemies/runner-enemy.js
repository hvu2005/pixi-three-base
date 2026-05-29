import { Enemy } from "./enemy";
import { AnimatedSprite, Texture } from "pixi.js";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { createCollisionFilter } from "../../config/collision-layer";

export class RunnerEnemy extends Enemy {
    static type = "runner";

    constructor(scene, config = {}) {
        super(scene, {
            hp: 3,
            ...config,
            type: RunnerEnemy.type,
        });

        this._zigzagTime = 0;
        this.speedX = 60;
        this.speedY = 70;

        this.sprite = new AnimatedSprite([Texture.WHITE, Texture.WHITE]);
        this.sprite.width = 36;
        this.sprite.height = 36;
        this.sprite.tint = 0x80deea;
        this.sprite.animationSpeed = 0.14;
        this.sprite.play();
        this.add(this.sprite);

        this.collider = new Collider2d(this, {
            width: 36,
            height: 36,
            isStatic: true,
            isSensor: true,
            collisionFilter: createCollisionFilter("ENEMY"),
        });
        this.matter.add(this.collider);
    }

    update(dt) {
        this._zigzagTime += dt;
        this.x += Math.sin(this._zigzagTime * 8) * 20 * dt;
        super.update(dt);
    }
}
