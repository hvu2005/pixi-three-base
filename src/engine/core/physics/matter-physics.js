import { Engine, Events, World, Render } from "matter-js";

export class MatterPhysics {
    constructor() {
        this.engine = Engine.create({
            enableSleeping: true,
        });

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

        this.debugRender = Render.create({
            element: this.debugContainer,
            engine: this.engine,
            options: {
                width: this.debugOptions.width,
                height: this.debugOptions.height,

                wireframes: true,
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

        const canvas = this.debugRender.canvas;

        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";
        canvas.style.background = "transparent";
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

                if (colA.enabled !== false && colA.onCollisionEnter) {
                    colA.onCollisionEnter(colB);
                }

                if (colB.enabled !== false && colB.onCollisionEnter) {
                    colB.onCollisionEnter(colA);
                }
            }
        });

        Events.on(this.engine, "collisionEnd", (event) => {
            for (const pair of event.pairs) {
                const colA = this.bodyToCollider.get(pair.bodyA);
                const colB = this.bodyToCollider.get(pair.bodyB);

                if (!colA || !colB) continue;

                if (colA.enabled !== false && colA.onCollisionExit) {
                    colA.onCollisionExit(colB);
                }

                if (colB.enabled !== false && colB.onCollisionExit) {
                    colB.onCollisionExit(colA);
                }
            }
        });

        Events.on(this.engine, "collisionActive", (event) => {
            for (const pair of event.pairs) {
                const colA = this.bodyToCollider.get(pair.bodyA);
                const colB = this.bodyToCollider.get(pair.bodyB);

                if (!colA || !colB) continue;

                if (colA.enabled !== false && colA.onCollisionStay) {
                    colA.onCollisionStay(colB);
                }

                if (colB.enabled !== false && colB.onCollisionStay) {
                    colB.onCollisionStay(colA);
                }
            }
        });
    }

    update(dt) {
        this.accumulator += dt;

        while (this.accumulator >= this.fixedDt) {
            Engine.update(this.engine, this.fixedDt * 1000);
            this.accumulator -= this.fixedDt;
            Render.run(this.debugRender);

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