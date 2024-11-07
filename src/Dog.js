import {Rectangle} from "./Hitboxes/Rectangle";
import {GameMap} from "./GameMap";

const DOG_WIDTH = 105;
const DOG_HEIGHT = 80;

export class Dog {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hitbox = Rectangle(x-DOG_WIDTH/2, x+DOG_WIDTH/2, y-DOG_HEIGHT/2, y+DOG_HEIGHT/2);
    }

    idle = true;
    midAir = false;
    underground = false;
    facingLeft = true;

    diggingProgress = 0;

    isPolinated = false;
    polinationTimeout = null;

    speedX = 0;
    speedY = 0;

    updatePosition() {
        this.x += this.speedX;

        GameMap.getScene();

        for (let block of terrainblocks) {
            if (this.check_collision(block)) {
                if (block instanceof ActiveTerrain) block.activate();
                if (this.speedX > 0) {
                    this.x2 = block.x1;
                    this.x1 = block.x1 - this.width;
                } else {
                    this.x1 = block.x2;
                    this.x2 = block.x2 + this.width;
                }
                this.speedX = 0;
                break;
            }
        }

        this.y1 += this.speedY;
        this.y2 += this.speedY;

        for (let block of terrainblocks) {
            if (block instanceof ActiveVegetation) {
                block.activate(this);
            }
            if (this.check_collision(block)) {
                if (block instanceof ActiveTerrain) block.activate();
                if (this.speedY > 0) {
                    this.y2 = block.y1;
                    this.y1 = block.y1 - this.height;
                    this.midAir = false;
                } else {
                    this.y1 = block.y2;
                    this.y2 = block.y2 + this.height;
                }
                this.speedY = 0;
                break;
            }
        }
    }

    update() {
        if (!this.isImmuneToGravity) {
            this.speedY += 1;
            this.midAir = true;
        }

        this.x += this.speedX;
        this.y += this.speedY;



        if (!this.underground) {



            this.newPosition();
        } else {
            if (keys.jump) this.goUp();
            if (keys.left) this.goLeft();
            if (keys.right) this.goRight();
        }
    }
}