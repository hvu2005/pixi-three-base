import gsap from "gsap";
import { Item } from "./item";
import { PixiObject } from "../../../../engine/core/pixi-object";
import { PoolManager } from "../../controller/pool-manager";





export class ItemUpgrade extends Item {
    constructor(scene) {
        super(scene);
    }

    /**
     * 
     * @param {Item} item 
     * @param {PixiObject} payload 
     */
    onCollect(item, payload) {
        gsap.to(this, {
            duration: 0.15,
            x: payload.x,
            y: payload.y,
            onComplete: () => {
                this.destroy();
            }
        })
    }
}