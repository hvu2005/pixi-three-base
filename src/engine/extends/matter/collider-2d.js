import { Bodies, Body } from "matter-js";

/**
 * @typedef {import("matter-js").IChamferableBodyDefinition & {
 *   x?: number,
 *   y?: number,
 *   width?: number,
 *   height?: number
 * }} Collider2dOptions
 */

export class Collider2d {
    /**
     * @param {import("../../../engine/core/pixi-object").PixiObject} owner
     * @param {Collider2dOptions} options
     */
    constructor(owner, options = {}) {
        this.owner = owner;
        
        const defaultOptions = {
            x: owner?.position?.x ?? 0,
            y: owner?.position?.y ?? 0,
            width: 100,
            height: 100,
        };

        /** @type {Collider2dOptions} */
        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        const {
            x,
            y,
            width,
            height,
            ...bodyOptions
        } = mergedOptions;

        this.body = Bodies.rectangle(
            x,
            y,
            width,
            height,
            bodyOptions
        );
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setPosition(x, y) {
        Body.setPosition(this.body, { x, y });
        if (this.owner) {
            this.owner.position.set(x, y);
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setVelocity(x, y) {
        Body.setVelocity(this.body, { x, y });
    }

    /**
     * @param {number} angle
     */
    setAngle(angle) {
        Body.setAngle(this.body, angle);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    scale(x, y) {
        Body.scale(this.body, x, y);
    }

    /**
     * @param {boolean} value
     */
    setStatic(value) {
        Body.setStatic(this.body, value);
    }

    get position() {
        return this.body.position;
    }

    get angle() {
        return this.body.angle;
    }

    get x() {
        return this.body.position.x;
    }


    /**
     * Sync Pixi object position từ physics body
     * Gọi sau khi physics engine update
     */
    syncFromPhysics() {
        if (this.owner) {
            this.owner.position.set(this.body.position.x, this.body.position.y);
            this.owner.rotation = this.body.angle;
        }
    }

    /**
     * Sync physics body position từ Pixi object
     * Gọi khi Pixi object position thay đổi trực tiếp
     */
    syncToPhysics() {
        Body.setPosition(this.body, this.owner.position);
        Body.setAngle(this.body, this.owner.rotation);
    }
    get y() {
        return this.body.position.y;
    }
}