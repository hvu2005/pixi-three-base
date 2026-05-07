import { Container, ContainerChild } from "pixi.js";
import { Scene } from "./scene";


export class PixiObject extends Container {
    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;
        this.scene.addUpdate(this.update.bind(this));
        this.scene.pixi.add(this);

        this.load();
    }

    /**
     * @virtual
     */
    load() {

    }

    /**
     * @virtual
     * @param {number} dt 
     */
    update(dt) {

    }

    /**
     * 
     * @param {...ContainerChild} child 
     */
    add(...child) {
        super.addChild(...child);
    }

    /**
     * 
     * @param {...ContainerChild} child 
     */
    remove(...child) {
        super.removeChild(...child);
    }

    /**
     * 
     * @param {ContainerChild} child 
     */
    attach(child) {
        const worldPos = child.getGlobalPosition();
        super.addChild(child);
        const localPos = this.toLocal(worldPos);
        child.position.copyFrom(localPos);
    }
}
