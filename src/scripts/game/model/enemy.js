import { PixiObject } from "../../../engine/core/pixi-object";



/**
 * @typedef {Object} EnemyDataConfig
 * @property {number} hp
 */

export class Enemy extends PixiObject {
    /**
     * @param {Scene} scene
     * @param {EnemyDataConfig} dataConfig 
     */
    constructor(scene, dataConfig) {
        super(scene);

        this.data = dataConfig;
    }

}