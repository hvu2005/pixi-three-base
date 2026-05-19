import { Scene } from "../../engine/core/scene";
import { LD_GridMap } from "../level-design/ld-grid-map";




class LevelDesignScene extends Scene {
    async startScene() {

        const gridmap = new LD_GridMap(this);
        gridmap.position.set(200, 200);
        this.pixi.add(gridmap);
    }
}

export const LEVEL_DESIGN_SCENE = new LevelDesignScene();