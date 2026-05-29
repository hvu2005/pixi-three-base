



export class Component2D {
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

    onEnable() {

    }

    onDisable() {

    }

    onDestroy() {
    }
}