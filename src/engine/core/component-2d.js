import { Scene } from "./scene";




export class Component2D {
    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        this.scene = scene;

        /**
         * @type {import("./pixi-object").PixiObject}
         */
        this.gameObject = null;

        this._enabled = true;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
        if (this._enabled) {
            this.onEnable();
        } else {
            this.onDisable();
        }
    }

    destroy() {
        this.onDestroy();
    }

    onEnable() {

    }

    onDisable() {

    }

    onDestroy() {
    }
}