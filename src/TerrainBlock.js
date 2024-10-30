import {Rectangle} from "./Rectangle";

export class TerrainBlock {
    constructor(x1, x2, y1, y2) {
        this.hitbox = new Rectangle(x1, x2, y1, y2)
    }

    isDiggable() {
        return false;
    }

    isBurrowable() {
        return false;
    }

    isActive() {
        return false;
    }

    collides(hitbox) {
        return hitbox.overlapsRect(this.hitbox);
    }
}