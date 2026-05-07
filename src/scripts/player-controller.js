import { PixiObject } from "../engine/core/pixi-object";
import { Player } from "./player";

export class PlayerController extends PixiObject {
    constructor(scene) {
        super(scene);

        this.load();
        this.scene.ticker.push(this.update.bind(this));
    }

    load() {
        this.player = new Player(this.scene);
        this.player.position.set(200, 200);

        console.log(this.player);
        this.scene.pixi.add(this.player);

        this.player.sprite.on("pointerdown", () => {
            console.log("PlayerController: Player clicked");
        });
    }   
    
    update(dt) {
        console.log("PlayerController update");
    }
}