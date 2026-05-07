
import { GameScene } from "./src/scripts/_scene/GameScene";
import { Player } from "./src/scripts/player";

(async () => {
    const game = new GameScene();

    await game.init();

    const player = new Player(game);
    player.position.set(200, 200);

    const player2 = new Player(game);
    player2.position.set(300, 300);
})();