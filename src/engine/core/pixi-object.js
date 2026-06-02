import { Container } from "pixi.js";
import { Scene } from "./scene";


export class PixiObject extends Container {
    /**
     * 
     * @param {Scene} scene 
     * @param {import("pixi.js").ContainerOptions} options
     */
    constructor(scene, options) {
        super(options);
        this.scene = scene;

        /**
         * @type {import("./component-2d").Component2D[]}
         */
        this.components = [];

        /**
         * @private
         */
        this._update = (dt) => {
            if (!this.visible) return;
            this.update(dt);
        };

        this.scene.addUpdate(this._update);
    }

    /**
     * @param {...import("pixi.js").DisplayObject[]} child 
     */
    add(...child) {
        return super.addChild(...child);
    }

    /**
     * @param {...import("pixi.js").DisplayObject[]} child 
     */
    remove(...child) {
        return super.removeChild(...child);
    }

    update(dt) {
        // To be overridden by subclasses
    }

    onVisible() {

    }

    onInvisible() {

    }

    /**
     * @template {import("./component-2d").Component2D} T
     * @param {T} component
     * @returns {T}
     */
    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
        component.enabled = this.visible;

        return component;
    }

    /**
     * 
     * @param {import("pixi.js").DisplayObject} child 
     */
    attach(child) {
        const worldPos = child.getGlobalPosition();
        super.addChild(child);
        const localPos = this.toLocal(worldPos);
        child.position.copyFrom(localPos);

        return child;
    }

    destroy() {
        this.scene.removeUpdate(this._update);
        for (const component of this.components) {
            component.destroy();
        }
        super.destroy();
    }

    get matter() {
        return this.scene.matter;
    }

    get pixi() {
        return this.scene.pixi;
    }

    get visible() {
        return super.visible;
    }

    set visible(value) {
        const oldValue = super.visible;

        if (oldValue === value) return;

        super.visible = value;

        if (value) {
            this.onVisible();
        } else {
            this.onInvisible();
        }

        for (const component of this.components) {
            component.enabled = value;
        }
        // this.onVisibleChanged(value, oldValue);
    }

}
