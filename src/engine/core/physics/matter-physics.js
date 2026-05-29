import { Engine, Events, World, Render } from "matter-js";

export class MatterPhysics {
    constructor() {
        this.engine = Engine.create({
            enableSleeping: false,
        });
        this.engine.gravity.y = 0;

        this.world = this.engine.world;

        this.fixedDt = 1 / 60;
        this.accumulator = 0;

        this.bodyToCollider = new Map();

        this._debug = false;
        this.debugRender = null;
        this.debugContainer = document.body;
        this.debugOptions = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

    }

    async init() {
        this._setupCollisionEvents();

    }

    resize(width, height) {
        this.setDebugOptions({
            width: width,
            height: height,
        });
    }

    get debug() {
        return this._debug;
    }

    set debug(value) {
        if (this._debug === value) return;

        this._debug = value;

        if (value) {
            this._createDebugRender();
        } else {
            this._destroyDebugRender();
        }
    }

    setDebugContainer(container) {
        this.debugContainer = container;

        if (this.debug) {
            this._destroyDebugRender();
            this._createDebugRender();
        }
    }

    setDebugOptions(options = {}) {
        this.debugOptions = {
            ...this.debugOptions,
            ...options,
        };

        if (this.debug) {
            this._destroyDebugRender();
            this._createDebugRender();
        }
    }

    _createDebugRender() {
        if (this.debugRender) return;

        const logicWidth = this.debugOptions.width;
        const logicHeight = this.debugOptions.height;

        this.debugRender = Render.create({
            element: this.debugContainer,
            engine: this.engine,
            options: {
                width: logicWidth,
                height: logicHeight,

                wireframes: false,
                background: "transparent",

                showAngleIndicator: true,
                showBounds: true,
                showVelocity: true,
                showCollisions: true,
                showIds: true,

                ...this.debugOptions,
            },
        });

        Render.run(this.debugRender);

        const render = this.debugRender;
        const canvas = render.canvas;

        canvas.width = logicWidth;
        canvas.height = logicHeight;

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "999999";
        canvas.style.background = "transparent";

        render.bounds.min.x = 0;
        render.bounds.min.y = 0;
        render.bounds.max.x = logicWidth;
        render.bounds.max.y = logicHeight;

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: logicWidth, y: logicHeight },
        });
    }

    _destroyDebugRender() {
        if (!this.debugRender) return;

        Render.stop(this.debugRender);

        if (this.debugRender.canvas) {
            this.debugRender.canvas.remove();
        }

        this.debugRender.textures = {};
        this.debugRender = null;


    }

    _setupCollisionEvents() {
        Events.on(this.engine, "collisionStart", (event) => {
            for (const pair of event.pairs) {
                const colA = this.bodyToCollider.get(pair.bodyA);
                const colB = this.bodyToCollider.get(pair.bodyB);

                if (!colA || !colB) continue;

                if (colA.enabled !== false && colA.oncollisionenter) {
                    colA.oncollisionenter(colB);
                }

                if (colB.enabled !== false && colB.oncollisionenter) {
                    colB.oncollisionenter(colA);
                }
            }
        });

        Events.on(this.engine, "collisionEnd", (event) => {
            for (const pair of event.pairs) {
                const colA = this.bodyToCollider.get(pair.bodyA);
                const colB = this.bodyToCollider.get(pair.bodyB);

                if (!colA || !colB) continue;

                if (colA.enabled !== false && colA.oncollisionexit) {
                    colA.oncollisionexit(colB);
                }

                if (colB.enabled !== false && colB.oncollisionexit) {
                    colB.oncollisionexit(colA);
                }
            }
        });

        Events.on(this.engine, "collisionActive", (event) => {
            for (const pair of event.pairs) {
                const colA = this.bodyToCollider.get(pair.bodyA);
                const colB = this.bodyToCollider.get(pair.bodyB);

                if (!colA || !colB) continue;

                if (colA.enabled !== false && colA.oncollisionstay) {
                    colA.oncollisionstay(colB);
                }

                if (colB.enabled !== false && colB.oncollisionstay) {
                    colB.oncollisionstay(colA);
                }
            }
        });
    }

    update(dt) {
        this.accumulator += dt;

        while (this.accumulator >= this.fixedDt) {
            Engine.update(this.engine, this.fixedDt * 1000);
            this.accumulator -= this.fixedDt;

        }
    }

    add(collider) {
        if (!collider || !collider.body) return;

        World.add(this.world, collider.body);
        this.bodyToCollider.set(collider.body, collider);

        collider.physics = this;

        return collider;
    }

    remove(collider) {
        if (!collider || !collider.body) return;

        World.remove(this.world, collider.body);
        this.bodyToCollider.delete(collider.body);

        collider.physics = null;
    }
}