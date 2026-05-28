import { PixiObject } from "../../../engine/core/pixi-object";
import { GruntEnemy } from "../model/enemies";




export class EnemyController extends PixiObject {
    constructor(scene) {
        super(scene);

        this.enemies = {
            "grunt": (scene) => new GruntEnemy(scene),
        }
    }

    /**
     * @param {string} type 
     */
    getEnemy(type) {
        const enemyFactory = this.enemies[type];
        if (enemyFactory) {
            return enemyFactory(this.scene);
        }
        return null;
    }
}