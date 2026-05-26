
import { Container, WebGLRenderer, ContainerChild, Rectangle } from "pixi.js";
import { Renderer } from "./abstract/renderer";

export class PixiRenderer extends Renderer {
    /**
     * 
     * @param {WebGL2RenderingContext} context 
     */
    constructor(context) {
        super();

        this.context = context;
        this.renderer = new WebGLRenderer();
        this.stage = new Container({ eventMode: "static" });

    }

    /**
     * @override
     */
    async init() {
        await this.renderer.init({
            context: this.context,
            width: window.innerWidth,
            height: window.innerHeight,
            background: 0x000000,
            clearBeforeRender: true,
        })

        !this.context && document.body.appendChild(this.renderer.canvas);

        this.stage.hitArea = this.renderer.screen;
    }

    /**
     * @override
     */
    update() {
        this.renderer.resetState();
        this.renderer.render(this.stage);
    }

    /**
     * 
     * @param {ContainerChild} object 
     */
    add(object) {
        this.stage.addChild(object);

        return object;
    }

    resize(width, height) {
        // --- PIXI.JS ---
        const renderer = this.renderer;

        renderer.canvas.style.width = window.innerWidth + "px";
        renderer.canvas.style.height = window.innerHeight + "px";

        renderer.resize(width, height);
        this.stage.hitArea = new Rectangle(0, 0, width, height);
    }
}