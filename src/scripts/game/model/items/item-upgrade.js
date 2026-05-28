import { Item } from "./item";





export class ItemUpgrade extends Item {
    constructor(scene) {
        super(scene);
    }

    onCollect(item, payload) {
        console.log("Upgrade collected!", item, payload);
    }
}