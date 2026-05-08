
import { PixiObject } from "./src/engine/core/pixi-object";
import { SimpleSprite } from "./src/engine/extends/pixi/simple-sprite";
import { GAME } from "./src/scripts/_scene/game-scene";
import { Player } from "./src/scripts/player";
import { playController, PlayerController } from "./src/scripts/player-controller";

(async () => {
    await GAME.init();

})();