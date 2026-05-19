import { Texture } from "pixi.js";
import { Scene } from "../../engine/core/scene";
import { SimpleSprite } from "../../engine/extends/pixi/simple-sprite";
import { PlayerController } from "../player-controller";
import { Asset, loadAsset } from "../_load/asset";


class GameScene extends Scene {
    constructor() {
        super();

    }

    async startScene() {
        await loadAsset();

        this.matter.debug = true;

        console.log(Asset.TEXTURE_PLAYER);

        const sprite = new SimpleSprite(Asset.TEXTURE_PLAYER, {
            width: 100,
            height: 100,
            x: 300,
            y: 300
        });
        this.pixi.add(sprite);

        // const levelController = new PlayerController(this);
        // this.pixi.add(levelController);
    }
}

export const GAME = new GameScene();