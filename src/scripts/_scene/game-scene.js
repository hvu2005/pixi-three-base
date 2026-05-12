import { Texture } from "pixi.js";
import { Scene } from "../../engine/core/scene";
import { SimpleSprite } from "../../engine/extends/pixi/simple-sprite";
import { PlayerController } from "../player-controller";


class GameScene extends Scene {
    constructor() {
        super();

        this.matter.debug = true;

        const sprite = new SimpleSprite(Texture.WHITE, {
            width: 100,
            height: 100,
            x: 300,
            y: 300
        });
        this.pixi.add(sprite);

        const levelController = new PlayerController(this);
        this.pixi.add(levelController);
    }
}

export const GAME = new GameScene();