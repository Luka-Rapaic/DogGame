import {Hitbox} from "./Hitbox";

export class Circle extends Hitbox {
    constructor(x, y, r) {
        super();
        this.x = x;
        this.y = y;
        this.r = r;
    }

    overlapsRect(rect) {
        let closestX = AMath.clamp(this.x, rect.x1, rect.x2);
        let closestY = AMath.clamp(this.y, rect.y1, rect.y2);

        return Math.pow(this.x - closestX, 2)
            + Math.pow(this.y - closestY, 2)
            < Math.pow(this.r, 2);
    }
}