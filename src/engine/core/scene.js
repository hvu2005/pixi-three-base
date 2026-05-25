import { GameObject } from "./pixi-object";

export class Scene {
    constructor() {
        this.ticker = [];
        this.systems = [];

        if (__THREE__) {
            const { ThreeRenderer } = require("./render/three-renderer");
            this.three = new ThreeRenderer();
            this.systems.push(this.three);
        }

        if (__PIXI__) {
            const { PixiRenderer } = require("./render/pixi-renderer");
            this.pixi = new PixiRenderer();
            this.systems.push(this.pixi);
        }

        if (__MATTER__) {
            const { MatterPhysics } = require("./physics/matter-physics");
            this.matter = new MatterPhysics();
            this.systems.push(this.matter);
        }

        if (__CANNON__) {
            const { CannonPhysics } = require("./physics/cannon-physics");
            this.cannon = new CannonPhysics();
            this.systems.push(this.cannon);
        }

    }

    async init() {
        for (const s of this.systems) {
            await s.init();

        }

        await this.startScene();
        this._startLoop();

    }

    async startScene() {

    }

    update(dt) {
        for (const s of this.systems) {
            s.update(dt);
        }

        for (const cb of this.ticker) {
            cb(dt);
        }
    }
    
    /**
     * 
     * @param {Function} callback 
     */
    addUpdate(callback) {
        this.ticker.push(callback);
    }

    /**
     * @private
     */
    _startLoop() {
        let lastTime = performance.now();

        const loop = (time) => {
            const deltaTime = (time - lastTime) / 1000;

            lastTime = time;

            this.update(deltaTime);

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}