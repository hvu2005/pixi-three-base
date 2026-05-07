
import { GameScene } from "./src/scripts/_scene/GameScene";
import { Player } from "./src/scripts/player";
import { PlayerController } from "./src/scripts/player-controller";

(async () => {
    const game = new GameScene();

    await game.init();

    const playerController = new PlayerController(game);
})();