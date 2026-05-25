import { PixiObject } from "../../../engine/core/pixi-object";
import { Sprite, Texture } from "pixi.js";
import { SimpleSprite } from "../../../engine/extends/pixi/simple-sprite";
import { Shooter } from "./shooter";




export class Player extends PixiObject {
    constructor(scene) {
        super(scene);
        this.eventMode = "static";

        this._isDragging = false;
        this._dragOffsetX = 0;
        this._dragOffsetY = 0;

        this._onpointermoveBound = this._onpointermove.bind(this);
        this._onpointerupBound = this._onpointerup.bind(this);
        this._onpointerdownBound = this._onpointerdown.bind(this);
        this.scene.pixi.stage.on("pointerdown", this._onpointerdownBound);


        this.sprite = new SimpleSprite(Texture.WHITE, {
            width: 100,
            height: 100,
            tint: 0x00ff00,
        });
        this.add(this.sprite);

        this.shooter = new Shooter(this.scene);
        

    }

    _onpointerdown(e) {
        this._isDragging = true;

        const pointerPos = this.parent.toLocal(e.global);
        this._dragOffsetX = this.x - pointerPos.x;
        this._dragOffsetY = this.y - pointerPos.y;

        this.scene.pixi.stage.on("pointermove", this._onpointermoveBound);
        this.scene.pixi.stage.on("pointerup", this._onpointerupBound);
        this.scene.pixi.stage.on("pointerupoutside", this._onpointerupBound);
        this.shooter.shoot(this.x, this.y);
    }

    _onpointermove(e) {
        if (!this._isDragging) {
            return;
        }

        const pointerPos = this.parent.toLocal(e.global);
        this.position.set(
            pointerPos.x + this._dragOffsetX,
            pointerPos.y + this._dragOffsetY,
        );

    }

    _onpointerup() {
        this._isDragging = false;

        this.scene.pixi.stage.off("pointermove", this._onpointermoveBound);
        this.scene.pixi.stage.off("pointerup", this._onpointerupBound);
        this.scene.pixi.stage.off("pointerupoutside", this._onpointerupBound);

    }
}