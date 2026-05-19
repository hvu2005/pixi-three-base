import { Scene } from "../../engine/core/scene";
import { Tile } from "../game/model/tile";

class GameScene extends Scene {
    constructor() {
        super();
    }

    async startScene() {
        const tile = new Tile(this);
        tile.position.set(200, 200);
        this.pixi.add(tile);
    }
}

export const GAME = new GameScene();