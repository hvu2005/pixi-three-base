import { Texture } from "pixi.js";
import { SimpleSprite } from "../../../../engine/extends/pixi/simple-sprite";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { Bullet } from "../bullets/bullet";


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
        if(!this.isShooting) return;
        
        this._intervalTime += dt;
        if(this._intervalTime > this.attackSpeed) {
            this._intervalTime -= this.attackSpeed;
            this.shoot();
        }
    }

    shoot() {
        const bullet = new Bullet(this.scene);
        bullet.position.set(this.parent.x, this.parent.y - 50);
        this.pixi.add(bullet);
    }

    start() {
        this.isShooting = true;
    }

    stop() {
        this.isShooting = false;
        this._intervalTime = 0;
    }

}