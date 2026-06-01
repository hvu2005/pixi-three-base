import { PixiObject } from "../../../engine/core/pixi-object";
import { Item } from "../model/item";
import { ItemUpgrade } from "../model/items/item-upgrade";

export class ItemController extends PixiObject {
    constructor(scene) {
        super(scene);

        this._nextId = 1;
        this.items = new Map();
        this.factories = {
            upgrade: () => new ItemUpgrade(this.scene),
        };
    }

    /**
     * @param {string} type
     * @param {(config: Object) => Item} factory
     */
    registerFactory(type, factory) {
        this.factories[type] = factory;
    }

    /**
     * @param {string} type
     * @param {Object} config
     * @returns {Item}
     */
    createItem(type = "item", config = {}) {
        const factory = this.factories[type] || this.factories.item;
        const id = config.id || `item_${this._nextId++}`;
        const customOnCollect = config.onCollect;

        const item = factory({
            ...config,
            onCollect: (collectedItem, payload) => {
                this.items.delete(id);
                customOnCollect?.(collectedItem, payload);
            },
        });

        item.id = id;
        this.items.set(id, item);
        this.pixi.add(item);

        return item;
    }

    /**
     * @param {string} itemId
     * @returns {Item|null}
     */
    getItem(itemId) {
        return this.items.get(itemId) || null;
    }

    /**
     * @returns {Item[]}
     */
    getItems() {
        return Array.from(this.items.values());
    }

    /**
     * @param {string} itemId
     * @param {any} payload
     * @returns {boolean}
     */
    collectItem(itemId, payload) {
        const item = this.items.get(itemId);
        if (!item) {
            return false;
        }

        item.collect(payload);
        return true;
    }

    /**
     * @param {string} itemId
     * @returns {boolean}
     */
    removeItem(itemId) {
        const item = this.items.get(itemId);
        if (!item) {
            return false;
        }

        this.items.delete(itemId);
        item.destroySelf();
        return true;
    }

    clearAll() {
        for (const item of this.items.values()) {
            item.destroySelf();
        }
        this.items.clear();
    }
}
