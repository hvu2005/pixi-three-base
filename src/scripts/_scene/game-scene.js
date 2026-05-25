import { Scene } from "../../engine/core/scene";
import { Player } from "../game/model/player";

class GameScene extends Scene {
    constructor() {
        super();

    }

    async startScene() {
        this.matter.debug = true;
        
        const player = new Player(this);
        player.position.set(window.innerWidth * 0.5, window.innerHeight * 0.8);
        this.pixi.add(player);
        
    }
}

export const GAME = new GameScene();