import { PixiObject } from "../../engine/core/pixi-object";
import { LD_TileGrid } from "./ld-grid";





export class LD_GridMap extends PixiObject {
    constructor(scene) {
        super(scene);

        this.layer = 0;

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const tile = new LD_TileGrid(this.scene);
                tile.position.set(i * 52, j * 52);
                this.add(tile);
            }
        }
    }
}