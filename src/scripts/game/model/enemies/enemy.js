import { PixiObject } from "../../../../engine/core/pixi-object";
import { Collider2d } from "../../../../engine/extends/matter/collider-2d";
import { PoolManager } from "../../controller/pool-manager";
import { ItemUpgrade } from "../items/item-upgrade";



/**
 * @typedef {Object} EnemyDataConfig
 * @property {string} [type]
 * @property {number} [hp]
 * @property {(enemy: Enemy) => void} [onDead]
 */

export class Enemy extends PixiObject {

    /**
     * @param {Scene} scene
     * @param {EnemyDataConfig} dataConfig 
     */
    constructor(scene, dataConfig) {
        super(scene);

        this.data = dataConfig || {};
        this.id = `enemy_${Math.floor(Math.random() * 1000000)}`;
        this.type = this.data.type || this.constructor.type || "enemy";
        this.maxHp = this.data.hp ?? 3;
        this.hp = this.maxHp;
        this.isAlive = true;
        this.onDead = this.data.onDead || null;

        /**
         * @type {Collider2d|null}
         */
        this.collider = null;

    }

    oncollisionenter(other) {
        this.takeDamage();
    }

    update(dt) {
        if (!this.isAlive) {
            return;
        }

        if (this.collider) {
            this.collider.syncToPhysics();
        }
    }

    takeDamage(amount = 1) {
        if (!this.isAlive) {
            return;
        }

        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        if (!this.isAlive) {
            return;
        }

        this.isAlive = false;
        this.onDead?.(this);
        
        const item = PoolManager.instance.get(ItemUpgrade.name);
        item.position.set(this.x, this.y);
        this.pixi.add(item);

        const ticker = this.scene?.ticker;
        if (ticker && this._onUpdate) {
            const index = ticker.indexOf(this._onUpdate);
            if (index >= 0) {
                ticker.splice(index, 1);
            }
        }

        if (this.collider) {
            this.matter.remove(this.collider);
        }

        this.parent?.removeChild(this);
        this.destroy({ children: true });
    }

}