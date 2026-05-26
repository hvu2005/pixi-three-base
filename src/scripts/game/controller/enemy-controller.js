import { PixiObject } from "../../../engine/core/pixi-object";
import { GruntEnemy } from "../model/enemies";




export class EnemyController extends PixiObject {
    constructor(scene) {
        super(scene);

        this.enemies = {
            "grunt": (config = {}) => new GruntEnemy(this.scene, config),
        };
    }

    /**
     * @param {string} type
     * @param {Object} [config]
     */
    getEnemy(type, config = {}) {
        const enemyFactory = this.enemies[type];
        if (enemyFactory) {
            return enemyFactory(config);
        }
        return null;
    }
}