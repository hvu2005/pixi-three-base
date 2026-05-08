import { PixiObject } from "../engine/core/pixi-object";
import { Player } from "./player";
import { GAME } from "./_scene/game-scene";

export class PlayerController extends PixiObject {
    constructor(scene) {
        super(scene);

        this.load();
        this.scene.ticker.push(this.update.bind(this));
    }

    load() {
        this.position.set(100, 100);

        this.player = new Player(this.scene);
        this.player.position.set(200, 200);
        this.attach(this.player);


    }   
    
    update(dt) {
    }
}
