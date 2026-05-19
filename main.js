import { GAME } from "./src/scripts/_scene/game-scene";
import { LEVEL_DESIGN_SCENE } from "./src/scripts/_scene/level-design-scene";


(async () => {
    // await GAME.init();
    await LEVEL_DESIGN_SCENE.init();
})();