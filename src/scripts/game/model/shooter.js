import { Texture } from "pixi.js";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";
import { PixiObject } from "../../../engine/core/pixi-object";
import { Bullet } from "./Bullet";


/**
 *@typedef {Object} ShooterConfig
 *@property {number} [attackSpeed]
 */


export class Shooter extends PixiObject {
    /**
     * @param {import("../../../engine/core/scene").Scene} scene
     * @param {ShooterConfig} config
     */
    constructor(scene, config = {}) {
        super(scene);

        this._intervalTime = 0;
        this.attackSpeed = config.attackSpeed || 5;
        this.isShooting = false;

        this.scene.addUpdate(this.update.bind(this));
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
        
    }

    start() {
        this.isShooting = true;
    }

    stop() {
        this.isShooting = false;
        this._intervalTime = 0;
    }

}