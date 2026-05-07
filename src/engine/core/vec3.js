import { EventEmitter } from "./event-emitter";

export class Vec3 extends EventEmitter {
    static Event = {
        CHANGE: "change",
    };

    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.emit(Vec3.Event.CHANGE, this);

        return this;
    }

    add(x = 0, y = 0, z = 0) {
        this.x += x;
        this.y += y;
        this.z += z;

        this.emit(Vec3.Event.CHANGE, this);

        return this;
    }


}