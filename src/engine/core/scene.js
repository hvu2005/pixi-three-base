
export class Scene {


    constructor() {
        this.objects = [];

        if (__PIXI__) {
            const { PixiRenderer } = require("./render/pixi-renderer");
            this.pixi = new PixiRenderer();
        }

        if (__THREE__) {
            const { ThreeRenderer } = require("./render/three-renderer");
            this.three = new ThreeRenderer();
        }

        if (__MATTER__) {
            const { MatterPhysics } = require("./physics/matter-physics");
            this.matter = new MatterPhysics();
        }

        if (__CANNON__) {
            const { CannonPhysics } = require("./physics/cannon-physics");
            this.cannon = new CannonPhysics();
        }
    }

    async init() {
        await this.pixi?.init();
        await this.three?.init();
        await this.matter?.init();
        await this.cannon?.init();
    }

}