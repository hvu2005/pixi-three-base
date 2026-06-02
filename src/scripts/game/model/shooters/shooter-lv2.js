import { Bullet } from "../bullets/bullet";
import { Shooter } from "./shooter";




export class ShooterLv2 extends Shooter {
    constructor(scene) {
        super(scene, { attackSpeed: 0.3 });
    }

    shoot() {
        this.getBullet(Bullet.name, { number: 3 , spacing: 20});
    }
}