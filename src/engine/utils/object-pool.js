/**
 * @template T
 */
export class ObjectPool {
    /**
     * @param {() => T} createFunc
     * @param {number} [size=2]
     */
    constructor(createFunc, size = 2) {
        /** @type {() => T} */
        this.createFunc = createFunc;

        /** @type {T[]} */
        this.pool = [];

        for (let i = 0; i < size; i++) {
            const obj = this.createFunc();
            obj.visible = false;
            this.pool.push(obj);
        }
    }

    /**
     * @returns {T}
     */
    get() {
        const obj = this.pool.length > 0 ? this.pool.pop() : this.createFunc();
        obj.visible = true;
        return obj;
    }

    /**
     * @param {T} obj
     * @returns {void}
     */
    release(obj) {
        this.pool.push(obj);
        obj.visible = false;
    }
}