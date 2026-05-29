import { Scene } from "../../engine/core/scene";
import { EnemyController } from "../game/controller/enemy-controller";
import { PoolManager } from "../game/controller/pool-manager";
import { Player } from "../game/model/player";

class GameScene extends Scene {
    constructor() {
        super();

    }

    async startScene() {
        this.matter.debug = true;

        new PoolManager(this);
        
        const player = new Player(this);
        player.position.set(window.innerWidth * 0.5, window.innerHeight * 0.8);
        this.pixi.add(player);
        
        const enemyController = new EnemyController(this);
        const enemy = enemyController.getEnemy("grunt");
        enemy.position.set(600, window.innerHeight * 0.2);
        this.pixi.add(enemy);
    }
}

export const GAME = new GameScene();