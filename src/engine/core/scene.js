import Stats from "three/examples/jsm/libs/stats.module.js";
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

        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
    }

    /**
     * @returns {{ width: number, height: number }}
     */
    _getLogicalSize() {
        const DESIGN_WIDTH = 1028;
        const DESIGN_HEIGHT = 783;

        const windowW = window.innerWidth;
        const windowH = window.innerHeight;

        let logicWidth, logicHeight, scale;

        // --- Tính toán scale logic ---
        if (windowW <= windowH) {
            // Portrait → fit width
            scale = windowW / DESIGN_WIDTH;
            logicWidth = DESIGN_WIDTH;
            logicHeight = windowH / scale;
        } else {
            // Landscape → fit height
            scale = windowH / DESIGN_HEIGHT;
            logicHeight = DESIGN_HEIGHT;
            logicWidth = windowW / scale;
        }
        return { width: logicWidth, height: logicHeight };
    }


    resize() {
        const { width, height } = this._getLogicalSize();
        for (const s of this.systems) {
            s.resize?.(width, height);
        }
    }

    async init() {
        for (const s of this.systems) {
            await s.init();

        }

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        await this.startScene();
        this._startLoop();

    }

    async startScene() {

    }

    update(dt) {

        this.stats.begin();

        for (const s of this.systems) {
            s.update(dt);
        }

        for (const cb of this.ticker) {
            cb(dt);
        }

        this.stats.end();
    }

    /**
     * 
     * @param {Function} callback 
     */
    addUpdate(callback) {
        this.ticker.push(callback);
    }

    removeUpdate(callback) {
        const index = this.ticker.indexOf(callback);
        if (index >= 0) {
            this.ticker.splice(index, 1);
        }
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