
import * as PIXI from "pixi.js";
import { Renderer } from "./abstract/renderer";

export class PixiRenderer extends Renderer {
    constructor() {
        super();
        this.pixi = PIXI;
    }

    /**
     * @override
     */
    async init() {

    }

    /**
     * @override
     */
    update() {
        
    }
}