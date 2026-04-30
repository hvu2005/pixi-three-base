
import { Scene } from "./src/engine/core/scene";

(async () => {
    const game = new Scene({
        matter: true,
        cannon: true,
        pixi: false,
        three: true,
    })
})();