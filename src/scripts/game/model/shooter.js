import { Texture } from "pixi.js";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";
import { PixiObject } from "../../../engine/core/pixi-object";
import { Bullet } from "./Bullet";


/**
 *@typedef {Object} ShooterConfig
 *@property {number} [attackSpeed]
 *@property {Array<ShooterLevelConfig>} [levels]
 *@property {number} [startLevel]
 *@property {(bullet: Bullet) => void} [onBulletCreated]
 */

/**
 *@typedef {Object} ShooterShotConfig
 *@property {number} [offsetX]
 *@property {number} [offsetY]
 *@property {number} [velocityX]
 *@property {number} [velocityY]
 *@property {number} [damage]
 *@property {number} [width]
 *@property {number} [height]
 *@property {number} [tint]
 *@property {number} [lifeTime]
 *@property {number} [hitRadius]
 */

/**
 *@typedef {Object} ShooterLevelConfig
 *@property {string} [id]
 *@property {number} [attackSpeed]
 *@property {Array<ShooterShotConfig>} shots
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
        this.levels = config.levels || [
            {
                id: "lv1",
                attackSpeed: this.attackSpeed,
                shots: [
                    {
                        offsetX: 0,
                        offsetY: -50,
                        velocityX: 0,
                        velocityY: -350,
                        damage: 1,
                        width: 10,
                        height: 28,
                        tint: 0xffffff,
                        lifeTime: 4,
                        hitRadius: 12,
                    },
                ],
            },
        ];
        this.levelIndex = Math.max(0, Math.min(config.startLevel || 0, this.levels.length - 1));
        this.onBulletCreated = config.onBulletCreated || null;
        this.isShooting = false;

        this.scene.addUpdate(this.update.bind(this));

        this._syncLevelAttackSpeed();
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
        const currentLevel = this.levels[this.levelIndex] || this.levels[0];
        const pos = this.getGlobalPosition();

        for (const shot of currentLevel.shots || []) {
            const bullet = new Bullet(this.scene, shot);
            bullet.position.set(
                pos.x + (shot.offsetX || 0),
                pos.y + (shot.offsetY || -50),
            );
            this.scene.pixi.add(bullet);
            if (this.onBulletCreated) {
                this.onBulletCreated(bullet);
            }
        }
    }

    start() {
        this.isShooting = true;
    }

    stop() {
        this.isShooting = false;
        this._intervalTime = 0;
    }

    setLevels(levels, startLevel = 0) {
        if (!Array.isArray(levels) || levels.length === 0) {
            return;
        }

        this.levels = levels;
        this.levelIndex = Math.max(0, Math.min(startLevel, this.levels.length - 1));
        this._syncLevelAttackSpeed();
    }

    setBulletSpawnHandler(onBulletCreated) {
        this.onBulletCreated = onBulletCreated;
    }

    upgrade(step = 1) {
        if (!this.levels.length) {
            return null;
        }

        this.levelIndex = Math.max(0, Math.min(this.levelIndex + step, this.levels.length - 1));
        this._syncLevelAttackSpeed();
        return this.levels[this.levelIndex];
    }

    getCurrentLevel() {
        return this.levels[this.levelIndex] || null;
    }

    _syncLevelAttackSpeed() {
        const currentLevel = this.levels[this.levelIndex];
        if (!currentLevel) {
            return;
        }

        this.attackSpeed = currentLevel.attackSpeed || this.attackSpeed;
    }

}