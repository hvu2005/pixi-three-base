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
     * @param {Collider2dOptions} options
     */
    constructor(options = {}) {
        const defaultOptions = {
            x: 0,
            y: 0,
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

    get y() {
        return this.body.position.y;
    }
}