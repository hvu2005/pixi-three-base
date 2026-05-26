import { GruntEnemy } from "../model/enemies";




export class EnemyController extends PixiObject {
    constructor(scene) {
        super(scene);

        this.enemies = {
            "grunt": () => new GruntEnemy(),
        }
    }

    /**
     * @param {string} type 
     */
    getEnemy(type) {
        const enemyFactory = this.enemies[type];
        if (enemyFactory) {
            return enemyFactory();
        }
        return null;
    }
}