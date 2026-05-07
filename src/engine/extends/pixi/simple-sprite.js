import { Sprite } from "pixi.js";



export class SimpleSprite extends Sprite {
    /**
     * 
     * @param {import("pixi.js").SpriteOptions} options 
     */
    constructor(options = {}) {
        const defaultOptions = {
            anchor: { x: 0.5, y: 0.5 },
        };

        super({...defaultOptions, ...options});
    }
}