import { Texture } from "pixi.js";
import { Scene } from "../../../engine/core/scene";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";



export class Shooter {
    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        this.scene = scene;
    }

    shoot(x, y) {
        const bullet = new SimpleSprite(Texture.WHITE, {
            width: 10,
            height: 20,
        });

        this.scene.addUpdate((dt) => {
            bullet.y -= 500 * dt;
        })

        bullet.position.set(x, y);
        this.scene.pixi.add(bullet);
    }
}