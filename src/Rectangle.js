import {Hitbox} from './Hitbox'

export class Rectangle extends Hitbox {
    constructor(x1, x2, y1, y2) {
        super()
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    overlapsRect(rect) {
        let isPosX = Math.min(this.x2, rect.x2) > Math.max(this.x1, rect.x1);
        let isPosY = Math.min(this.y2, rect.y2) > Math.max(this.y1, rect.y1);
        return isPosX && isPosY;
    }

    overlapsCircle(circle) {
        let closestX = AMath.clamp(circle.x, this.x1, this.x2);
        let closestY = AMath.clamp(circle.y, this.y1, this.y2);

        return Math.pow(circle.x - closestX, 2)
            + Math.pow(circle.y - closestY, 2)
            < Math.pow(circle.r, 2);
    }
}