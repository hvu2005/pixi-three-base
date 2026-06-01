import { Texture } from "pixi.js";
import { SimpleSprite } from "../../../../engine/extends/pixi/simple-sprite";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { Bullet } from "../bullets/bullet";
import { PoolManager } from "../../controller/pool-manager";


/**
 *@typedef {Object} ShooterConfig
 *@property {number} [attackSpeed]
 */


export class Shooter extends PixiObject {
    /**
     * @param {import("../../../../engine/core/scene").Scene} scene
     * @param {ShooterConfig} config
     */
    constructor(scene, config = {}) {
        super(scene);

        this._intervalTime = 0;
        this.attackSpeed = config.attackSpeed || 5;
        this.isShooting = false;

    }

    update(dt) {
        if (!this.isShooting) return;

        this._intervalTime += dt;
        if (this._intervalTime > this.attackSpeed) {
            this._intervalTime -= this.attackSpeed;
            this.shoot();
        }
    }

    shoot() {

    }

    getBullet(name, {number = 1, spacing = 30} = {}) {
        const pos = this.getGlobalPosition();

        // Tính vị trí bắt đầu để cả cụm nằm giữa
        const startX = pos.x - ((number - 1) * spacing) / 2;

        for (let i = 0; i < number; i++) {
            const bullet = PoolManager.instance.get(name);

            bullet.position.set(
                startX + i * spacing,
                pos.y - 50
            );

            this.pixi.add(bullet);
        }
    }

    start() {
        this.isShooting = true;
    }

    stop() {
        this.isShooting = false;
        this._intervalTime = 0;
    }

}