import { Group } from "three";



export class ThreeObject extends Group {
    constructor(scene) {
        super();
        this.scene = scene;
    }
}