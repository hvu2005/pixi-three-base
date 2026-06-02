import { PixiObject } from "../../../engine/core/pixi-object";
import { ObjectPool } from "../../../engine/utils/object-pool";
import { Bullet } from "../model/bullets/bullet";
import { ItemUpgrade } from "../model/items/item-upgrade";



export class PoolManager extends PixiObject {
    /**
     * @type {PoolManager}
     */
    static instance;

    constructor(scene) {
        super(scene);

        /**
         * @type {Map<string, ObjectPool>}
         */
        this.pools = new Map();

        if (!PoolManager.instance) {
            PoolManager.instance = this;
        }

        this.createPool(Bullet.name, () => new Bullet(this.scene), 10);
        this.createPool(ItemUpgrade.name, () => new ItemUpgrade(this.scene), 2);
    }

    createPool(key, createFunc, size = 2) {
        const pool = new ObjectPool(createFunc, size);
        this.pools.set(key, pool);
        return pool;
    }

    hasPool(key) {
        return this.pools.has(key);
    }

    get(key) {
        const pool = this.pools.get(key);
        if (!pool) {
            throw new Error(`Pool not found: ${key}`);
        }
        return pool.get();
    }

    release(key, obj) {
        const pool = this.pools.get(key);
        if (!pool) {
            throw new Error(`Pool not found: ${key}`);
        }
        pool.release(obj);
    }

    removePool(key) {
        this.pools.delete(key);
    }

    clear() {
        this.pools.clear();
    }
}
